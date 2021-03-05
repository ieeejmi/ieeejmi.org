import crypto from 'crypto'
import { firestore } from 'firebase'
// import { chat } from '../env.json'
import env from '../env'

import fire from './database'

export interface Conversation {
  userId: string
  userDisplay: string
  createdOn: firebase.firestore.Timestamp
  deviceId: string
  messages: Message[]
  isDeleted: boolean
}

export interface Message {
  sentOn: firebase.firestore.Timestamp
  sentBy: MessageSenderTypes
  content: string
}

export interface Contact {
  id?: string
  name?: string
  orgn?: string
  mail?: string
  telp?: string
  mesg?: string
}

export type MessageSenderTypes = 'user' | 'root' | 'system'

const conversations = fire.collection('conversations')
const contacts = fire.collection('contacts')

export const MAX_USER_MSGS = 50

function createDeviceId (length:number = 10) {
  const device = crypto.randomBytes(length).toString('base64')
  localStorage.setItem('deviceId', device)

  return device
}

/**
 * Send a message to a conversation
 * @param convId ConversationID
 * @param content Message Text
 * @param sentBy Party
 */
export async function sendMessage(convId:string, content:string, sentBy:MessageSenderTypes) {
  const conversation = await conversations.doc(convId)
  const { messages } = (await conversation.get()).data() as Conversation
  
  // Check inbox full
  if (sentBy === 'user' && messages.length >= MAX_USER_MSGS)
    return await conversation.update({
      messages: [
        ...messages,
        {
          sentBy, 
          content: 'You\'ve sent the maximum number of messages allowed',
          sentOn: firestore.Timestamp.fromDate(new Date()),
        }
      ]
    })

  return await conversation.update({
    messages: [
      ...messages,
      {
        sentBy, content,
        sentOn: firestore.Timestamp.fromDate(new Date()),
      }
    ]
  })
}

/**
 * Create a New conversation
 * @param user User name
 */
export async function createConversation(user:string) {
  const device = createDeviceId()
  const userId = user.trim().replace(/ /g, '-').toLowerCase().concat('-', device)
  localStorage.setItem('userId', userId)

  const { id } =  await conversations.add({
    userId,
    userDisplay: user,
    deviceId: crypto.createHash('sha512').update(device).digest('base64'),
    createdOn: firestore.Timestamp.fromDate(new Date()),
    messages: [],
    isDeleted: false
  })

  return { id, device }
}

export async function getActiveConversations() {
  return (await conversations
    .where('isDeleted', '==', false)
    .orderBy('createdOn', 'desc')
    .limit(20)
    .get())
  .docs.map(
    conv => ({ ...conv.data() } as Conversation)
  )
}

export async function getArchivedConversations() {
  return (await conversations
    .where('isDeleted', '==', true)
    .orderBy('createdOn', 'desc')
    .limit(20)
    .get())
  .docs.map(
    conv => ({ ...conv.data() } as Conversation)
  )
}

export async function subscribeToConvByUserId(userId:string, 
    callback:(snapshot: Message[]) => void,
    error:(error: Message) => void
  ) {
  const conv = await conversations
    .where('userId', '==', userId)
    .orderBy('createdOn', 'asc')
    .limitToLast(1)
    .get()

  return conv.docs.map(
    async doc => await subscribeToConversation(doc.id, callback, error)
  ).shift()
}

export async function subscribeToConversation(convId:string,
    callback:(snapshot: Message[]) => void,
    error:(error: Message) => void
  ) {
  const device = localStorage.getItem('deviceId') as string

  const convRef = conversations.doc(convId)
  const { deviceId, userDisplay, messages } = (await convRef.get()).data() as Conversation

  if (crypto.createHash('sha512').update(device).digest('base64') !== deviceId)
    if(device !== env.chat.masterkey)
      return null
  
  const unsub = convRef.onSnapshot(
    function onNext(snapshot) {
      const C = snapshot.data() as Conversation
      callback(C.messages)
    },
    function onError(err) {
      error({
        sentBy: 'system',
        content: err.message,
        sentOn: firestore.Timestamp.fromDate(new Date())
      })
    }
  )
  return { convId, userDisplay, messages, unsub }
}

export async function deleteConversation(conversationId:string) {
  await conversations.doc(conversationId).update({
    isDeleted: true
  })
}

export async function permanentlyDeleteConversation(conversationId:string) {
  await conversations.doc(conversationId).delete()
}

/**
 * Create a new contact
 * @param contact Contact Info
 */
export async function createContact(contact:Contact) {
  if ((await contacts
      .where('mail', '==', contact.mail)
      .limit(1)
      .get())
    .docs.length === 0
  ) {
    const { id } = await contacts.add(contact)
    return id
  }
}

export async function getContacts() {
  return (await contacts
    .get())
  .docs.map(
    cont => ({ ...cont.data(), id: cont.id } as Contact)
  )
}

export async function deleteContact(contactId:string) {
  await contacts.doc(contactId).delete()
}

import firebase from 'firebase'
import fire from './database'

export const signInOptions = [
  // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  // firebase.auth.GithubAuthProvider.PROVIDER_ID
]

type SUDO = 'Superuser'
type READ = 'AllowedRead'
type WRITE = 'AllowedWrite'
type UPDATE = 'AllowedUpdate'
type DELETE = 'AllowedDelete'

type Permission = SUDO | READ | WRITE | UPDATE | DELETE

interface IAuthUser {
  userid: string
  permissions: Permission[]
}

interface SignupToken {
  for: 'USERSIGNUP'
  allow: string
  permissions: Permission[]
}

const permissions = fire.collection('permissions')
const authtokens = fire.collection('authtokens')

export class AuthUser implements IAuthUser {
  readonly userid: string
  readonly permissions: Permission[]

  constructor(username:string, allowed:Permission[]) {
    this.userid = username
    this.permissions = allowed
  }

  hasPermission(allow:Permission) {
    return this.permissions.includes(allow)
  }
}

export async function authLogin(userid:string) {
  // After Firebase auth login
  let permissions = await fetchPermissions(userid)
  let created = new AuthUser(userid, permissions)

  return created
}

export async function fetchPermissions(user:string) {
  return (await permissions
    .doc(user)
    .get())
  .data()?.permissions as Permission[]
}

export async function createUser(tokenId:string, user:string) {
  const token = await authtokens.doc(tokenId).get()
  if (!token.exists)
    return Promise.reject(null)

  const signup = (token.data() as SignupToken)
  authtokens.doc(tokenId).delete()

  if (signup.for !== 'USERSIGNUP')
    return Promise.reject('Invalid Token')

  if (signup.allow !== user)
    return Promise.reject('Invalid User')

  return await permissions.doc(user).set({
    username: user,
    permissions: signup.permissions
  })
}

export async function createSignupToken(tokenId:string, user:string, permissions?:Permission[]) {
  const { id } = await authtokens
    .add({
      for: 'USERSIGNUP',
      allow: user,
      permissions
    })

  return id
}
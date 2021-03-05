import firebase from 'firebase'
import env from '../env'

export const config = env.fire

// Initialize Firebase app
export const F = firebase.initializeApp(config)
F.analytics()

export const firestore = firebase.firestore(F)
export default firestore

export const storage = firebase.storage(F)

export const auth = firebase.auth(F)

export const notifications = firebase.messaging(F)
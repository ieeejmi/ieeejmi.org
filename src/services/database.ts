import firebase from 'firebase'
import { fire as FirebaseConfig } from '../env.json'

export const config = FirebaseConfig

// Initialize Firebase app
export const F = firebase.initializeApp(FirebaseConfig)
F.analytics()

export const firestore = firebase.firestore(F)
export default firestore

export const storage = firebase.storage(F)

export const auth = firebase.auth(F)

export const notifications = firebase.messaging(F)
// username-based auth helpers (using fake-email mapping into Firebase Auth).
// strategy:
// - register: create user in Auth using `${username}@local` as email, password -> then store mapping in Firestore `usernames/{username}` => uid
// - login: sign in with fake email
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const provider = new GoogleAuthProvider()
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'ryouseikoseki1114@gmail.com'

export async function registerWithUsername(username, password) {
  const fakeEmail = `${username}@local.liveapp`
  // check username uniqueness
  const snap = await getDoc(doc(db, 'usernames', username))
  if (snap.exists()) throw new Error('そのユーザー名は既に使われています')
  const userCred = await createUserWithEmailAndPassword(auth, fakeEmail, password)
  // save mapping
  await setDoc(doc(db, 'usernames', username), { uid: userCred.user.uid, username, createdAt: Date.now() })
  // also store public profile
  await setDoc(doc(db, 'users', userCred.user.uid), { username, createdAt: Date.now(), role: 'user', approved: false })
  return userCred.user
}

export async function loginWithUsername(username, password) {
  const fakeEmail = `${username}@local.liveapp`
  return await signInWithEmailAndPassword(auth, fakeEmail, password)
}

export async function loginWithProvider() {
  const res = await signInWithPopup(auth, provider)
  return res.user
}

export async function signOutUser() {
  return signOut(auth)
}

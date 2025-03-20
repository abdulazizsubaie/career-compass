import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  UserCredential,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from './firebase';

// Authentication utilities
export const signUp = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async (): Promise<void> => {
  return await firebaseSignOut(auth);
};

export const updateUserProfile = async (
  displayName?: string,
  photoURL?: string
): Promise<void> => {
  if (!auth.currentUser) return;
  
  await updateProfile(auth.currentUser, {
    displayName: displayName || auth.currentUser.displayName,
    photoURL: photoURL || auth.currentUser.photoURL,
  });
};

// Firestore utilities
export const createUserDocument = async (
  userId: string,
  data: DocumentData
): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    ...data,
    createdAt: new Date(),
  });
};

export const getUserDocument = async (
  userId: string
): Promise<DocumentData | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data();
  }
  
  return null;
};

export const updateUserDocument = async (
  userId: string,
  data: Partial<DocumentData>
): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: new Date(),
  });
};

export const saveAssessmentResults = async (
  userId: string,
  results: any
): Promise<void> => {
  const assessmentRef = doc(db, 'assessments', userId);
  await setDoc(assessmentRef, {
    results,
    createdAt: new Date(),
  });
};

export const getAssessmentResults = async (
  userId: string
): Promise<any | null> => {
  const assessmentRef = doc(db, 'assessments', userId);
  const assessmentSnap = await getDoc(assessmentRef);
  
  if (assessmentSnap.exists()) {
    return assessmentSnap.data();
  }
  
  return null;
};

// Storage utilities
export const uploadFile = async (
  path: string,
  file: File
): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

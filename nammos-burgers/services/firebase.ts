import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  Timestamp 
} from 'firebase/firestore';

// CONFIGURATION
const API_KEY = process.env.FIREBASE_API_KEY || "AIzaSyD-PLACEHOLDER-KEY";
const IS_DEMO = API_KEY.includes("PLACEHOLDER");

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "nammos-burgers.firebaseapp.com",
  projectId: "nammos-burgers",
  storageBucket: "nammos-burgers.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Initialize Firebase only if not in demo mode to avoid errors
const app = !IS_DEMO ? initializeApp(firebaseConfig) : null;
const db = !IS_DEMO && app ? getFirestore(app) : null;

// Mock delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  /**
   * Check if a user exists by phone number
   */
  getUserByPhone: async (phone: string) => {
    // DEMO MODE: Simulate backend response
    if (IS_DEMO) {
      console.log("⚠️ DEMO MODE: Simulating getUserByPhone for", phone);
      await delay(800); // Fake network delay
      return null; // Simulate new user
    }

    try {
      if (!db) throw new Error("Database not initialized");
      const q = query(collection(db, "users"), where("phone", "==", phone));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error("Error fetching user:", error);
      // Fallback to demo behavior on error to keep app usable
      return null;
    }
  },

  /**
   * Create a new user
   */
  createUser: async (firstName: string, lastName: string, phone: string) => {
    // DEMO MODE: Simulate backend response
    if (IS_DEMO) {
      console.log("⚠️ DEMO MODE: Simulating createUser for", firstName);
      await delay(1000); // Fake network delay
      return {
        id: "demo-user-123",
        name: `${firstName} ${lastName}`.trim(),
        phone: phone,
        createdAt: new Date()
      };
    }

    try {
      if (!db) throw new Error("Database not initialized");
      const userData = {
        name: `${firstName} ${lastName}`.trim(),
        phone: phone,
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, "users"), userData);
      return { id: docRef.id, ...userData };
    } catch (error) {
      console.error("Error creating user:", error);
      // Fallback to demo behavior
      return {
        id: "demo-fallback-id",
        name: `${firstName} ${lastName}`.trim(),
        phone: phone,
        createdAt: new Date()
      };
    }
  }
};
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBEsSBK9NizQGtxo-ucUW0eyj7XQMsCy1c",
  authDomain: "yourluckydays.firebaseapp.com",
  projectId: "yourluckydays",
  storageBucket: "yourluckydays.firebasestorage.app",
  messagingSenderId: "1091262784526",
  appId: "1:1091262784526:web:24001bd1649798ac9dc85f",
  measurementId: "G-H0789GMRDW"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);;



export const sendDataReadyNotification = async (firebaseUserId) => {
  try {
    const userDocRef = doc(db, "users", firebaseUserId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData.fcmToken != null && userData.fcmToken != '') {
        sendNotification(
          userData.fcmToken,
          "Your lucky days data is now Updated!",
          "Check out your updated predictions now."
        );
      }
      return userData.fcmToken;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}


export const sendNotification = async (token, title, body) => {
  const url = "https://asia-south1-yourluckydays.cloudfunctions.net/sendPushNotification";

  try {
    // Sending POST request to the function endpoint
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        title,
        body,
      }),
    });

    // Handling the response from the function
    if (response.ok) {
      const result = await response.json();
      console.log("Notification sent successfully:", result);
    } else {
      const errorResult = await response.json();
      console.error("Error sending notification:", errorResult.error);
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};



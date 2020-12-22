import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBf-gmLfs9G8-ISYtEVchVk9YB2FNHyOv8",
    authDomain: "tutor-connect-1b25b.firebaseapp.com",
    projectId: "tutor-connect-1b25b",
    storageBucket: "tutor-connect-1b25b.appspot.com",
    messagingSenderId: "1025195952610",
    appId: "1:1025195952610:web:a7a84d51e947e3677311bb",
    measurementId: "G-RGBWN0F3RN"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp
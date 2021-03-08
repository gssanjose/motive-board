// import the firebase module
import firebase from 'firebase/app';

// import the database info from the firebase module
import 'firebase/database'

const firebaseConfig = {
   apiKey: "AIzaSyBZHH7LAzEry0P5sbOZD58GX7gv_7C9wwM",
   authDomain: "motive-board-app.firebaseapp.com",
   projectId: "motive-board-app",
   storageBucket: "motive-board-app.appspot.com",
   messagingSenderId: "343445572456",
   appId: "1:343445572456:web:6e5b9af959f0c7f023e4dd"
};
// initialize firebase
firebase.initializeApp(firebaseConfig);

// export configured firebase app
export default firebase;

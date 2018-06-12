import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyAIhA-2GtX4ophAcXma7YOBMlsP_s9KuFQ",
  authDomain: "worldcup-aaafc.firebaseapp.com",
  databaseURL: "https://worldcup-aaafc.firebaseio.com",
  projectId: "worldcup-aaafc",
  storageBucket: "worldcup-aaafc.appspot.com",
  messagingSenderId: "631167401053"
};
firebase.initializeApp(config);
export default firebase;

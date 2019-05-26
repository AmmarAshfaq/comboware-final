import firebase from 'firebase';


let config = {
  apiKey: "AIzaSyAXEBvQloHBChgfjIEpl-NLepuy1uR-PgU",
  authDomain: "push-70887.firebaseapp.com",
  databaseURL: "https://push-70887.firebaseio.com",
  projectId: "push-70887",
  storageBucket: "push-70887.appspot.com",
  messagingSenderId: "685967859230"
};
let dbConfig = firebase.initializeApp(config);
export default dbConfig;
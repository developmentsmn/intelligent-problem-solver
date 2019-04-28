import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxX5dV_3HWnrjukuErT8aDsQ6fo-3QZcY",
    authDomain: "intelligentproblemsolver.firebaseapp.com",
    databaseURL: "https://intelligentproblemsolver.firebaseio.com",
    projectId: "intelligentproblemsolver",
    storageBucket: "intelligentproblemsolver.appspot.com",
    messagingSenderId: "558406110253"
  };
  firebase.initializeApp(config);

export default firebase;
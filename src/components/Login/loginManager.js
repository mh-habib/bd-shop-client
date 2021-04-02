import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFrameWork = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.massage);
        })
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signedOutUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.massage);
        })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.success = true;
            newUserInfo.error = '';
            updateUserName(name);
            return newUserInfo;

        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.success = false;
            newUserInfo.error = error.message;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          const newUserInfo = res.user;
          newUserInfo.success = true;
          newUserInfo.error = '';
          return newUserInfo;
        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          return newUserInfo;
        });
} 

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function () {
      console.log("Username Updated Successfully");
    }).catch(function (error) {
      console.log(error)
    });
  }
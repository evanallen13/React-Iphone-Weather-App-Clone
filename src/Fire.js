import * as firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyD-YlNwpD86HFfjEjDfOnX-fbzWubUkDmo",
    authDomain: "calc-a0e94.firebaseapp.com",
    databaseURL: "https://calc-a0e94.firebaseio.com",
    projectId: "calc-a0e94",
    storageBucket: "",
    messagingSenderId: "362699200835",
    appId: "1:362699200835:web:7e6877ec928b98e9"
})

class Fire {
    readFromDb(){
        const db = firebase.firestore()
        const collection = db.collection('Cities')
    
        collection.onSnapshot((doc) => {
            doc.forEach(docs => {
                docs.data().Cities.forEach(cities => {
                    console.log(cities)
                })

            })
        })
    
    }
}

Fire.shared = new Fire()
export default Fire;
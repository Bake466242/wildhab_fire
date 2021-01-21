
const admin = require("firebase-admin");

const serviceAccount = require("./wildhabitatexercise-firebase-adminsdk-z62ei-63967fed83.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const firestore = admin.firestore()

//const docPeople = firestore.collection("people").doc("UjL74y8ohOqpeqt21sOB");

firestore.collection("people").where('first_name', '==', 'Scar' )
.get()
.then(collection => {
    collection.forEach(doc =>{
        console.log(doc.id, '->', doc.data())
    })
})
.catch(err => console.log({err}))
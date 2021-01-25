const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-63967fed83.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  const firestore = admin.firestore()

exports.getEvents = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          })
          firestore = admin.firestore()
    }
    // if(firestore){
    //     console.log('connected to firestore')
    // } else {
    //     console.log('Not Connected')
    // }
    firestore.collection('events').get()
    .then(collection => {
        const eventsResults = collection.docs.map(doc => {
            let event = doc.data()
            event.id = doc.id
            return event
        })
        res.status(200).json(eventsResults)
    })
.catch(err => {
    console.log(err)
    res.status(500).send({err})
})
}

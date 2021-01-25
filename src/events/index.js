const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-63967fed83.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  const firestore = admin.firestore()
  const eventsRef = firestore.collection('events')

  exports.postEvent = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          })
          firestore = admin.firestore()
    }
    let newEvent = req.body
    let now = admin.firestore.FieldValue.serverTimestamp()
    newEvent.updated = now
    newEvent.created = now

    eventsRef.add(newEvent)
    .then(docRef =>{
        eventsRef.doc(docRef.id).get()
        .then(snapshot => {
            let event = snapshot.data()
            event.id = snapshot.id
            res.status(200).json({
                status: 'success',
                data: event,
                message: 'Events Loaded',
                statusCode: 200
        })
        return 
    })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            status: 'error',
            data: err,
            message: 'Error getting events',
            statusCode: 500
        })
    })
}
  

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
    eventsRef.get()
    .then(collection => {
        const eventsResults = collection.docs.map(doc => {
            let event = doc.data()
            event.id = doc.id
            return event
        })
        res.status(200).json({
            status: 'success',
            data: eventsResults,
            message: 'Events Loaded',
            statusCode: 200
        })
    })
.catch(err => {
    console.log(err)
    res.status(500).send({
        status: 'error',
        data: err,
        message: 'Error getting events',
        statusCode: 500
    })
})
}

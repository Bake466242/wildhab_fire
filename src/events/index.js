const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-63967fed83.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
    }
  const firestore = admin.firestore()
  const eventsRef = firestore.collection('events')
  const eventProps = ['name', 'desc', 'hosted.by', 'link', 'sport', 'time']

  exports.postEvent = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          })
          firestore = admin.firestore()
    }
    console.log('req body', (req.body).length)
    if (Object.keys(req.body).length === 0 || req.body === undefined) {
        res.send({
            message: "No event defined"
        })
        return
    }
    const invalidProps = (Object.keys(req.body)).some(key => !eventProps.includes(key))
    if (invalidProps){
        res.send({
            message: "Invalid field"
        })
        return
    }

    if(req.body.name === null){
        res.send({
            message: "Event name required"
        })
        return
    }
    if(typeof req.body.name !== 'string'){
        res.send({
            message: "Invalid event name"
        })
        return
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

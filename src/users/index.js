const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-63967fed83.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
    }
  const firestore = admin.firestore()
  const peopleRef = firestore.collection('people')
  const peopleProps = ['first_name', 'last_name', 'profile_pic', 'id']

exports.postPerson = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          })
          firestore = admin.firestore()
    }
    if(Object.keys(req.body).length === 0 || req.body === undefined){
      res.send({
        message: "No person defined"
      })
      return
    }
    const invalidProps = (Object.keys(req.body)).some(key => !peopleProps.includes(key))
    if (invalidProps){
        res.send({
            message: "Invalid field"
        })
        return
    }
    if(req.body.first_name === null){
      res.send({
          message: "Person's name required"
      })
      return
  }
  if(typeof req.body.first_name !== 'string'){
      res.send({
          message: "Invalid persons' name"
      })
      return
  }

    let newPerson = req.body
    let now = admin.firestore.FieldValue.serverTimestamp()
    newPerson.updated = now
    newPerson.created = now

    peopleRef.add(newPerson)
    .then(docRef =>{
        peopleRef.doc(docRef.id).get()
        .then(snapshot => {
            let person = snapshot.data()
            person.id = snapshot.id
            res.status(200).json({
                status: 'success',
                data: person,
                message: 'Person Added Successfully',
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
            message: 'Error creating person',
            statusCode: 500
        })
    })
}
  
exports.getPeople = (req, res) => {
    if(!firestore) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
      firestore = admin.firestore()
    }
    peopleRef.get()
      .then(collection => {
        const peopleResults = collection.docs.map(doc => {
          let person = doc.data()
          person.id = doc.id
          return person
        })
        res.status(200).json({
          status: 'success',
          data: peopleResults,
          message: 'People loaded successfully',
          statusCode: 200
        })
      })
      .catch(err => {
        res.status(500).send({
          status: 'error',
          data: err,
          message: 'Error getting people',
          statusCode: 500
        })
      })
  }
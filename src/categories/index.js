const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-63967fed83.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
    }
  const firestore = admin.firestore()
  const categoriesRef = firestore.collection('categories')


  exports.postCategory = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          })
          firestore = admin.firestore()
    }
    // if(Object.keys(req.body).length === 0 || req.body === undefined){
    //   res.send({
    //     message: "No category defined"
    //   })
    //   return
    // }

    let newCategory = req.body
    let now = admin.firestore.FieldValue.serverTimestamp()
    newCategory.updated = now
    newCategory.created = now

    categoriesRef.add(newCategory)
    .then(docRef =>{
        categoriesRef.doc(docRef.id).get()
        .then(snapshot => {
            let category = snapshot.data()
            category.id = snapshot.id
            res.status(200).json({
                status: 'success',
                data: category,
                message: 'Category Added Successfully',
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
            message: 'Error creating Category',
            statusCode: 500
        })
    })
}

  exports.getCategories = (req, res) => {
      if(!firestore) {
          admin.initializeApp({
              credential: admin.credential.cert(serviceAccount)
          })
          firestore = admin.firestore()
      }
      categoriesRef.get()
      .then(collection => {
          const categoryResults = collection.docs.map(doc => {
            let categories = doc.data()
            categories.id = doc.id
            return categories   
          })
          res.status(200).json({
              status: 'success',
              data: categoryResults,
              message: 'Cats loaded successfully',
              statusCode: 200
          })
      })
      .catch(err => {
        res.status(500).send({
          status: 'error',
          data: err,
          message: 'Error getting cat',
          statusCode: 500
        })
      })
  }
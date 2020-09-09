const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/

exports.createUser = functions.https.onCall((data, res) => {
    admin.auth().createUser({
        email: data.email,
        emailVerified: true,
        password: data.password,
      }).then(() =>{
        console.log(res)
      })
      
});

exports.deleteUser = functions.https.onCall((data, res) => {  // oncall zove sa baze tu funkciju, moramo ubaciti nas link i proslijediti u link
    admin.auth().getUserByEmail(data.email)
    .then(function(userRecord) {
        admin.auth().deleteUser(userRecord.uid)
        console.log(res)
      })
      
});
var admin = require("firebase-admin");
var serviceAccount = require("")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ""
  });

const bucket = admin.storage().bucket("gs://daily-avatar.appspot.com/");

// console.log(bucket.getFiles());
bucket.getFiles().then(response => {
    console.log(response[0]);
})
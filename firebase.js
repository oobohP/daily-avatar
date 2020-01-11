// Imports
var admin = require("firebase-admin");
var serviceAccount = require("")

// Init firebase app with credentials and point to database url
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ""
  });

// Storage
const bucket = admin.storage().bucket("");

var image = bucket.file('IMG_1625.JPEG');

// Gets image buffer to be converted into base64
image.download().then(response => {
    console.log(response);
})

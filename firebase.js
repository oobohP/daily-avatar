// Imports
var admin = require("firebase-admin");
var serviceAccount = require("");

// Init firebase app with credentials and point to database url
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ""
  });

// Storage
const bucket = admin.storage().bucket("");

// Gets all files and their respective metadata from storage
function getAllFiles() {
  bucket.getFiles().then(response => {
    console.log(response);
  });
}

// Gets media link from firebase storage
// TODO: Smarter way to check if file doesn't exist. Find a better way instead of math.rand through api.
function getURL() {
  bucket.file('IMG_' + Math.floor(Math.random() * Math.floor(25)) + '.png').getMetadata().then(response =>{
    console.log(response[0]["mediaLink"])
    return response[0]["mediaLink"];
  }).catch(
    console.log('no file like that exist, please check the database and see if it exist')
  );
}

getURL();
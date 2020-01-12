// Imports
var admin = require("firebase-admin");
var serviceAccount = require("");

// Exports
module.exports = {
  getURL
};

// Init firebase app with credentials and point to database url
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});

// Storage
const bucket = admin.storage().bucket("");

// Gets all files and their respective metadata from storage
// Add this for math random in getURL later
function getAllFiles() {
  return new Promise(function (resolve, reject) {
    bucket.getFiles().then(response => {
      response.forEach(image => {
        resolve(image.length - 1);
      })
    })
  });
}

// Gets media link from firebase storage
// TODO: Add to accept other image extensions, jpg / png / ico and more
function getURL() {
  return new Promise(function(resolve, reject) {
    getAllFiles().then(responseArray => {
      bucket.file('IMG_' + Math.floor(Math.random() * Math.floor(responseArray)) + '.JPEG').getMetadata().then(response => {
        resolve(response[0]["mediaLink"]);
      });
    });
  });
}
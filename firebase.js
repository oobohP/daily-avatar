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
  databaseURL: "https://.firebaseio.com"
});

// Storage
const bucket = admin.storage().bucket(".appspot.com");

// Gets all files and their respective metadata from storage
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
// TODO: Add to accept other files instead of just strict file path in JPEG
function getURL() {
  return new Promise(function(resolve, reject) {
    getAllFiles().then(responseArray => {
      var lastNumber = 0;

      var randomNumber = function() {
        var getRandomNumber =  Math.floor(Math.random() * Math.floor(responseArray));
        if (getRandomNumber != lastNumber) {
          // Gets image data from bucket if the number was not the same as the last
          bucket.file('IMG_' + getRandomNumber + '.JPEG').getMetadata().then(response => {
            resolve(response[0]["mediaLink"]);
            console.log(response[0]);
          })
        } else {
          // Run the function again to try for another number
          randomNumber();
        }
      }

      randomNumber();
    });
  });
}

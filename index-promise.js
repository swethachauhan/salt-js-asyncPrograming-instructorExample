/* eslint-disable no-console */
const fs = require('fs');
const lab = require('./labUtils');

const instructorId = process.argv[2] || '1';

function readFilePromise(path, index) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err1, Data) => {
      if (err1) {
        reject(err1);
      }
      if (index === undefined) {
        resolve(lab.fileDataToArray(Data));
      } else {
        resolve(lab.fileDataToArray(Data)[index][1]);
      }
    });
  });
}
const instructorNamePromise = readFilePromise('./data/instructors.txt', instructorId);

const restaurantTypePromise = readFilePromise('./data/favoriteRestaurantType.txt', instructorId);

const postalCodePromise = readFilePromise('./data/postalCodes.txt', instructorId);

const addressPromise = readFilePromise('./data/postalAddressForPostalCode.txt');

const restaurantPromise = readFilePromise('./data/restaurantsInArea.txt');
const allPromises = Promise.all([instructorNamePromise,
  restaurantTypePromise,
  postalCodePromise,
  addressPromise,
  restaurantPromise]);

allPromises.then(result => {
  const instructorName = result[0];
  const restaurantType = result[1];
  const postalCode = result[2];
  const postalAddress = result[3].filter(row => row[0] === postalCode)
    .map(data => data[1])[0];
  const restaurants = result[4].filter(row => row[0] === postalAddress)
    .filter(row => row[1] === restaurantType)
    .map(data => data[2]);
  lab.printRestoList(instructorName, restaurantType, postalAddress, restaurants);
});

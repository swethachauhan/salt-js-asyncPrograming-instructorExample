/* eslint-disable no-console */
const fs = require('fs');
const util = require('util');
const lab = require('./labUtils');

const instructorId = process.argv[2] || '1';
console.log(`in index-promisify.js with the instructor id '${instructorId}'`);

const promise = util.promisify(fs.readFile);

const instructorNamePromise = promise('./data/instructors.txt').then(data => lab.fileDataToArray(data));

const restaurantTypePromise = promise('./data/favoriteRestaurantType.txt').then(data => lab.fileDataToArray(data));

const postalCodePromise = promise('./data/postalCodes.txt').then(data => lab.fileDataToArray(data));

const addressPromise = promise('./data/postalAddressForPostalCode.txt').then(data => lab.fileDataToArray(data));

const restaurantPromise = promise('./data/restaurantsInArea.txt').then(data => lab.fileDataToArray(data));
const allPromises = Promise.all([instructorNamePromise,
  restaurantTypePromise,
  postalCodePromise,
  addressPromise,
  restaurantPromise]);

allPromises.then(result => {
  const instructorName = result[0][instructorId][1];
  const restaurantType = result[1][instructorId][1];
  const postalCode = result[2][instructorId][1];
  const postalAddress = result[3].filter(data => data[0] === postalCode)
    .map(element => element[1])[0];
  const restaurants = result[4].filter(things => things[0] === postalAddress)
    .filter(thoughts => thoughts[1] === restaurantType)
    .map(elementaly => elementaly[2]);
  lab.printRestoList(instructorName, restaurantType, postalAddress, restaurants);
});

/* eslint-disable no-console */
const fs = require('fs');
const lab = require('./labUtils');

const instructorId = process.argv[2] || '1';
console.log(`in index-cb.js with the instructor id '${instructorId}'`);

fs.readFile('./data/instructors.txt', (err1, instructorData) => {
  if (err1) {
    console.log(err1);
    return -1;
  }
  const instructorName = lab.fileDataToArray(instructorData)[instructorId][1];
  // console.log(instructorName);

  fs.readFile('./data/favoriteRestaurantType.txt', (err2, restoData) => {
    if (err2) {
      console.log(err2);
      return -1;
    }
    const favRest = lab.fileDataToArray(restoData)[instructorId][1];
    // console.log(favRest);

    fs.readFile('./data/addresses.txt', (err3, postalCodeData) => {
      if (err3) {
        console.log(err3);
        return -1;
      }
      const instPostalCode = lab.fileDataToArray(postalCodeData)[instructorId][1];
      // console.log(instPostalCode);

      fs.readFile('./data/postalAddressForPostalCode.txt', (err4, postAddressData) => {
        if (err4) {
          console.log(err4);
          return -1;
        }
        const postalAddress = lab.fileDataToArray(postAddressData)
          .filter(addressData => addressData[0] === instPostalCode)
          .map(r => r[1])[0];
        // console.log(postalAddress);
        fs.readFile('./data/restaurantsInArea.txt', (err5, restaurantsInArea) => {
          if (err5) {
            console.log(err5);
            return -1;
          }
          const restaurants = lab.fileDataToArray(restaurantsInArea)
            .filter(restos => restos[0] === postalAddress && restos[1] === favRest)
            .map(r => r[2]);
          // console.log(restaurants);
          lab.printRestoList(instructorName, favRest, postalAddress, restaurants);
        });
      });
    });
  });
});

const csv = require('csvtojson');
const fs = require('fs')
const { pipeline } = require('stream')

const readStream = fs.createReadStream('./csv/nodejs.csv');
const writeStream = fs.createWriteStream('./text.txt');

pipeline(
  readStream,
  csv({ delimiter: ';' }),
  writeStream,
  (error) => {
    if (error) {
      console.error(error.message)
    } else {
      console.log('Finished')
    }
  }
)


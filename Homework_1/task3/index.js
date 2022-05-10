import { stdin, stdout } from 'process'
import csv from 'csvtojson';
import fs from 'fs';
import { pipeline } from 'stream'

function reverseStr(data) {
  return data.toString().split('').reverse().join('').trim()
}

stdin.on('data', (data) => {
  const newStr = reverseStr(data)

  stdout.write(`${newStr} \n`)
})

const readStream = fs.createReadStream('./csv/nodejs.csv');
const writeStream = fs.createWriteStream('./text.txt');

pipeline(
  readStream,
  csv(),
  writeStream,
  (error) => {
    if (error) {
      console.error(error.message)
    } else {
      console.log('Finished')
    }
  }
)



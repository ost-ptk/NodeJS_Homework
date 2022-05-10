const { stdin, stdout } = require('process')

function reverseStr(data) {
 return data.toString().split('').reverse().join('').trim()
}
stdin.on('data', (data) => {
 const newStr = reverseStr(data)

 stdout.write(`${newStr} \n`)
})

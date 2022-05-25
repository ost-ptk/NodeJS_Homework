import dotenv from 'dotenv'
import express from 'express'

import router from './routes'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

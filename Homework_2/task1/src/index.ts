import dotenv from 'dotenv';
import express from 'express';

import { userRouter } from './routers';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

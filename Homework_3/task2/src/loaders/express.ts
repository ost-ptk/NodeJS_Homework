import express from 'express';

import { globalErrorMiddleware, userRouters } from '../api';

const app = express();

app.use(express.json());
app.use(userRouters);
app.use(globalErrorMiddleware);

export default app;

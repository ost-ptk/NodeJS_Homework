import express from 'express';

import { globalErrorMiddleware, userRouters, groupRouters } from '../api';

const app = express();

app.use(express.json());
app.use(userRouters);
app.use(groupRouters);
app.use(globalErrorMiddleware);

export default app;

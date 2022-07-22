import express from 'express';

import { globalErrorMiddleware, userRouters, groupRouters, apiMethodLoggingMiddleware } from '../api';

const app = express();

app.use(express.json());

app.use(apiMethodLoggingMiddleware);

app.use(userRouters);
app.use(groupRouters);

app.use(globalErrorMiddleware);

export default app;

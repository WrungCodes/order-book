import express from 'express';
import { json } from 'body-parser'

const app = express();

app.set('trust proxy', true);

app.use(json());


app.all('*', async (req, res) => {
    throw new Error('Route Not Found');
});
  
export { app };

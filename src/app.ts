import express from 'express';
import { json } from 'body-parser'
import { OrderBook } from "./order/OrderBook";
import { ordersRouter } from "./routes/get-orders";
import { spreadRouter } from "./routes/get-spread";
import { placeOrdersRouter } from "./routes/place-order";

const app = express();

app.set('trust proxy', true);

app.use(json());

app.locals.orderBook = new OrderBook('BTC/USDT')

app.use(ordersRouter);
app.use(spreadRouter);
app.use(placeOrdersRouter);

app.all('*', async (req, res) => {
    throw new Error('Route Not Found');
});
  
export { app };

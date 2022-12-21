import express, { Request, Response } from 'express';
import { OrderBook } from "../order/OrderBook";

const router = express.Router();

router.get(
    '/orders',
    async (request: Request, response: Response) => {

        const orderBook: OrderBook = request.app.locals.orderBook;

        response.status(200).send({ 
            bid: orderBook.getBidOrders(),
            ask: orderBook.getAskOrders(),
            spread: orderBook.getSpread()
         });
    }
);

export { router as ordersRouter };
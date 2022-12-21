import express, { Request, Response } from 'express';
import { OrderBook } from "../order/OrderBook";
import { body } from "express-validator";
import { Order } from "../order/Order";
import { OrderCore } from "../order/OrderCore";

const router = express.Router();

router.post(
    '/orders',
    [
        body('userId').isString().withMessage('userId must string'),
        body('security').isString().withMessage('security must string'),
        body('price').isNumeric().withMessage('price must be numeric'),
        body('quantity').isNumeric().withMessage('quantity must be numeric'),
        body('isBuySide').isBoolean().withMessage('isBuySide must be boolean'),
    ],
    async (request: Request, response: Response) => {

        const { userId, security, price, quantity, isBuySide } = request.body; 

        const orderBook: OrderBook = request.app.locals.orderBook;

        const id = `${Math.floor(100000000 + Math.random() * 900000000)}`;

        orderBook.addOrder(
            new Order(
                new OrderCore(id, userId, security),
                price,
                quantity,
                isBuySide
            ))

        response.status(200).send({ 
            message: `Order of ID=${id} Placed`,
         });
    }
);

export { router as placeOrdersRouter };
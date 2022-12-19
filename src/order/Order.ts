import { IOrderCore } from "../interface/OrderInterfaces";
import { BigNumber } from 'bignumber.js';

export class Order implements IOrderCore {

    private readonly orderCore: IOrderCore;
    private price: string;
    private initialQuantity: string;
    private currentQuantity: string;
    private isBuySide: boolean;

    orderId: string;
    userId: string;
    securityId: string;

    constructor( orderCore: IOrderCore, price: string, quantity: string, isBuySide: boolean){
        this.orderCore = orderCore;
        this.price = price;
        this.initialQuantity = quantity;
        this.currentQuantity = quantity;
        this.isBuySide = isBuySide;

        this.orderId = orderCore.orderId;
        this.userId = orderCore.userId;
        this.securityId = orderCore.securityId;
    }
    
    increaseQuantity(amount: string | number ) {
        this.currentQuantity = ((new BigNumber(this.currentQuantity)).plus(amount)).toString()
    }

    decreaseQuantity(amount: string | number ) {
        const cq = new BigNumber(this.currentQuantity)

        if(cq.isLessThan(amount)) { throw new Error(`Amount is > Current Quantity for OrderId = ${this.orderCore.orderId}`); }

        this.currentQuantity = (cq.minus(amount)).toString()
    }
}
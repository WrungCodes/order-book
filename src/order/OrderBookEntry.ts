import { Limit } from "./Limit";
import { Order } from "./Order";

export class OrderBookEntry {

    readonly currentOrder: Order;
    readonly parentLimit: Limit;
    readonly creationTime: Date;

    next: OrderBookEntry | null = null;
    previous: OrderBookEntry | null = null;
    
    constructor( currentOrder: Order, parentLimit: Limit){
        this.creationTime = new Date(Date.now());
        this.currentOrder = currentOrder;
        this.parentLimit = parentLimit;
    }

    getNext() : OrderBookEntry | null
    {
        return this.next
    }

    setNext(order: OrderBookEntry | null){
        this.next = order
    }

    setPrevious(order: OrderBookEntry | null){
        this.previous = order
    }

    toJSON() {
        return {
            time: this.creationTime,
            order: this.currentOrder
        };
    }
}

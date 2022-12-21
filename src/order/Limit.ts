import { BigNumber } from "bignumber.js";
import { OrderRecord, Side } from "../interface/OrderInterfaces";
import { OrderBookEntry } from "./OrderBookEntry";

export class Limit {
    public price: string;

    public head: OrderBookEntry | null = null;
    public tail: OrderBookEntry | null = null;
    
    constructor(price: string){
        this.price = price
    }

    isEmpty(): boolean {
        return this.head == null
    }

    side(): Side {
        if(this.isEmpty()) { return Side.Unknown }
        if(this.head?.currentOrder.isBuySide) { return Side.Bid }
        else { return Side.Ask }
    }

    getLevelOrderCount() : number {
        let count : number = 0;

        let pointer : OrderBookEntry | null = this.head;

        while (pointer != null) 
        {
            if(!new BigNumber(pointer.currentOrder.currentQuantity).isEqualTo(0))
            {
                count++;
            }   
            pointer = pointer.getNext();
        }

        return count;
    }

    getLevelQuantityCount() : string {
        let quantity : BigNumber = new BigNumber(0)

        let pointer : OrderBookEntry | null = this.head;

        while (pointer != null) 
        {
            quantity.plus(pointer.currentOrder.currentQuantity)
            pointer = pointer.getNext();
        }

        return quantity.toString()
    }

    getLevelOrderRecords() : OrderRecord[] 
    {
        const orderRecords: OrderRecord[] = [];

        let pointer : OrderBookEntry | null = this.head;

        let queuePosition : number = 0

        while (pointer != null) 
        {
            const currentOrder = pointer.currentOrder

            if(!new BigNumber(currentOrder.currentQuantity).isEqualTo(0))
            {
                orderRecords.push({
                    orderId: currentOrder.orderId,
                    qauntity: currentOrder.currentQuantity,
                    price: this.price,
                    isBuySide: currentOrder.isBuySide,
                    userId: currentOrder.userId,
                    securityId: currentOrder.securityId,
                    queuePosition: queuePosition,
                })
            }
            queuePosition ++;
            pointer = pointer.getNext();
        }

        return orderRecords;
    }

    toJSON() {
        return {
            price: this.price
        };
    }
}

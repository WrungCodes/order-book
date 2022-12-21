import { BigNumber } from "bignumber.js";
import { Limit } from "./Limit"
import { OrderBookEntry } from "./OrderBookEntry";
import { Order } from "./Order";
import SortedSet, { SortedSet as SortedSetType } from "collections/sorted-set";
import { ModifyOrder } from "./ModifyOrder";
import { CancelOrder } from "./CancelOrder";

export class OrderBook {
    private readonly security: string
    private readonly orders: Map<string, OrderBookEntry> = new Map<string, OrderBookEntry>()
    private readonly askLimits: SortedSetType<Limit> = new SortedSet<Limit>([], undefined, undefined, sortAsk);
    private readonly bidLimits: SortedSetType<Limit> = new SortedSet<Limit>([], undefined, undefined, sortBuy);

    constructor(security: string){
        this.security = security
    }

    count() : number { return this.orders.size; }

    containsOrder(orderId: string) : boolean { return this.orders.has(orderId); }

    addOrder(order: Order){
        const baseLimit = new Limit(order.price)
        this.addOrderHelper(order, baseLimit, order.isBuySide ? this.bidLimits : this.askLimits, this.orders)
    }

    addOrderHelper(order: Order, limit: Limit, limits: SortedSetType<Limit>, orders: Map<string, OrderBookEntry>){
        if(limits.has(limit))
        {
            const entry: OrderBookEntry | null = new OrderBookEntry(order, limit)

            if(limit.head == null)
            {
                limit.head = entry
                limit.tail = entry
            }
            else
            {
                const tailPointer = limit.tail;
                (tailPointer as OrderBookEntry).next = entry;
                entry.previous = tailPointer;
                limit.tail = entry
            }
            orders.set(order.orderId, entry)
        }
        else 
        {
            limits.add(limit)
            const entry = new OrderBookEntry(order, limit)
            limit.head = entry
            limit.tail = entry
            orders.set(order.orderId, entry)
        }
    }

    changeOrder(order: ModifyOrder){
        if(this.orders.has(order.orderId)){
            this.removeOrder(order.toCancelOrder())
            this.addOrderHelper(order.toNewOrder(), (this.orders.get(order.orderId) as OrderBookEntry).parentLimit, order.isBuySide ? this.bidLimits : this.askLimits, this.orders)

        }
    }

    removeOrder(order: CancelOrder){
        if(this.orders.has(order.orderId)){
            this.removeOrderEntry(order, (this.orders.get(order.orderId) as OrderBookEntry), this.orders)
        }
    }

    removeOrderEntry(order: CancelOrder, entry: OrderBookEntry, orders: Map<string, OrderBookEntry>){
        if(entry.previous != null && entry.next != null)
        {
            entry.next.previous = entry.previous
        }
        else if(entry.previous != null)
        {
            entry.previous.next = null
        }
        else if(entry.next != null)
        {
            entry.next.previous = null
        }

        if(entry.parentLimit.head == entry && entry.parentLimit.tail == entry)
        {
            entry.parentLimit.head = null
            entry.parentLimit.tail = null
        }
        else if(entry.parentLimit.head == entry)
        {
            entry.parentLimit.head = entry.next
        }
        else if(entry.parentLimit.tail == entry)
        {
            entry.parentLimit.tail = entry.previous
        }

        orders.delete(order.orderId);
    }
}

const sortAsk = (a: Limit, b: Limit) => (new BigNumber(a.price)).toNumber() - (new BigNumber(b.price)).toNumber()
const sortBuy = (a: Limit, b: Limit) => (new BigNumber(a.price)).toNumber() + (new BigNumber(b.price)).toNumber()

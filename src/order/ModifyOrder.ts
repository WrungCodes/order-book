import { IOrderCore } from "../interface/OrderInterfaces";
import { CancelOrder } from "./CancelOrder";
import { Order } from "./Order";

export class ModifyOrder implements IOrderCore {
    private readonly orderCore: IOrderCore;

    public modifyPrice: string;
    public modidfyQuantity: string;
    public isBuySide: boolean;

    orderId: string;
    userId: string;
    securityId: string;
    
    constructor( orderCore: IOrderCore, modifyPrice: string, modidfyQuantity: string, isBuySide: boolean){
        this.orderCore = orderCore;

        this.modifyPrice = modifyPrice;
        this.modidfyQuantity = modidfyQuantity;
        this.isBuySide = isBuySide;

        this.orderId = orderCore.orderId;
        this.userId = orderCore.userId;
        this.securityId = orderCore.securityId;
    }

    toCancelOrder() : CancelOrder
    {
        return new CancelOrder(this)
    }

    toNewOrder() : Order 
    {
        return new Order(this, this.modifyPrice, this.modidfyQuantity, this.isBuySide)
    }
}
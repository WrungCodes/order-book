import { IOrderCore } from "../interface/OrderInterfaces";

export class CancelOrder implements IOrderCore {
    private readonly orderCore: IOrderCore;

    orderId: string;
    userId: string;
    securityId: string;
    
    constructor( orderCore: IOrderCore, ){
        this.orderCore = orderCore;
        this.orderId = orderCore.orderId;
        this.userId = orderCore.userId;
        this.securityId = orderCore.securityId;
    }
}
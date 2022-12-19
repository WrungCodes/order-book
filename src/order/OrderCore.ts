import { IOrderCore } from "../interface/OrderInterfaces";

export class OrderCore implements IOrderCore {
    public orderId: string;
    public userId: string;
    public securityId: string;

    constructor( orderId: string, userId: string, securityId: string){
        this.orderId = orderId;
        this.userId = userId;
        this.securityId = securityId;
    }
}
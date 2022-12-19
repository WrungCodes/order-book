export interface IOrderCore {
    readonly orderId: string;
    readonly userId: string;
    readonly securityId: string;
}

export enum RejectReason {
    Unknown,
    OrderNotFound,
    InstrumentNotFound,
    AttemptingToModifyWrongSide
}
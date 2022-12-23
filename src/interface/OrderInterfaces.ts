export interface IOrderCore {
    readonly orderId: string;
    readonly userId: string;
    readonly securityId: string;
}

export enum Side {
    Unknown,
    Bid,
    Ask,
}

export enum RejectReason {
    Unknown,
    OrderNotFound,
    InstrumentNotFound,
    AttemptingToModifyWrongSide
}
export interface OrderRecord {
    orderId: string;
    qauntity: string;
    price: string;
    isBuySide: boolean;
    userId: string;
    securityId: string;
    queuePosition: number;
}

export interface OrderMatchingAlgo {
    match() : MatchResults;
}

export interface MatchResults {

}

export interface IOrderRequest {
    quantity: number
    price?: number
    direction: OrderDirection
    accountId: string
    orderType: OrderType
    orderId?: string
    instrumentId: string
    timeInForce?: TimeInForceType
    priceType: PriceType
}

export interface IOrderResponse {
    orderId: string
    executionReportStatus: ExecutionReportStatus
    lotsRequested: number
    lotsExecuted: number
    initialOrderPrice: number
    executedOrderPrice: number
    totalOrderAmount: number
    initialCommission: number
    executedCommission: number
    aciValue: number
    figi: string
    direction: OrderDirection
    initialSecurityPrice: number
    orderType: OrderType
    message?: string
    initialOrderPricePt?: number
    instrumentUid: string
}

export enum OrderDirection {
    Unspecified = 0,
    Buy = 1,
    Sell = 2,
}

export enum OrderType {
    Unspecified = 0,
    Limit = 1,
    Market = 2,
    Bestprice = 3,
}

export enum TimeInForceType {
    TimeInForceUnspecified = 0,
    TimeInForceDay = 1,
    TimeInForceFillAndKill = 2,
    TimeInForceFillOrKill = 3,
}

export enum PriceType {
    Unspecified = 0,
    Point = 1,
    Currency = 2,
}

export enum ExecutionReportStatus {
    ExecutionReportStatusUnspecified = 0,
    ExecutionReportStatusFill = 1,
    ExecutionReportStatusRejected = 2,
    ExecutionReportStatusCancelled = 3,
    ExecutionReportStatusNew = 4,
    ExecutionReportStatusPartiallyfill = 5,
}

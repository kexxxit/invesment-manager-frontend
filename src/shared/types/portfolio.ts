export interface IPosition {
    isin: string
    name: string
    uid: string
    price: number
    logoName: string
    quantity: number
    expectedYield: number
}

export interface IPortfolio {
    totalAmountBonds: number
    positions: IPosition[]
    accountId: string
}

export interface IStrategyListItem {
    id: string;
    strategy: Strategies;
    investedAmount: number;
    accountId: string;
    accountName: string;
    isEnabled: boolean;
}

export interface IStrategy {
    id: string;
    strategy: Strategies;
    isFullAmount: boolean;
    amount: number;
    desiredPercentage: number;
    bondRating: BondRiskLevel;
    startDate: Date;
    endDate: Date;
    investedAmount: number;
    profitAmount: number;
    isCooseWithAHigherRating: boolean;
    accountId: string;
    isEnabled: boolean;
    totalAmountBonds: number;
    totalAmountCurrencies: number;
    expectedYield: number;
}

export enum Strategies {
    LADDER = 1,
    BARRBEL = 2
}

export enum BondRiskLevel {
    UNSPECIFIED = 0,
    LOW = 1,
    MIDDLE = 2,
    HIGH = 3
}
export enum AccessLevel {
    ACCOUNT_ACCESS_LEVEL_UNSPECIFIED = 0,
    ACCOUNT_ACCESS_LEVEL_FULL_ACCESS = 1,
    ACCOUNT_ACCESS_LEVEL_READ_ONLY = 2,
    ACCOUNT_ACCESS_LEVEL_NO_ACCESS = 3,
}

export enum AccountStatus {
    UNSPECIFIED = 0,
    NEW = 1,
    OPEN = 2,
    CLOSED = 3,
}

export interface IAccount {
    id: string
    type: number
    name: string
    status: AccountStatus
    accessLevel: AccessLevel
}

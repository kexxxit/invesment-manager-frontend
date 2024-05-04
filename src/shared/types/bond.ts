export interface IBond {
    /** International Securities Identification Number  */
    readonly isin: string
    /** Currency */
    readonly currency: string
    /** Name of the bond */
    readonly name: string
    /** Coupon quantity per year */
    readonly couponQuantityPerYear: number
    /** Maturity date of the bond */
    readonly maturityDate: string
    /** Nominal of the bond */
    readonly initialNominal: number
    /** Aci value of the bond */
    readonly aciValue: number
    // readonly buyAvailableFlag: boolean
    // readonly sellAvailableFlag: boolean
    // readonly apiTradeAvailableFlag: boolean
    /** Bond id  */
    readonly uid: string
    /** Current price of the bond */
    readonly price: number
    /** Yield per year (%) */
    readonly percentPerYear: number 
    /** Yield to maturity per year (%) */  
    readonly yieldToMaturity: number
    /** Logo name */ 
    readonly logoName: string
    /** Financial sector of the bond */ 
    readonly sector: string
    /** Bond risk level */ 
    readonly riskLevel: number
}
import dayjs from 'dayjs'
import { IBond } from '../../types'

interface IYieldByPeriod {
    /** Number of months */
    readonly mounthsNumber: number
    /** Yield by the period  */
    readonly yield: string
}

export interface IYieldByPeriods {
    readonly firstPeriod: IYieldByPeriod
    readonly secondPeriod: IYieldByPeriod
    readonly thirdPeriod: IYieldByPeriod
}

export const calcYieldByPeriods = (bond: IBond): IYieldByPeriods => {
    const today = dayjs()
    const maturityDate = dayjs(bond.maturityDate)
    const daysToMaturity = maturityDate.diff(today, 'day')
    const daysPerPeriod = Math.ceil(daysToMaturity / 3)

    console.log(daysPerPeriod)

    let currentDate: dayjs.Dayjs = today
    let currentYield = 0

    const yieldPeriods: IYieldByPeriod[] = []

    for (let i = 0; i < 3; i++) {
        const nextDate = currentDate.add(daysPerPeriod, 'day')
        const daysInPeriod = nextDate.diff(currentDate, 'day')
        const periodYield =
            (bond.percentPerYear / 100) *
            (daysInPeriod / 365) *
            bond.initialNominal
        currentYield += periodYield

        console.log(nextDate.diff(currentDate, 'month'))

        yieldPeriods.push({
            mounthsNumber: nextDate.diff(today, 'month'),
            yield: currentYield.toFixed(2),
        })
        console.log(currentDate)
        currentDate = nextDate
    }

    return {
        firstPeriod: yieldPeriods[0],
        secondPeriod: yieldPeriods[1],
        thirdPeriod: yieldPeriods[2],
    }
}

import { BondRiskLevel } from '../../types'

export const getRatingTitle = (bondRiskLevel: BondRiskLevel): string => {
    switch (bondRiskLevel) {
        case BondRiskLevel.HIGH:
            return 'Высокий'
        case BondRiskLevel.MIDDLE:
            return 'Средний'
        case BondRiskLevel.LOW:
            return 'Низкий'
        default:
            return ''
    }
}

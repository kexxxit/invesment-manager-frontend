export function getMonthsDifference(date1: Date, date2: Date): number {
    const yearsDifference = date2.getFullYear() - date1.getFullYear()
    const monthsDifference =
        date2.getMonth() - date1.getMonth() + yearsDifference * 12

    return Math.abs(monthsDifference)
}

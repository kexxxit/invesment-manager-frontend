export const convertDateFormat = (isoDate: string): string => {
    const date = new Date(isoDate)
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }
    const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date)
    return formattedDate
}

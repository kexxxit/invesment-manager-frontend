const LOGO_BASE_URL = 'https://invest-brands.cdn-tinkoff.ru/'
const LOGO_EXTENSION = '.png'

export enum LogoSize {
    Small = 'x160',
    Medium = 'x320',
    Large = 'x640',
}

export const createLogoUrl = (logoName: string, logoSize: LogoSize) => LOGO_BASE_URL + logoName.replace('.png', '') + logoSize + LOGO_EXTENSION

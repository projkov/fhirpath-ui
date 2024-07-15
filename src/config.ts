import { config as configProd } from './config.prod'
import { config as configDev } from './config.dev'

export const config = process.env.NODE_ENV === 'production' ? configProd : configDev

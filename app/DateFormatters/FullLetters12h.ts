import zeroPad from '../utils'
import { gettext } from 'i18n'
import { TimeFormatterInterface } from './TimeFormatterInterface'
import { formatNumber } from '../i18n'

const LOCALE_FR = 'fr-fr'
const LOCALE_IT = 'it-it'

export class FullLetters12h implements TimeFormatterInterface {
  protected pm: boolean
  protected date: Date
  protected locale: string

  constructor(date: Date, locale: string) {
    this.date = date
    this.pm = date.getHours() >= 12
    this.locale = locale
  }

  formatHours(): string {
    return formatNumber(this.date.getHours() % 12 || 12, this.locale)
  }

  formatMinutes(): string {
    if (this.date.getMinutes() === 0) {
      return ' '
    }
    return formatNumber(this.date.getMinutes(), this.locale)
  }

  formatAmPm(): string {
    if (this.pm) {
      return 'pm'
    }
    return 'am'
  }
}

import { gettext } from 'i18n'
import { TimeFormatterInterface } from './TimeFormatterInterface'
import { formatNumber } from '../i18n'

export class FullLetters24h implements TimeFormatterInterface {
  protected date: Date
  protected locale: string

  constructor(date: Date, locale: string) {
    this.date = date
    this.locale = locale
  }

  formatHours(): string {
    return formatNumber(this.date.getHours(), this.locale) || gettext('midnight')
  }

  formatMinutes(): string {
    if (this.date.getMinutes() === 0) {
      return ' '
    }
    return `${formatNumber(this.date.getMinutes(), this.locale)}.`
  }

  formatAmPm(): string {
    return ''
  }
}

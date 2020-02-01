import { FullLetters12h } from './FullLetters12h'
import { gettext } from 'i18n'
import { DateFormatterInterface } from './DateFormatterInterface'

export class FullLetters24h extends FullLetters12h implements DateFormatterInterface {
  formatHours(): string {
    return this.formatNumber(this.date.getHours()) || gettext('midnight')
  }

  formatMinutes(): string {
    if (this.date.getMinutes() === 0) {
      return ' '
    }
    return super.formatMinutes() + '.'
  }

  formatAmPm(): string {
    return ''
  }
}

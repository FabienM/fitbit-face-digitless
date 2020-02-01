import { FullLetters12h } from './FullLetters12h'
import { midnightTable } from '../time'

export class DateTimeInWords24h extends FullLetters12h {
  formatHours(): string {
    return this.formatNumber(this.date.getHours()) || midnightTable[this.language]
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

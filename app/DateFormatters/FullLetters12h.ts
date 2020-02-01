import zeroPad from '../utils'
import { gettext } from 'i18n'
import { DateFormatterInterface } from './DateFormatterInterface'

const LOCALE_FR = 'fr-fr'
const LOCALE_IT = 'it-it'

export class FullLetters12h implements DateFormatterInterface {
  protected pm: boolean
  protected date: Date
  protected language: string

  constructor(date: Date, language: string) {
    this.date = date
    this.pm = date.getHours() >= 12
    this.language = language
  }

  protected formatNumber(n: number): string {
    const units = n % 10
    const tens = Math.floor(n / 10)
    const unitsTrans = gettext(`units_${units}`)
    const teensTrans = gettext(`teens_${units}`)
    const tensTrans = gettext(`tens_${tens}`)

    if (units === 0) {
      return tensTrans
    }
    switch (tens) {
      case 0:
        return unitsTrans
      case 1:
        return teensTrans
    }
    if (this.language === LOCALE_FR && units === 1) {
      return `${tensTrans} et ${unitsTrans}`
    }
    if (this.language === LOCALE_IT) {
      if (units === 3) {
        return `${tensTrans}tré`
      }
      if (units === 1 || units === 8) {
        return `${tensTrans.slice(0, -1)}${unitsTrans}`
      }
      return `${tensTrans}${unitsTrans}`
    }
    return `${tensTrans} ${unitsTrans}`
  }

  formatHours(): string {
    return this.formatNumber(this.date.getHours() % 12 || 12)
  }

  formatMinutes(): string {
    if (this.date.getMinutes() === 0) {
      return ' '
    }
    return this.formatNumber(this.date.getMinutes())
  }

  formatAmPm(): string {
    if (this.pm) {
      return 'pm'
    }
    return 'am'
  }

  formatWeekday(): string {
    return gettext(`weekday_${this.date.getDay()}`)
  }

  formatDate(): string {
    switch (this.language) {
      case 'fr':
      case 'it':
        return `${zeroPad(this.date.getDate())}/${zeroPad(this.date.getMonth() + 1)}`
    }
    return `${this.date.getMonth() + 1}.${this.date.getDate()}`
  }
}

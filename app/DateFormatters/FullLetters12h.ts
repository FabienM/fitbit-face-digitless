import zeroPad from '../utils'
import { onesTable, teensTable, tensTable, weekdaysTable } from '../i18n'

export class FullLetters12h {
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

    if (units === 0) {
      return tensTable[this.language][tens]
    }
    switch (tens) {
      case 0:
        return onesTable[this.language][units]
      case 1:
        return teensTable[this.language][units]
    }
    if (this.language === 'fr' && units === 1) {
      return `${tensTable[this.language][tens]} et ${onesTable[this.language][units]}`
    }
    if (this.language === 'it') {
      if (units === 3) {
        return `${tensTable[this.language][tens]}tré`
      }
      if (units === 1 || units === 8) {
        return `${tensTable[this.language][tens].slice(0, -1)}${onesTable[this.language][units]}`
      }
      return `${tensTable[this.language][tens]}${onesTable[this.language][units]}`
    }
    return `${tensTable[this.language][tens]} ${onesTable[this.language][units]}`
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
    return weekdaysTable[this.language][this.date.getDay()]
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

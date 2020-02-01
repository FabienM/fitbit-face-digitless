import { FullLetters12h } from './DateFormatters/FullLetters12h'
import { DateTimeInWords24h } from './DateFormatters/FullLetters24h'
import { DateFormatterInterface } from './DateFormatters/DateFormatterInterface'

export const onesTable: { [k: string]: string[] } = {
  en: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
  fr: ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'],
  it: ['', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove'],
}
export const teensTable: { [k: string]: string[] } = {
  en: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
  fr: ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'],
  it: ['dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'],
}
export const tensTable: { [k: string]: string[] } = {
  en: ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty'],
  fr: ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante'],
  it: ['', 'dieci', 'venti', 'trenta', 'quaranta', 'cinquanta'],
}
export const weekdaysTable: { [k: string]: string[] } = {
  en: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  fr: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
  it: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
}
export const midnightTable: { [k: string]: string } = {
  en: 'midnight',
  fr: 'minuit',
  it: 'mezzanotte',
}
export const supportedLanguages: { [k: string]: boolean } = {
  en: true,
  fr: true,
  it: true,
}
export const defaultLanguage = 'en'

/**
 * @param is12h
 * @param date
 * @param locale
 */
export function getDateInWordsInstance(is12h: boolean, date: Date, locale: string): DateFormatterInterface {
  let language = locale.split('-')[0]

  if (!supportedLanguages[language]) {
    language = defaultLanguage
  }
  if (is12h) {
    return new FullLetters12h(date, language)
  }
  return new DateTimeInWords24h(date, language)
}

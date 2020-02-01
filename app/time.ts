import { FullLetters12h } from './DateFormatters/FullLetters12h'
import { DateTimeInWords24h } from './DateFormatters/FullLetters24h'
import { DateFormatterInterface } from './DateFormatters/DateFormatterInterface'

/**
 * @param is12h
 * @param date
 * @param locale
 */
export function getDateFormatter(is12h: boolean, date: Date, locale: string): DateFormatterInterface {
  let language = locale.split('-')[0]

  if (!supportedLanguages[language]) {
    language = defaultLanguage
  }
  if (is12h) {
    return new FullLetters12h(date, language)
  }
  return new DateTimeInWords24h(date, language)
}

export const supportedLanguages: { [k: string]: boolean } = {
  en: true,
  fr: true,
  it: true,
}
export const defaultLanguage = 'en'

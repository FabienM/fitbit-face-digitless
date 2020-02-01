import { FullLetters12h } from './DateFormatters/FullLetters12h'
import { FullLetters24h } from './DateFormatters/FullLetters24h'
import { TimeFormatterInterface } from './DateFormatters/TimeFormatterInterface'

/**
 * @param is12h
 * @param date
 * @param locale
 */
export function getDateFormatter(is12h: boolean, date: Date, locale: string): TimeFormatterInterface {
  if (is12h) {
    return new FullLetters12h(date, locale)
  }
  return new FullLetters24h(date, locale)
}

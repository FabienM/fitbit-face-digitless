import { gettext } from 'i18n'
import zeroPad from './utils'

export const LOCALE_FR = 'fr-fr'
export const LOCALE_EN = 'en-us'
export const LOCALE_IT = 'it-it'
export const LOCALE_DE = 'de-de'

/**
 * @param date
 * @param locale
 */
export function formatDate(date: Date, locale: string): string {
  if (locale === LOCALE_EN) {
    return `${date.getMonth() + 1}.${date.getDate()}`
  }
  return `${zeroPad(date.getDate())}/${zeroPad(date.getMonth() + 1)}`
}

/**
 * @param n
 * @param locale
 */
export function formatNumber(n: number, locale: string) {
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

  switch (locale) {
    case LOCALE_FR:
      return formatFR(unitsTrans, tensTrans)
    case LOCALE_IT:
      return formatIT(unitsTrans, tensTrans)
    case LOCALE_DE:
      return formatDE(unitsTrans, tensTrans)
  }

  return `${tensTrans} ${unitsTrans}`
}

/**
 * @param unitsTrans
 * @param tensTrans
 */
function formatFR(unitsTrans: string, tensTrans: string): string {
  if (unitsTrans === 'un') {
    return `${tensTrans} et ${unitsTrans}`
  }
  return `${tensTrans}-${unitsTrans}`
}

/**
 * @param unitsTrans
 * @param tensTrans
 */
function formatDE(unitsTrans: string, tensTrans: string): string {
  if (unitsTrans === 'eins') {
    return `einund${tensTrans}`
  }
  return `${unitsTrans}und${tensTrans}`
}

/**
 * @param unitsTrans
 * @param tensTrans
 */
function formatIT(unitsTrans: string, tensTrans: string): string {
  if (unitsTrans === 'tre') {
    return `${tensTrans}tré`
  }
  if (unitsTrans === 'uno' || unitsTrans === 'otto') {
    return `${tensTrans.slice(0, -1)}${unitsTrans}`
  }
  return `${tensTrans}${unitsTrans}`
}

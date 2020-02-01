/**
 * @param i
 */
export default function zeroPad(i: number): string {
  if (i < 10) {
    return `0${i}`
  }
  return `${i}`
}

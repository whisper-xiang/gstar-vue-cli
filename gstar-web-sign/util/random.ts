// dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
function dec2hex(dec: number): string {
  return dec.toString(16).padStart(2, '0')
}

// generateRandom :: Integer -> String
export function generateRandom(len: number = 6): string {
  const arr: Uint8Array = new Uint8Array(len / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

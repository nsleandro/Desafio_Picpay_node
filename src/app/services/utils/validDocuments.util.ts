
export function testaCPF(strCPF: string) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

export const regexCNPJ = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/

export function validCNPJ(value: string | number | number[] = '') {
  if (!value) return false

  const isString = typeof value === 'string'
  const validTypes = isString || Number.isInteger(value) || Array.isArray(value)

  if (!validTypes) return false

  if (isString) {
    const digitsOnly = /^\d{14}$/.test(value)
    const validFormat = regexCNPJ.test(value)
    const isValid = digitsOnly || validFormat

    if (!isValid) return false
  }

  const numbers = matchNumbers(value)

  if (numbers.length !== 14) return false

  const items = [...new Set(numbers)]
  if (items.length === 1) return false

  const digits = numbers.slice(12)

  const digit0 = validCalc(12, numbers)
  if (digit0 !== digits[0]) return false

  const digit1 = validCalc(13, numbers)
  return digit1 === digits[1]
}

export function formatCNPJ(value: string | number | number[] = '') {
  const valid = validCNPJ(value)

  if (!valid) return ''

  const numbers = matchNumbers(value)
  const text = numbers.join('')

  const format = text.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5',
  )

  return format
}

function validCalc(x: number, numbers: number[]) {
  const slice = numbers.slice(0, x)
  let factor = x - 7
  let sum = 0

  for (let i = x; i >= 1; i--) {
    const n = slice[x - i]
    sum += n * factor--
    if (factor < 2) factor = 9
  }

  const result = 11 - (sum % 11)

  return result > 9 ? 0 : result
}

function matchNumbers(value: string | number | number[] = '') {
  const match = value.toString().match(/\d/g)
  return Array.isArray(match) ? match.map(Number) : []
}
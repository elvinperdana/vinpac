export function thousandFormatter(num) {
  const number = parseInt(num)

  return isNaN(number) ? 'INVALID NUMBER' : number.toLocaleString()
}

export function thousandSeparator(number) {
  const numString = String(number).replace(/[^\d.]|(?<=\..*)\./g, '')
  const separatedNumber = numString.split('.')
  const integer = Number(separatedNumber[0]).toLocaleString()

  if (separatedNumber.length === 2) {
    number = `${integer}.${separatedNumber[1]}`
  } else {
    number = integer
  }

  return number
}

export function formatDate(value, formatting = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}) {
  if (!value)
    return value

  return new Intl.DateTimeFormat('id-ID', formatting).format(new Date(value))
}

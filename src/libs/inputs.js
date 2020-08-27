export function sanitizeInput (value) {
  return value
    .replace(/\s{2,}/gim, ' ')
    .trim()
    .split(' ')
    .reduce((accumulator, value) => {
      const formattedValue = value.substr(0, 1).toUpperCase() + value.substr(1);
      if (accumulator) return `${accumulator} ${formattedValue}`;
      return formattedValue;
    }, '');
}

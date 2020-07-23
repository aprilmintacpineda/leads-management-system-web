/** @format */

const validationRules = {
  email (value) {
    if (
      value.length > 320 ||
      // eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
    )
      return 'Invalid email.';

    return '';
  },
  required (value) {
    if (!value) return 'Required.';
    return '';
  }
};

export default (value, rules) => {
  for (let a = 0, maxA = rules.length; a < maxA; a++) {
    const rule = rules[a];
    const error = validationRules[rule](value);
    if (error) return error;
  }
};

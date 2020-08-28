import { store } from 'fluxible-js';

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
    if (!value || (value.constructor === Array && !value.length)) return 'Required.';

    return '';
  },
  maxLength (value, max) {
    if (value.length > max) return `Should be less than ${max} characters.`;
    return '';
  },
  len (value, len) {
    if (value.length !== Number(len)) return `Please select only ${len} item(s).`;
    return '';
  },
  options (value, ...options) {
    if (value.constructor === Array) {
      if (value.find(val => !options.includes(val)))
        return 'Please select from the options.';
    } else if (!options.includes(value)) {
      return 'Please select from the options.';
    }

    return '';
  },
  leadStatus (value) {
    if (!store.leadStatuses.data.find(leadStatus => leadStatus.id === value))
      return 'Please select from the options';

    return '';
  },
  matches (value, payload, fieldName) {
    if (value !== payload) return `${fieldName} must match.`;
    return '';
  }
};

export default (value, rules) => {
  if (!value && !rules.includes('required')) return;

  for (let a = 0, maxA = rules.length; a < maxA; a++) {
    let rule = rules[a];
    let payload = [];

    if (rule.includes(':')) {
      const [_rule, _payload] = rule.split(':');
      rule = _rule;
      payload = _payload.split(',');
    }

    const error = validationRules[rule](value, ...payload);
    if (error) return error;
  }
};

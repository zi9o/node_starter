const {BASE_MESSAGES} = require('./fr_FR');

const MESSAGES = {
  MISSING: {
    "object.missing": `${BASE_MESSAGES.object.missing}`,
  },
  ORDER: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    "number.base": `${BASE_MESSAGES.number.base}`,
    "number.min": `${BASE_MESSAGES.number.min}`,
  },
  APPLICATIONS: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    "array.base": `${BASE_MESSAGES.any.required}`,
    "any.only": `${BASE_MESSAGES.any.allowOnly}`,
    "array.min": `${BASE_MESSAGES.array.min}`,
    "string.pattern.base": `${BASE_MESSAGES.string.regex.base}`,
    "array.includesRequiredUnknowns": `${BASE_MESSAGES.array.includesRequiredUnknowns}`,
  },
  ARRAY: {
    "array.base": `${BASE_MESSAGES.array.base}`,
    "array.min": `${BASE_MESSAGES.array.min}`,
    "string.pattern.base": `${BASE_MESSAGES.string.regex.base}`,
    "number.greater": `${BASE_MESSAGES.number.greater}`,
  },
  AFTER_REBOOT: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    "boolean.base": `${BASE_MESSAGES.boolean.base}`,
  },
  FILE_NAME: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    'string.base': `${BASE_MESSAGES.string.base}`,
    "string.max": `${BASE_MESSAGES.string.max}`,
  },
  IP: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    "string.ip": `${BASE_MESSAGES.string.ip}`,
    "string.ipVersion": `${BASE_MESSAGES.string.ipVersion}`,
  },
  PASSWORD: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    'string.base': `${BASE_MESSAGES.string.base}`,
    "string.min": `${BASE_MESSAGES.string.min}`,
    "string.max": `${BASE_MESSAGES.string.max}`,
  },
  PORT: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    'number.base': `${BASE_MESSAGES.number.base}`,
    'number.greater': `${BASE_MESSAGES.number.greater}`,
    'number.less': `${BASE_MESSAGES.number.less}`,
    'number.port': `${BASE_MESSAGES.number.port}`,
    'number.max': `${BASE_MESSAGES.number.max}`,
    'number.min': `${BASE_MESSAGES.number.min}`,
    "any.empty": `${BASE_MESSAGES.any.empty}`,
    "any.invalid": `${BASE_MESSAGES.any.invalid}`,
  },
  SSL_PROFILE: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    "string.min": `${BASE_MESSAGES.string.min}`,
    "string.max": `${BASE_MESSAGES.string.max}`,
    "any.empty": `${BASE_MESSAGES.any.empty}`,
    "any.only": `${BASE_MESSAGES.any.allowOnly}`,
  },
  NETWORK_SPEED: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    "any.only": `${BASE_MESSAGES.any.allowOnly}`,
    'string.base': `${BASE_MESSAGES.string.base}`,
  },
  CONTACT_LESS: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    "any.only": `${BASE_MESSAGES.any.allowOnly}`,
  },
  PINPAD: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    "any.only": `${BASE_MESSAGES.any.allowOnly}`,
  },
  TEXT: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    "any.only": `${BASE_MESSAGES.any.allowOnly}`,
    "any.invalid": `${BASE_MESSAGES.any.invalid}`,
    'string.empty': `${BASE_MESSAGES.any.empty}`,
    'string.base': `${BASE_MESSAGES.string.base}`,
    "string.max": `${BASE_MESSAGES.string.max}`,
    "string.min": `${BASE_MESSAGES.string.min}`,
    "string.length": `${BASE_MESSAGES.string.length}`,
    "string.pattern.base": `${BASE_MESSAGES.string.regex.base}`,
    "string.email": `${BASE_MESSAGES.string.email}`,
    "password.format": `${BASE_MESSAGES.string.password}`,
  },
  NUMBER: {
    "string.pattern.base": `{{#label}} avec la valeur '{{#value}}' ne correspond pas à des chiffres`,
    "number.base": `${BASE_MESSAGES.number.base}`,
    'number.max': `${BASE_MESSAGES.number.max}`,
    'number.min': `${BASE_MESSAGES.number.min}`,
  },
  VALID_ENUM: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    "any.only": `${BASE_MESSAGES.any.allowOnly}`,
    "string.base": `${BASE_MESSAGES.string.base}`,
  },
  VALID_BOOLEAN: {
    "any.required": `${BASE_MESSAGES.any.required}`,
    "any.only": `${BASE_MESSAGES.any.allowOnly}`,
    "boolean.base": `${BASE_MESSAGES.boolean.base}`,
  },
  OBJECT: {
    "object.unknown": `${BASE_MESSAGES.object.allowUnknown}`,
    "any.unknown": `${BASE_MESSAGES.object.allowUnknown}`,
    "object.with": `${BASE_MESSAGES.object.with}`,
    "object.base": `${BASE_MESSAGES.object.base}`,
  },
  BASE64: {
    "string.base64": `${BASE_MESSAGES.string.base64}`,
  },
  DATA_URI: {
    "string.dataUri": `${BASE_MESSAGES.string.uri}`,
  },
};

module.exports = {MESSAGES};

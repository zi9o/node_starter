const {MESSAGES} = require('./_messages');
const Joi = require('@hapi/joi');

const playerCreateValidator = Joi.object({
  name: Joi.string().required().min(3).messages(MESSAGES.TEXT),
  score: Joi.number().empty(['', null]).optional().messages(MESSAGES.NUMBER)
});

module.exports = {playerCreateValidator: playerCreateValidator};

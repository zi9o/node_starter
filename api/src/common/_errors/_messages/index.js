// @flow
import type {IErrorMessages} from '../../_interfaces/error-messages.interface';

const {config} = require('../../../../config');
const {FR_MESSAGES} = require('../../_errors/_messages/fr');

module.exports = {
  get MESSAGES(): IErrorMessages {
    return config.app.language === 'fr' ? FR_MESSAGES : FR_MESSAGES;
  },
};

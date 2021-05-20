// @flow

import type {IErrorMessages} from '../../_interfaces/error-messages.interface';

const FR_MESSAGES: IErrorMessages = {
  USERS: {
    AUTH: {
      UNAUTHORIZED: `Accès non autorisé`,
      NOT_FOUND: `L'utilisateur n'a pas été trouvé`,
      LOGIN_FAILED: `Username et/ou mot de passe incorrecte`,
    },
  },
};

module.exports = {FR_MESSAGES: FR_MESSAGES};

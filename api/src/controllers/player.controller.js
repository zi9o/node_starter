// @flow
import type {PlayerCreation, PlayerDetail} from '../common/_interfaces/player/player-detail.interface';
import type {MiddlewareUserDetail} from '../common/_interfaces/user/user-detail.interface';

const {AppError, CommonErrors, MESSAGES} = require('../common/_errors');
const {getErrorMessage} = require('../controllers/errors.controller');
const {PlayerModel} = require('../models/player.model');

// -----------------------------------------------------------------------------------------------------
// @ Helpers
// -----------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------
// @ Methods
// -----------------------------------------------------------------------------------------------------

module.exports = {

  addPlayer: (user: MiddlewareUserDetail, data: any): Promise<PlayerCreation> => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await PlayerModel.add(user.userId, data.name, data.score));
      } catch (e) {
        reject({message: getErrorMessage(e)});
      }
    });
  },
  deletePlayer: (id: number): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        await PlayerModel.delete(id);
        resolve();
      } catch (e) {
        reject({message: getErrorMessage(e)});
      }
    });
  },
};

// @flow

/**
 * Module dependencies
 */
const bcrypt = require('bcrypt');
const {config} = require('../../config');
const jwt = require('jsonwebtoken');

const AuthService = {
  generateToken: (payload: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        resolve(jwt.sign(payload, config.auth.privateKey, {
          expiresIn: config.auth.tokenExpirationPeriod,
          noTimestamp: true,
        }));
      } catch (e) {
        reject(e);
      }
    });
  },
  generatePasswordHash: (password: string, options: {removeSlash: boolean} = {removeSlash: false}): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const salt = bcrypt.genSaltSync(config.auth.SALT_WORK_FACTOR);
        let hash = await bcrypt.hash(password, salt);
        resolve(options.removeSlash ? hash.replace('/', '') : hash);
      } catch (e) {
        reject(e);
      }
    });
  },
  comparePasswordHash: (password: string, hash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        if (password && hash) {
          bcrypt.compare(password, hash, function(err, isMatch) {
            if (err) return reject(err);
            return resolve(isMatch);
          });
        } else {
          resolve(false);
        }
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = {AuthService: AuthService};

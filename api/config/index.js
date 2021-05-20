/**
 * This is a startup point to set up environment variables
 * https://github.com/rolodato/dotenv-safe
 *
 */

const dotenv = require('dotenv-safe');
const pjson = require('../package.json');
dotenv.config({
  allowEmptyValues: true,
  example: `.env.example`,
});

module.exports.config = {
  version: pjson.version,
  name: pjson.name,
  description: pjson.description,
  isProduction: process.env.NODE_ENV === 'production',
  apiUrl: process.env.API_URL,
  clientHost: process.env.CLIENT_HOST,
  own: () => {
    return config;
  },
  logger: {
    level: process.env.API_LOGGER_LEVEL,
  },
  app: {
    language: process.env.LANGUAGE || 'fr',
  },
  auth: {
    privateKey: process.env.PRIVATE_KEY,
    algorithm: 'RS256',
    SALT_WORK_FACTOR: 10,
    tokenExpirationPeriod: process.env.TOKEN_EXPIRATION_TIME,
  },
  database: {
    connectionUri: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}`
      + `@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT, 10),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    name: process.env.PGDATABASE
  }
};

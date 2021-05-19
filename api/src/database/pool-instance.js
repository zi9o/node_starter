// @flow
import type {DatabasePoolType} from 'slonik';

const {createQueryLoggingInterceptor} = require('slonik-interceptor-query-logging');
const {createQueryNormalisationInterceptor} = require('slonik-interceptor-query-normalisation');

const {config} = require('../../config');
const {createPool, createTypeParserPreset} = require('slonik');

const defaultConfig = {
  maximumPoolSize: 25,
  typeParsers: [
    ...createTypeParserPreset()
  ],
};

const slavePool = createPool(config.database.connectionUri, defaultConfig);
const PoolInstance: DatabasePoolType = createPool(config.database.connectionUri, {
  ...defaultConfig,
  connectionTimeout: 60000,
  interceptors: [
    {
      beforePoolConnection: (connectionContext, pool) => {
        // If used with pool.query()
        if (connectionContext.query &&
          connectionContext.query.sql.toUpperCase().includes('SELECT')) {
          return slavePool;
        }

        return pool;
      },
    },
    createQueryLoggingInterceptor(),
    createQueryNormalisationInterceptor({
      stripComments: true,
    }),
  ],
});

module.exports = {PoolInstance: PoolInstance};

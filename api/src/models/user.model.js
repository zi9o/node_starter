// @flow
import type {MiddlewareUserDetail} from '../common/_interfaces/user/user-detail.interface';
// import type {DatabasePoolConnectionType, QueryMaybeOneFunctionType} from 'slonik';

const {sql} = require('slonik');
const {PoolInstance} = require('../database/pool-instance');

const User = {
  /**
   * Update connection date and return user details
   * @param id
   * @returns {Promise<MiddlewareUserDetail|null>}
   */
  connectUserById: async (id: number): Promise<MiddlewareUserDetail | null> => {
    return await PoolInstance.connect(async (connection) => {
      const result = await connection.maybeOne(sql`
            update users
            set last_login_date=now()
            where id = (SELECT u.id
                        from users u
                        where u.id = ${id})
            returning id,name;
        `);
      if (result) {
        const res: MiddlewareUserDetail = {
          userId: result.id,
          username: result.name,
        };
        return res;
      }
      return null;
    });
  },
  /**
   * Get user details based on its ID
   * @param id
   * @returns {Promise<MiddlewareUserDetail|null>}
   */
  getUserDetailById: async (id: number): Promise<MiddlewareUserDetail | null> => {
    return await PoolInstance.connect(async (connection) => {
      const result = await connection.maybeOne(sql`
            SELECT id,name
            from users u
            where u.id = ${id};
        `);
      if (result) {
        const res: MiddlewareUserDetail = {
          userId: result.id,
          username: result.name,
        };
        return res;
      }
      return null;
    });
  },
  /**
   * Get the details of a user based on its username
   * @param username
   * @returns {Promise<MiddlewareUserDetail>}
   */
  getUserDetailByName: async (username: string): Promise<MiddlewareUserDetail | null> => {
    return await PoolInstance.connect(async (connection) => {
      const result = await connection.maybeOne(sql`
            SELECT u.id,
                  u.name,
                  u.password hash
            from users u
            where u.username = ${username}
        `);
      if (result) {
        const res: MiddlewareUserDetail = {
          userId: result.id,
          username: result.name,
          hash: result.hash,
        };
        return res;
      }
      return null;
    });
  },
};

module.exports = {UserModel: User};

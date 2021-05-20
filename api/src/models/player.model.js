// @flow
import type {PlayerCreation, PlayerDetail} from '../common/_interfaces/player/player-detail.interface';
import type {DatabaseConnectionType, DatabasePoolConnectionType, QueryMaybeOneFunctionType} from 'slonik';

const {sql} = require('slonik');
const {PoolInstance} = require('../database/pool-instance');

const Player = {
  /**
   * Add a player
   * @param userId
   * @param name
   * @param score
   * @returns {Promise<PlayerCreation>}
   */
  add: async (userId: number, name: string, score: number): Promise<PlayerCreation> => {
    return await PoolInstance.connect(async (connection: DatabaseConnectionType) => {
      const result = await connection.maybeOne(sql`insert into players (name, score, created_by)
                  select ${name},
                         ${score},
                         ${userId}
                  from users u
                  where u.id = ${userId}
                  returning *`);
      if (!result) return null;
      const res: PlayerCreation = result;
      return res;
    });
  },
  /**
   * Get player details based on its ID
   * @param id
   * @returns {Promise<PlayerDetail|null>}
   */
  getPlayerDetailById: async (id: number): Promise<PlayerDetail | null> => {
    return await PoolInstance.connect(async (connection) => {
      const result = await connection.maybeOne(sql`
            SELECT id, name, score
            from players p
            where p.id = ${id};
        `);
      if (result) {
        const res: PlayerDetail = {
          playerId: result.id,
          playerName: result.name,
          score: result.score,
        };
        return res;
      }
      return null;
    });
  },
  /**
   * Get the details of a player based on its name
   * @param name
   * @returns {Promise<PlayerDetail>}
   */
  getPlayerDetailByName: async (name: string): Promise<PlayerDetail | null> => {
    return await PoolInstance.connect(async (connection) => {
      const result = await connection.maybeOne(sql`
            SELECT id, name, score
            from players p
            where p.name = ${name}
        `);
      if (result) {
        const res: PlayerDetail = {
          playerId: result.id,
          playerName: result.name,
          score: result.score,
        };
        return res;
      }
      return null;
    });
  },
  delete: async (id: number): Promise<void> => {
    return await PoolInstance.connect(async (connection: DatabaseConnectionType) => {
      return await connection.query(sql`
              DELETE
              from players p
              where p.id = ${id};
        `);
    });
  },
};

module.exports = {PlayerModel: Player};

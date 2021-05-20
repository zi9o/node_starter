'use strict';

let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('players', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    name: 'string',
    score: 'int',
    created_by: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'player_user_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: {
          created_by: 'id',
        },
      },
    },
    created_on: {
      type: 'timestamp',
      notNull: true,
      defaultValue: `now()`
    },
    updated_on: 'timestamp',
  })
};

exports.down = function(db) {
  return db.dropTable('players');
};

exports._meta = {
  "version": 1
};

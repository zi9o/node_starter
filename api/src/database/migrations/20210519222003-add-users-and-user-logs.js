let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    name: 'string',
    password: 'string',
    email: 'string',
    update_date: 'timestamp',
  }).then(() =>
    db.createTable('user_logs', {
      id: {
        type: 'int',
        primaryKey: true,
        autoIncrement: true,
      },
      level: 'string',
      message: 'string',
      user_id: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'logs_user_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT',
          },
          mapping: {
            user_id: 'id',
          },
        },
      },
      meta: 'json',
      timestamp: 'timestamp',
    })
  );
};

exports.down = function (db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};

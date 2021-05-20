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
  return db.runSql("ALTER TABLE users ADD COLUMN if not exists creation_date TIMESTAMP;")
    .then(() => db.runSql("ALTER TABLE users ADD COLUMN if not exists last_login_date TIMESTAMP;"))
    .then(() => db.runSql("ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);"))
    .then(() => db.runSql("ALTER TABLE users ADD COLUMN if not exists username varchar unique;"));
};

exports.down = function(db) {
  return db.runSql('ALTER TABLE users DROP COLUMN IF EXISTS creation_date;')
    .then(() => db.runSql("ALTER TABLE users DROP COLUMN IF EXISTS last_login_date;"))
    .then(() => db.runSql("ALTER TABLE users DROP COLUMN IF EXISTS username;"));
};

exports._meta = {
  "version": 1
};

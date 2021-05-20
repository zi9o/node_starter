let dbm, type, seed;

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
  // eslint-disable-next-line sql/no-unsafe-query
  return db.runSql(`
insert into users (name, username, email, password)
    values ('admin', 'admin', 'zakariaelfakhry@gmail.com', '$2b$10$1PTLvceC1uGSsyadT2g1segRpfZNG2mKNVduYxvHsHUThXj8bNRfm')
`);
};

exports.down = function (db) {
  return db.runSql("delete from users where email='zakariaelfakhry@gmail.com'");
};

exports._meta = {
  "version": 1,
};

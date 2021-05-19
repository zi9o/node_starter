/**
 * This is a PostgresSQL transport module for winston.
 * https://github.com/winstonjs/winston
 *
 */


const Transport = require('winston-transport');
const {config} = require('./index');
const {Pool} = require('pg');
//
// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
//
module.exports = class YourCustomTransport extends Transport {
  constructor(opts) {
    super(opts);
    //
    // Consume any custom options here. e.g.:
    // - Connection information for databases
    // - Authentication information for APIs (e.g. loggly, papertrail,
    //   logentries, etc.).
    //

    //Create a connection poll
    this.pool = new Pool({
      connectionString: config.database.connectionUri,
    });
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    // Perform the writing to the remote service
    //save this
    const self = this;
    //run it in nextTick
    process.nextTick(function() {

      const pool = self.pool;

      pool.connect((function(err, connection) {

        if (err) {
          return callback(err, null);
        }

        //connected
        //set log object
        const log = [];
        const meta = info.error
          ? JSON.stringify(info.error).substring(0, 512)
          : /info|warn/.test(info.level) ? (info.content ? JSON.stringify(info.content).substring(0, 512) : null) : null;

        log.push(info.level);
        log.push(info.username ? info.message + '_' + info.username : JSON.stringify(info.message).substring(0, 512));
        log.push(info.id || null);
        log.push(meta);
        log.push(new Date());

        //Save the log
        // connection.query('INSERT INTO user_log(level, message, user_id, meta, timestamp) VALUES($1, $2, $3, $4, $5)', log, function(err) {
        //   if (err) {
        //     return callback(err, null);
        //   }
        //
        //   //finished
        //   connection.release();
        //   callback(null, true);
        // });

      }));

    });
  }
};

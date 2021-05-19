module.exports = {
  // Used to limit types of logs to show. Ex: logLevel=20 => PoolConnection
  filterFunction: ({context}) => {
    // Format logging query
    function logMessage(message) {
      if (typeof message == 'object') {
        if (Array.isArray(message)) {
          // using unnest in query
          return `array[${message.map(v => Number.isInteger(v) ? v : `'${v}'`)}]`
        } else {
          return JSON.stringify(message);
        }
      } else if (typeof message === 'string') {
        return `'${message}'`
      } else {
        return message;
      }
    }

    // Show query in full syntax
    if (context.values && context.values.length) {
      let message = context.sql;
      message = message.replace('$1', logMessage(context.values[0]));
      for (let i = 1; i < context.values.length + 1; i++) {
        message = message.replace('$' + (i + 1), logMessage(context.values[i]))
      }
      console.info(`>> \n${message}\n--------------------------`);
    }
    return (context && context.logLevel > 20) || context === 'executing query';
  },
};

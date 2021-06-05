'use strict';

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers');

module.exports = {
  connection: Env.get('DB_CONNECTION', 'sqlite'),
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true
  },
};

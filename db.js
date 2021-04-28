const knex = require('knex')

module.exports = knex({
  client: 'postgres',
  connection: {
    host: 'db',
    user: 'movie',
    password: '!Bear1Tuesday189',
    database: 'movie',
  },
})

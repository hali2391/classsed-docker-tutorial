const db = require('../../db')

;(async () => {
  try {
    await db.schema.dropTableIfExists('movie')
    await db.schema.withSchema('public').createTable('movie', (table) => {
      table.increments('id'),
      table.string('movie_title'),
      table.string('review'),
      table.date('review_date')

    })
    console.log('Created movie table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()

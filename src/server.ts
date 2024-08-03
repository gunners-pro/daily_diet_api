import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/', async () => {
  const test = knex('sqlite_master').select('*')
  return test
})

app.listen({ port: 3333 }).then(() => console.log('HTTP Server Running!'))

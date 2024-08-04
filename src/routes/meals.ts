import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkAuthorization } from '../middlewares/check-authorization'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkAuthorization] }, async (request) => {
    const userId = request.cookies.userId

    const meals = await knex('meals').select('*').where('user_id', userId)

    return { meals }
  })

  app.get('/:id', { preHandler: [checkAuthorization] }, async (request) => {
    const userId = request.cookies.userId
    const idParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = idParamsSchema.parse(request.params)

    const meal = await knex('meals')
      .select('*')
      .where({ user_id: userId, id })
      .first()

    return { meal }
  })

  app.patch(
    '/:id',
    { preHandler: [checkAuthorization] },
    async (request, reply) => {
      const userId = request.cookies.userId
      const idSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = idSchema.parse(request.params)
      const bodySchema = z.object({
        name: z.string(),
        description: z.string(),
        in_diet: z.boolean(),
      })

      const { name, description, in_diet } = bodySchema.parse(request.body)

      await knex('meals').where({ id, user_id: userId }).update({
        name,
        description,
        in_diet,
      })

      return reply.status(200).send()
    },
  )

  app.delete(
    '/:id',
    { preHandler: [checkAuthorization] },
    async (request, reply) => {
      const userId = request.cookies.userId
      const idParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = idParamsSchema.parse(request.params)
      await knex('meals').delete().where({ id, user_id: userId })

      return reply.status(204).send()
    },
  )

  app.post('/', async (request, reply) => {
    let userId = request.cookies.userId
    if (!userId) {
      userId = randomUUID()

      reply.cookie('userId', userId, {
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      })
    }

    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      in_diet: z.boolean(),
    })

    const { name, description, in_diet } = createMealBodySchema.parse(
      request.body,
    )

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      in_diet,
      user_id: userId,
    })
    return reply.status(201).send()
  })

  app.get('/summary', { preHandler: [checkAuthorization] }, async (request) => {
    const userId = request.cookies.userId

    const total = await knex('meals').where('user_id', userId).count().first()
    const dietOn = await knex('meals')
      .where({ user_id: userId, in_diet: true })
      .count()
      .first()
    const dietOff = await knex('meals')
      .where({ user_id: userId, in_diet: false })
      .count()
      .first()

    let tot = 0
    let seq = 0
    await knex('meals')
      .where('user_id', userId)
      .then((rows) => {
        rows.forEach((row) => {
          if (row.in_diet) {
            seq++
            if (tot < seq) tot = seq
          } else seq = 0
        })
      })

    return { total, dietOn, dietOff, sequence: tot }
  })
}

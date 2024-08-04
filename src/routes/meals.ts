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
}

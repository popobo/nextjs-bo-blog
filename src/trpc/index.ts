import { publicProcedure, router } from '@/trpc/trpc'
import { TRPCError } from '@trpc/server'
import { db } from '@/db'

export const appRouter = router({
  test: publicProcedure.query(async () => {
    await db.user.create({
      data: {
        email: String(Math.random()),
        password: String(Math.random()),
      },
    })
    const res = await db.user.findMany()
    return res
  }),
})

export type AppRouter = typeof appRouter

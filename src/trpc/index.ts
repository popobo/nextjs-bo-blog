import { publicProcedure, router } from '@/trpc/trpc'
import { TRPCError } from '@trpc/server'

export const appRouter = router({
  test: publicProcedure.query(() => {
    const randomNumber = Math.random()

    if (randomNumber > 0.1) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Random error',
      })
    } else {
      return String(randomNumber)
    }
  }),
})

export type AppRouter = typeof appRouter

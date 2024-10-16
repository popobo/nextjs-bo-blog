import { publicProcedure, router } from '@/trpc/trpc'

export const appRouter = router({
  test: publicProcedure.query(() => {
    return String(Math.random())
  }),
})

export type AppRouter = typeof appRouter

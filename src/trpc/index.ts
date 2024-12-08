import { publicProcedure, router } from '@/trpc/trpc'
import { TRPCError } from '@trpc/server'
import { db } from '@/db'
import { z } from 'zod'
import { hash } from 'bcryptjs'

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
  emailRegister: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        emailCode: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password, emailCode } = input
      // 验证参数
      if (!email || !password || !emailCode) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: '参数不能为空',
        })
      }

      // 验证邮箱是否已注册
      const user = await db.user.findFirst({
        where: {
          email,
        },
      })

      if (user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: '邮箱已注册',
        })
      }

      // 验证激活码是否存在
      const emailCodeRecord = await db.activateToken.findFirst({
        where: {
          account: email,
        },
      })

      if (!emailCodeRecord) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: '激活码不存在',
        })
      }

      // 验证激活码是否过期
      if (emailCodeRecord.expiredAt.getTime() < Date.now()) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: '激活码已过期',
        })
      }

      // 验证激活码是否正确
      if (emailCodeRecord.code !== emailCode) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: '激活码错误',
        })
      }

      // 创建用户
      const hashedPassword = await hash(password, 10)
      const newUser = await db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      })

      return { id: newUser.id, email }
    }),

  emailActive: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      const { email } = input
      // 创建激活码
      const hashedEmail = await hash(email, 10)
      // 保存激活码 => 不存在email就创建，存在就更新
      await db.activateToken.upsert({
        where: {
          account: email,
        },
        create: {
          account: email,
          code: hashedEmail,
          expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 1),
        },
        update: {
          code: hashedEmail,
          expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 1),
        },
      })
      // 发送邮件
      return { status: 'success' }
    }),
})

export type AppRouter = typeof appRouter

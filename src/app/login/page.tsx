'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要6个字符'),
})

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  type FormData = z.infer<typeof loginSchema>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate: login, isPending } = trpc.login.useMutation({
    onSuccess: () => {
      router.push('/dashboard')
    },
    onError: (error) => {
      toast({
        title: '登录失败',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-3xl font-bold">登录</h1>
        <form
          onSubmit={handleSubmit((data) => login(data))}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="请输入邮箱"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              placeholder="请输入密码"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message?.toString()}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '登录中...' : '登录'}
          </Button>
        </form>
      </div>
    </div>
  )
}

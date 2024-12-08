// src/app/register/EmailRegister.tsx
'use client'

import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import emailValidator from 'email-validator'
import { EmailFormValidator, TEmailFormValidator } from '@/lib/validator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { trpc } from '@/app/_trpc/client'
import { Loader2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

function EmailRegister() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    getValues,
    watch,
  } = useForm<TEmailFormValidator>({
    defaultValues: {},
    resolver: zodResolver(EmailFormValidator),
    mode: 'all',
  })

  const confirmPassword = watch('confirmPassword')
  const password = watch('password')

  // 使用 useEffect 在 password, confirmPassword 变化时进行验证
  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setTimeout(() => {
        setError('confirmPassword', {
          type: 'manual',
          message: '两次输入密码不一致',
        })
      })
    } else {
      clearErrors('confirmPassword')
    }
  }, [password, confirmPassword, setError, clearErrors])
  const { mutate: startEmailRegister, isLoading: emailRegisterLoading } =
    trpc.emailRegister.useMutation({
      onSuccess: (user) => {
        if (user && user.id) {
          // 注册成功
          toast({
            title: '账号注册',
            description: '注册成功',
            variant: 'default',
          })
        }
      },
      onError: (error) => {
        toast({
          title: '账号注册',
          description: error.message,
          variant: 'destructive',
        })
      },
    })

  const handleSubmitEmail = useCallback(
    ({ email, password, confirmPassword, emailCode }: TEmailFormValidator) => {
      if (password !== confirmPassword) {
        setError('confirmPassword', {
          type: 'manual',
          message: '两次输入密码不一致',
        })
        return
      }
      startEmailRegister({ email, password, emailCode })
    },
    [setError, startEmailRegister]
  )

  const { mutate: startActiveEmail, isLoading: emailActiveLoading } =
    trpc.emailActive.useMutation({
      onSuccess: (data) => {
        if (data && data.status === 'success') {
          toast({
            title: '激活邮箱',
            description: '激活邮件已发送，请前往邮箱查看',
            variant: 'default',
          })
        }
      },
      onError: (error) => {
        toast({
          title: '激活邮箱',
          description: error.message,
          variant: 'destructive',
        })
      },
    })
  const handleActiveEmail = useCallback(() => {
    clearErrors('email')
    const email = getValues('email')?.trim()
    if (!email || !emailValidator.validate(email)) {
      setError('email', {
        type: 'manual',
        message: '请输入正确的邮箱，然后激活',
      })
      return
    }
    startActiveEmail({ email })
  }, [clearErrors, getValues, setError, startActiveEmail])
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          邮箱注册后可绑定手机号登录，先点激活更快获取激活码
        </CardDescription>
      </CardHeader>
      <form
        id="emailRegister"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(handleSubmitEmail)()
        }}
      >
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label className="text-zinc-600" htmlFor="email">
              邮箱：
            </Label>
            <div className="flex space-x-2">
              <Input
                {...register('email')}
                onBlur={(e) => {
                  setValue('email', e.target.value)
                }}
                className={cn(errors.email && 'focus-visible:ring-red-500')}
                id="email"
                placeholder={'输入邮箱'}
                autoComplete="username"
                type="email"
              />
              <Button
                onClick={handleActiveEmail}
                className="min-w-max text-zinc-500"
                variant={'outline'}
                type="button"
                disabled={emailActiveLoading}
              >
                {emailActiveLoading && (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                )}
                激活{emailActiveLoading ? '中' : ''}
              </Button>
            </div>

            <div className="text-destructive text-xs mt-1">
              {errors.email ? errors.email.message : null}
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-600" htmlFor="password">
              密码：
            </Label>
            <Input
              {...register('password')}
              className={cn(errors.password && 'focus-visible:ring-red-500')}
              onBlur={(e) => {
                setValue('password', e.target.value)
              }}
              id="password"
              placeholder={'输入登录密码'}
              autoComplete="new-password"
              type="password"
            />
            <div className="text-destructive text-xs mt-1">
              {errors.password ? errors.password.message : null}
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-600" htmlFor="rePassword">
              确认密码：
            </Label>
            <Input
              {...register('confirmPassword')}
              className={cn(
                errors.confirmPassword && 'focus-visible:ring-red-500'
              )}
              onBlur={(e) => {
                setValue('confirmPassword', e.target.value)
              }}
              id="rePassword"
              placeholder={'再次输入登录密码'}
              autoComplete="new-password"
              type="password"
            />
            <div className="text-destructive text-xs mt-1">
              {errors.confirmPassword ? errors.confirmPassword.message : null}
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-600" htmlFor="emailCode">
              激活码：
            </Label>
            <Textarea
              {...register('emailCode')}
              className={cn(errors.emailCode && 'focus-visible:ring-red-500')}
              placeholder={'输入邮箱激活码'}
              onBlur={(e) => {
                setValue('emailCode', e.target.value || '')
              }}
              id="emailCode"
            />
            <div className="text-destructive text-xs mt-1">
              {errors.emailCode ? errors.emailCode.message : null}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            type="submit"
            disabled={emailRegisterLoading}
          >
            {emailRegisterLoading && (
              <Loader2 className="mr-4 h-4 w-4 animate-spin text-white" />
            )}
            注册
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default EmailRegister

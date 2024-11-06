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
import { Label } from '@radix-ui/react-label'
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
}

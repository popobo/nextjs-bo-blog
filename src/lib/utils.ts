import { TRPCClientError } from '@trpc/react-query'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const MAX_QUERY_RETRIES = 3
const SKIPPED_HTTP_CODES = [400, 401, 403, 404]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.PRO_URL) return `${process.env.PRO_URL}${path}`
  return `http://localhost:${process.env.PORT ?? 3000}${path}`
}

export const reactQueryRetry = (failureCount: number, error: unknown) => {
  if (
    error instanceof TRPCClientError &&
    SKIPPED_HTTP_CODES.includes(error.shape?.data?.httpStatus ?? 0)
  ) {
    return failureCount < 1
  }
  return failureCount < MAX_QUERY_RETRIES
}

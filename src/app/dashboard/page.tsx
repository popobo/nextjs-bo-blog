'use client'

import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { reactQueryRetry } from '@/lib/utils'

const DashboardPage = () => {
  //   const { data, isLoading } = trpc.test.useQuery()
  //   const { data, isLoading } = trpc.test.useQuery(undefined, { retry: 0 })
  const { data, isLoading, isFetching } = trpc.test.useQuery(undefined, {
    retry: reactQueryRetry,
  })
  const utils = trpc.useUtils()

  return (
    <div>
      <p>Hello world!</p>
      <div>{data && data.map((item) => <p key={item.id}>{item.email}</p>)}</div>
      <Button onClick={() => utils.test.invalidate()}>
        {isFetching || isLoading ? 'Loading' : 'Click me'}
      </Button>
    </div>
  )
}

export default DashboardPage

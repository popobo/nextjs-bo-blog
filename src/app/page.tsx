import Image from 'next/image'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ArrowRight } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <Link
        className={buttonVariants({
          size: 'lg',
          className: 'mt-5',
        })}
        href="/href"
      >
        Hello world! <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
      <Button className="mt-5">Click me</Button>
    </MaxWidthWrapper>
  )
}

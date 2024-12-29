'use client'

import Link from 'next/link'
import { Button } from './ui/button'

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold">
          My App
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/login">登录</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/register">注册</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

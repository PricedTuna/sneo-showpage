'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function HomePageTitleCleaner() {
  const pathname = usePathname()

  useEffect(() => {
    const article = document.querySelector('.nextra-content > article')
    if (!article) return

    const firstChild = article.firstElementChild as HTMLElement | null
    if (!firstChild) return

    const isHome = pathname === '/'
    firstChild.style.display = isHome ? 'none' : ''
  }, [pathname])

  return null
}

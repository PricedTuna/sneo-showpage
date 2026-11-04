'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const sidebarLinks = '.nextra-sidebar a[href], .nextra-mobile-nav a[href]'

function getDestination(link: HTMLAnchorElement) {
  const url = new URL(link.href)
  if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
    return url.pathname + url.search
  }
}

export function SidebarNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [pending, setPending] = useState(false)

  useEffect(() => {
    let timeout: number | undefined
    let pendingLink: HTMLAnchorElement | undefined

    function prefetch(link: HTMLAnchorElement) {
      const href = getDestination(link)
      if (href) router.prefetch(href)
    }

    function prefetchSidebar() {
      const destinations = new Set(
        Array.from(document.querySelectorAll<HTMLAnchorElement>(sidebarLinks), getDestination)
      )
      for (const href of destinations) {
        if (href) router.prefetch(href)
      }
    }

    function clearPending() {
      window.clearTimeout(timeout)
      pendingLink?.removeAttribute('data-navigation-pending')
      pendingLink = undefined
      setPending(false)
    }

    function handleIntent(event: Event) {
      const link = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>(sidebarLinks)
        : null
      if (link) prefetch(link)
    }

    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>(sidebarLinks)
        : null
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self') || !getDestination(link)) return

      clearPending()
      pendingLink = link
      link.setAttribute('data-navigation-pending', '')
      setPending(true)
      timeout = window.setTimeout(clearPending, 10000)
    }

    const idle = window.requestIdleCallback?.(prefetchSidebar, { timeout: 1200 })
    const fallback = idle === undefined ? window.setTimeout(prefetchSidebar, 250) : undefined

    document.addEventListener('pointerover', handleIntent)
    document.addEventListener('focusin', handleIntent)
    document.addEventListener('click', handleClick, true)

    return () => {
      if (idle !== undefined) window.cancelIdleCallback(idle)
      window.clearTimeout(fallback)
      document.removeEventListener('pointerover', handleIntent)
      document.removeEventListener('focusin', handleIntent)
      document.removeEventListener('click', handleClick, true)
      clearPending()
    }
  }, [pathname, router])

  return pending ? <div className="navigation-progress" role="status" aria-label="Cargando página" /> : null
}

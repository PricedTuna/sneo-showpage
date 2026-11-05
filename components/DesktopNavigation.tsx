'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import { BottomNavbar, BottomNavbarItem, TopNavbar, TopNavbarItem } from 'sneo-brutalism'
import { githubUrl, npmUrl, navigationSections } from './navigationSections'
import { ExternalIcon } from './ExternalIcon'

function NavigationIcon({ icon }: { icon: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={icon} />
    </svg>
  )
}

export function DesktopNavigation({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')

    const update = () => setIsMobile(mediaQuery.matches)
    update()

    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  if (isMobile) {
    return (
      <div className="top-navigation-shell mobile-shell">
        <BottomNavbar aria-label="Navegación principal">
          {navigationSections.map(({ href, label, icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href + '/'))
            return (
              <BottomNavbarItem key={href} href={href} active={active} title={label} aria-label={label}>
                <NavigationIcon icon={icon} />
              </BottomNavbarItem>
            )
          })}
        </BottomNavbar>
        {children}
      </div>
    )
  }

  return (
    <div className="top-navigation-shell">
      <TopNavbar
        aria-label="Navegación principal"
        brand={
          <Link href="/" className="top-navbar-brand" aria-label="Ir a la página principal">
            SNEO
          </Link>
        }
        action={
          <div className="top-navbar-actions">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="top-navbar-action-link" aria-label="GitHub" title="GitHub">
              <ExternalIcon service="github" />
            </a>
            <a href={npmUrl} target="_blank" rel="noreferrer" className="top-navbar-action-link" aria-label="npm" title="npm">
              <ExternalIcon service="npm" />
            </a>
          </div>
        }
      >
        {navigationSections
          .filter(({ href }) => href !== '/')
          .map(({ href, label }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href + '/'))
            return (
              <TopNavbarItem key={href} href={href} active={active}>
                {label}
              </TopNavbarItem>
            )
          })}
      </TopNavbar>
      {children}
    </div>
  )
}

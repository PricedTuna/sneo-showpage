'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
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
  return (
    <div className="top-navigation-shell">
      <div className="mobile-navigation">
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
      </div>
      <div className="desktop-top-navigation">
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
      </div>
      {children}
    </div>
  )
}

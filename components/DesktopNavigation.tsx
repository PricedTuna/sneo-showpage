'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import { githubUrl, npmUrl, navigationSections } from './navigationSections'
import { ExternalIcon } from './ExternalIcon'

export function DesktopNavigation({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem('sneo-sidebar-collapsed') === 'true')
    } catch {
      // Navigation remains usable when browser storage is unavailable.
    }
  }, [])

  function toggle() {
    const next = !collapsed
    setCollapsed(next)
    try {
      localStorage.setItem('sneo-sidebar-collapsed', String(next))
    } catch {
      // The root layout still retains the preference during client navigation.
    }
  }

  return (
    <div className="navigation-shell" data-collapsed={collapsed}>
      <aside className="desktop-navigation" aria-label="Barra lateral">
        <nav id="desktop-sections" aria-label="Secciones">
          <ul>
            {navigationSections.map(({ href, label, icon }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href + '/'))
              return (
                <li key={href}>
                  <Link href={href} aria-current={active ? 'page' : undefined} title={collapsed ? label : undefined}>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={icon} />
                    </svg>
                    <span>{label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <button className="navigation-toggle" onClick={toggle} aria-expanded={!collapsed} aria-controls="desktop-sections" title={collapsed ? 'Expandir menú' : 'Contraer menú'}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={collapsed ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'} />
          </svg>
          <span>{collapsed ? 'Expandir menú' : 'Contraer menú'}</span>
        </button>
        <div className="navigation-external-links">
          <a href={githubUrl} aria-label="GitHub" title="GitHub"><ExternalIcon service="github" /></a>
          <a href={npmUrl} aria-label="npm" title="npm"><ExternalIcon service="npm" /></a>
        </div>
      </aside>
      {children}
    </div>
  )
}

import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { DesktopNavigation } from '../components/DesktopNavigation'
import { SidebarNavigation } from '../components/SidebarNavigation'
import { githubUrl, npmUrl } from '../components/navigationSections'
import { ExternalIcon } from '../components/ExternalIcon'
import 'nextra-theme-docs/style.css'
import 'sneo-brutalism/styles.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sneo | Documentación',
  description: 'Documentación y ejemplos interactivos de Sneo Brutalism.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <SidebarNavigation />
        <DesktopNavigation>
        <Layout
          navbar={<Navbar logo={null} logoLink={false} />}
          sidebar={{ defaultOpen: false, toggleButton: false }}
          darkMode={false}
          search={null}
          copyPageButton={false}
          toc={{ float: false }}
          nextThemes={{ forcedTheme: 'light', defaultTheme: 'light' }}
          pageMap={await getPageMap()}
          footer={<Footer><div className="footer-content"><span>Sneo Brutalism</span><a href={githubUrl}><ExternalIcon service="github" />GitHub</a><a href={npmUrl}><ExternalIcon service="npm" />npm</a></div></Footer>}
        >
          {children}
        </Layout>
        </DesktopNavigation>
      </body>
    </html>
  )
}

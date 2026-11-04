import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { SidebarNavigation } from '../components/SidebarNavigation'
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
        <Layout
          navbar={<Navbar logo={null} logoLink={false} />}
          darkMode={false}
          search={null}
          copyPageButton={false}
          toc={{ float: false }}
          nextThemes={{ forcedTheme: 'light', defaultTheme: 'light' }}
          pageMap={await getPageMap()}
          footer={<Footer>Sneo Brutalism</Footer>}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

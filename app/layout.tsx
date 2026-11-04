import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
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
        <Layout
          navbar={<Navbar logo={<strong>Sneo</strong>} />}
          darkMode={false}
          search={null}
          copyPageButton={false}
          toc={{ title: 'En esta página', backToTop: 'Volver arriba' }}
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

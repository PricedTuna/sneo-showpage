import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import type { MDXComponents } from 'mdx/types'
import { CopyPageButton } from './components/CopyPageButton'

const themeComponents = getThemeComponents()
const ThemeWrapper = themeComponents.wrapper!

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...themeComponents,
    ...components,
    wrapper: (props) => (
      <ThemeWrapper {...props} toc={props.toc?.filter((item: { id: string }) => item.id !== 'primeros-pasos') ?? []}>
        {typeof props.sourceCode === 'string' && <CopyPageButton source={props.sourceCode} />}
        {props.children}
      </ThemeWrapper>
    ),
  }
}

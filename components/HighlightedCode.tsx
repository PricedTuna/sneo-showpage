'use client'

import { useEffect, useState } from 'react'
import type { ThemedToken } from 'shiki'

export function HighlightedCode({ code }: { code: string }) {
  const [lines, setLines] = useState<ThemedToken[][] | null>(null)

  useEffect(() => {
    let active = true
    setLines(null)
    import('shiki/bundle/web')
      .then(({ codeToTokens }) => codeToTokens(code, { lang: 'jsx', theme: 'github-dark' }))
      .then(result => { if (active) setLines(result.tokens) })
      .catch(() => { /* The unformatted code remains available. */ })
    return () => { active = false }
  }, [code])

  return (
    <pre className="codeblock"><code>{lines
      ? lines.map((line, index) => (
        <span key={index}>
          {line.map((token, tokenIndex) => <span key={tokenIndex} style={{ color: token.color }}>{token.content}</span>)}
          {index < lines.length - 1 && '\n'}
        </span>
      ))
      : code}</code></pre>
  )
}

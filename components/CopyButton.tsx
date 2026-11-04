'use client'

import { useState } from 'react'
import { Button } from 'sneo-brutalism'

export function CopyButton({ text, label, showLabel = false }: { text: string; label: string; showLabel?: boolean }) {
  const [result, setResult] = useState<{ text: string; copied: boolean }>()
  const current = result?.text === text ? result : undefined
  const message = current ? (current.copied ? 'Copiado' : 'No se pudo copiar') : ''

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setResult({ text, copied: true })
    } catch {
      setResult({ text, copied: false })
    }
  }

  return (
    <>
      <Button className={showLabel ? "copy-text-button" : "copy-icon-button"} onClick={copy} aria-label={label} title={message || label}>
        {(!showLabel || current?.copied) && <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {current?.copied ? <path d="m5 13 4 4L19 7" /> : (
            <>
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3" />
            </>
          )}
        </svg>}
        {showLabel && label}
      </Button>
      <span role="status" className={current?.copied === false ? 'copy-error' : 'copy-status-hidden'}>{message}</span>
    </>
  )
}

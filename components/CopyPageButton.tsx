'use client'

import { useState } from 'react'
import { Button } from 'sneo-brutalism'

export function CopyPageButton({ source }: { source: string }) {
  const [message, setMessage] = useState('')

  async function copyPage() {
    try {
      await navigator.clipboard.writeText(source)
      setMessage('Página copiada')
    } catch {
      setMessage('No se pudo copiar la página')
    }
  }

  return (
    <div className="copy-page-control">
      <Button onClick={copyPage}>Copiar página</Button>
      <span role="status">{message}</span>
    </div>
  )
}

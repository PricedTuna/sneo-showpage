'use client'

import {
  SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider, useSandpack,
} from '@codesandbox/sandpack-react'
import { Button } from 'sneo-brutalism'
import { useState } from 'react'

const file = '/App.js'
const example = `import { Button } from 'sneo-brutalism';
import 'sneo-brutalism/styles.css';

export default function App() {
  return <Button>Hola, Sneo</Button>;
}
`

function EditorActions() {
  const { sandpack } = useSandpack()
  const [message, setMessage] = useState('')
  return <>
    <div className="demo-actions">
      <Button onClick={() => { sandpack.resetAllFiles(); setMessage('Ejemplo restablecido') }}>
        Restablecer código
      </Button>
      <Button variant="blue" onClick={async () => {
        try {
          await navigator.clipboard.writeText(sandpack.files[file].code)
          setMessage('Código copiado')
        } catch {
          setMessage('Selecciona y copia el código desde el editor.')
        }
      }}>Copiar código</Button>
      <span role="status">{message}</span>
    </div>
  </>
}

export function HelloWorldPlayground() {
  return <SandpackProvider
    template="react"
    files={{ [file]: example }}
    customSetup={{ dependencies: { 'sneo-brutalism': '0.1.0' } }}
  >
    <EditorActions />
    <SandpackLayout>
      <SandpackCodeEditor showTabs showInlineErrors />
      <SandpackPreview showRefreshButton />
    </SandpackLayout>
  </SandpackProvider>
}

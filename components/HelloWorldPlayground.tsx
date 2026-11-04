'use client'

import { CopyButton } from './CopyButton'

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
    <div className="demo-actions playground-actions">
      <Button onClick={() => { sandpack.resetAllFiles(); setMessage('Ejemplo restablecido') }}>
        Restablecer código
      </Button>
      <CopyButton text={sandpack.files[file].code} label="Copiar código del editor" />
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
    <div className="playground-workspace">
    <EditorActions />
    <SandpackLayout>
      <SandpackCodeEditor showTabs showInlineErrors />
      <SandpackPreview showRefreshButton />
    </SandpackLayout>
    </div>
  </SandpackProvider>
}

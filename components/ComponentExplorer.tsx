'use client'

import { useState } from 'react'
import { ComponentDemo } from './ComponentDemo'
import { names } from './componentNames'

export function ComponentExplorer() {
  const [selected, setSelected] = useState<(typeof names)[number]>('Button')

  return (
    <div className="component-explorer">
      <nav className="component-menu" aria-label="Elegir componente">
        {names.map(name => (
          <button
            key={name}
            type="button"
            aria-pressed={selected === name}
            onClick={() => setSelected(name)}
          >
            {name}
          </button>
        ))}
      </nav>
      <div key={selected} className="component-panel" role="region" aria-label={`Ejemplo de ${selected}`} tabIndex={0}>
        <ComponentDemo name={selected} embedded />
      </div>
    </div>
  )
}

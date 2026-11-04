'use client'

import { useState } from 'react'
import { ComponentDemo } from './ComponentDemo'
import { componentGroups, names } from './componentNames'

export function ComponentExplorer() {
  const [selected, setSelected] = useState<(typeof names)[number]>('Button')
  const [query, setQuery] = useState('')
  const search = query.trim().toLowerCase()
  const groups = componentGroups.map(group => ({
    ...group,
    names: group.names.filter(name => name.toLowerCase().includes(search)),
  }))

  return (
    <div className="component-explorer">
      <nav className="component-catalog" aria-label="Catálogo de componentes">
        <div className="component-search">
          <label htmlFor="component-filter">Buscar componente</label>
          <input
            id="component-filter"
            type="search"
            placeholder="Ej. Button"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        </div>
        <div className="component-menu">
          {groups.map(group => group.names.length > 0 && (
            <div className="component-group" key={group.title}>
              <p>{group.title}</p>
              <ul>
                {group.names.map(name => (
                  <li key={name}>
                    <button
                      type="button"
                      aria-pressed={selected === name}
                      aria-controls="component-panel"
                      onClick={() => setSelected(name)}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {groups.every(group => group.names.length === 0) && (
            <p className="component-no-results" role="status">No hay componentes con ese nombre.</p>
          )}
        </div>
      </nav>

      <div id="component-panel" className="component-panel">
        <ComponentDemo key={selected} name={selected} embedded />
      </div>
    </div>
  )
}

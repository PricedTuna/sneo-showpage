'use client'

import { useEffect, useRef, useState } from 'react'
import { ComponentDemo } from './ComponentDemo'
import { componentGroups, names } from './componentNames'

export function ComponentExplorer() {
  const [selected, setSelected] = useState<(typeof names)[number]>('Button')
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const catalogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    function handleResize(event: MediaQueryListEvent) {
      if (event.matches) setIsOpen(false)
    }
    desktop.addEventListener('change', handleResize)
    return () => desktop.removeEventListener('change', handleResize)
  }, [])

  function closeCatalog() {
    setIsOpen(false)
    requestAnimationFrame(() => toggleRef.current?.focus())
  }

  useEffect(() => {
    if (!isOpen) return
    catalogRef.current?.querySelector<HTMLInputElement>('input')?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeCatalog()
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !catalogRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen])
  const search = query.trim().toLowerCase()
  const groups = componentGroups.map(group => ({
    ...group,
    names: group.names.filter(name => name.toLowerCase().includes(search)),
  }))

  function handleSelect(name: (typeof names)[number]) {
    setSelected(name)
    if (isOpen) closeCatalog()
  }

  return (
    <div className={`component-explorer ${isOpen ? 'is-open' : 'is-collapsed'}`}>
      <button
        ref={toggleRef}
        type="button"
        hidden={isOpen}
        className="component-catalog-toggle"
        aria-label="Abrir catálogo de componentes"
        aria-expanded={isOpen}
        aria-controls="component-catalog"
        onClick={() => setIsOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav ref={catalogRef} id="component-catalog" className="component-catalog" aria-label="Catálogo de componentes">
        <div className="component-catalog-header">
          <strong>Componentes</strong>
          <button type="button" onClick={closeCatalog} aria-label="Cerrar catálogo">×</button>
        </div>
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
                      onClick={() => handleSelect(name)}
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

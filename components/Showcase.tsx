'use client'
import Link from 'next/link'
import { Button, Card, Checkbox, Dropdown, Alert } from 'sneo-brutalism'
import { useState } from 'react'
import { InstallCommand } from './InstallCommand'

export function Showcase() {
  const [selected, setSelected] = useState(false)
  return <div className="showcase">
    <div className="eyebrow">● REACT COMPONENT LIBRARY <span> / v0.2.0</span></div>
    <div className="hero"><div><h1>Interfaces con <em>carácter.</em></h1><p>Componentes React con bordes contundentes, colores vivos y una personalidad que no pasa desapercibida.</p><div className="actions"><Link className="action primary" href="/primeros-pasos">Empezar →</Link><Link className="action" href="/componentes">Ver componentes ↗</Link></div></div><div className="hero-card"><div className="card-top"><span>UNA PEQUEÑA DEMO</span><span>✳</span></div><Card title="Hola, mundo.">Diseñado para construir cosas que se sienten diferentes.</Card><div className="demo-actions"><Button variant="blue" onClick={()=>setSelected(!selected)}>{selected ? '¡Me gusta!' : 'Pruébame →'}</Button><Dropdown label="Opciones" items={[{id:'hello',label:'Saludar',onSelect:()=>setSelected(true)}]} /></div><label><Checkbox checked={selected} onChange={e=>setSelected(e.target.checked)} /> Me gusta lo que veo</label></div></div>
    <div className="design-principles" aria-label="Características de diseño"><span><b>01</b> Bordes definidos</span><span><b>02</b> Sombras con intención</span><span><b>03</b> Tu propia paleta</span></div>
    <InstallCommand featured />
  </div>
}

export function ShowcaseLinks() {
  return <div className="showcase showcase-links">
    <div className="intro"><div><div className="eyebrow">01 / HECHO PARA CONSTRUIR</div><h2>Menos plantilla.<br />Más personalidad.</h2></div><p>Una caja de herramientas para crear experiencias expresivas. Explora los componentes, modifica sus estilos y encuentra tu propia versión de Sneo.</p></div>
    <div className="feature-grid"><Link href="/componentes"><b>01 / COMPONENTES</b><h3>Piezas con actitud ↗</h3><p>Botones, formularios, tarjetas y más. Listos para usar en React.</p></Link><Link href="/tema"><b>02 / TEMA</b><h3>Hazlo tuyo ↗</h3><p>Ajusta colores, bordes y movimiento con ThemeProvider.</p></Link><Link href="/playground"><b>03 / PLAYGROUND</b><h3>Prueba el código ↗</h3><p>Edita un ejemplo y observa el resultado en vivo.</p></Link></div><Alert variant="info">Sneo está en desarrollo. Esta documentación corresponde a la versión 0.2.0.</Alert>
  </div>
}

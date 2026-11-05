'use client'

import { CopyButton } from './CopyButton'
import { useId, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { Button, Card, Dropdown, Table, Modal, Tooltip, Input, Field, Checkbox, Select, Alert, HelloWorld, Badge, Accordion, Tabs, TopNavbar, TopNavbarItem, BottomNavbar, BottomNavbarItem } from 'sneo-brutalism'
import { reference, shadow, elevation } from './componentReference'
import { HighlightedCode } from './HighlightedCode'
import { names } from './componentNames'
type Name = typeof names[number]
const tabs = ['Vista previa', 'Código', 'Propiedades'] as const
type Tab = typeof tabs[number]
const variants = ['yellow', 'blue', 'green', 'pink'] as const
const alertVariants = ['info', 'success', 'warning', 'error'] as const
const canDisable: Name[] = ['Button', 'Dropdown', 'Input', 'Checkbox', 'Select']
const samples: Record<Name,string> = {
 Badge:'<Badge variant="green" padding="6px 12px" shadowOffset={2}>Listo</Badge>',
 Accordion:'<Accordion title="¿Puedo personalizarlo?">Sí, con theme o ThemeProvider.</Accordion>',
 Tabs:`<Tabs label="Vistas del proyecto" defaultValue="resumen" items={[
  { id: 'resumen', label: 'Resumen', content: 'Información del proyecto' },
  { id: 'actividad', label: 'Actividad', content: 'Cambios recientes' },
]} />`,
 TopNavbar:'<TopNavbar aria-label="Principal" brand={<strong>SNEO</strong>} shadow={false}><TopNavbarItem href="/" active>Inicio</TopNavbarItem><TopNavbarItem href="/componentes">Componentes</TopNavbarItem></TopNavbar>',
 BottomNavbar:'<BottomNavbar aria-label="Principal"><BottomNavbarItem href="/" active>Inicio</BottomNavbarItem><BottomNavbarItem href="/componentes">Componentes</BottomNavbarItem></BottomNavbar>',
 Button:'<Button variant="yellow">Continuar</Button>',
  Card:'<Card title="Resumen">Contenido</Card>',
  Dropdown:`<Dropdown label="Acciones" items={[{ id: 'abrir', label: 'Abrir', onSelect: () => {} }]} />`,
  Table:`<Table caption="Datos" rows={[{ id: '1', nombre: 'Sneo' }]} getRowKey={row => row.id} columns={[{ id: 'nombre', header: 'Nombre', render: row => row.nombre }]} />`,
  Modal:`<Modal open={open} onClose={() => setOpen(false)} title="Hola">Contenido</Modal>`,
  Tooltip:'<Tooltip label="Ayuda" content="Una ayuda breve" />',
  Input:'<Input aria-label="Nombre" placeholder="Tu nombre" />',
  Field:`<Field label="Nombre" hint="Tu nombre">{props => <Input {...props} />}</Field>`,
  Checkbox:'<label><Checkbox /> Acepto</label>',
  Select:'<Select aria-label="Opción"><option>Uno</option><option>Dos</option></Select>',
  Alert:'<Alert variant="info">Información</Alert>',
  HelloWorld:'<HelloWorld />'}
const descriptions: Record<Name,string>={Badge:'Etiqueta de estado sin interacción.', Accordion:'Contenido desplegable con details y summary nativos.', Tabs:'Pestañas con selección controlada o interna y navegación con teclado.', TopNavbar:'Barra flotante superior con marca, enlaces y acción opcional.', BottomNavbar:'Barra flotante inferior de enlaces.', Button:'Botón de acción con cuatro variantes de color.',
  Card:'Contenedor de contenido, con una variante seleccionable controlada.',
  Dropdown:'Menú de acciones con opciones seleccionables.',
  Table:'Tabla genérica para representar filas y columnas.',
  Modal:'Diálogo modal controlado mediante open y onClose.',
  Tooltip:'Ayuda breve disponible al enfocar o pasar el cursor.',
  Input:'Campo de entrada compatible con atributos HTML de input.',
  Field:'Etiqueta y mensajes asociados a un campo mediante una función hija.',
  Checkbox:'Casilla compatible con atributos HTML de input.',
  Select:'Selector compatible con atributos HTML de select.',
  Alert:'Mensaje con variantes de estado.',
  HelloWorld:'Primer componente de ejemplo incluido en la biblioteca.'}
export function ComponentDemo({ name, embedded = false }: { name: Name; embedded?: boolean }){
 const [shadowOffset, setShadowOffset] = useState(4)
 const [restElevation, setRestElevation] = useState(2)
 const [hoverElevation, setHoverElevation] = useState(6)
 const [pressedOffset, setPressedOffset] = useState(2)
 const [padding, setPadding] = useState('10px 20px')
 const [showShadow, setShowShadow] = useState(true)
 const [disabled, setDisabled] = useState(false)
 const [selected, setSelected] = useState(false)
 const [open, setOpen] = useState(false)
 const [variant, setVariant] = useState<typeof variants[number]>('yellow')
 const [tab, setTab] = useState<Tab>('Vista previa')
 const id = useId()
 const [alternate, setAlternate] = useState(false)
 const [alertVariant, setAlertVariant] = useState<typeof alertVariants[number]>('info')
 const stateLabels: Partial<Record<Name, string>> = {
  Card: 'Permitir selección', Dropdown: 'Deshabilitar opción', Table: 'Mostrar tabla vacía',
  Modal: 'Mantener abierto al pulsar el fondo', Input: 'Marcar como inválido', Field: 'Mostrar error',
 }
 const adjustableElevation = ['Button', 'Card', 'Dropdown'].includes(name)
 const details = { ...reference[name], props: [...reference[name].props, shadow, ...(adjustableElevation ? elevation : [])] }
 const Title = embedded ? 'h2' : 'h1'
 const imports = name === 'TopNavbar' ? 'TopNavbar, TopNavbarItem' : name === 'BottomNavbar' ? 'BottomNavbar, BottomNavbarItem' : name === 'Field' ? 'Field, Input' : name === 'Modal' ? 'Button, Modal' : name
 const customization = ` shadowOffset={${shadowOffset}}${adjustableElevation ? ` elevation={${restElevation}} hoverElevation={${hoverElevation}} pressedOffset={${pressedOffset}}` : name === 'Tabs' ? ` elevation={${restElevation}}` : ''}`
 const sample = samples[name]
  .replace(/ shadowOffset=\{2\}/, '')
  .replace(`<${name}`, `<${name}${customization}`)
  .replace(/variant="(?:yellow|green)"/, `variant="${variant}"`)
  .replace(/padding="6px 12px"/, `padding=${JSON.stringify(padding)}`)
  .replace('shadow={false}', `shadow={${showShadow}}`)
 const configuredSample = name === 'Button' ? sample.replace('<Button', `<Button padding=${JSON.stringify(padding)}`) : sample
 const body = name === 'Modal'
  ? `  const [open, setOpen] = useState(false)
  return <>
    <Button onClick={() => setOpen(true)}>Abrir modal</Button>
    ${configuredSample}
  </>`
  : `  return (${configuredSample})`
 const code = `${name === 'Modal' ? "import { useState } from 'react'\n" : ''}import { ${imports} } from 'sneo-brutalism'
import 'sneo-brutalism/styles.css'

export default function App() {
${body}
}`

 const previewControls = stateLabels[name]
 const movement = { shadowOffset, elevation: restElevation, hoverElevation, pressedOffset }
 const navbarStyle = { position: 'relative' as const, top: 'auto', bottom: 'auto', left: 'auto', transform: 'none', width: '100%', maxWidth: '100%' }
 const demo={
  Badge:<Badge variant={variant} padding={padding} shadowOffset={shadowOffset}>Listo</Badge>,
  Accordion:<Accordion title="¿Puedo personalizarlo?" shadowOffset={shadowOffset}>Sí, con theme o ThemeProvider.</Accordion>,
  Tabs:<Tabs label="Vistas del proyecto" elevation={restElevation} shadowOffset={shadowOffset} items={[{id:'resumen',label:'Resumen',content:'Información del proyecto'},{id:'actividad',label:'Actividad',content:'Cambios recientes'},{id:'proximamente',label:'Próximamente',content:'',disabled:true}]}/>,
  TopNavbar:<TopNavbar aria-label="Ejemplo de navegación superior" brand={<strong>SNEO</strong>} shadow={showShadow} shadowOffset={shadowOffset} style={navbarStyle}><TopNavbarItem href="#" active onClick={event=>event.preventDefault()}>Inicio</TopNavbarItem><TopNavbarItem href="#" onClick={event=>event.preventDefault()}>Proyectos</TopNavbarItem></TopNavbar>,
  BottomNavbar:<BottomNavbar aria-label="Ejemplo de navegación inferior" shadowOffset={shadowOffset} style={navbarStyle}><BottomNavbarItem href="#" active onClick={event=>event.preventDefault()}>Inicio</BottomNavbarItem><BottomNavbarItem href="#" onClick={event=>event.preventDefault()}>Proyectos</BottomNavbarItem></BottomNavbar>,
  Button:<Button variant={variant} disabled={disabled} padding={padding} {...movement}>Continuar</Button>,
  Card:alternate ? <Card {...movement} title="Seleccionar" selectable selected={selected} onClick={()=>setSelected(!selected)}>Seleccionada: {selected?'sí':'no'}</Card> : <Card {...movement} title="Resumen">Contenido</Card>,
  Dropdown:<><Dropdown {...movement} label="Acciones" disabled={disabled} items={[{id:'sel',label:'Cambiar estado',disabled:alternate,onSelect:()=>setSelected(!selected)}]}/><p role="status">Estado: {selected ? "activo" : "inactivo"}</p></>,
  Table:<Table shadowOffset={shadowOffset} caption="Datos" rows={alternate ? [] : [{id:'1',nombre:'Sneo'}]} getRowKey={r=>r.id} columns={[{id:'nombre',header:'Nombre',render:r=>r.nombre}]}/>,
  Modal:<><Button onClick={()=>setOpen(true)}>Abrir modal</Button><Modal shadowOffset={shadowOffset} open={open} closeOnBackdrop={!alternate} onClose={()=>setOpen(false)} title="Hola">Contenido del diálogo.</Modal></>,
  Tooltip:<Tooltip shadowOffset={shadowOffset} label="Ayuda" content="Una ayuda breve"/>,
  Input:<Input shadowOffset={shadowOffset} aria-label="Nombre" placeholder="Tu nombre" aria-invalid={alternate || undefined} disabled={disabled}/>,
  Field:<Field shadowOffset={shadowOffset} label="Nombre" hint="Tu nombre" error={alternate ? "Revisa el nombre" : undefined}>{props=><Input {...props}/>}</Field>,
  Checkbox:<label><Checkbox shadowOffset={shadowOffset} disabled={disabled} checked={selected} onChange={e=>setSelected(e.target.checked)}/> Acepto</label>,
  Select:<Select shadowOffset={shadowOffset} aria-label="Opción" disabled={disabled}><option>Uno</option><option>Dos</option></Select>,
  Alert:<Alert shadowOffset={shadowOffset} variant={alertVariant}>{({info:"Información",success:"Operación completada",warning:"Revisa los datos",error:"No se pudo guardar"})[alertVariant]}</Alert>,
  HelloWorld:<HelloWorld shadowOffset={shadowOffset}/>}[name]
 function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
  const nextIndex = {
   ArrowLeft: (index + tabs.length - 1) % tabs.length,
   ArrowRight: (index + 1) % tabs.length,
   Home: 0,
   End: tabs.length - 1,
  }[event.key]
  if (nextIndex === undefined) return
  event.preventDefault()
  setTab(tabs[nextIndex])
  document.getElementById(`${id}-tab-${nextIndex}`)?.focus()
 }

 return (
  <article className="component-doc">
   <header className="component-doc-header">
    <div>
     <Title>{name}</Title>
     <p>{descriptions[name]}</p>
    </div>
    <Link
     className="sneo-button sneo-button--yellow component-doc-link"
     href={embedded ? `/componentes/${name.toLowerCase()}` : '/componentes'}
    >
     {embedded ? <>Ver ficha <span aria-hidden="true">↗</span></> : 'Volver a componentes'}
    </Link>
   </header>

   <div className="component-workbench">
    <div className="component-tabs" role="tablist" aria-label={`Documentación de ${name}`}>
     {tabs.map((label, index) => (
      <button
       key={label}
       type="button"
       role="tab"
       id={`${id}-tab-${index}`}
       aria-selected={tab === label}
       aria-controls={`${id}-panel-${index}`}
       tabIndex={tab === label ? 0 : -1}
       onClick={() => setTab(label)}
       onKeyDown={event => navigateTabs(event, index)}
      >
       {label}
      </button>
     ))}
    </div>

    <div id={`${id}-panel-0`} role="tabpanel" aria-labelledby={`${id}-tab-0`} hidden={tab !== 'Vista previa'} tabIndex={0}>
     <div className="component-stage"><div className="component-stage-content">{demo}</div></div>
     {(
      <fieldset className="component-controls">
       <legend>Ajustes de la demo</legend>
       <div className="demo-actions">
        <label>Sombra (px)<Input type="number" min={0} max={24} value={shadowOffset} onChange={event=>{ const value = Math.max(0, Number(event.target.value)); setShadowOffset(value); setPressedOffset(offset=>Math.min(offset, value)) }}/></label>
        {(adjustableElevation || name === 'Tabs') && <label>Elevación (px)<Input type="number" min={0} max={24} value={restElevation} onChange={event=>setRestElevation(Number(event.target.value))}/></label>}
        {adjustableElevation && <>
          <label>Elevación hover (px)<Input type="number" min={0} max={24} value={hoverElevation} onChange={event=>setHoverElevation(Number(event.target.value))}/></label>
          <label>Desplazamiento al pulsar (px)<Input type="number" min={0} max={shadowOffset} value={pressedOffset} onChange={event=>setPressedOffset(Math.min(shadowOffset, Number(event.target.value)))}/></label>
        </>}
        {(name === 'Button' || name === 'Badge') && <label>Padding CSS<Input value={padding} onChange={event=>setPadding(event.target.value)}/></label>}
        {name === 'TopNavbar' && <label><Checkbox checked={showShadow} onChange={event=>setShowShadow(event.target.checked)}/>Mostrar sombra</label>}
        {(name === 'Button' || name === 'Badge') && (
         <label>Variante
          <Select value={variant} onChange={event => setVariant(event.target.value as typeof variant)}>
           {variants.map(value => <option key={value}>{value}</option>)}
          </Select>
         </label>
        )}
        {name === 'Alert' && (
         <label>Variante
          <Select value={alertVariant} onChange={event => setAlertVariant(event.target.value as typeof alertVariant)}>
           {alertVariants.map(value => <option key={value}>{value}</option>)}
          </Select>
         </label>
        )}
        {previewControls && (
         <label><Checkbox checked={alternate} onChange={event => setAlternate(event.target.checked)} /> {previewControls}</label>
        )}
        {canDisable.includes(name) && (
         <label><Checkbox checked={disabled} onChange={event => setDisabled(event.target.checked)} /> Deshabilitado</label>
        )}
       </div>
      </fieldset>
     )}
    </div>

    <div id={`${id}-panel-1`} className="component-details" role="tabpanel" aria-labelledby={`${id}-tab-1`} hidden={tab !== 'Código'} tabIndex={0}>
     <div className="component-code-toolbar">
      <span>Ejemplo base · App.jsx</span>
      <CopyButton text={code} label="Copiar código" />
     </div>
     {tab === 'Código' && <HighlightedCode code={code} />}
    </div>

    <div id={`${id}-panel-2`} className="component-details" role="tabpanel" aria-labelledby={`${id}-tab-2`} hidden={tab !== 'Propiedades'} tabIndex={0}>
     {details.props.length > 0 && (
      <div className="prop-table" role="region" aria-label={`Propiedades de ${name}`} tabIndex={0}>
       <table>
        <thead><tr>{['Propiedad', 'Tipo', 'Valor inicial', 'Descripción'].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
        <tbody>{details.props.map(([prop, type, fallback, description]) => (
         <tr key={prop}>
          <th scope="row"><code>{prop}</code></th><td><code>{type}</code></td><td>{fallback}</td><td>{description}</td>
         </tr>
        ))}</tbody>
       </table>
      </div>
     )}
     <p>{details.note}</p>
    </div>
   </div>
  </article>
 )
}

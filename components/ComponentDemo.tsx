'use client'

import { CopyButton } from './CopyButton'
import { useId, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { Button, Card, Dropdown, Table, Modal, Tooltip, Input, Field, Checkbox, Select, Alert, HelloWorld } from 'sneo-brutalism'
import { reference } from './componentReference'
import { HighlightedCode } from './HighlightedCode'
import { names } from './componentNames'
type Name = typeof names[number]
const tabs = ['Vista previa', 'Código', 'Propiedades'] as const
type Tab = typeof tabs[number]
const variants = ['yellow', 'blue', 'green', 'pink'] as const
const alertVariants = ['info', 'success', 'warning', 'error'] as const
const canDisable: Name[] = ['Button', 'Dropdown', 'Input', 'Checkbox', 'Select']
const samples: Record<Name,string> = {
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
const descriptions: Record<Name,string>={Button:'Botón de acción con cuatro variantes de color.',
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
 const details = reference[name]
 const Title = embedded ? 'h2' : 'h1'
 const imports = name === 'Field' ? 'Field, Input' : name === 'Modal' ? 'Button, Modal' : name
 const body = name === 'Modal'
  ? `  const [open, setOpen] = useState(false)
  return <>
    <Button onClick={() => setOpen(true)}>Abrir modal</Button>
    ${samples.Modal}
  </>`
  : `  return (${samples[name]})`
 const code = `${name === 'Modal' ? "import { useState } from 'react'\n" : ''}import { ${imports} } from 'sneo-brutalism'
import 'sneo-brutalism/styles.css'

export default function App() {
${body}
}`

 const previewControls = stateLabels[name]
 const demo={Button:<Button variant={variant} disabled={disabled}>Continuar</Button>,
  Card:alternate ? <Card title="Seleccionar" selectable selected={selected} onClick={()=>setSelected(!selected)}>Seleccionada: {selected?'sí':'no'}</Card> : <Card title="Resumen">Contenido</Card>,
  Dropdown:<><Dropdown label="Acciones" disabled={disabled} items={[{id:'sel',label:'Cambiar estado',disabled:alternate,onSelect:()=>setSelected(!selected)}]}/><p role="status">Estado: {selected ? "activo" : "inactivo"}</p></>,
  Table:<Table caption="Datos" rows={alternate ? [] : [{id:'1',nombre:'Sneo'}]} getRowKey={r=>r.id} columns={[{id:'nombre',header:'Nombre',render:r=>r.nombre}]}/>,
  Modal:<><Button onClick={()=>setOpen(true)}>Abrir modal</Button><Modal open={open} closeOnBackdrop={!alternate} onClose={()=>setOpen(false)} title="Hola">Contenido del diálogo.</Modal></>,
  Tooltip:<Tooltip label="Ayuda" content="Una ayuda breve"/>,
  Input:<Input aria-label="Nombre" placeholder="Tu nombre" aria-invalid={alternate || undefined} disabled={disabled}/>,
  Field:<Field label="Nombre" hint="Tu nombre" error={alternate ? "Revisa el nombre" : undefined}>{props=><Input {...props}/>}</Field>,
  Checkbox:<label><Checkbox disabled={disabled} checked={selected} onChange={e=>setSelected(e.target.checked)}/> Acepto</label>,
  Select:<Select aria-label="Opción" disabled={disabled}><option>Uno</option><option>Dos</option></Select>,
  Alert:<Alert variant={alertVariant}>{({info:"Información",success:"Operación completada",warning:"Revisa los datos",error:"No se pudo guardar"})[alertVariant]}</Alert>,
  HelloWorld:<HelloWorld/>}[name]
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
     {(previewControls || name === 'Alert' || canDisable.includes(name)) && (
      <fieldset className="component-controls">
       <legend>Ajustes de la demo</legend>
       <div className="demo-actions">
        {name === 'Button' && (
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

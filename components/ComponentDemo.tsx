'use client'
import { useState } from 'react'
import { Button, Card, Dropdown, Table, Modal, Tooltip, Input, Field, Checkbox, Select, Alert, HelloWorld } from 'sneo-brutalism'
import { reference } from './componentReference'
import { names } from './componentNames'
type Name = typeof names[number]
const samples: Record<Name,string> = {
 Button:'<Button variant="yellow">Continuar</Button>',Card:'<Card title="Resumen">Contenido</Card>',Dropdown:`<Dropdown label="Acciones" items={[{ id: 'abrir', label: 'Abrir', onSelect: () => {} }]} />`,Table:`<Table caption="Datos" rows={[{ id: '1', nombre: 'Sneo' }]} getRowKey={row => row.id} columns={[{ id: 'nombre', header: 'Nombre', render: row => row.nombre }]} />`,Modal:`<Modal open={open} onClose={() => setOpen(false)} title="Hola">Contenido</Modal>`,Tooltip:'<Tooltip label="Ayuda" content="Una ayuda breve" />',Input:'<Input aria-label="Nombre" placeholder="Tu nombre" />',Field:`<Field label="Nombre" hint="Tu nombre">{props => <Input {...props} />}</Field>`,Checkbox:'<label><Checkbox /> Acepto</label>',Select:'<Select aria-label="Opción"><option>Uno</option><option>Dos</option></Select>',Alert:'<Alert variant="info">Información</Alert>',HelloWorld:'<HelloWorld />'}
const descriptions: Record<Name,string>={Button:'Botón de acción con cuatro variantes de color.',Card:'Contenedor de contenido, con una variante seleccionable controlada.',Dropdown:'Menú de acciones con opciones seleccionables.',Table:'Tabla genérica para representar filas y columnas.',Modal:'Diálogo modal controlado mediante open y onClose.',Tooltip:'Ayuda breve disponible al enfocar o pasar el cursor.',Input:'Campo de entrada compatible con atributos HTML de input.',Field:'Etiqueta y mensajes asociados a un campo mediante una función hija.',Checkbox:'Casilla compatible con atributos HTML de input.',Select:'Selector compatible con atributos HTML de select.',Alert:'Mensaje con variantes de estado.',HelloWorld:'Primer componente de ejemplo incluido en la biblioteca.'}
export function ComponentDemo({ name, embedded = false }: { name: Name; embedded?: boolean }){
 const [disabled,setDisabled]=useState(false),[selected,setSelected]=useState(false),[open,setOpen]=useState(false),[variant,setVariant]=useState<'yellow'|'blue'|'green'|'pink'>('yellow'),[copied,setCopied]=useState(false)
 const [alternate, setAlternate] = useState(false)
 const [alertVariant, setAlertVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info')
 const stateLabels: Partial<Record<Name, string>> = {
  Card: 'Permitir selección', Dropdown: 'Deshabilitar opción', Table: 'Mostrar tabla vacía',
  Modal: 'Mantener abierto al pulsar el fondo', Input: 'Marcar como inválido', Field: 'Mostrar error',
 }
 const details = reference[name]
 const Title = embedded ? 'h2' : 'h1'
 const Section = embedded ? 'h3' : 'h2'
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
 const demo={Button:<Button variant={variant} disabled={disabled}>Continuar</Button>,Card:alternate ? <Card title="Seleccionar" selectable selected={selected} onClick={()=>setSelected(!selected)}>Seleccionada: {selected?'sí':'no'}</Card> : <Card title="Resumen">Contenido</Card>,Dropdown:<><Dropdown label="Acciones" disabled={disabled} items={[{id:'sel',label:'Cambiar estado',disabled:alternate,onSelect:()=>setSelected(!selected)}]}/><p role="status">Estado: {selected ? "activo" : "inactivo"}</p></>,Table:<Table caption="Datos" rows={alternate ? [] : [{id:'1',nombre:'Sneo'}]} getRowKey={r=>r.id} columns={[{id:'nombre',header:'Nombre',render:r=>r.nombre}]}/>,Modal:<><Button onClick={()=>setOpen(true)}>Abrir modal</Button><Modal open={open} closeOnBackdrop={!alternate} onClose={()=>setOpen(false)} title="Hola">Contenido del diálogo.</Modal></>,Tooltip:<Tooltip label="Ayuda" content="Una ayuda breve"/>,Input:<Input aria-label="Nombre" placeholder="Tu nombre" aria-invalid={alternate || undefined} disabled={disabled}/>,Field:<Field label="Nombre" hint="Tu nombre" error={alternate ? "Revisa el nombre" : undefined}>{props=><Input {...props}/>}</Field>,Checkbox:<label><Checkbox disabled={disabled} checked={selected} onChange={e=>setSelected(e.target.checked)}/> Acepto</label>,Select:<Select aria-label="Opción" disabled={disabled}><option>Uno</option><option>Dos</option></Select>,Alert:<Alert variant={alertVariant}>{({info:"Información",success:"Operación completada",warning:"Revisa los datos",error:"No se pudo guardar"})[alertVariant]}</Alert>,HelloWorld:<HelloWorld/>}[name]
 return <article className="component-doc"><Title>{name}</Title><p>{descriptions[name]}</p><Section>Vista previa</Section><div className="preview">{demo}</div><div className="demo-actions">
 {previewControls && <label><Checkbox checked={alternate} onChange={e => setAlternate(e.target.checked)} /> {previewControls}</label>}
 {name === 'Alert' && <label>Variante <Select value={alertVariant} onChange={e => setAlertVariant(e.target.value as typeof alertVariant)}>
   {['info', 'success', 'warning', 'error'].map(value => <option key={value}>{value}</option>)}
 </Select></label>}
 {['Button','Dropdown','Input','Checkbox','Select'].includes(name)&&<label><input type="checkbox" checked={disabled} onChange={e=>setDisabled(e.target.checked)}/> Deshabilitado</label>}{name==='Button'&&<label> Variante <select value={variant} onChange={e=>setVariant(e.target.value as typeof variant)}>{['yellow','blue','green','pink'].map(v=><option key={v}>{v}</option>)}</select></label>}</div><Section>Ejemplo</Section><Button variant="yellow" onClick={async()=>{try{await navigator.clipboard.writeText(code);setCopied(true)}catch{setCopied(false)}}}>{copied?'Copiado':'Copiar código'}</Button><pre className="codeblock"><code>{code}</code></pre>{name==='Modal'&&<p>El ejemplo requiere el estado <code>open</code> y su función <code>setOpen</code>. El diálogo utiliza el elemento nativo del navegador.</p>}{name==='Field'&&<p>Extiende los atributos proporcionados por la función hija en el campo para asociar la etiqueta y los mensajes.</p>}<Section>Propiedades</Section>
 {details.props.length > 0 && <div className="prop-table"><table>
   <thead><tr>{['Propiedad', 'Tipo', 'Valor inicial', 'Descripción'].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
   <tbody>{details.props.map(([prop, type, fallback, description]) => <tr key={prop}>
     <th scope="row"><code>{prop}</code></th><td><code>{type}</code></td><td>{fallback}</td><td>{description}</td>
   </tr>)}</tbody>
 </table></div>}
 <p>{details.note}</p></article>
}

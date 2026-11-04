export const componentGroups = [
  { title: 'Acciones', names: ['Button', 'Dropdown'] },
  { title: 'Formularios', names: ['Input', 'Field', 'Checkbox', 'Select'] },
  { title: 'Contenido y datos', names: ['Card', 'Table', 'HelloWorld'] },
  { title: 'Mensajes y capas', names: ['Alert', 'Modal', 'Tooltip'] },
] as const

export const names = componentGroups.flatMap(group => [...group.names])

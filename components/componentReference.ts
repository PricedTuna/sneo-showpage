import type { names } from './componentNames'

type Row = [prop: string, type: string, fallback: string, description: string]
type Reference = { props: Row[]; note: string }
export const shadow: Row = ['shadowOffset', 'number', 'Tema o estilo del componente', 'Desplazamiento de la sombra en píxeles. La prop directa prevalece sobre theme y ThemeProvider; 0 elimina una sombra estática.']
export const elevation: Row[] = [
  ['elevation', 'number', '2', 'Elevación en reposo en píxeles.'],
  ['hoverElevation', 'number', '6', 'Elevación al pasar el cursor en píxeles.'],
  ['pressedOffset', 'number', '2', 'Desplazamiento al pulsar en píxeles.'],
]
const theme: Row = ['theme', 'ThemeConfig', '—', 'Sobrescribe el tema de esta instancia.']

export const reference: Record<typeof names[number], Reference> = {
  Button: {
    props: [
      ['variant', 'yellow | blue | green | pink', 'yellow', 'Color del botón.'],
      ['padding', 'CSSProperties["padding"]', '10px 20px', 'Padding CSS o número en píxeles; style.padding tiene prioridad.'],
      ['type', 'button | submit | reset', 'button', 'Comportamiento dentro de un formulario.'],
      ['disabled', 'boolean', 'false', 'Impide activar el botón.'], theme,
    ],
    note: 'Usa un texto que describa la acción. Admite atributos de button, eventos y ref. Pasa el cursor o pulsa para ver los cambios de elevación.',
  },
  Card: {
    props: [
      ['title, children', 'ReactNode', '—', 'Encabezado y contenido.'],
      ['selectable', 'boolean', 'false', 'Convierte la tarjeta en un botón.'],
      ['selected', 'boolean', 'Obligatorio si selectable es true', 'Estado controlado por tu aplicación.'], theme,
    ],
    note: 'La tarjeta normal admite atributos de article. La seleccionable admite atributos de button. Evita poner enlaces o botones dentro de esta última.',
  },
  Dropdown: {
    props: [
      ['label', 'ReactNode', 'Obligatorio', 'Texto del disparador.'],
      ['items', 'DropdownItem[]', 'Obligatorio', 'Cada opción incluye id, label y onSelect. icon y disabled son opcionales.'],
      ['disabled', 'boolean', 'false', 'Deshabilita el disparador.'],
      ['className', 'string', '—', 'Clase del contenedor.'], theme,
    ],
    note: 'Usa identificadores únicos. Tab recorre las opciones y Escape cierra el menú.',
  },
  Table: {
    props: [
      ['rows', 'T[]', 'Obligatorio', 'Filas de datos.'],
      ['columns', 'TableColumn<T>[]', 'Obligatorio', 'Columnas con id, header y render(row).'],
      ['getRowKey', '(row: T) => Key', 'Obligatorio', 'Clave estable y única para cada fila.'],
      ['caption', 'string', '—', 'Título y nombre accesible de la tabla.'],
      ['emptyMessage', 'ReactNode', 'No hay datos disponibles', 'Mensaje cuando no hay filas.'], theme,
    ],
    note: 'Admite atributos de table salvo children. La tabla se desplaza horizontalmente cuando no cabe.',
  },
  Modal: {
    props: [
      ['open', 'boolean', 'Obligatorio', 'Controla si el diálogo está abierto.'],
      ['onClose', '() => void', 'Obligatorio', 'Actualiza el estado cuando se pide cerrar.'],
      ['title, children', 'ReactNode', 'Obligatorio', 'Título y contenido del diálogo.'],
      ['closeLabel', 'string', 'Cerrar', 'Nombre accesible del botón de cierre.'],
      ['closeOnBackdrop', 'boolean', 'true', 'Permite cerrar pulsando el fondo.'], theme,
    ],
    note: 'Usa un diálogo nativo. Escape solicita el cierre incluso cuando se deshabilita el cierre por el fondo.',
  },
  Tooltip: {
    props: [
      ['content', 'ReactNode', 'Obligatorio', 'Texto de ayuda.'],
      ['label', 'string', 'Más información', 'Nombre accesible del disparador.'],
      ['className', 'string', '—', 'Clase del contenedor.'], theme,
    ],
    note: 'Aparece al enfocar o pasar el cursor. Reserva esta ayuda para contenido breve que complemente la interfaz.',
  },
  Input: {
    props: [
      ['type', 'InputHTMLAttributes["type"]', 'text', 'Tipo de entrada.'],
      ['disabled', 'boolean', 'false', 'Impide editar el campo.'],
      ['aria-invalid', 'boolean', '—', 'Indica un valor inválido.'], theme,
    ],
    note: 'Admite atributos de input y ref. Asócialo a una etiqueta visible o úsalo dentro de Field.',
  },
  Field: {
    props: [
      ['id', 'string', 'Generado', 'Identificador del campo.'],
      ['label', 'ReactNode', 'Obligatorio', 'Etiqueta visible.'],
      ['hint, error', 'ReactNode', '—', 'Ayuda y mensaje de error.'],
      ['children', '(props) => ReactNode', 'Obligatorio', 'Recibe id y los atributos ARIA del campo.'], theme,
    ],
    note: 'Pasa las propiedades de la función hija al control para conservar la asociación con la etiqueta y los mensajes.',
  },
  Checkbox: {
    props: [
      ['checked', 'boolean', '—', 'Estado controlado.'],
      ['defaultChecked', 'boolean', 'false', 'Estado inicial sin control externo.'],
      ['disabled', 'boolean', 'false', 'Impide cambiar el estado.'], theme,
    ],
    note: 'Admite atributos de input y ref. El tipo es siempre checkbox. Dale una etiqueta visible.',
  },
  Select: {
    props: [
      ['value, defaultValue', 'string | number | readonly string[]', '—', 'Selección controlada o inicial.'],
      ['children', 'ReactNode', '—', 'Opciones del selector.'],
      ['disabled', 'boolean', 'false', 'Impide cambiar la selección.'], theme,
    ],
    note: 'Admite atributos de select y ref. El menú se ve distinto en navegadores que no admiten selectores nativos personalizables.',
  },
  Alert: {
    props: [
      ['variant', 'info | success | warning | error', 'info', 'Estilo del mensaje.'],
      ['role', 'AriaRole', 'alert para error, status en los demás casos', 'Semántica del mensaje.'],
      ['children', 'ReactNode', '—', 'Contenido del aviso.'], theme,
    ],
    note: 'Admite atributos de div. Explica el estado con texto para que el color no sea la única señal.',
  },
  Badge: {
    props: [
      ['variant', 'yellow | blue | green | pink', 'yellow', 'Color de la etiqueta.'],
      ['padding', 'CSSProperties["padding"]', 'Estilo de la biblioteca', 'Padding CSS o número en píxeles; style.padding tiene prioridad.'], theme,
    ],
    note: 'Etiqueta sin interacción. Admite atributos de span y ref; no la uses como sustituto de un botón.',
  },
  Accordion: {
    props: [
      ['title', 'ReactNode', 'Obligatorio', 'Encabezado que abre y cierra el contenido.'],
      ['children', 'ReactNode', '—', 'Contenido desplegable.'],
      ['open', 'boolean', 'false', 'Muestra inicialmente el contenido expandido.'],
      ['name', 'string', '—', 'Agrupa acordeones mutuamente exclusivos en navegadores compatibles.'],
      ['onToggle', 'ReactEventHandler<HTMLDetailsElement>', '—', 'Notifica cambios del elemento details.'], theme,
    ],
    note: 'Usa details y summary nativos. Admite sus atributos y ref, y se puede activar con teclado.',
  },
  Tabs: {
    props: [
      ['items', 'TabItem[]', 'Obligatorio', 'Cada pestaña incluye id único, label y content; disabled es opcional.'],
      ['value', 'string', '—', 'Identificador seleccionado en modo controlado.'],
      ['defaultValue', 'string', 'Primera pestaña habilitada', 'Selección inicial en modo no controlado.'],
      ['onChange', '(value: string) => void', '—', 'Recibe el identificador seleccionado.'],
      ['label', 'string', 'Pestañas', 'Nombre accesible del grupo.'],
      ['elevation', 'number', 'Tema o estilo del componente', 'Elevación de la pestaña activa en píxeles.'], theme,
    ],
    note: 'Flechas, Inicio y Fin activan pestañas y omiten las deshabilitadas. Admite atributos de div salvo defaultValue y onChange nativos.',
  },
  TopNavbar: {
    props: [
      ['brand, action', 'ReactNode', '—', 'Marca inicial y acción final opcionales.'],
      ['children', 'ReactNode', '—', 'Enlaces TopNavbarItem.'],
      ['shadow', 'boolean', 'true', 'false oculta la sombra independientemente del desplazamiento.'],
      ['TopNavbarItem.active', 'boolean', 'false', 'Indica el enlace de la página actual.'],
      ['TopNavbarItem.shadowOffset', 'number', 'Heredado', 'Sobrescribe la sombra del enlace.'], theme,
    ],
    note: 'Barra fija superior: reserva espacio encima del contenido y dale un aria-label. Los elementos admiten atributos de a y ref; la barra admite atributos de nav y ref. En esta demo se posiciona dentro de la vista previa.',
  },
  BottomNavbar: {
    props: [
      ['children', 'ReactNode', '—', 'Enlaces BottomNavbarItem.'],
      ['BottomNavbarItem.active', 'boolean', 'false', 'Indica el enlace de la página actual.'],
      ['BottomNavbarItem.shadowOffset', 'number', 'Heredado', 'Sobrescribe la sombra del enlace.'], theme,
    ],
    note: 'Barra fija inferior: reserva espacio debajo del contenido y dale un aria-label. Los elementos admiten atributos de a y ref; la barra admite atributos de nav y ref. En esta demo se posiciona dentro de la vista previa.',
  },
  HelloWorld: { props: [theme], note: 'Texto de ejemplo en español. Admite atributos de p, theme y shadowOffset.' },
}

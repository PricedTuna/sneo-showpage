import type { names } from './componentNames'

type Row = [prop: string, type: string, fallback: string, description: string]
type Reference = { props: Row[]; note: string }
const theme: Row = ['theme', 'ThemeConfig', '—', 'Sobrescribe el tema de esta instancia.']

export const reference: Record<typeof names[number], Reference> = {
  Button: {
    props: [
      ['variant', 'yellow | blue | green | pink', 'yellow', 'Color del botón.'],
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
  HelloWorld: { props: [], note: 'Componente de ejemplo sin propiedades configurables.' },
}

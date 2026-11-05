import { CopyButton } from './CopyButton'

const command = 'npm i sneo-brutalism'

export function InstallCommand({ featured = false }: { featured?: boolean }) {
  return (
    <div id={featured ? 'primeros-pasos' : undefined} className={featured ? 'install install-featured' : 'install'}>
      {featured && <p>EMPIEZA EN TU PROYECTO</p>}
      <div className="install-command">
        <code>{command}</code>
        <CopyButton text={command} label="Copiar comando de instalación" />
      </div>
    </div>
  )
}

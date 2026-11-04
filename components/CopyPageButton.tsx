import { CopyButton } from './CopyButton'

export function CopyPageButton({ source }: { source: string }) {
  return (
    <div className="copy-page-control">
      <CopyButton text={source} label="Copiar página" showLabel />
    </div>
  )
}

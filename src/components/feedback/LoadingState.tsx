import { Spinner } from '@/components/ui/Spinner'

export function LoadingState({ mensaje = 'Cargando…' }: { mensaje?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-500">
      <Spinner tamano={32} />
      <p className="text-sm">{mensaje}</p>
    </div>
  )
}

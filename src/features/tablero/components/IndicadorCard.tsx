import { Card } from '@/components/ui/Card'

export function IndicadorCard({ etiqueta, valor, destacado }: { etiqueta: string; valor: number; destacado?: boolean }) {
  return (
    <Card className={destacado ? 'border-danger-500/50 bg-danger-500/5' : ''}>
      <p className="text-sm text-ink-500">{etiqueta}</p>
      <p className={`mt-1 text-3xl font-semibold ${destacado ? 'text-danger-500' : 'text-ink-900'}`}>{valor}</p>
    </Card>
  )
}

import { EntradaManualForm } from '../components/EntradaManualForm'
import { ValidarIngresoForm } from '@/features/preregistros/components/ValidarIngresoForm'
import { useEntradaManual } from '../hooks/useEntradaManual'
import { useValidarIngreso } from '@/features/preregistros/hooks/useValidarIngreso'
import { useVisitantes } from '@/features/visitantes/hooks/useVisitantes'
import { Card } from '@/components/ui/Card'
import { LoadingState } from '@/components/feedback/LoadingState'

/** Punto de control de ingreso: valida QR o registra entrada manual (walk-in). */
export function EntradaManualPage() {
  const { data: visitantes, isLoading } = useVisitantes()
  const entradaManual = useEntradaManual()
  const validarIngreso = useValidarIngreso()

  if (isLoading) return <LoadingState />

  return (
    <div className="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-ink-900">Validar QR</h2>
        <ValidarIngresoForm cargando={validarIngreso.isPending} onEnviar={(datos) => validarIngreso.mutate(datos)} />
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-ink-900">Entrada manual (walk-in)</h2>
        <EntradaManualForm
          visitantes={visitantes ?? []}
          cargando={entradaManual.isPending}
          onEnviar={(datos) => entradaManual.mutate(datos)}
        />
      </Card>
    </div>
  )
}

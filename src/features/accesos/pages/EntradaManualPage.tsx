import {
  QrCode,
  UserPlus,
} from 'lucide-react'

import { EntradaManualForm } from '../components/EntradaManualForm'
import { useEntradaManual } from '../hooks/useEntradaManual'

import { ValidarIngresoForm } from '@/features/preregistros/components/ValidarIngresoForm'
import { useValidarIngreso } from '@/features/preregistros/hooks/useValidarIngreso'
import { useVisitantes } from '@/features/visitantes/hooks/useVisitantes'
import { LoadingState } from '@/components/feedback/LoadingState'

/** Punto de control de ingreso: valida QR o registra entrada manual (walk-in). */
export function EntradaManualPage() {
  const {
    data: visitantes,
    isLoading,
  } = useVisitantes()

  const entradaManual = useEntradaManual()
  const validarIngreso = useValidarIngreso()

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">
          Control de ingreso
        </h1>

        <p className="mt-1 text-sm text-ink-500">
          Valida un código QR o registra manualmente la entrada de un visitante.
        </p>
      </header>

      {/* Opciones de ingreso */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* QR */}
        <article className="rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-4 border-b border-ink-200 pb-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <QrCode size={21} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-ink-900">
                Validar ingreso por QR
              </h2>

              <p className="mt-1 text-sm leading-6 text-ink-500">
                Verifica un preregistro autorizado antes de permitir el acceso.
              </p>
            </div>
          </div>

          <ValidarIngresoForm
            cargando={validarIngreso.isPending}
            onEnviar={(datos) =>
              validarIngreso.mutate(datos)
            }
          />
        </article>

        {/* Manual */}
        <article className="rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-4 border-b border-ink-200 pb-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <UserPlus size={21} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-ink-900">
                Registrar entrada manual
              </h2>

              <p className="mt-1 text-sm leading-6 text-ink-500">
                Selecciona un visitante existente y registra su ingreso.
              </p>
            </div>
          </div>

          <EntradaManualForm
            visitantes={visitantes ?? []}
            cargando={entradaManual.isPending}
            onEnviar={(datos) =>
              entradaManual.mutate(datos)
            }
          />
        </article>
      </section>

      {/* Ayuda operativa */}
      <section className="rounded-2xl border border-brand-200/60 bg-brand-50/60 p-5">
        <p className="text-sm font-semibold text-ink-900">
          ¿Qué opción debo usar?
        </p>

        <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-ink-500 sm:grid-cols-2">
          <p>
            <span className="font-medium text-ink-700">
              QR:
            </span>{' '}
            para visitantes que ya cuentan con un preregistro autorizado.
          </p>

          <p>
            <span className="font-medium text-ink-700">
              Manual:
            </span>{' '}
            para registrar directamente a un visitante existente.
          </p>
        </div>
      </section>
    </div>
  )
}
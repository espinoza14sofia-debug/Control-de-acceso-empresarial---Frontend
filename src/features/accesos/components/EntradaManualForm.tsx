import {
  CheckCircle2,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

import type { EntradaManualRequest } from '../types/acceso.types'
import type { Visitante } from '@/features/visitantes/types/visitante.types'

interface Props {
  visitantes: Visitante[]
  cargando?: boolean
  onEnviar: (datos: EntradaManualRequest) => void
}

/** Registro walk-in sin QR (PBI 8.2). */
export function EntradaManualForm({
  visitantes,
  cargando,
  onEnviar,
}: Props) {
  const [visitanteSeleccionadoId, setVisitanteSeleccionadoId] =
    useState('')

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<EntradaManualRequest>()

  const visitanteSeleccionado =
    visitantes.find(
      (visitante) =>
        visitante.id === visitanteSeleccionadoId,
    ) ?? null

  return (
    <form
      onSubmit={handleSubmit(onEnviar)}
      className="space-y-5"
    >
      <div>
        <Select
          etiqueta="Visitante"
          placeholder="Selecciona un visitante"
          opciones={visitantes.map((visitante) => ({
            value: visitante.id,
            label: `${visitante.full_name} (${visitante.document_id})`,
          }))}
          {...register('visitanteId', {
            required: true,
          })}
          value={visitanteSeleccionadoId}
          onChange={(event) => {
            const value = event.target.value

            setVisitanteSeleccionadoId(value)

            setValue(
              'visitanteId',
              value,
              {
                shouldValidate: true,
              },
            )
          }}
        />
      </div>

      {visitanteSeleccionado && (
        <div className="rounded-xl border border-ink-200 bg-surface p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
              <UserRound size={18} />
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-ink-900">
                {visitanteSeleccionado.full_name}
              </p>

              <p className="mt-1 text-xs text-ink-500">
                Documento: {visitanteSeleccionado.document_id}
              </p>

              {visitanteSeleccionado.visitor_type && (
                <p className="mt-1 text-xs text-ink-400">
                  Tipo: {visitanteSeleccionado.visitor_type}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          cargando={cargando}
        >
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={17} />
            Registrar entrada
          </span>
        </Button>
      </div>
    </form>
  )
}
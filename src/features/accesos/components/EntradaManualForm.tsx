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
export function EntradaManualForm({ visitantes, cargando, onEnviar }: Props) {
  const { register, handleSubmit } = useForm<EntradaManualRequest>()

  return (
    <form onSubmit={handleSubmit(onEnviar)} className="flex flex-col gap-4">
      <Select
        etiqueta="Visitante"
        placeholder="Selecciona un visitante"
        opciones={visitantes.map((v) => ({ value: v.id, label: `${v.full_name} (${v.document_id})` }))}
        {...register('visitanteId', { required: true })}
      />
      <Button type="submit" cargando={cargando}>
        Registrar entrada
      </Button>
    </form>
  )
}

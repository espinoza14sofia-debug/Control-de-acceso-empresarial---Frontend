import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import type { CrearPreregistroRequest } from '../types/preregistro.types'
import type { Visitante } from '@/features/visitantes/types/visitante.types'
import type { Usuario } from '@/features/usuarios/types/usuario.types'

interface Props {
  visitantes: Visitante[]
  usuarios: Usuario[]
  cargando?: boolean
  onEnviar: (datos: CrearPreregistroRequest) => void
}

/** Campos alineados con CrearPreregistroDto del backend. */
export function PreregistroForm({ visitantes, usuarios, cargando, onEnviar }: Props) {
  const { register, handleSubmit } = useForm<CrearPreregistroRequest>()

  return (
    <form onSubmit={handleSubmit(onEnviar)} className="flex flex-col gap-4">
      <Select
        etiqueta="Visitante"
        placeholder="Selecciona un visitante"
        opciones={visitantes.map((v) => ({ value: v.id, label: `${v.full_name} (${v.document_id})` }))}
        {...register('visitanteId', { required: true })}
      />
      <Select
        etiqueta="Anfitrion (opcional)"
        placeholder="Sin anfitrion asignado"
        opciones={usuarios.map((u) => ({ value: u.id, label: u.full_name }))}
        {...register('usuarioAnfitrionId')}
      />
      <Input etiqueta="Fecha programada" type="date" {...register('fechaProgramada', { required: true })} />
      <Input etiqueta="Hora programada (opcional)" type="time" {...register('horaProgramada')} />
      <Input etiqueta="Motivo (opcional)" {...register('motivo')} />
      <Button type="submit" cargando={cargando}>
        Crear pre-registro
      </Button>
    </form>
  )
}

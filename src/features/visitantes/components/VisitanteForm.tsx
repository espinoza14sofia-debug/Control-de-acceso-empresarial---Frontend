import { useForm, useWatch } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import type { CrearVisitanteRequest, Visitante } from '../types/visitante.types'

interface Props {
  visitanteInicial?: Visitante
  cargando?: boolean
  onEnviar: (datos: CrearVisitanteRequest) => void
}

/** Si tipoVisitante=proveedor, empresaProveedora es obligatoria (regla real del backend). */
export function VisitanteForm({ visitanteInicial, cargando, onEnviar }: Props) {
  const { register, handleSubmit, control } = useForm<CrearVisitanteRequest>({
    defaultValues: visitanteInicial
      ? {
          nombreCompleto: visitanteInicial.full_name,
          documentoIdentidad: visitanteInicial.document_id,
          telefono: visitanteInicial.phone ?? undefined,
          tipoVisitante: visitanteInicial.visitor_type,
          empresaProveedora: visitanteInicial.provider_company ?? undefined,
        }
      : { tipoVisitante: 'personal' },
  })

  const tipoSeleccionado = useWatch({ control, name: 'tipoVisitante' })

  return (
    <form onSubmit={handleSubmit(onEnviar)} className="flex flex-col gap-4">
      <Input etiqueta="Nombre completo" {...register('nombreCompleto', { required: true })} />
      <Input etiqueta="Documento de identidad" {...register('documentoIdentidad', { required: true })} />
      <Input etiqueta="Telefono (opcional)" {...register('telefono')} />
      <Select
        etiqueta="Tipo de visitante"
        opciones={[
          { value: 'personal', label: 'Personal' },
          { value: 'proveedor', label: 'Proveedor' },
          { value: 'contratista', label: 'Contratista' },
        ]}
        {...register('tipoVisitante', { required: true })}
      />
      {tipoSeleccionado === 'proveedor' && (
        <Input etiqueta="Empresa proveedora" {...register('empresaProveedora', { required: true })} />
      )}
      <Button type="submit" cargando={cargando}>
        {visitanteInicial ? 'Guardar cambios' : 'Registrar visitante'}
      </Button>
    </form>
  )
}

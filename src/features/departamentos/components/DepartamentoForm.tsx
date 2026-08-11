import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { CrearDepartamentoRequest, Departamento } from '../types/departamento.types'

interface Props {
  departamentoInicial?: Departamento
  cargando?: boolean
  onEnviar: (datos: CrearDepartamentoRequest) => void
}

export function DepartamentoForm({ departamentoInicial, cargando, onEnviar }: Props) {
  const { register, handleSubmit } = useForm<CrearDepartamentoRequest>({
    defaultValues: departamentoInicial
      ? { nombre: departamentoInicial.name, descripcion: departamentoInicial.description ?? undefined }
      : undefined,
  })

  return (
    <form onSubmit={handleSubmit(onEnviar)} className="flex flex-col gap-4">
      <Input etiqueta="Nombre" {...register('nombre', { required: true })} />
      <Input etiqueta="Descripcion (opcional)" {...register('descripcion')} />
      <Button type="submit" cargando={cargando}>
        {departamentoInicial ? 'Guardar cambios' : 'Crear departamento'}
      </Button>
    </form>
  )
}

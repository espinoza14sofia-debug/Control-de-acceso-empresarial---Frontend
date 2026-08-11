import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { ROLES, ETIQUETA_ROL } from '@/constants/roles'
import type { CrearUsuarioRequest, Usuario } from '../types/usuario.types'
import type { Departamento } from '@/features/departamentos/types/departamento.types'

interface Props {
  usuarioInicial?: Usuario
  departamentos: Departamento[]
  cargando?: boolean
  onEnviar: (datos: CrearUsuarioRequest) => void
}

/** Campos alineados con CrearUsuarioDto / ActualizarUsuarioDto del backend. */
export function UsuarioForm({ usuarioInicial, departamentos, cargando, onEnviar }: Props) {
  const { register, handleSubmit } = useForm<CrearUsuarioRequest>({
    defaultValues: usuarioInicial
      ? {
          nombreCompleto: usuarioInicial.full_name,
          email: usuarioInicial.email,
          rol: usuarioInicial.role,
          departamentoId: usuarioInicial.department_id ?? undefined,
        }
      : undefined,
  })

  return (
    <form onSubmit={handleSubmit(onEnviar)} className="flex flex-col gap-4">
      <Input etiqueta="Nombre completo" {...register('nombreCompleto', { required: true })} />
      <Input etiqueta="Correo electronico" type="email" disabled={!!usuarioInicial} {...register('email', { required: true })} />
      <Select
        etiqueta="Rol"
        opciones={Object.values(ROLES).map((rol) => ({ value: rol, label: ETIQUETA_ROL[rol] }))}
        {...register('rol', { required: true })}
      />
      <Select
        etiqueta="Departamento (opcional)"
        placeholder="Sin departamento"
        opciones={departamentos.map((d) => ({ value: d.id, label: d.name }))}
        {...register('departamentoId')}
      />
      <Button type="submit" cargando={cargando}>
        {usuarioInicial ? 'Guardar cambios' : 'Crear usuario'}
      </Button>
    </form>
  )
}

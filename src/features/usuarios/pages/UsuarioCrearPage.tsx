import { useNavigate } from 'react-router-dom'
import { UsuarioForm } from '../components/UsuarioForm'
import { useCrearUsuario } from '../hooks/useCrearUsuario'
import { useDepartamentos } from '@/features/departamentos/hooks/useDepartamentos'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RUTAS } from '@/constants/rutas'

export function UsuarioCrearPage() {
  const navigate = useNavigate()
  const { data: departamentos, isLoading } = useDepartamentos()
  const crear = useCrearUsuario()

  if (isLoading) return <LoadingState />

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6CCB2] text-[#7F5539]">
            <span className="material-symbols-outlined">
              person_add
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#7F5539]">
              Crear nuevo usuario
            </h1>

            <p className="mt-1 text-sm text-[#9C6644]">
              Registra un nuevo usuario en el sistema.
            </p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="rounded-2xl border border-[#DDB892]/40 bg-white p-6 shadow-[0_4px_12px_rgba(127,85,57,0.08)]">
        <UsuarioForm
          departamentos={departamentos ?? []}
          cargando={crear.isPending}
          onEnviar={(datos) =>
            crear.mutate(datos, {
              onSuccess: () => navigate(RUTAS.USUARIOS),
            })
          }
        />
      </div>
    </div>
  )
}

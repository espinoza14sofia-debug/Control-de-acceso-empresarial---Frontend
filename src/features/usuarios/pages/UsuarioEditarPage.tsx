import { useNavigate, useParams } from 'react-router-dom'
import { UsuarioForm } from '../components/UsuarioForm'
import { SubirFotoUsuario } from '../components/SubirFotoUsuario'
import { useUsuario } from '../hooks/useUsuario'
import { useActualizarUsuario } from '../hooks/useActualizarUsuario'
import { useDepartamentos } from '@/features/departamentos/hooks/useDepartamentos'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RUTAS } from '@/constants/rutas'

export function UsuarioEditarPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: usuario, isLoading, isError } = useUsuario(id)
  const { data: departamentos } = useDepartamentos()
  const actualizar = useActualizarUsuario()

  if (isLoading) return <LoadingState />

  if (isError || !usuario) {
    return (
      <ErrorState mensaje="No se pudo cargar el usuario." />
    )
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6CCB2] text-[#7F5539]">
            <span className="material-symbols-outlined">
              edit
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#7F5539]">
              Editar usuario
            </h1>

            <p className="text-sm text-[#9C6644]">
              Actualiza la información del usuario.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(RUTAS.USUARIOS)}
          className="flex items-center justify-center gap-2 rounded-lg border border-[#DDB892] px-4 py-2 text-sm font-medium text-[#7F5539] transition hover:bg-[#EDE0D4]"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          Regresar
        </button>
      </div>

      {/* Información */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

        {/* Foto */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-[#DDB892]/40 bg-white p-6 shadow-[0_4px_12px_rgba(127,85,57,0.08)]">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-[#7F5539]">
              <span className="material-symbols-outlined">
                person
              </span>
              Foto del usuario
            </h2>

            <SubirFotoUsuario
              usuarioId={usuario.id}
              fotoActual={usuario.photo_url}
            />
          </div>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-[#DDB892]/40 bg-white p-6 shadow-[0_4px_12px_rgba(127,85,57,0.08)]">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-[#7F5539]">
              <span className="material-symbols-outlined">
                badge
              </span>
              Información del usuario
            </h2>

            <UsuarioForm
              usuarioInicial={usuario}
              departamentos={departamentos ?? []}
              cargando={actualizar.isPending}
              onEnviar={(datos) =>
                actualizar.mutate(
                  {
                    id: usuario.id,
                    datos,
                  },
                  {
                    onSuccess: () =>
                      navigate(RUTAS.USUARIOS),
                  },
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

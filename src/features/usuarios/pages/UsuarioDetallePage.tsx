import { useParams, Link } from 'react-router-dom'
import { useUsuario } from '../hooks/useUsuario'
import { BadgeRol } from '../components/BadgeRol'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RUTAS } from '@/constants/rutas'

export function UsuarioDetallePage() {
  const { id } = useParams<{ id: string }>()
  const { data: usuario, isLoading, isError } = useUsuario(id)

  if (isLoading) return <LoadingState />

  if (isError || !usuario) {
    return <ErrorState mensaje="No se pudo cargar el usuario." />
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            to={RUTAS.USUARIOS}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#ddb892] bg-white text-[#7f5539] transition-colors hover:bg-[#e6ccb2]"
            title="Regresar"
          >
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#ddb892] bg-[#e6ccb2] shadow-[0_4px_12px_rgba(127,85,57,0.08)]">
              {usuario.photo_url ? (
                <img
                  src={usuario.photo_url}
                  alt={usuario.full_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#7f5539]">
                  <span className="material-symbols-outlined text-3xl">
                    person
                  </span>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#7f5539]">
                {usuario.full_name}
              </h1>

              <p className="text-sm text-[#9c6644]">
                {usuario.email}
              </p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap gap-3">
          <Link
            to={RUTAS.USUARIOS}
            className="flex items-center gap-2 rounded-lg border border-[#ddb892] bg-white px-4 py-2 text-sm font-medium text-[#7f5539] shadow-sm transition-colors hover:bg-[#e6ccb2]"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            Regresar
          </Link>
        </div>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Información personal */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Card className="rounded-xl border border-[#ddb892]/40 bg-white p-6 shadow-[0_4px_12px_rgba(127,85,57,0.08)]">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-[#7f5539]">
              <span className="material-symbols-outlined text-[#9c6644]">
                person
              </span>
              Información del usuario
            </h2>

            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#b08968]">
                  Nombre completo
                </p>

                <p className="mt-1 text-sm font-medium text-[#7f5539]">
                  {usuario.full_name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#b08968]">
                  Email
                </p>

                <p className="mt-1 break-all text-sm font-medium text-[#7f5539]">
                  {usuario.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#b08968]">
                  Rol
                </p>

                <div className="mt-2">
                  <BadgeRol rol={usuario.role} />
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#b08968]">
                  Estado
                </p>

                <div className="mt-2">
                  <Badge
                    tono={usuario.is_active ? 'exito' : 'peligro'}
                  >
                    {usuario.is_active ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Estado */}
          <Card className="rounded-xl border border-[#ddb892]/40 bg-white p-6 shadow-[0_4px_12px_rgba(127,85,57,0.08)]">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#7f5539]">
              <span className="material-symbols-outlined text-[#9c6644]">
                verified_user
              </span>
              Estado de acceso
            </h2>

            <div className="flex items-center gap-3 rounded-lg bg-[#ede0d4] p-4">
              <div
                className={`h-3 w-3 rounded-full ${
                  usuario.is_active
                    ? 'bg-[#7f5539]'
                    : 'bg-[#b08968]'
                }`}
              />

              <div>
                <p className="text-sm font-semibold text-[#7f5539]">
                  {usuario.is_active
                    ? 'Usuario activo'
                    : 'Usuario inactivo'}
                </p>

                <p className="mt-0.5 text-xs text-[#9c6644]">
                  {usuario.is_active
                    ? 'El usuario tiene acceso habilitado.'
                    : 'El acceso del usuario está deshabilitado.'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Panel derecho */}
        <div className="lg:col-span-8">
          <Card className="h-full rounded-xl border border-[#ddb892]/40 bg-white p-6 shadow-[0_4px_12px_rgba(127,85,57,0.08)]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ede0d4] text-[#7f5539]">
                <span className="material-symbols-outlined">
                  manage_accounts
                </span>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#7f5539]">
                  Información de acceso
                </h2>

                <p className="text-sm text-[#9c6644]">
                  Datos actuales del usuario.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[#ddb892]/40 bg-[#ede0d4]/50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#b08968]">
                  Rol asignado
                </p>

                <div className="mt-2">
                  <BadgeRol rol={usuario.role} />
                </div>
              </div>

              <div className="rounded-lg border border-[#ddb892]/40 bg-[#ede0d4]/50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#b08968]">
                  Estado
                </p>

                <div className="mt-2">
                  <Badge
                    tono={usuario.is_active ? 'exito' : 'peligro'}
                  >
                    {usuario.is_active
                      ? 'Activo'
                      : 'Inactivo'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-dashed border-[#ddb892] bg-[#e6ccb2]/20 p-5">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-[#9c6644]">
                  info
                </span>

                <div>
                  <p className="text-sm font-semibold text-[#7f5539]">
                    Información del sistema
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#9c6644]">
                    Este panel muestra la información disponible
                    actualmente para este usuario.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
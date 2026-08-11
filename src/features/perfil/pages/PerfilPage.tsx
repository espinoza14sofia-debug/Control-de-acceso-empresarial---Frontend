import { useAuth } from '@/hooks/useAuth'
import { Card } from '@/components/ui/Card'
import { BadgeRol } from '@/features/usuarios/components/BadgeRol'

/**
 * El backend no expone GET /auth/me: el perfil mostrado aqui es el que
 * quedo guardado en sesion desde la respuesta de /auth/login (ver
 * AuthContext y 05-FLUJO-DATOS-Y-RECOMENDACIONES.md).
 */
export function PerfilPage() {
  const { usuario } = useAuth()
  if (!usuario) return null

  return (
    <Card className="max-w-md">
      <h1 className="mb-4 text-xl font-semibold text-ink-900">Mi perfil</h1>
      <dl className="flex flex-col gap-3 text-sm">
        <div>
          <dt className="text-ink-500">Nombre</dt>
          <dd className="font-medium text-ink-900">{usuario.full_name}</dd>
        </div>
        <div>
          <dt className="text-ink-500">Correo</dt>
          <dd className="font-medium text-ink-900">{usuario.email}</dd>
        </div>
        <div>
          <dt className="text-ink-500">Rol</dt>
          <dd>
            <BadgeRol rol={usuario.role} />
          </dd>
        </div>
      </dl>
    </Card>
  )
}

import { useState } from 'react'
import { Pencil } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BadgeRol } from '@/features/usuarios/components/BadgeRol'
import { PerfilForm } from '../components/PerfilForm'
import { useActualizarPerfil } from '../hooks/useActualizarPerfil'

/**
 * El backend no expone GET /auth/me: el perfil mostrado aqui es el que
 * quedo guardado en sesion desde la respuesta de /auth/login (ver
 * AuthContext y 05-FLUJO-DATOS-Y-RECOMENDACIONES.md). Al editar, se
 * reusa el mismo endpoint PATCH /usuarios/:id del modulo Usuarios.
 */
export function PerfilPage() {
    const { usuario } = useAuth()
    const [editando, setEditando] = useState(false)
    const actualizarPerfil = useActualizarPerfil()

    if (!usuario) return null

    return (
        <Card className="max-w-md">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-ink-900">Mi perfil</h1>

                {!editando && (
                    <Button variante="fantasma" onClick={() => setEditando(true)}>
                        <Pencil size={15} />
                        Editar
                    </Button>
                )}
            </div>

            {editando ? (
                <PerfilForm
                    nombreActual={usuario.full_name}
                    cargando={actualizarPerfil.isPending}
                    onEnviar={(datos) =>
                        actualizarPerfil.mutate(datos, { onSuccess: () => setEditando(false) })
                    }
                    onCancelar={() => setEditando(false)}
                />
            ) : (
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
            )}
        </Card>
    )
}
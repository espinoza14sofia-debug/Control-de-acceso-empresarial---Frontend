import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import type { UsuarioSesion } from '@/features/auth/types/auth.types'
import { autenticacionService } from '@/features/auth/services/autenticacionService'
import { guardarTokens, limpiarTokens, obtenerAccessToken } from '@/services/apiClient'

const USUARIO_STORAGE_KEY = 'controlacceso.usuario'

interface AuthContextValue {
    usuario: UsuarioSesion | null
    estaAutenticado: boolean
    cargandoSesion: boolean
    iniciarSesion: (email: string, password: string) => Promise<void>
    cerrarSesion: () => Promise<void>
    actualizarUsuarioSesion: (datos: Partial<UsuarioSesion>) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

/**
 * El backend no expone GET /auth/me, asi que el perfil del usuario solo
 * se obtiene una vez, en la respuesta de /auth/login. Lo persistimos
 * junto al token para poder restaurar la sesion al recargar la pagina
 * (ver 05-FLUJO-DATOS-Y-RECOMENDACIONES.md del documento de arquitectura).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null)
  const [cargandoSesion, setCargandoSesion] = useState(true)

  useEffect(() => {
    const token = obtenerAccessToken()
    const usuarioGuardado = localStorage.getItem(USUARIO_STORAGE_KEY)
    if (token && usuarioGuardado && usuarioGuardado !== 'undefined') {
      try {
        setUsuario(JSON.parse(usuarioGuardado) as UsuarioSesion)
      } catch {
        limpiarTokens()
        localStorage.removeItem(USUARIO_STORAGE_KEY)
      }
    }
    setCargandoSesion(false)
  }, [])

  const iniciarSesion = useCallback(async (email: string, password: string) => {
    const respuesta = await autenticacionService.login({ email, password })
    guardarTokens(respuesta.accessToken, respuesta.refreshToken)
    localStorage.setItem(USUARIO_STORAGE_KEY, JSON.stringify(respuesta.usuario))
    setUsuario(respuesta.usuario)
  }, [])

    const cerrarSesion = useCallback(async () => {
        try {
            await autenticacionService.logout()
        } finally {
            limpiarTokens()
            localStorage.removeItem(USUARIO_STORAGE_KEY)
            setUsuario(null)
        }
    }, [])

    const actualizarUsuarioSesion = useCallback((datos: Partial<UsuarioSesion>) => {
        setUsuario((actual) => {
            if (!actual) return actual
            const actualizado = { ...actual, ...datos }
            localStorage.setItem(USUARIO_STORAGE_KEY, JSON.stringify(actualizado))
            return actualizado
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                usuario,
                estaAutenticado: !!usuario,
                cargandoSesion,
                iniciarSesion,
                cerrarSesion,
                actualizarUsuarioSesion,
            }}
        >
      {children}
    </AuthContext.Provider>
  )
}


import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

/** Acceso al usuario logueado, su rol, y las acciones de sesion. */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return context
}

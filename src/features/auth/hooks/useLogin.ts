import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RUTAS } from '@/constants/rutas'

export function useLogin() {
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (datos: { email: string; password: string }) =>
      iniciarSesion(datos.email, datos.password),
    onSuccess: () => {
      navigate(RUTAS.DASHBOARD)
    },
  })
}

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RUTAS } from '@/constants/rutas'

export function useLogout() {
  const { cerrarSesion } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: cerrarSesion,
    onSettled: () => {
      navigate(RUTAS.LOGIN)
    },
  })
}

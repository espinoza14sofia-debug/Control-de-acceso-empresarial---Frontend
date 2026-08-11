import { useQuery } from '@tanstack/react-query'
import { departamentoService } from '../services/departamentoService'

export function useDepartamentos() {
  return useQuery({
    queryKey: ['departamentos'],
    queryFn: departamentoService.listar,
  })
}

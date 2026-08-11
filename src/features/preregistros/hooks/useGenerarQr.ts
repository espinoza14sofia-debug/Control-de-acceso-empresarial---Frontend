import { useQuery } from '@tanstack/react-query'
import { preregistroService } from '../services/preregistroService'

export function useGenerarQr(preregistroId: string | undefined) {
  return useQuery({
    queryKey: ['preregistros', preregistroId, 'qr'],
    queryFn: () => preregistroService.generarQr(preregistroId!),
    enabled: !!preregistroId,
  })
}

import { useNavigate } from 'react-router-dom'
import { PreregistroForm } from '../components/PreregistroForm'
import { useCrearPreregistro } from '../hooks/useCrearPreregistro'
import { useVisitantes } from '@/features/visitantes/hooks/useVisitantes'
import { useUsuarios } from '@/features/usuarios/hooks/useUsuarios'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RUTAS } from '@/constants/rutas'

export function PreregistroCrearPage() {
  const navigate = useNavigate()
  const { data: visitantes, isLoading: cargandoVisitantes } = useVisitantes()
  const { data: usuarios, isLoading: cargandoUsuarios } = useUsuarios()
  const crear = useCrearPreregistro()

  if (cargandoVisitantes || cargandoUsuarios) return <LoadingState />

  return (
    <div className="max-w-lg">
      <h1 className="mb-4 text-xl font-semibold text-ink-900">Nuevo pre-registro de visita</h1>
      <PreregistroForm
        visitantes={visitantes ?? []}
        usuarios={usuarios ?? []}
        cargando={crear.isPending}
        onEnviar={(datos) =>
          crear.mutate(datos, {
            onSuccess: (preregistro) => navigate(RUTAS.PREREGISTRO_QR(preregistro.id)),
          })
        }
      />
    </div>
  )
}

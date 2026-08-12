import {
  Building2,
  IdCard,
  Phone,
  Save,
  UserRound,
} from 'lucide-react'
import {
  useForm,
  useWatch,
} from 'react-hook-form'

import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

import type {
  CrearVisitanteRequest,
  Visitante,
} from '../types/visitante.types'

interface Props {
  visitanteInicial?: Visitante
  cargando?: boolean
  onEnviar: (
    datos: CrearVisitanteRequest,
  ) => void
}

export function VisitanteForm({
  visitanteInicial,
  cargando,
  onEnviar,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
  } = useForm<CrearVisitanteRequest>({
    defaultValues: visitanteInicial
      ? {
          nombreCompleto:
            visitanteInicial.full_name,

          documentoIdentidad:
            visitanteInicial.document_id,

          telefono:
            visitanteInicial.phone ??
            undefined,

          tipoVisitante:
            visitanteInicial.visitor_type,

          empresaProveedora:
            visitanteInicial.provider_company ??
            undefined,
        }
      : {
          tipoVisitante: 'personal',
        },
  })

  const tipoSeleccionado = useWatch({
    control,
    name: 'tipoVisitante',
  })

  return (
    <form
      onSubmit={handleSubmit(onEnviar)}
      className="space-y-5"
    >
      {/* Datos personales */}
      <section>
        <div className="mb-4">
          <p className="text-sm font-semibold text-ink-900">
            Información personal
          </p>

          <p className="mt-1 text-xs text-ink-400">
            Datos principales del visitante.
          </p>
        </div>

        <div className="space-y-4 rounded-xl bg-surface p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-ink-500">
            <UserRound size={15} />
            Datos de identificación
          </div>

          <Input
            etiqueta="Nombre completo"
            {...register(
              'nombreCompleto',
              {
                required: true,
              },
            )}
          />

          <Input
            etiqueta="Documento de identidad"
            {...register(
              'documentoIdentidad',
              {
                required: true,
              },
            )}
          />

          <Input
            etiqueta="Teléfono (opcional)"
            {...register('telefono')}
          />
        </div>
      </section>

      {/* Tipo */}
      <section>
        <div className="mb-4">
          <p className="text-sm font-semibold text-ink-900">
            Tipo de visitante
          </p>

          <p className="mt-1 text-xs text-ink-400">
            Define la relación del visitante con la empresa.
          </p>
        </div>

        <div className="space-y-4 rounded-xl bg-surface p-4">
          <Select
            etiqueta="Tipo de visitante"
            opciones={[
              {
                value: 'personal',
                label: 'Personal',
              },
              {
                value: 'proveedor',
                label: 'Proveedor',
              },
              {
                value: 'contratista',
                label: 'Contratista',
              },
            ]}
            {...register(
              'tipoVisitante',
              {
                required: true,
              },
            )}
          />

          {tipoSeleccionado ===
            'proveedor' && (
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs text-ink-500">
                <Building2 size={14} />
                Información del proveedor
              </div>

              <Input
                etiqueta="Empresa proveedora"
                {...register(
                  'empresaProveedora',
                  {
                    required: true,
                  },
                )}
              />
            </div>
          )}
        </div>
      </section>

      {/* Resumen visual */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-xs text-brand-600">
          <UserRound size={14} />
          Persona
        </div>

        <div className="flex items-center justify-center gap-2 rounded-xl bg-surface px-3 py-2 text-xs text-ink-500">
          <IdCard size={14} />
          Documento
        </div>

        <div className="flex items-center justify-center gap-2 rounded-xl bg-surface px-3 py-2 text-xs text-ink-500">
          <Phone size={14} />
          Contacto
        </div>
      </div>

      {/* Guardar */}
      <div className="flex justify-end border-t border-ink-200 pt-4">
        <Button
          type="submit"
          cargando={cargando}
        >
          <span className="inline-flex items-center gap-2">
            <Save size={16} />

            {visitanteInicial
              ? 'Guardar cambios'
              : 'Registrar visitante'}
          </span>
        </Button>
      </div>
    </form>
  )
}

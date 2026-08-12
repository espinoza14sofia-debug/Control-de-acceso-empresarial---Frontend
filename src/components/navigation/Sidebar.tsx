import {
  Activity,
  Building2,
  ClipboardList,
  DoorOpen,
  FileBarChart,
  History,
  LayoutDashboard,
  ShieldCheck,
  UserRound,
  Users,
  UserCheck,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'
import { RUTAS } from '@/constants/rutas'
import { ROLES, type Rol } from '@/constants/roles'

interface ItemMenu {
  etiqueta: string
  ruta: string
  rolesPermitidos: Rol[]
  icono: typeof LayoutDashboard
  grupo: 'principal' | 'operacion' | 'gestion' | 'informacion'
}

/**
 * Matriz rol -> modulo replicando exactamente los decoradores @Roles(...)
 * de cada controlador del backend, para no anunciar secciones que el
 * usuario no podra usar.
 */
const ITEMS_MENU: ItemMenu[] = [
  {
    etiqueta: 'Dashboard',
    ruta: RUTAS.DASHBOARD,
    rolesPermitidos: [
      ROLES.ADMIN,
      ROLES.RECEPTIONIST,
      ROLES.SECURITY,
      ROLES.EMPLOYEE,
    ],
    icono: LayoutDashboard,
    grupo: 'principal',
  },
  {
    etiqueta: 'Usuarios y empleados',
    ruta: RUTAS.USUARIOS,
    rolesPermitidos: [ROLES.ADMIN],
    icono: Users,
    grupo: 'gestion',
  },
  {
    etiqueta: 'Departamentos',
    ruta: RUTAS.DEPARTAMENTOS,
    rolesPermitidos: [ROLES.ADMIN],
    icono: Building2,
    grupo: 'gestion',
  },
  {
    etiqueta: 'Visitantes',
    ruta: RUTAS.VISITANTES,
    rolesPermitidos: [
      ROLES.ADMIN,
      ROLES.RECEPTIONIST,
      ROLES.SECURITY,
    ],
    icono: UserRound,
    grupo: 'operacion',
  },
  {
    etiqueta: 'Visitas de hoy',
    ruta: RUTAS.VISITAS_HOY,
    rolesPermitidos: [
      ROLES.ADMIN,
      ROLES.RECEPTIONIST,
      ROLES.SECURITY,
    ],
    icono: ClipboardList,
    grupo: 'operacion',
  },
  {
    etiqueta: 'Nuevo pre-registro',
    ruta: RUTAS.PREREGISTRO_NUEVO,
    rolesPermitidos: [
      ROLES.ADMIN,
      ROLES.RECEPTIONIST,
      ROLES.EMPLOYEE,
    ],
    icono: UserCheck,
    grupo: 'operacion',
  },
  {
    etiqueta: 'Control de ingreso',
    ruta: RUTAS.CONTROL_INGRESO,
    rolesPermitidos: [
      ROLES.ADMIN,
      ROLES.RECEPTIONIST,
      ROLES.SECURITY,
    ],
    icono: DoorOpen,
    grupo: 'operacion',
  },
  {
    etiqueta: 'Presencia actual',
    ruta: RUTAS.PRESENCIA,
    rolesPermitidos: [
      ROLES.ADMIN,
      ROLES.RECEPTIONIST,
      ROLES.SECURITY,
    ],
    icono: Activity,
    grupo: 'operacion',
  },
  {
    etiqueta: 'Historial de accesos',
    ruta: RUTAS.HISTORIAL_ACCESOS,
    rolesPermitidos: [
      ROLES.ADMIN,
      ROLES.RECEPTIONIST,
      ROLES.SECURITY,
    ],
    icono: History,
    grupo: 'informacion',
  },
  {
    etiqueta: 'Visitantes frecuentes',
    ruta: RUTAS.VISITANTES_FRECUENTES,
    rolesPermitidos: [ROLES.ADMIN],
    icono: UserRound,
    grupo: 'informacion',
  },
  {
    etiqueta: 'Reportes',
    ruta: RUTAS.REPORTES,
    rolesPermitidos: [ROLES.ADMIN],
    icono: FileBarChart,
    grupo: 'informacion',
  },
  {
    etiqueta: 'Auditoria',
    ruta: RUTAS.AUDITORIA,
    rolesPermitidos: [ROLES.ADMIN],
    icono: ShieldCheck,
    grupo: 'informacion',
  },
]

const GRUPOS = [
  {
    id: 'principal',
    etiqueta: 'Principal',
  },
  {
    id: 'operacion',
    etiqueta: 'Operación',
  },
  {
    id: 'gestion',
    etiqueta: 'Gestión',
  },
  {
    id: 'informacion',
    etiqueta: 'Información',
  },
] as const

export function Sidebar() {
  const { usuario } = useAuth()

  if (!usuario) return null

  const itemsVisibles = ITEMS_MENU.filter((item) =>
    item.rolesPermitidos.includes(usuario.role),
  )

  return (
    <aside className="hidden w-64 shrink-0 border-r border-ink-200 bg-white lg:flex lg:flex-col">
      {/* Marca */}
      <div className="flex h-20 items-center border-b border-ink-200 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
            <ShieldCheck size={21} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink-900">
              ControlAcceso
            </p>

            <p className="truncate text-xs text-ink-400">
              Gestión empresarial
            </p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto px-4 py-5">
        <div className="space-y-6">
          {GRUPOS.map((grupo) => {
            const itemsGrupo = itemsVisibles.filter(
              (item) => item.grupo === grupo.id,
            )

            if (itemsGrupo.length === 0) {
              return null
            }

            return (
              <div key={grupo.id}>
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-400">
                  {grupo.etiqueta}
                </p>

                <div className="space-y-1">
                  {itemsGrupo.map((item) => {
                    const Icono = item.icono

                    return (
                      <NavLink
                        key={item.ruta}
                        to={item.ruta}
                        className={({ isActive }) =>
                          [
                            'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                            isActive
                              ? 'bg-brand-50 text-brand-700 shadow-sm'
                              : 'text-ink-600 hover:bg-surface hover:text-ink-900',
                          ].join(' ')
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <div
                              className={[
                                'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                                isActive
                                  ? 'bg-white text-brand-600 shadow-sm'
                                  : 'text-ink-400 group-hover:bg-white group-hover:text-brand-600',
                              ].join(' ')}
                            >
                              <Icono size={17} strokeWidth={2} />
                            </div>

                            <span className="truncate">
                              {item.etiqueta}
                            </span>
                          </>
                        )}
                      </NavLink>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </nav>

      {/* Estado inferior */}
      <div className="border-t border-ink-200 p-4">
        <div className="rounded-2xl bg-brand-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
              <ShieldCheck size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink-900">
                Sistema protegido
              </p>

              <p className="mt-1 text-xs leading-5 text-ink-500">
                Control y monitoreo de accesos en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
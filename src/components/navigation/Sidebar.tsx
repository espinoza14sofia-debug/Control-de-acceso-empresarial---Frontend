import { NavLink } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RUTAS } from '@/constants/rutas'
import { ROLES, type Rol } from '@/constants/roles'

interface ItemMenu {
  etiqueta: string
  ruta: string
  rolesPermitidos: Rol[]
}

/**
 * Matriz rol -> modulo replicando exactamente los decoradores @Roles(...)
 * de cada controlador del backend, para no anunciar secciones que el
 * usuario no podra usar.
 */
const ITEMS_MENU: ItemMenu[] = [
  { etiqueta: 'Dashboard', ruta: RUTAS.DASHBOARD, rolesPermitidos: [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.SECURITY, ROLES.EMPLOYEE] },
  { etiqueta: 'Usuarios y empleados', ruta: RUTAS.USUARIOS, rolesPermitidos: [ROLES.ADMIN] },
  { etiqueta: 'Departamentos', ruta: RUTAS.DEPARTAMENTOS, rolesPermitidos: [ROLES.ADMIN] },
  { etiqueta: 'Visitantes', ruta: RUTAS.VISITANTES, rolesPermitidos: [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.SECURITY] },
  { etiqueta: 'Visitas de hoy', ruta: RUTAS.VISITAS_HOY, rolesPermitidos: [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.SECURITY] },
  { etiqueta: 'Nuevo pre-registro', ruta: RUTAS.PREREGISTRO_NUEVO, rolesPermitidos: [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.EMPLOYEE] },
  { etiqueta: 'Control de ingreso', ruta: RUTAS.CONTROL_INGRESO, rolesPermitidos: [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.SECURITY] },
  { etiqueta: 'Presencia actual', ruta: RUTAS.PRESENCIA, rolesPermitidos: [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.SECURITY] },
  { etiqueta: 'Historial de accesos', ruta: RUTAS.HISTORIAL_ACCESOS, rolesPermitidos: [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.SECURITY] },
  { etiqueta: 'Visitantes frecuentes', ruta: RUTAS.VISITANTES_FRECUENTES, rolesPermitidos: [ROLES.ADMIN] },
  { etiqueta: 'Reportes', ruta: RUTAS.REPORTES, rolesPermitidos: [ROLES.ADMIN] },
  { etiqueta: 'Auditoria', ruta: RUTAS.AUDITORIA, rolesPermitidos: [ROLES.ADMIN] },
]

export function Sidebar() {
  const { usuario } = useAuth()
  if (!usuario) return null

  const itemsVisibles = ITEMS_MENU.filter((item) => item.rolesPermitidos.includes(usuario.role))

  return (
    <aside className="hidden w-64 shrink-0 border-r border-ink-300/50 bg-white p-4 md:block">
      <nav className="flex flex-col gap-1">
        {itemsVisibles.map((item) => (
          <NavLink
            key={item.ruta}
            to={item.ruta}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-surface'
              }`
            }
          >
            {item.etiqueta}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { AppLayout } from '@/layouts/AppLayout'
import { ProtectedRoute } from '@/components/navigation/ProtectedRoute'
import { RoleRoute } from '@/components/navigation/RoleRoute'
import { ROLES } from '@/constants/roles'
import { RUTAS } from '@/constants/rutas'

import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RecuperarPasswordPage } from '@/features/auth/pages/RecuperarPasswordPage'
import { RestablecerPasswordPage } from '@/features/auth/pages/RestablecerPasswordPage'

import { DashboardPage } from '@/features/tablero/pages/DashboardPage'
import { PerfilPage } from '@/features/perfil/pages/PerfilPage'

import { UsuariosListPage } from '@/features/usuarios/pages/UsuariosListPage'
import { UsuarioCrearPage } from '@/features/usuarios/pages/UsuarioCrearPage'
import { UsuarioEditarPage } from '@/features/usuarios/pages/UsuarioEditarPage'
import { UsuarioDetallePage } from '@/features/usuarios/pages/UsuarioDetallePage'

import { DepartamentosPage } from '@/features/departamentos/pages/DepartamentosPage'

import { VisitantesListPage } from '@/features/visitantes/pages/VisitantesListPage'
import { VisitanteHistorialPage } from '@/features/visitantes/pages/VisitanteHistorialPage'

import { VisitasDeHoyPage } from '@/features/preregistros/pages/VisitasDeHoyPage'
import { PreregistroCrearPage } from '@/features/preregistros/pages/PreregistroCrearPage'
import { PreregistroQrPage } from '@/features/preregistros/pages/PreregistroQrPage'

import { EntradaManualPage } from '@/features/accesos/pages/EntradaManualPage'
import { PresenciaActualPage } from '@/features/accesos/pages/PresenciaActualPage'
import { HistorialAccesosPage } from '@/features/accesos/pages/HistorialAccesosPage'
import { VisitantesFrecuentesPage } from '@/features/accesos/pages/VisitantesFrecuentesPage'
import { ReportesPage } from '@/features/accesos/pages/ReportesPage'

import { AuditoriaPage } from '@/features/auditoria/pages/AuditoriaPage'

/**
 * Arbol de rutas. Cada <RoleRoute rolesPermitidos={...}> replica
 * exactamente el decorador @Roles(...) del endpoint backend
 * correspondiente (ver 04-PAGINAS-RUTAS-ESTADO.md).
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={RUTAS.LOGIN} replace />} />

      <Route element={<AuthLayout />}>
        <Route path={RUTAS.LOGIN} element={<LoginPage />} />
        <Route path={RUTAS.RECUPERAR_PASSWORD} element={<RecuperarPasswordPage />} />
        <Route path={RUTAS.RESTABLECER_PASSWORD} element={<RestablecerPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            element={<RoleRoute rolesPermitidos={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.SECURITY, ROLES.EMPLOYEE]} />}
          >
            <Route path={RUTAS.DASHBOARD} element={<DashboardPage />} />
            <Route path={RUTAS.PERFIL} element={<PerfilPage />} />
          </Route>

          <Route element={<RoleRoute rolesPermitidos={[ROLES.ADMIN]} />}>
            <Route path={RUTAS.USUARIOS} element={<UsuariosListPage />} />
            <Route path={RUTAS.USUARIO_NUEVO} element={<UsuarioCrearPage />} />
            <Route path="/app/usuarios/:id" element={<UsuarioDetallePage />} />
            <Route path="/app/usuarios/:id/editar" element={<UsuarioEditarPage />} />
            <Route path={RUTAS.DEPARTAMENTOS} element={<DepartamentosPage />} />
            <Route path={RUTAS.VISITANTES_FRECUENTES} element={<VisitantesFrecuentesPage />} />
            <Route path={RUTAS.REPORTES} element={<ReportesPage />} />
            <Route path={RUTAS.AUDITORIA} element={<AuditoriaPage />} />
          </Route>

          <Route element={<RoleRoute rolesPermitidos={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.SECURITY]} />}>
            <Route path={RUTAS.VISITANTES} element={<VisitantesListPage />} />
            <Route path="/app/visitantes/:id/historial" element={<VisitanteHistorialPage />} />
            <Route path={RUTAS.VISITAS_HOY} element={<VisitasDeHoyPage />} />
            <Route path={RUTAS.CONTROL_INGRESO} element={<EntradaManualPage />} />
            <Route path={RUTAS.PRESENCIA} element={<PresenciaActualPage />} />
            <Route path={RUTAS.HISTORIAL_ACCESOS} element={<HistorialAccesosPage />} />
          </Route>

          <Route element={<RoleRoute rolesPermitidos={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.EMPLOYEE]} />}>
            <Route path={RUTAS.PREREGISTRO_NUEVO} element={<PreregistroCrearPage />} />
            <Route path="/app/preregistros/:id/qr" element={<PreregistroQrPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={RUTAS.LOGIN} replace />} />
    </Routes>
  )
}

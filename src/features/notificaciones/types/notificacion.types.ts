export interface Notificacion {
  id: string
  organization_id: string
  user_id: string
  type: string
  title: string
  message: string
  related_entity_type: string | null
  related_entity_id: string | null
  is_read: boolean
  created_at: string
}

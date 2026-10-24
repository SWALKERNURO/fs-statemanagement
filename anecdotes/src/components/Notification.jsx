import { useNotificationStore } from '../notificationStore'
export default function Notification() {
  const message = useNotificationStore(state => state.message)
  return message ? <div role="status" data-testid="notification" style={{ border: '1px solid', padding: 10, marginBottom: 10 }}>{message}</div> : null
}

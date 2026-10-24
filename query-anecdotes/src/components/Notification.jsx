import { useNotification } from '../NotificationContext'
export default function Notification() {
  const message = useNotification()
  return message ? <div role="status" data-testid="notification" style={{ border: '1px solid', padding: 10 }}>{message}</div> : null
}

import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './NotificationContext'
import App from './App'
const client = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}><NotificationProvider><App /></NotificationProvider></QueryClientProvider>
)

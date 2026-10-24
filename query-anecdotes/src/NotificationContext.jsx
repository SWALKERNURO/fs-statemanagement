/* eslint-disable react-refresh/only-export-components -- The course requires notification context and hooks together. */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
const NotificationContext = createContext(null)
export function NotificationProvider({ children }) {
  const [message, setMessage] = useState('')
  const timer = useRef()
  const notify = useCallback(message => {
    clearTimeout(timer.current)
    setMessage(message)
    timer.current = setTimeout(() => setMessage(''), 5000)
  }, [])
  useEffect(() => () => clearTimeout(timer.current), [])
  return <NotificationContext value={{ message, notify }}>{children}</NotificationContext>
}
export const useNotify = () => useContext(NotificationContext).notify
export const useNotification = () => useContext(NotificationContext).message

import { useState } from 'react'
import { useAnecdoteActions } from '../store'
import { useNotificationStore } from '../notificationStore'
export default function AnecdoteForm() {
  const { create } = useAnecdoteActions()
  const notify = useNotificationStore(state => state.notify)
  const [pending, setPending] = useState(false)
  const submit = async event => {
    event.preventDefault()
    const form = event.currentTarget
    const content = form.elements.anecdote.value.trim()
    if (!content) return
    setPending(true)
    try {
      await create(content)
      form.reset()
      notify("you created '" + content + "'")
    } catch (error) { notify(error.message) }
    finally { setPending(false) }
  }
  return <section><h2>create new</h2><form onSubmit={submit}>
    <label>anecdote <input name="anecdote" data-testid="new" required /></label>
    <button disabled={pending}>create</button>
  </form></section>
}

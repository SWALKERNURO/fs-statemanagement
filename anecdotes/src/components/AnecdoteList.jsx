import { useState } from 'react'
import { useAnecdoteActions } from '../store'
import { useNotificationStore } from '../notificationStore'
export default function AnecdoteList({ anecdotes }) {
  const { vote, remove } = useAnecdoteActions()
  const notify = useNotificationStore(state => state.notify)
  const [pending, setPending] = useState(null)
  const act = async (anecdote, action) => {
    setPending(anecdote.id)
    try {
      await action(anecdote.id)
      notify((action === vote ? "you voted '" : "you deleted '") + anecdote.content + "'")
    } catch (error) { notify(error.message) }
    finally { setPending(null) }
  }
  return <section aria-label="anecdotes">{anecdotes.map(anecdote => <div key={anecdote.id} style={{ marginBlock: 10 }}>
    <div>{anecdote.content}</div>
    <div>has {anecdote.votes} <button disabled={pending !== null} onClick={() => act(anecdote, vote)}>vote</button>
      {anecdote.votes === 0 && <button disabled={pending !== null} onClick={() => act(anecdote, remove)}>delete</button>}
    </div>
  </div>)}</section>
}

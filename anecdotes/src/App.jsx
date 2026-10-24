import { useEffect, useMemo } from 'react'
import { useAnecdoteStore, useAnecdotes, useAnecdoteActions } from './store'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
export default function App() {
  const anecdotes = useAnecdotes()
  const filter = useAnecdoteStore(state => state.filter)
  const loading = useAnecdoteStore(state => state.loading)
  const error = useAnecdoteStore(state => state.error)
  const { initialize } = useAnecdoteActions()
  useEffect(() => { initialize() }, [initialize])
  const visible = useMemo(() => anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .toSorted((a, b) => b.votes - a.votes), [anecdotes, filter])
  return <main><h2>Anecdotes</h2><Notification /><Filter />
    {loading && <p>loading...</p>}{error && <p role="alert">{error}</p>}
    <AnecdoteList anecdotes={visible} /><AnecdoteForm />
  </main>
}

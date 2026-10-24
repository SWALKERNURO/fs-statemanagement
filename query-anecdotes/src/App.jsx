import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import useAnecdotes from './useAnecdotes'
export default function App() {
  const { query, creation, voting } = useAnecdotes()
  if (query.isPending) return <p>loading...</p>
  if (query.isError) return <p role="alert">anecdote service not available due to problems in server</p>
  return <main><h3>Anecdote app</h3><Notification /><AnecdoteForm creation={creation} />
    {query.data.map(anecdote => <div key={anecdote.id} style={{ marginBlock: 10 }}>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes} <button disabled={voting.isPending} onClick={() => voting.mutate(anecdote)}>vote</button></div>
    </div>)}
  </main>
}

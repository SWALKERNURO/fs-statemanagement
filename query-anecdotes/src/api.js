const url = 'http://localhost:3001/anecdotes'
async function request(path = '', options) {
  const response = await fetch(url + path, options)
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Anecdote service request failed')
  return data
}
const json = body => ({ headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
export const getAnecdotes = () => request()
export const createAnecdote = content => request('', { method: 'POST', ...json({ content }) })
export const voteAnecdote = anecdote => request('/' + encodeURIComponent(anecdote.id), { method: 'PUT', ...json({ ...anecdote, votes: anecdote.votes + 1 }) })

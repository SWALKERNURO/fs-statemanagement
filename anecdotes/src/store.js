import { create } from 'zustand'

const url = 'http://localhost:3001/anecdotes'
const request = async (path = '', options) => {
  const response = await fetch(url + path, options)
  if (!response.ok) throw new Error('Anecdote service request failed')
  return response.status === 204 ? null : response.json()
}
const json = body => ({ headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [], filter: '', loading: true, error: '',
  actions: {
    initialize: async () => {
      try {
        const anecdotes = await request()
        set({ anecdotes, loading: false, error: '' })
      } catch (error) { set({ loading: false, error: error.message }) }
    },
    setFilter: filter => set({ filter }),
    create: async content => {
      const anecdote = await request('', { method: 'POST', ...json({ content, votes: 0 }) })
      set(state => ({ anecdotes: [...state.anecdotes, anecdote] }))
      return anecdote
    },
    vote: async id => {
      const current = get().anecdotes.find(anecdote => anecdote.id === id)
      if (!current) throw new Error('Anecdote not found')
      const updated = await request('/' + encodeURIComponent(id), { method: 'PUT', ...json({ ...current, votes: current.votes + 1 }) })
      set(state => ({ anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? updated : anecdote) }))
      return updated
    },
    remove: async id => {
      const current = get().anecdotes.find(anecdote => anecdote.id === id)
      if (!current || current.votes !== 0) throw new Error('Only anecdotes with zero votes can be deleted')
      await request('/' + encodeURIComponent(id), { method: 'DELETE' })
      set(state => ({ anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id) }))
    },
  },
}))
export const useAnecdotes = () => useAnecdoteStore(state => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)

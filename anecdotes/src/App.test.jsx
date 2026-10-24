import { beforeEach, afterEach, it, expect, vi } from 'vitest'
import { render, waitFor, cleanup, act } from '@testing-library/react'
import App from './App'
import { useAnecdoteStore } from './store'
import AnecdoteList from './components/AnecdoteList'

vi.mock('./components/AnecdoteList', () => ({ default: vi.fn(() => null) }))
const fixtures = [
  { id: 'low', content: 'Test code carefully', votes: 1 },
  { id: 'other', content: 'Keep things simple', votes: 9 },
  { id: 'high', content: 'Code review helps', votes: 5 },
]
beforeEach(() => {
  vi.clearAllMocks()
  useAnecdoteStore.setState({ anecdotes: [], filter: '', loading: true, error: '' })
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => structuredClone(fixtures) }))
})
afterEach(() => { cleanup(); vi.unstubAllGlobals() })

it('initializes the store with the exact backend anecdotes and vote counts', async () => {
  await useAnecdoteStore.getState().actions.initialize()
  expect(fetch).toHaveBeenCalledWith('http://localhost:3001/anecdotes', undefined)
  expect(useAnecdoteStore.getState().anecdotes).toEqual(fixtures)
})
it('passes the list a descending copy without mutating backend order', async () => {
  render(<App />)
  await waitFor(() => expect(AnecdoteList.mock.lastCall[0].anecdotes.map(a => a.id)).toEqual(['other', 'high', 'low']))
  expect(useAnecdoteStore.getState().anecdotes).toEqual(fixtures)
})
it('passes the list a case-insensitively filtered and still sorted selection', async () => {
  render(<App />)
  await waitFor(() => expect(useAnecdoteStore.getState().anecdotes).toEqual(fixtures))
  act(() => useAnecdoteStore.getState().actions.setFilter('CODE'))
  expect(AnecdoteList.mock.lastCall[0].anecdotes.map(a => a.id)).toEqual(['high', 'low'])
  expect(useAnecdoteStore.getState().anecdotes).toEqual(fixtures)
})
it('persists a vote and replaces only the voted item immutably', async () => {
  await useAnecdoteStore.getState().actions.initialize()
  const before = useAnecdoteStore.getState().anecdotes
  const updated = { ...before[0], votes: 2 }
  fetch.mockResolvedValueOnce({ ok: true, json: async () => updated })
  await useAnecdoteStore.getState().actions.vote('low')
  expect(fetch).toHaveBeenLastCalledWith('http://localhost:3001/anecdotes/low', expect.objectContaining({ method: 'PUT', body: JSON.stringify(updated) }))
  expect(useAnecdoteStore.getState().anecdotes[0]).toEqual(updated)
  expect(useAnecdoteStore.getState().anecdotes[1]).toBe(before[1])
  expect(before[0].votes).toBe(1)
})

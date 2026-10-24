import { useAnecdoteStore } from '../store'
export default function Filter() {
  const filter = useAnecdoteStore(state => state.filter)
  const setFilter = useAnecdoteStore(state => state.actions.setFilter)
  return <label>filter <input data-testid="filter" value={filter} onChange={event => setFilter(event.target.value)} /></label>
}

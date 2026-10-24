export default function AnecdoteForm({ creation }) {
  const submit = async event => {
    event.preventDefault()
    const form = event.currentTarget
    const content = form.elements.anecdote.value.trim()
    try {
      await creation.mutateAsync(content)
      form.reset()
    } catch { /* Mutation onError displays the server error notification. */ }
  }
  return <section><h3>create new</h3><form onSubmit={submit}>
    <label>anecdote <input name="anecdote" required /></label>
    <button disabled={creation.isPending}>create</button>
  </form></section>
}

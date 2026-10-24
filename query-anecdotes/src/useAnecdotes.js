import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from './api'
import { useNotify } from './NotificationContext'
const key = ['anecdotes']
export default function useAnecdotes() {
  const client = useQueryClient()
  const notify = useNotify()
  const query = useQuery({ queryKey: key, queryFn: getAnecdotes, retry: false })
  const creation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: anecdote => {
      client.setQueryData(key, previous => [...(previous || []), anecdote])
      notify("you created '" + anecdote.content + "'")
    },
    onError: error => notify(error.message),
  })
  const voting = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: anecdote => {
      client.setQueryData(key, previous => previous.map(item => item.id === anecdote.id ? anecdote : item))
      notify("you voted '" + anecdote.content + "'")
    },
    onError: error => notify(error.message),
  })
  return { query, creation, voting }
}

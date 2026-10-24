import { useFeedbackStore } from '../store'
export default function Statistics() {
  const good = useFeedbackStore(state => state.good)
  const neutral = useFeedbackStore(state => state.neutral)
  const bad = useFeedbackStore(state => state.bad)
  const all = good + neutral + bad
  const stats = { good, neutral, bad, all, average: all ? (good - bad) / all : 0, positive: (all ? good / all * 100 : 0) + ' %' }
  return <section><h2>statistics</h2><table><tbody>
    {Object.entries(stats).map(([label, value]) => <tr key={label}><td>{label}</td><td>{value}</td></tr>)}
  </tbody></table></section>
}

import { useFeedbackStore } from '../store'
export default function Buttons() {
  const feedback = useFeedbackStore(state => state.feedback)
  return <div><h2>give feedback</h2>
    {['good', 'neutral', 'bad'].map(kind => <button key={kind} onClick={() => feedback(kind)}>{kind}</button>)}
  </div>
}

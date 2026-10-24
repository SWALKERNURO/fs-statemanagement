import { create } from 'zustand'
export const useFeedbackStore = create(set => ({
  good: 0, neutral: 0, bad: 0,
  feedback: kind => set(state => ({ [kind]: state[kind] + 1 })),
}))

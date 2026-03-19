import questionsData from '../../../questions.json'

export interface RubricItem {
  key: string
  desc: string
  points: number
  keywords?: string[]
  min_length?: number
}

export interface ScoringCriteria {
  type: string
  rubric: RubricItem[]
  pass_threshold: number
}

export interface Question {
  id: string
  domain: 'development' | 'marketing'
  difficulty: 'easy' | 'medium' | 'hard'
  task: string
  context: string
  scoring_criteria: ScoringCriteria
  sample_good_prompt: string
  sample_bad_prompt: string
  explanation: string
}

export function getAllQuestions(): Question[] {
  return questionsData.questions as Question[]
}

export function getQuestionsByDomain(domain: 'development' | 'marketing'): Question[] {
  return getAllQuestions().filter(q => q.domain === domain)
}

export function getQuestionById(id: string): Question | undefined {
  return getAllQuestions().find(q => q.id === id)
}

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
}

export const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'text-green-400 bg-green-400/10',
  medium: 'text-yellow-400 bg-yellow-400/10',
  hard: 'text-red-400 bg-red-400/10',
}

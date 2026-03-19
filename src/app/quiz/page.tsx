'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { getQuestionsByDomain, Question } from '@/lib/questions'
import QuestionCard from '@/components/QuestionCard'
import PromptInput from '@/components/PromptInput'
import ScoreResult from '@/components/ScoreResult'

interface ScoreData {
  total: number
  passed: boolean
  pass_threshold: number
  rubric_results: Array<{
    key: string
    desc: string
    points: number
    earned: number
    passed: boolean
  }>
}

interface QuizState {
  userPrompt: string
  scoreData: ScoreData | null
  isLoading: boolean
  submitted: boolean
}

function QuizContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const domain = searchParams.get('domain') as 'development' | 'marketing' | null

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quizStates, setQuizStates] = useState<QuizState[]>([])
  const [showFinalResult, setShowFinalResult] = useState(false)

  useEffect(() => {
    if (!domain || (domain !== 'development' && domain !== 'marketing')) {
      router.replace('/')
      return
    }
    const qs = getQuestionsByDomain(domain)
    setQuestions(qs)
    setQuizStates(qs.map(() => ({
      userPrompt: '',
      scoreData: null,
      isLoading: false,
      submitted: false,
    })))
  }, [domain, router])

  if (!domain || questions.length === 0 || quizStates.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-400 animate-pulse">로딩 중...</div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const currentState = quizStates[currentIndex]

  const updateCurrentState = (updates: Partial<QuizState>) => {
    setQuizStates(prev => prev.map((s, i) => i === currentIndex ? { ...s, ...updates } : s))
  }

  const handleSubmit = async () => {
    if (!currentState.userPrompt.trim()) return
    updateCurrentState({ isLoading: true })

    try {
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          userPrompt: currentState.userPrompt,
        }),
      })
      const data = await res.json()
      updateCurrentState({ scoreData: data, isLoading: false, submitted: true })
    } catch {
      updateCurrentState({ isLoading: false })
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      setShowFinalResult(true)
    }
  }

  if (showFinalResult) {
    const completed = quizStates.filter(s => s.submitted && s.scoreData)
    const totalScore = completed.reduce((sum, s) => sum + (s.scoreData?.total ?? 0), 0)
    const avgScore = completed.length > 0 ? Math.round(totalScore / completed.length) : 0
    const passedCount = completed.filter(s => s.scoreData?.passed).length

    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">시험 완료!</h1>
          <p className="text-gray-400">모든 문항을 완료했습니다.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#252b45] border border-gray-700 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-1">평균 점수</p>
            <p className="text-4xl font-bold font-mono text-[#f5c518]">{avgScore}</p>
          </div>
          <div className="bg-[#252b45] border border-gray-700 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-1">통과 문항</p>
            <p className="text-4xl font-bold font-mono text-green-400">{passedCount}/{questions.length}</p>
          </div>
          <div className="bg-[#252b45] border border-gray-700 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-1">등급</p>
            <p className={`text-4xl font-bold font-mono ${
              avgScore >= 90 ? 'text-yellow-300' :
              avgScore >= 80 ? 'text-green-400' :
              avgScore >= 70 ? 'text-blue-400' :
              'text-gray-400'
            }`}>
              {avgScore >= 90 ? 'S' : avgScore >= 80 ? 'A' : avgScore >= 70 ? 'B' : avgScore >= 60 ? 'C' : 'D'}
            </p>
          </div>
        </div>

        {/* Per-question breakdown */}
        <div className="bg-[#252b45] border border-gray-700 rounded-2xl p-6 mb-8">
          <h3 className="text-[#f5c518] text-xs font-semibold uppercase tracking-wider mb-4">문항별 결과</h3>
          <div className="space-y-2">
            {questions.map((q, i) => {
              const state = quizStates[i]
              const score = state.scoreData?.total ?? 0
              const passed = state.scoreData?.passed ?? false
              return (
                <div key={q.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${passed ? 'text-green-400' : 'text-red-400'}`}>
                      {passed ? '✓' : '✗'}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{q.id}</span>
                    <span className="text-sm text-gray-300 truncate max-w-xs">
                      {q.task.substring(0, 40)}...
                    </span>
                  </div>
                  <span className={`font-mono text-sm font-bold ${
                    score >= 70 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {state.submitted ? `${score}점` : '미응시'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push('/')}
            className="flex-1 border border-gray-700 hover:border-[#f5c518]/50 text-gray-300 font-semibold py-3 rounded-xl transition-colors"
          >
            ← 홈으로
          </button>
          <button
            onClick={() => {
              setCurrentIndex(0)
              setQuizStates(questions.map(() => ({
                userPrompt: '',
                scoreData: null,
                isLoading: false,
                submitted: false,
              })))
              setShowFinalResult(false)
            }}
            className="flex-1 bg-[#f5c518] hover:bg-[#ffd700] text-[#1a1f36] font-bold py-3 rounded-xl transition-colors"
          >
            다시 풀기 →
          </button>
        </div>
      </div>
    )
  }

  const domainLabel = domain === 'development' ? '💻 개발' : '📣 마케팅'

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">{domainLabel} 영역</span>
          <span className="text-sm text-gray-500">
            {quizStates.filter(s => s.submitted).length} / {questions.length} 완료
          </span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#f5c518] rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question dots */}
      <div className="flex gap-1.5 mb-6">
        {questions.map((_, i) => {
          const s = quizStates[i]
          return (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i === currentIndex ? 'bg-[#f5c518]' :
                s.submitted && s.scoreData?.passed ? 'bg-green-500' :
                s.submitted ? 'bg-red-500' :
                'bg-gray-700'
              }`}
            />
          )
        })}
      </div>

      <QuestionCard
        question={currentQuestion}
        currentIndex={currentIndex}
        total={questions.length}
      />

      <PromptInput
        value={currentState.userPrompt}
        onChange={(v) => updateCurrentState({ userPrompt: v })}
        onSubmit={handleSubmit}
        isLoading={currentState.isLoading}
        submitted={currentState.submitted}
      />

      {currentState.submitted && currentState.scoreData && (
        <div className="mt-6">
          <ScoreResult
            scoreData={currentState.scoreData}
            sampleGoodPrompt={currentQuestion.sample_good_prompt}
            explanation={currentQuestion.explanation}
            onNext={handleNext}
            isLastQuestion={currentIndex === questions.length - 1}
          />
        </div>
      )}
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-400 animate-pulse">로딩 중...</div>
      </div>
    }>
      <QuizContent />
    </Suspense>
  )
}

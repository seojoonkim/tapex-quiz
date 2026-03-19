import { Question, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/lib/questions'

interface QuestionCardProps {
  question: Question
  currentIndex: number
  total: number
}

export default function QuestionCard({ question, currentIndex, total }: QuestionCardProps) {
  const domainLabel = question.domain === 'development' ? '개발' : '마케팅'
  const domainColor = question.domain === 'development'
    ? 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    : 'text-purple-400 bg-purple-400/10 border-purple-400/20'

  return (
    <div className="bg-[#252b45] border border-gray-700 rounded-2xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium border rounded px-2 py-0.5 ${domainColor}`}>
            {domainLabel}
          </span>
          <span className={`text-xs font-medium rounded px-2 py-0.5 ${DIFFICULTY_COLORS[question.difficulty]}`}>
            {DIFFICULTY_LABELS[question.difficulty]}
          </span>
          <span className="text-xs text-gray-500 font-mono">{question.id}</span>
        </div>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Context */}
      <div className="bg-[#1a1f36] border border-gray-800 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#f5c518] text-xs font-semibold uppercase tracking-wider">상황</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{question.context}</p>
      </div>

      {/* Task */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#f5c518] text-xs font-semibold uppercase tracking-wider">과제</span>
        </div>
        <div className="text-white leading-relaxed whitespace-pre-wrap text-sm">
          {question.task}
        </div>
      </div>
    </div>
  )
}

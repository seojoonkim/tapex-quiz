'use client'

interface RubricResult {
  key: string
  desc: string
  points: number
  earned: number
  passed: boolean
}

interface ScoreData {
  total: number
  passed: boolean
  pass_threshold: number
  rubric_results: RubricResult[]
}

interface ScoreResultProps {
  scoreData: ScoreData
  sampleGoodPrompt: string
  explanation: string
  onNext: () => void
  isLastQuestion: boolean
}

export default function ScoreResult({
  scoreData,
  sampleGoodPrompt,
  explanation,
  onNext,
  isLastQuestion,
}: ScoreResultProps) {
  const { total, passed, pass_threshold, rubric_results } = scoreData

  const scoreColor =
    total >= 85 ? 'text-green-400' :
    total >= 70 ? 'text-[#f5c518]' :
    total >= 50 ? 'text-orange-400' :
    'text-red-400'

  const bgColor =
    total >= 85 ? 'border-green-500/30 bg-green-500/5' :
    total >= 70 ? 'border-[#f5c518]/30 bg-[#f5c518]/5' :
    total >= 50 ? 'border-orange-500/30 bg-orange-500/5' :
    'border-red-500/30 bg-red-500/5'

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Score Banner */}
      <div className={`border rounded-2xl p-6 ${bgColor}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm">총점</p>
            <p className={`text-6xl font-bold font-mono ${scoreColor}`}>
              {total}
              <span className="text-2xl text-gray-500">/100</span>
            </p>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
              {passed ? '✅ PASS' : '❌ FAIL'}
            </div>
            <p className="text-gray-500 text-xs mt-1">통과 기준: {pass_threshold}점</p>
          </div>
        </div>

        {/* Score Bar */}
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              passed ? 'bg-green-400' : total >= 50 ? 'bg-[#f5c518]' : 'bg-red-400'
            }`}
            style={{ width: `${total}%` }}
          />
        </div>
      </div>

      {/* Rubric Results */}
      <div className="bg-[#252b45] border border-gray-700 rounded-2xl p-6">
        <h3 className="text-[#f5c518] text-xs font-semibold uppercase tracking-wider mb-4">
          항목별 채점 결과
        </h3>
        <div className="space-y-3">
          {rubric_results.map((item) => (
            <div key={item.key} className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-2 flex-1">
                <span className={`mt-0.5 text-sm ${item.passed ? 'text-green-400' : 'text-red-400'}`}>
                  {item.passed ? '✓' : '✗'}
                </span>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className={`font-mono text-sm font-bold ${item.passed ? 'text-green-400' : 'text-gray-600'}`}>
                  {item.earned}
                </span>
                <span className="text-gray-600 text-xs">/ {item.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Good Prompt */}
      <div className="bg-[#252b45] border border-green-500/20 rounded-2xl p-6">
        <h3 className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-3">
          ✨ 모범 프롬프트 예시
        </h3>
        <div className="bg-[#1a1f36] rounded-xl p-4 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono border border-gray-800">
          {sampleGoodPrompt}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-[#252b45] border border-[#f5c518]/20 rounded-2xl p-6">
        <h3 className="text-[#f5c518] text-xs font-semibold uppercase tracking-wider mb-3">
          💡 핵심 포인트
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">{explanation}</p>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-[#f5c518] hover:bg-[#ffd700] text-[#1a1f36] font-bold px-8 py-3 rounded-xl transition-colors text-sm"
        >
          {isLastQuestion ? '결과 보기 →' : '다음 문제 →'}
        </button>
      </div>
    </div>
  )
}

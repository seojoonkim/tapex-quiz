'use client'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
  submitted: boolean
}

export default function PromptInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  submitted,
}: PromptInputProps) {
  const charCount = value.length
  const isShort = charCount > 0 && charCount < 10
  const isEmpty = charCount === 0

  return (
    <div className="bg-[#252b45] border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-[#f5c518] text-xs font-semibold uppercase tracking-wider">
          나의 프롬프트
        </label>
        <span className={`text-xs font-mono ${isShort ? 'text-red-400' : 'text-gray-500'}`}>
          {charCount}자
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={submitted || isLoading}
        placeholder="AI에게 보낼 프롬프트를 직접 작성하세요..."
        className="w-full h-40 bg-[#1a1f36] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-600 text-sm leading-relaxed resize-none focus:outline-none focus:border-[#f5c518]/50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      />

      {isShort && (
        <p className="text-red-400 text-xs mt-2">프롬프트가 너무 짧습니다. 더 구체적으로 작성해주세요.</p>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={isEmpty || isLoading || submitted}
          className="bg-[#f5c518] hover:bg-[#ffd700] disabled:bg-gray-700 disabled:text-gray-500 text-[#1a1f36] font-bold px-8 py-3 rounded-xl transition-all duration-200 disabled:cursor-not-allowed text-sm"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              채점 중...
            </span>
          ) : submitted ? (
            '채점 완료'
          ) : (
            '제출하기 →'
          )}
        </button>
      </div>
    </div>
  )
}

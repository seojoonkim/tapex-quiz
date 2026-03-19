'use client'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block bg-[#f5c518]/10 border border-[#f5c518]/30 rounded-full px-4 py-1 text-[#f5c518] text-sm font-medium mb-6">
          AI Prompt Examination
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          당신의 <span className="text-[#f5c518]">프롬프트</span> 실력은?
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
          TAPEX는 AI에게 정확하고 효과적인 프롬프트를 작성하는 능력을 측정하는 시험입니다.
          과제를 보고 직접 프롬프트를 작성해보세요.
        </p>
      </div>

      {/* Domain Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
        <button
          onClick={() => router.push('/quiz?domain=development')}
          className="group relative bg-[#252b45] border border-gray-700 hover:border-[#f5c518]/60 rounded-2xl p-8 text-left transition-all duration-200 hover:bg-[#2a3154]"
        >
          <div className="text-4xl mb-4">💻</div>
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#f5c518] transition-colors">
            개발
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            코드 생성, 버그 수정, 리팩토링, API 활용, 정규표현식, 알고리즘, SQL 등 개발 관련 프롬프트 작성
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <span className="bg-blue-500/20 text-blue-400 rounded px-2 py-0.5">10문항</span>
            <span className="bg-green-500/20 text-green-400 rounded px-2 py-0.5">쉬움~어려움</span>
          </div>
          <div className="absolute top-4 right-4 text-[#f5c518] opacity-0 group-hover:opacity-100 transition-opacity text-xl">
            →
          </div>
        </button>

        <button
          onClick={() => router.push('/quiz?domain=marketing')}
          className="group relative bg-[#252b45] border border-gray-700 hover:border-[#f5c518]/60 rounded-2xl p-8 text-left transition-all duration-200 hover:bg-[#2a3154]"
        >
          <div className="text-4xl mb-4">📣</div>
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#f5c518] transition-colors">
            마케팅
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            카피라이팅, 이메일 마케팅, SNS, CTA, 고객 응대, 랜딩페이지 등 마케팅 관련 프롬프트 작성
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <span className="bg-purple-500/20 text-purple-400 rounded px-2 py-0.5">10문항</span>
            <span className="bg-green-500/20 text-green-400 rounded px-2 py-0.5">쉬움~어려움</span>
          </div>
          <div className="absolute top-4 right-4 text-[#f5c518] opacity-0 group-hover:opacity-100 transition-opacity text-xl">
            →
          </div>
        </button>
      </div>

      {/* How it works */}
      <div className="w-full max-w-2xl bg-[#252b45]/50 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">시험 방식</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            { step: '01', icon: '📋', label: '과제 확인' },
            { step: '02', icon: '✍️', label: '프롬프트 작성' },
            { step: '03', icon: '⚡', label: '자동 채점' },
            { step: '04', icon: '📊', label: '피드백 확인' },
          ].map(({ step, icon, label }) => (
            <div key={step} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{icon}</span>
              <span className="text-[#f5c518] text-xs font-mono">{step}</span>
              <span className="text-gray-300 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

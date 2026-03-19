import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TAPEX — 프롬프트 역량 시험',
  description: 'AI 프롬프트 작성 능력을 평가하는 TAPEX 시험 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#1a1f36] text-gray-100">
        <header className="border-b border-[#f5c518]/20 bg-[#1a1f36]/95 backdrop-blur sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[#f5c518] font-bold text-2xl tracking-widest">TAPEX</span>
              <span className="text-gray-400 text-sm hidden sm:block">프롬프트 역량 시험</span>
            </div>
            <div className="text-xs text-gray-500 border border-gray-700 rounded px-2 py-1">
              Beta v1.0
            </div>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-800 mt-16 py-6 text-center text-gray-600 text-sm">
          © 2024 TAPEX — AI Prompt Examination System
        </footer>
      </body>
    </html>
  )
}

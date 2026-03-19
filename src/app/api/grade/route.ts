import { NextRequest, NextResponse } from 'next/server'
import { getQuestionById } from '@/lib/questions'

interface RubricItem {
  key: string
  desc: string
  points: number
  keywords?: string[]
  min_length?: number
}

function evaluateRubricItem(rubricItem: RubricItem, userPrompt: string): { earned: number; passed: boolean } {
  const promptLower = userPrompt.toLowerCase()

  // Length-based check
  if (rubricItem.min_length && !rubricItem.keywords) {
    const passed = userPrompt.length >= rubricItem.min_length
    return { earned: passed ? rubricItem.points : 0, passed }
  }

  // Keyword check
  if (rubricItem.keywords && rubricItem.keywords.length > 0) {
    const keywordMatched = rubricItem.keywords.some(kw => promptLower.includes(kw.toLowerCase()))

    // Also check length if min_length is set
    if (rubricItem.min_length) {
      const lengthOk = userPrompt.length >= rubricItem.min_length
      const passed = keywordMatched && lengthOk
      // Partial credit: keyword only
      if (keywordMatched && !lengthOk) {
        return { earned: Math.floor(rubricItem.points * 0.5), passed: false }
      }
      return { earned: passed ? rubricItem.points : 0, passed }
    }

    return {
      earned: keywordMatched ? rubricItem.points : 0,
      passed: keywordMatched,
    }
  }

  // Default: length check only
  if (rubricItem.min_length) {
    const passed = userPrompt.length >= rubricItem.min_length
    return { earned: passed ? rubricItem.points : 0, passed }
  }

  return { earned: 0, passed: false }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { questionId, userPrompt } = body

    if (!questionId || !userPrompt) {
      return NextResponse.json({ error: 'questionId and userPrompt are required' }, { status: 400 })
    }

    const question = getQuestionById(questionId)
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    const { scoring_criteria } = question
    const rubric = scoring_criteria.rubric as RubricItem[]

    // Evaluate each rubric item
    const rubricResults = rubric.map((item) => {
      const { earned, passed } = evaluateRubricItem(item, userPrompt)
      return {
        key: item.key,
        desc: item.desc,
        points: item.points,
        earned,
        passed,
      }
    })

    const totalScore = rubricResults.reduce((sum, r) => sum + r.earned, 0)
    const passed = totalScore >= scoring_criteria.pass_threshold

    return NextResponse.json({
      total: totalScore,
      passed,
      pass_threshold: scoring_criteria.pass_threshold,
      rubric_results: rubricResults,
    })
  } catch (error) {
    console.error('Grade API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

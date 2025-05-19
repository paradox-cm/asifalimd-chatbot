"use client"

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void
}

const questions = [
  "Tell me about your clinical practice",
  "What research are you working on?",
  "What companies have you advised?",
  "How can I contact you?",
]

export default function SuggestedQuestions({ onSelectQuestion }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelectQuestion(question)}
          className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-foreground px-3 py-1.5 rounded-full transition-colors"
        >
          {question}
        </button>
      ))}
    </div>
  )
}

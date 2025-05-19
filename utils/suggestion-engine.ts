import { type IntentType, classifyIntent } from "./intent-classification"
import type { ChatContext } from "./ai-engine"

export interface SuggestionStrategy {
  name: string
  description: string
  generateSuggestions: (context: ChatContext, count: number) => SuggestedQuestion[]
  shouldApply: (context: ChatContext) => boolean
  priority: number
}

export interface SuggestedQuestion {
  id: string
  text: string
  intent?: IntentType
  priority?: number
}

// Utility function to check if two questions are similar
export function isSimilarQuestion(q1: string, q2: string): boolean {
  // Normalize both questions
  const normalize = (q: string): string => {
    return q
      .toLowerCase()
      .replace(/[.,?!;:'"()[\]{}]/g, "")
      .replace(/\s+/g, " ")
      .replace(
        /^(tell me|what|how|where|which|when|why|does|is|are|can|do|could|would|should) (about|more about)?/i,
        "",
      )
      .replace(/^about /i, "")
      .replace(/dr\.?\s*ali('s)?/i, "")
      .trim()
  }

  const nq1 = normalize(q1)
  const nq2 = normalize(q2)

  // If either normalized question is very short, require exact match
  if (nq1.length < 5 || nq2.length < 5) {
    return nq1 === nq2
  }

  // Direct match after normalization
  if (nq1 === nq2) return true

  // Check if one is a substring of the other
  if (nq1.length > 5 && nq2.length > 5) {
    if (nq1.includes(nq2) || nq2.includes(nq1)) return true
  }

  // Check for word overlap (if more than 60% of words match)
  const words1 = new Set(nq1.split(" ").filter((w) => w.length > 3)) // Only consider words longer than 3 chars
  const words2 = new Set(nq2.split(" ").filter((w) => w.length > 3))

  // If either set is empty after filtering, they're not similar enough
  if (words1.size === 0 || words2.size === 0) return false

  let commonWords = 0
  for (const word of words1) {
    if (words2.has(word)) commonWords++
  }

  const similarity = commonWords / Math.min(words1.size, words2.size)
  return similarity > 0.5 // Lower threshold to catch more similar questions
}

// Base question pools organized by intent
const questionPools: Record<IntentType, string[]> = {
  clinical: [
    "What conditions does Dr. Ali treat?",
    "How does Dr. Ali treat POTS?",
    "What is Dr. Ali's approach to cardiovascular care?",
    "What is Dr. Ali's clinical practice like?",
    "Does Dr. Ali specialize in heart rhythm disorders?",
    "How does Dr. Ali diagnose dysautonomia?",
    "What procedures does Dr. Ali perform?",
    "What is Dr. Ali's approach to preventive cardiology?",
    "How does Dr. Ali manage patients with atrial fibrillation?",
    "What makes Dr. Ali's clinical approach unique?",
  ],

  research: [
    "What research is Dr. Ali involved in?",
    "What publications has Dr. Ali authored?",
    "What clinical trials has Dr. Ali conducted?",
    "Tell me about Dr. Ali's research on digital health",
    "What is Dr. Ali's research focus?",
    "How does Dr. Ali's research impact patient care?",
    "What research has Dr. Ali done on POTS?",
    "Tell me about the Cena Research Institute",
    "What are Dr. Ali's most significant research findings?",
    "How does Dr. Ali incorporate AI in his research?",
  ],

  ventures: [
    "Which companies has Dr. Ali worked with?",
    "What is Dr. Ali's role in health tech?",
    "Tell me about Dr. Ali's advisory positions",
    "What companies has Dr. Ali founded?",
    "How does Dr. Ali choose which ventures to advise?",
    "What is Dr. Ali's work with Tabia Health?",
    "Tell me about Dr. Ali's role at FirstHX",
    "What was Dr. Ali's contribution at Qardio?",
    "How does Dr. Ali balance clinical work with his ventures?",
    "What healthcare problems is Dr. Ali trying to solve through his ventures?",
  ],

  technology: [
    "What digital health technologies does Dr. Ali work with?",
    "Does Dr. Ali work with wearable devices?",
    "What is Dr. Ali's experience with AI in healthcare?",
    "How does Dr. Ali use technology in his practice?",
    "What remote monitoring solutions does Dr. Ali work with?",
    "Tell me about Dr. Ali's work with virtual reality",
    "What is Dr. Ali's perspective on the future of health tech?",
    "How does Dr. Ali evaluate new healthcare technologies?",
    "What technology innovations has Dr. Ali been involved with?",
    "How does Dr. Ali bridge medicine and technology?",
  ],

  speaking: [
    "What speaking topics does Dr. Ali cover?",
    "Where has Dr. Ali given presentations?",
    "How can I book Dr. Ali for a speaking engagement?",
    "What conferences has Dr. Ali spoken at?",
    "What is Dr. Ali's speaking style?",
    "Does Dr. Ali speak about POTS and dysautonomia?",
    "What audiences does Dr. Ali typically address?",
    "Has Dr. Ali given any TED talks?",
    "What healthcare innovations does Dr. Ali speak about?",
    "Does Dr. Ali speak internationally?",
  ],

  media: [
    "What media appearances has Dr. Ali made?",
    "Has Dr. Ali been on TV?",
    "Tell me about Dr. Ali's appearance on Fox News",
    "Has Dr. Ali been on the Dr. Oz show?",
    "What topics does Dr. Ali discuss in the media?",
    "Is Dr. Ali a regular media contributor?",
    "What podcasts has Dr. Ali been featured on?",
    "How does Dr. Ali prepare for media appearances?",
    "Does Dr. Ali have any upcoming media events?",
    "What healthcare issues does Dr. Ali address in the media?",
  ],

  contact: [
    "How can I contact Dr. Ali?",
    "How can I schedule an appointment with Dr. Ali?",
    "What is Dr. Ali's office phone number?",
    "How can I reach Dr. Ali for a speaking engagement?",
    "Does Dr. Ali offer telehealth consultations?",
    "How can I get a second opinion from Dr. Ali?",
    "What's the best way to contact Dr. Ali's office?",
    "How long is the wait for a new patient appointment?",
    "Does Dr. Ali respond to email inquiries?",
    "How can I contact Dr. Ali for media inquiries?",
  ],

  location: [
    "Where is Dr. Ali's practice located?",
    "Where is Dr. Ali based?",
    "What hospital is Dr. Ali affiliated with?",
    "Is Dr. Ali's practice in the Texas Medical Center?",
    "Does Dr. Ali practice in multiple locations?",
    "What is the address of Dr. Ali's office?",
    "How can I get to Dr. Ali's office?",
    "Is Dr. Ali's practice accessible by public transportation?",
    "Does Dr. Ali practice outside of Houston?",
    "What are Dr. Ali's office hours?",
  ],

  about: [
    "Tell me about Dr. Ali's background",
    "What is Dr. Ali's education?",
    "Where did Dr. Ali complete his medical training?",
    "How long has Dr. Ali been practicing?",
    "What are Dr. Ali's board certifications?",
    "What inspired Dr. Ali to become a cardiologist?",
    "What is Dr. Ali's philosophy of care?",
    "What languages does Dr. Ali speak?",
    "What professional organizations is Dr. Ali a member of?",
    "Has Dr. Ali received any awards or recognition?",
  ],

  cv: [
    "Can I see Dr. Ali's CV?",
    "What's on Dr. Ali's resume?",
    "Where can I download Dr. Ali's curriculum vitae?",
    "What academic positions has Dr. Ali held?",
    "What professional achievements are on Dr. Ali's CV?",
    "How extensive is Dr. Ali's publication list?",
    "Does Dr. Ali's CV include his speaking engagements?",
    "What fellowships has Dr. Ali completed?",
    "Does Dr. Ali's CV show his technology ventures?",
    "What leadership positions has Dr. Ali held?",
  ],

  greeting: [],
  off_topic: [],
  complex: [],
  unknown: [],
}

// Strategy 1: Initial Conversation Strategy
const initialConversationStrategy: SuggestionStrategy = {
  name: "Initial Conversation",
  description: "Provides broad, diverse suggestions to start the conversation",
  priority: 100,
  shouldApply: (context: ChatContext) => {
    return context.questionCount <= 2
  },
  generateSuggestions: (context: ChatContext, count: number) => {
    // For very first interaction, use a fixed set of diverse questions
    if (context.questionCount === 0) {
      return [
        { id: "init-1", text: "Tell me about Dr. Ali's clinical practice", intent: "clinical", priority: 100 },
        { id: "init-2", text: "What research is Dr. Ali involved in?", intent: "research", priority: 90 },
        { id: "init-3", text: "Which health tech companies does Dr. Ali advise?", intent: "ventures", priority: 80 },
      ]
    }

    // For the second question, analyze the first question and suggest related but different topics
    const firstQuestion = context.messages.find((m) => m.role === "user")?.content || ""
    const firstIntent = classifyIntent(firstQuestion).intent

    // Suggest questions from different categories than the first question
    const suggestions: SuggestedQuestion[] = []
    const usedIntents = new Set<IntentType>([firstIntent])

    // Priority order for initial suggestions
    const priorityIntents: IntentType[] = [
      "clinical",
      "research",
      "ventures",
      "technology",
      "about",
      "media",
      "speaking",
    ]

    // Add suggestions from priority intents that haven't been used
    for (const intent of priorityIntents) {
      if (!usedIntents.has(intent) && questionPools[intent].length > 0) {
        const question = questionPools[intent][Math.floor(Math.random() * questionPools[intent].length)]
        suggestions.push({
          id: `init-${intent}-${Date.now()}`,
          text: question,
          intent: intent,
          priority: 100 - suggestions.length * 10,
        })
        usedIntents.add(intent)

        if (suggestions.length >= count) break
      }
    }

    return suggestions
  },
}

// Strategy 2: Topic Exploration Strategy
const topicExplorationStrategy: SuggestionStrategy = {
  name: "Topic Exploration",
  description: "Suggests questions that explore the current topic in more depth",
  priority: 80,
  shouldApply: (context: ChatContext) => {
    return context.questionCount >= 1 && context.questionCount <= 5
  },
  generateSuggestions: (context: ChatContext, count: number) => {
    // Get the most recent user question
    const recentQuestions = context.messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .slice(-2)

    if (recentQuestions.length === 0) return []

    const lastQuestion = recentQuestions[recentQuestions.length - 1]
    const lastIntent = classifyIntent(lastQuestion).intent

    // If the last intent is a substantive category, suggest more questions from that category
    if (["clinical", "research", "ventures", "technology", "speaking", "media", "about"].includes(lastIntent)) {
      const suggestions: SuggestedQuestion[] = []
      const pool = questionPools[lastIntent as IntentType]

      // Avoid suggesting questions that are too similar to recent questions
      const filteredPool = pool.filter((q) => !recentQuestions.some((rq) => isSimilarQuestion(q, rq)))

      // If we have enough questions in the filtered pool
      if (filteredPool.length >= count) {
        // Shuffle the filtered pool
        const shuffled = [...filteredPool].sort(() => 0.5 - Math.random())

        // Take the first 'count' questions
        for (let i = 0; i < count; i++) {
          suggestions.push({
            id: `explore-${lastIntent}-${Date.now()}-${i}`,
            text: shuffled[i],
            intent: lastIntent as IntentType,
            priority: 80 - i * 5,
          })
        }
      } else {
        // If we don't have enough questions in the filtered pool, add what we can
        for (let i = 0; i < filteredPool.length; i++) {
          suggestions.push({
            id: `explore-${lastIntent}-${Date.now()}-${i}`,
            text: filteredPool[i],
            intent: lastIntent as IntentType,
            priority: 80 - i * 5,
          })
        }

        // Then add questions from related categories
        const relatedIntents: Record<IntentType, IntentType[]> = {
          clinical: ["research", "technology", "about"],
          research: ["clinical", "technology", "ventures"],
          ventures: ["technology", "research", "speaking"],
          technology: ["ventures", "research", "clinical"],
          speaking: ["media", "ventures", "about"],
          media: ["speaking", "about", "ventures"],
          about: ["clinical", "research", "speaking"],
          location: ["clinical", "contact", "about"],
          contact: ["clinical", "location", "about"],
          cv: ["about", "research", "speaking"],
          greeting: [],
          off_topic: [],
          complex: [],
          unknown: [],
        }

        // Add questions from related intents
        for (const relatedIntent of relatedIntents[lastIntent as IntentType] || []) {
          if (suggestions.length >= count) break

          const relatedPool = questionPools[relatedIntent].filter(
            (q) => !recentQuestions.some((rq) => isSimilarQuestion(q, rq)),
          )

          if (relatedPool.length > 0) {
            const question = relatedPool[Math.floor(Math.random() * relatedPool.length)]
            suggestions.push({
              id: `explore-${relatedIntent}-${Date.now()}`,
              text: question,
              intent: relatedIntent,
              priority: 70 - suggestions.length * 5,
            })
          }
        }
      }

      return suggestions
    }

    // Default to initial conversation strategy if we can't determine a good topic to explore
    return initialConversationStrategy.generateSuggestions(context, count)
  },
}

// Strategy 3: Contact Suggestion Strategy
const contactSuggestionStrategy: SuggestionStrategy = {
  name: "Contact Suggestion",
  description: "Suggests contacting Dr. Ali after a few questions",
  priority: 90,
  shouldApply: (context: ChatContext) => {
    // Apply this strategy around the 4th-6th question
    return context.questionCount >= 4 && context.questionCount <= 6
  },
  generateSuggestions: (context: ChatContext, count: number) => {
    // Get recent questions to avoid suggesting contact if already asked
    const recentQuestions = context.messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .slice(-3)

    // Check if any recent question was about contact
    const recentContactQuestion = recentQuestions.some(
      (q) =>
        classifyIntent(q).intent === "contact" ||
        q.toLowerCase().includes("contact") ||
        q.toLowerCase().includes("reach") ||
        q.toLowerCase().includes("appointment"),
    )

    if (recentContactQuestion) {
      // If there was a recent contact question, don't suggest contact again
      return []
    }

    // Always include a contact suggestion
    const suggestions: SuggestedQuestion[] = [
      {
        id: `contact-${Date.now()}`,
        text: "How can I contact Dr. Ali?",
        intent: "contact",
        priority: 90,
      },
    ]

    // Add 1-2 more suggestions from other categories
    const lastQuestion = recentQuestions[recentQuestions.length - 1] || ""
    const lastIntent = classifyIntent(lastQuestion).intent

    // Avoid suggesting questions from the same intent as the last question
    const availableIntents: IntentType[] = [
      "clinical",
      "research",
      "ventures",
      "technology",
      "speaking",
      "media",
      "about",
    ].filter((intent) => intent !== lastIntent)

    // Shuffle available intents
    const shuffledIntents = [...availableIntents].sort(() => 0.5 - Math.random())

    // Add 1-2 more suggestions
    for (let i = 0; i < Math.min(count - 1, 2); i++) {
      if (i < shuffledIntents.length) {
        const intent = shuffledIntents[i]
        const pool = questionPools[intent].filter((q) => !recentQuestions.some((rq) => isSimilarQuestion(q, rq)))

        if (pool.length > 0) {
          const question = pool[Math.floor(Math.random() * pool.length)]
          suggestions.push({
            id: `contact-other-${intent}-${Date.now()}`,
            text: question,
            intent: intent,
            priority: 85 - i * 5,
          })
        }
      }
    }

    return suggestions
  },
}

// Strategy 4: Limited Suggestions Strategy
const limitedSuggestionsStrategy: SuggestionStrategy = {
  name: "Limited Suggestions",
  description: "Provides fewer suggestions after extended conversation",
  priority: 70,
  shouldApply: (context: ChatContext) => {
    return context.questionCount > 8
  },
  generateSuggestions: (context: ChatContext, count: number) => {
    // After 8 questions, limit to 2 suggestions maximum
    const limitedCount = Math.min(count, 2)

    // Get recent questions
    const recentQuestions = context.messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .slice(-5)

    // Get intents of recent questions
    const recentIntents = recentQuestions.map((q) => classifyIntent(q).intent)

    // Find intents that haven't been covered recently
    const coveredIntents = new Set(recentIntents)
    const availableIntents: IntentType[] = [
      "clinical",
      "research",
      "ventures",
      "technology",
      "speaking",
      "media",
      "about",
      "contact",
    ].filter((intent) => !coveredIntents.has(intent))

    // If all intents have been covered, use a mix of popular categories
    if (availableIntents.length === 0) {
      availableIntents.push(...["clinical", "research", "ventures", "technology"])
    }

    // Shuffle available intents
    const shuffledIntents = [...availableIntents].sort(() => 0.5 - Math.random())

    // Generate suggestions
    const suggestions: SuggestedQuestion[] = []

    for (let i = 0; i < Math.min(limitedCount, shuffledIntents.length); i++) {
      const intent = shuffledIntents[i]
      const pool = questionPools[intent].filter((q) => !recentQuestions.some((rq) => isSimilarQuestion(q, rq)))

      if (pool.length > 0) {
        const question = pool[Math.floor(Math.random() * pool.length)]
        suggestions.push({
          id: `limited-${intent}-${Date.now()}`,
          text: question,
          intent: intent,
          priority: 70 - i * 5,
        })
      }
    }

    // If we couldn't generate enough suggestions, add a generic one
    if (suggestions.length < limitedCount) {
      suggestions.push({
        id: `limited-generic-${Date.now()}`,
        text: "Is there anything specific about Dr. Ali you'd like to know?",
        intent: "unknown",
        priority: 60,
      })
    }

    return suggestions
  },
}

// Strategy 5: Contextual Follow-up Strategy
const contextualFollowupStrategy: SuggestionStrategy = {
  name: "Contextual Follow-up",
  description: "Suggests follow-up questions based on the assistant's last response",
  priority: 85,
  shouldApply: (context: ChatContext) => {
    // Apply if we have at least one assistant response
    return context.messages.filter((m) => m.role === "assistant").length > 0
  },
  generateSuggestions: (context: ChatContext, count: number) => {
    // Get the last assistant response
    const lastAssistantMessage = [...context.messages].reverse().find((m) => m.role === "assistant")

    if (!lastAssistantMessage) return []

    // Extract potential topics from the response
    const topics = extractTopicsFromResponse(lastAssistantMessage.content)

    // Get recent user questions to avoid duplicates
    const recentQuestions = context.messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .slice(-3)

    // Filter out topics that would lead to similar questions
    const filteredTopics = topics.filter((topic) => !recentQuestions.some((q) => isSimilarQuestion(topic, q)))

    // Generate suggestions from the filtered topics
    const suggestions: SuggestedQuestion[] = []

    for (let i = 0; i < Math.min(count, filteredTopics.length); i++) {
      suggestions.push({
        id: `followup-${Date.now()}-${i}`,
        text: filteredTopics[i],
        intent: classifyIntent(filteredTopics[i]).intent,
        priority: 85 - i * 5,
      })
    }

    return suggestions
  },
}

// Helper function to extract potential topics from an assistant response
function extractTopicsFromResponse(response: string): string[] {
  const topics: string[] = []

  // Look for numbered lists which often indicate distinct topics
  const numberedItems = response.match(/\d+\.\s+([^\n]+)/g)
  if (numberedItems && numberedItems.length > 0) {
    for (const item of numberedItems) {
      const content = item.replace(/^\d+\.\s+/, "").trim()
      if (content.length > 10 && content.length < 60) {
        const mainTopic = content.split(/[:.,-]/, 1)[0].trim()
        if (mainTopic.length > 5) {
          topics.push(`Tell me more about ${mainTopic}`)
        }
      }
    }
  }

  // Look for key phrases or entities that might be worth exploring
  const keyPhrases = [
    /\b(POTS|dysautonomia|arrhythmia|heart rhythm|heart failure|cardiovascular)\b/gi,
    /\b(research|clinical trials|publications|studies)\b/gi,
    /\b(digital health|health tech|technology|wearable|AI|artificial intelligence)\b/gi,
    /\b(companies|ventures|advisory roles|Tabia|Qardio|FirstHX|Healthseers|Avive)\b/gi,
    /\b(speaking|media|appearances|presentations)\b/gi,
  ]

  for (const pattern of keyPhrases) {
    const matches = response.match(pattern)
    if (matches) {
      const uniqueMatches = [...new Set(matches)]
      for (const match of uniqueMatches) {
        if (match.length > 3 && match.length < 30) {
          topics.push(`Can you tell me more about Dr. Ali's work with ${match}?`)
        }
      }
    }
  }

  // Deduplicate and limit the number of topics
  return [...new Set(topics)].slice(0, 5)
}

// Main function to generate suggestions
export function generateSuggestions(context: ChatContext, count = 3): SuggestedQuestion[] {
  // List of all strategies
  const strategies: SuggestionStrategy[] = [
    initialConversationStrategy,
    topicExplorationStrategy,
    contactSuggestionStrategy,
    limitedSuggestionsStrategy,
    contextualFollowupStrategy,
  ]

  // Filter strategies that should apply to the current context
  const applicableStrategies = strategies
    .filter((strategy) => strategy.shouldApply(context))
    .sort((a, b) => b.priority - a.priority)

  // If no strategies apply, use the initial conversation strategy as fallback
  if (applicableStrategies.length === 0) {
    return initialConversationStrategy.generateSuggestions(context, count)
  }

  // Use the highest priority strategy
  const primaryStrategy = applicableStrategies[0]
  let suggestions = primaryStrategy.generateSuggestions(context, count)

  // If the primary strategy didn't generate enough suggestions,
  // try the next applicable strategy
  if (suggestions.length < count && applicableStrategies.length > 1) {
    const secondaryStrategy = applicableStrategies[1]
    const additionalSuggestions = secondaryStrategy.generateSuggestions(context, count - suggestions.length)

    suggestions = [...suggestions, ...additionalSuggestions]
  }

  // Ensure we don't have more than the requested count
  suggestions = suggestions.slice(0, count)

  // Ensure each suggestion has a unique ID
  return suggestions.map((suggestion, index) => ({
    ...suggestion,
    id: suggestion.id || `suggestion-${Date.now()}-${index}`,
  }))
}

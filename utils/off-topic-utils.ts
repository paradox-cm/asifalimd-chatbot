import type { ChatContext } from "./ai-engine"

// Function to identify off-topic questions
export function identifyOffTopic(query: string): boolean {
  const text = query.toLowerCase().trim()

  // Check for simple questions about Dr. Ali or his work
  const simpleQuestionPatterns = [
    /what (does|is|are) (he|dr\.? ali|doctor ali|asif ali) (do|doing)/i,
    /who (is|was) (he|dr\.? ali|doctor ali|asif ali)/i,
    /what('s| is) (his|dr\.? ali'?s) (job|profession|specialty|work|role)/i,
    /tell me about (him|dr\.? ali|doctor ali|asif ali)/i,
    /what (does|is) (he|dr\.? ali|doctor ali|asif ali)/i,
    /what (kind|type) of (doctor|physician|specialist) (is|was) (he|dr\.? ali|doctor ali|asif ali)/i,
  ]

  // If the query matches any of these patterns, it's NOT off-topic
  for (const pattern of simpleQuestionPatterns) {
    if (pattern.test(text)) {
      return false
    }
  }

  // If the query is very short and doesn't contain key terms about Dr. Ali
  if (text.length < 15 && !/(dr|doctor|ali|asif|cardio|heart|pots)/i.test(text)) {
    // But don't mark simple questions as off-topic
    if (/(what|who|how|where|when|why|tell|can) (is|are|does|do|did|has|have|can|could|would|should)/i.test(text)) {
      return false
    }
    return true
  }

  // General off-topic patterns
  const offTopicPatterns = [
    // Time and date related
    /what (time|date) is it/i,
    /what day (is it|is today)/i,
    /current (time|date)/i,

    // Weather related
    /weather|temperature|forecast|rain|snow|sunny/i,

    // General knowledge questions
    /what is the (capital|population|area|size) of/i,
    /who (is|was) the (president|king|queen|prime minister)/i,
    /when (did|was) the (war|revolution|election|event)/i,

    // Entertainment
    /movie|film|tv show|series|actor|actress|director/i,
    /music|song|album|artist|band|concert/i,
    /book|novel|author|writer|publisher/i,

    // Sports
    /sports|football|soccer|basketball|baseball|hockey|tennis|golf|olympics/i,

    // Completely random or nonsensical
    /^(asdf|qwerty|test|hello world|foo bar|random)$/i,

    // Random statements or commands
    /^(tell me a joke|sing a song|write a poem|tell me a story)/i,

    // Questions about the AI itself (not about Dr. Ali's assistant)
    /^(what are you made of|how do you work|who made you|when were you made)/i,

    // Math or coding questions
    /^(calculate|compute|solve|what is \d+|code|program|script|function)/i,

    // Current events
    /^(news|current events|what happened today|latest)/i,

    // Random phrases or gibberish
    /^(lol|haha|hmm|umm|okay|ok|yes|no|maybe|sure|thanks|thank you|cool|nice|great|awesome|wow|oh|ah|eh|uh|huh)$/i,
    /^[a-z]{1,3}$/i, // Very short inputs like "hi", "ok", "lol"
    /^[^a-z0-9]*$/i, // Inputs with no alphanumeric characters

    // Commands or requests unrelated to Dr. Ali
    /^(do|make|create|build|show|give|find|search|look up|tell me about) (something|anything|a joke|a story|a game|a website)/i,
    /^(play|run|execute|start|stop|pause|resume|skip|next|previous)/i,

    // Questions about the user
    /^(who|what|where|when|why|how) (am|are|is|was|were) (i|me|my|mine|we|us|our|ours)/i,
    /^(do|does|did|can|could|would|should|will|shall) (i|me|my|mine|we|us|our|ours)/i,

    // Generic questions that aren't about Dr. Ali
    /^(what|where|when|why|how) (is|are|was|were|do|does|did) (the|a|an) /i,

    // Questions about other doctors or medical topics without mentioning Dr. Ali
    /^(what|where|when|why|how) (is|are|was|were|do|does|did) (doctor|dr|physician|cardiologist|medicine|medical)/i,
  ]

  // Check if any off-topic patterns match
  for (const pattern of offTopicPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  // Check for random inputs that don't form proper questions about Dr. Ali
  if (
    text.length > 5 &&
    !/(dr|doctor|ali|asif|cardio|heart|pots)/i.test(text) &&
    !/(what|who|how|where|when|why|tell|can) (is|are|does|do|did|has|have|can|could|would|should)/i.test(text)
  ) {
    return true
  }

  return false
}

// Array of off-topic responses to cycle through
const offTopicResponses = [
  "I'm here to provide information about Dr. Ali's cardiology practice. How can I help you with questions about his work?",

  "I can only answer questions about Dr. Ali's professional work. Is there something specific about his cardiology practice you'd like to know?",

  "Let's focus on Dr. Ali's work as a cardiologist. What would you like to know about his clinical practice or research?",

  "I'm designed to answer questions about Dr. Ali's medical practice. What information about his cardiology work can I provide for you?",

  "I'm Dr. Ali's assistant and can only provide information about his professional work. How can I help you learn more about his cardiology practice?",

  "I don't have information about that topic. I'm here to help with questions about Dr. Ali's work as a cardiologist, researcher, and health technology advisor.",

  "That's outside my knowledge area. I can tell you about Dr. Ali's clinical practice, research, or health technology ventures if you're interested.",

  "I'm focused on providing information about Dr. Ali's professional work. Would you like to know about his cardiology practice, research, or technology ventures?",

  "I can help answer questions specifically about Dr. Ali's work. For example, you could ask about his clinical practice, research interests, or health technology ventures.",

  "I'm not able to help with that. However, I can provide information about Dr. Ali's specialization in cardiac electrophysiology, his research, or his advisory roles with health technology companies.",

  "Let me redirect our conversation to Dr. Ali's professional work. Would you like to know about his clinical practice treating POTS and other cardiac conditions, his research, or his health technology ventures?",
]

// Function to provide responses for off-topic questions with no repetition
export function getOffTopicResponse(context: ChatContext): string {
  // Get available responses (those not recently used)
  const availableResponses = offTopicResponses.filter((response) => !context.usedOffTopicResponses.has(response))

  // If all responses have been used, reset the tracking
  if (availableResponses.length === 0) {
    context.usedOffTopicResponses.clear()
    return offTopicResponses[0]
  }

  // Select a random response from available ones
  const selectedResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)]

  // Track this response as used
  context.usedOffTopicResponses.add(selectedResponse)

  return selectedResponse
}

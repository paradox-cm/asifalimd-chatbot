import type { ChatContext } from "./ai-engine"

// Function to identify questions that cannot be answered
export function identifyUnanswerable(query: string): boolean {
  const text = query.toLowerCase()

  // Questions about personal details we don't have information for
  const personalPatterns = [
    /how old|what is (his|dr\.? ali'?s) age/i,
    /when was (he|dr\.? ali) born|birth(day|date)/i,
    /family|married|kids|children|wife|spouse|partner/i,
    /where does (he|dr\.? ali) live|home address/i,
    /salary|income|net worth|how much (does he|do you) (make|earn)/i,
    /personal life|hobbies|free time|when not working/i,
    /religion|political|beliefs|voting/i,
    /favorite|favourite/i,
    /height|weight|tall/i,
    /email address|phone number|direct contact/i,
    /nationality|ethnicity|race|heritage/i,
    /languages? (speak|spoken)/i,
  ]

  // Check if any personal patterns match
  for (const pattern of personalPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  return false
}

// Array of unanswerable responses to cycle through
const unanswerableResponses = [
  "I don't have specific information about Dr. Ali's personal details. I can tell you about his professional work as a cardiologist, his research, or his work with health technology companies. What would you like to know about his professional activities?",
  "That information isn't available in my knowledge base. I'd be happy to share details about Dr. Ali's clinical practice, research interests, or advisory roles instead.",
  "I don't have access to that personal information. However, I can provide details about Dr. Ali's professional background, expertise in cardiology, or his work in digital health if you're interested.",
  "I'm focused on Dr. Ali's professional work rather than personal details. Would you like to know about his clinical specialties, research publications, or health technology advisory roles?",
  "That's not information I have available. Dr. Ali's website focuses on his professional contributions to cardiology and healthcare innovation. Is there something specific about his professional work you'd like to know?",
]

// Function to provide graceful responses for unanswerable questions with no repetition
export function getUnanswerable(context: ChatContext): string {
  // Get available responses (those not recently used)
  const availableResponses = unanswerableResponses.filter((response) => !context.usedOffTopicResponses.has(response))

  // If all responses have been used, reset the tracking
  if (availableResponses.length === 0) {
    context.usedOffTopicResponses.clear()
    return unanswerableResponses[0]
  }

  // Select a random response from available ones
  const selectedResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)]

  // Track this response as used
  context.usedOffTopicResponses.add(selectedResponse)

  return selectedResponse
}

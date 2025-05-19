import type { ChatContext } from "./ai-engine"

// Function to identify casual greetings and banter
export function identifyCasualGreeting(query: string): boolean {
  const text = query.toLowerCase().trim()

  // Common greetings and casual conversation starters
  const casualPatterns = [
    /^(hi|hello|hey|greetings|howdy|yo|hiya|sup|heya)( there)?$/i,
    /^(how are you|how's it going|what's up|how's your day|how are things|what's new|how have you been|how do you do|how's everything)(\?)?$/i,
    /^(good|nice|great) (morning|afternoon|evening|day)$/i,
    /^(tell me something interesting|tell me a fact|share something|tell me about yourself)$/i,
    /^(how's life|how's everything|everything good)(\?)?$/i,
    /^(thanks|thank you|appreciate it|thx|ty)$/i,
    /^(you're welcome|no problem|my pleasure|np|yw)$/i,
    /^(bye|goodbye|see you|later|farewell|take care)$/i,
    /^(nice to meet you|pleasure to meet you|good to meet you)$/i,
  ]

  // Check if query matches any casual patterns
  for (const pattern of casualPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  return false
}

// Function to get responses to casual greetings
export function getCasualGreetingResponse(query: string, context: ChatContext): string {
  const text = query.toLowerCase().trim()

  // Greeting responses that acknowledge but redirect
  if (/^(hi|hello|hey|greetings|howdy|yo|hiya|sup|heya)( there)?$/i.test(text)) {
    const greetings = [
      "Hello! It's nice to chat with you. I'm here to help answer any questions you might have about Dr. Ali's work in cardiology, his research, or his health technology advisory roles. How can I assist you today?",
      "Hi there! I'm Dr. Ali's assistant. I'd be happy to tell you about his clinical practice, research initiatives, or work with health technology companies. What would you like to know?",
      "Hey! Thanks for reaching out. I can provide information about Dr. Ali's expertise in cardiology, particularly in treating conditions like POTS and dysautonomia. What can I help you with?",
      "Greetings! I'm here to share information about Dr. Ali's work as a cardiologist, researcher, and medical technology advisor. How may I assist you today?",
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  if (
    /^(how are you|how's it going|what's up|how's your day|how are things|what's new|how have you been)(\?)?$/i.test(
      text,
    )
  ) {
    const responses = [
      "I'm doing well, thanks for asking! I'm ready to share information about Dr. Ali's cardiology practice, his research on conditions like POTS, or his work with health technology companies. What would you like to know about?",
      "I'm great! I appreciate you asking. I'm here to help with any questions about Dr. Ali's clinical expertise, research, or health tech advisory roles. What are you interested in learning about?",
      "I'm functioning perfectly! I'd be happy to tell you about Dr. Ali's work in preventive cardiology, his research on autonomic disorders, or his digital health initiatives. How can I help you today?",
      "All systems operational and ready to assist you! I can provide information about Dr. Ali's specialties in cardiology or his contributions to medical technology. What would you like to know?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Default casual response if nothing specific matches
  return "Thanks for reaching out! I'm here to provide information about Dr. Ali's work as a cardiologist, researcher, and health technology advisor. How can I help you today?"
}

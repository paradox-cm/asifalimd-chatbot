// Array of greeting variations for the chat interface
const greetingVariations = [
  "Hello! I'm Dr. Ali's virtual assistant. How may I help today?",
  "Welcome! I'm here to provide information about Dr. Asif Ali. How may I help today?",
  "Hi there! I'm Dr. Ali's AI assistant. How may I help today?",
  "Greetings! I'm Dr. Asif Ali's virtual assistant. How may I help today?",
  "Hello and welcome! I'm here to answer questions about Dr. Ali. How may I help today?",
  "Hi! I'm Dr. Ali's digital assistant. How may I help today?",
  "Welcome to Dr. Asif Ali's website. I'm his virtual assistant. How may I help today?",
  "Hello! I'm here to provide information about Dr. Ali's work. How may I help today?",
  "Hi there! I'm Dr. Asif Ali's AI assistant. How may I help today?",
  "Greetings! I'm here to assist with information about Dr. Ali. How may I help today?",
]

/**
 * Returns a random greeting from the available variations
 */
export function getRandomGreeting(): string {
  const randomIndex = Math.floor(Math.random() * greetingVariations.length)
  return greetingVariations[randomIndex]
}

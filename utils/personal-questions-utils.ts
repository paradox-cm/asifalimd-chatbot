import type { ChatContext } from "./ai-engine"

// Function to identify personal questions about Dr. Ali that we don't have information for
export function identifyPersonalQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  // Patterns for personal questions we don't have information about
  const personalPatterns = [
    // Age related
    /how old (is|was) (he|dr\.? ali|doctor ali|asif ali)/i,
    /what is (his|dr\.? ali'?s|doctor ali'?s|asif ali'?s) age/i,
    /(he|dr\.? ali|doctor ali|asif ali).*(age|birthday|born|birth date)/i,
    /when was (he|dr\.? ali|doctor ali|asif ali) born/i,

    // Family related
    /(he|dr\.? ali|doctor ali|asif ali).*(married|wife|husband|spouse|partner|children|kids|family)/i,
    /(his|dr\.? ali'?s|doctor ali'?s|asif ali'?s) (wife|husband|spouse|partner|children|kids|family)/i,
    /does (he|dr\.? ali|doctor ali|asif ali) have (children|kids|a family)/i,
    /is (he|dr\.? ali|doctor ali|asif ali) married/i,

    // Personal life
    /(he|dr\.? ali|doctor ali|asif ali).*(live|house|home|residence|hobby|hobbies|interest|free time|leisure)/i,
    /where does (he|dr\.? ali|doctor ali|asif ali) live/i,
    /what are (his|dr\.? ali'?s|doctor ali'?s|asif ali'?s) hobbies/i,

    // Salary/finances
    /(he|dr\.? ali|doctor ali|asif ali).*(earn|make|salary|income|net worth|wealth|rich)/i,
    /how much (does|did) (he|dr\.? ali|doctor ali|asif ali) (earn|make)/i,
    /what is (his|dr\.? ali'?s|doctor ali'?s|asif ali'?s) (salary|income|net worth)/i,

    // Religion/politics
    /(he|dr\.? ali|doctor ali|asif ali).*(religion|religious|faith|believe|political|politics|vote)/i,
    /is (he|dr\.? ali|doctor ali|asif ali) (religious|christian|muslim|jewish|hindu|buddhist|democrat|republican)/i,

    // Other personal details
    /(he|dr\.? ali|doctor ali|asif ali).*(phone number|email address|social media|facebook|twitter|instagram)/i,
    /what is (his|dr\.? ali'?s|doctor ali'?s|asif ali'?s) (phone number|email address)/i,

    // Appearance related
    /(he|dr\.? ali|doctor ali|asif ali).*(look|appearance|height|tall|short|weight|hair|beard|glasses)/i,
    /what does (he|dr\.? ali|doctor ali|asif ali) look like/i,
    /how (tall|short) is (he|dr\.? ali|doctor ali|asif ali)/i,

    // Personality related
    /(he|dr\.? ali|doctor ali|asif ali).*(personality|like as a person|character|temperament|attitude|friendly|nice|kind)/i,
    /is (he|dr\.? ali|doctor ali|asif ali) (friendly|nice|kind|patient|good|caring)/i,

    // Preferences/opinions
    /(he|dr\.? ali|doctor ali|asif ali).*(like|enjoy|prefer|favorite|opinion|think about|view on)/i,
    /what (does|is) (he|dr\.? ali|doctor ali|asif ali) (like|enjoy|prefer|think)/i,
    /what are (his|dr\.? ali'?s|doctor ali'?s|asif ali'?s) (views|opinions|thoughts)/i,

    // Background that's too personal
    /(he|dr\.? ali|doctor ali|asif ali).*(born|raised|grow up|childhood|parents|siblings|family background)/i,
    /where (was|did) (he|dr\.? ali|doctor ali|asif ali) (born|raised|grow up)/i,

    // Contact details that are too personal
    /(his|dr\.? ali'?s|doctor ali'?s|asif ali'?s) (personal|private|direct|home) (email|phone|address|contact)/i,
    /how can i (contact|reach|email|call|text) (him|dr\.? ali|doctor ali|asif ali) (directly|personally)/i,
  ]

  // Check if any personal pattern matches
  for (const pattern of personalPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  // Keywords that might indicate personal questions
  const personalKeywords = [
    "age",
    "old",
    "birthday",
    "born",
    "birth date",
    "married",
    "wife",
    "husband",
    "spouse",
    "partner",
    "children",
    "kids",
    "family",
    "live",
    "house",
    "home",
    "residence",
    "hobby",
    "hobbies",
    "interest",
    "free time",
    "leisure",
    "earn",
    "make",
    "salary",
    "income",
    "net worth",
    "wealth",
    "rich",
    "religion",
    "religious",
    "faith",
    "believe",
    "political",
    "politics",
    "vote",
    "phone number",
    "email address",
    "social media",
    "facebook",
    "twitter",
    "instagram",
    "appearance",
    "look like",
    "height",
    "tall",
    "short",
    "weight",
    "hair",
    "beard",
    "glasses",
    "personality",
    "character",
    "temperament",
    "attitude",
    "friendly",
    "nice",
    "kind",
    "patient",
    "caring",
    "favorite",
    "opinion",
    "view",
    "think about",
    "childhood",
    "born",
    "raised",
    "grow up",
    "parents",
    "siblings",
    "personal email",
    "private contact",
    "direct contact",
  ]

  // Check for personal keywords in combination with Dr. Ali references
  const hasPersonalKeyword = personalKeywords.some((keyword) => text.includes(keyword))
  const mentionsDrAli = /(he|his|dr|ali|asif)/i.test(text)

  if (hasPersonalKeyword && mentionsDrAli) {
    return true
  }

  return false
}

// Array of responses for personal questions
const personalQuestionResponses = [
  "I don't have specific personal information about Dr. Ali such as age, family details, or personal life. I can provide information about his professional work as a cardiologist, researcher, and health technology advisor. Would you like to know about his clinical practice or research interests?",

  "Dr. Ali's website focuses on his professional work rather than personal details. I can tell you about his medical practice, research, or technology ventures if you're interested.",

  "I'm designed to provide information about Dr. Ali's professional activities and expertise, not personal details. I'd be happy to share information about his clinical practice, research, or advisory roles instead.",

  "That information isn't available through this platform. However, I can provide details about Dr. Ali's professional background, including his clinical practice, research, and work with health technology companies. What aspect of his professional work would you like to know about?",

  "I'm focused on Dr. Ali's professional work rather than personal information. I can tell you about his cardiology practice, research initiatives, or health technology advisory roles if you're interested in those areas.",

  "My knowledge is limited to Dr. Ali's professional activities as a cardiologist, researcher, and health technology advisor. For professional inquiries, you can use the contact form on the website. Would you like to know about his clinical practice or research work instead?",

  "I don't have access to that personal information about Dr. Ali. I can help you learn about his professional work, including his specialization in cardiac electrophysiology and POTS treatment. What professional aspect would you like to know more about?",

  "Dr. Ali's website is focused on his professional contributions to cardiology and health technology. While I don't have personal details to share, I can provide information about his clinical practice, research, or advisory roles with health technology companies.",
]

// Function to provide responses for personal questions
export function getPersonalQuestionResponse(context: ChatContext): string {
  // Get a random response from the array
  const randomIndex = Math.floor(Math.random() * personalQuestionResponses.length)
  return personalQuestionResponses[randomIndex]
}

// Function to specifically identify age-related questions
export function identifyAgeQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  // Specific patterns for age questions
  const agePatterns = [
    /how old (is|was) (he|dr\.? ali|doctor ali|asif ali)/i,
    /what is (his|dr\.? ali'?s|doctor ali'?s|asif ali'?s) age/i,
    /(he|dr\.? ali|doctor ali|asif ali).*(age|old)/i,
    /age of (dr\.? ali|doctor ali|asif ali)/i,
    /^age\??$/i, // Just the word "age" or "age?"
  ]

  // Check if any age pattern matches
  for (const pattern of agePatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  return false
}

// Function to provide responses for age questions
export function getAgeQuestionResponse(context: ChatContext): string {
  // Specific responses for age questions
  const ageResponses = [
    "I don't have information about Dr. Ali's age. I can provide details about his professional qualifications, including his board certifications in Internal Medicine, Cardiovascular Disease, and Clinical Cardiac Electrophysiology. Would you like to know more about his professional background?",

    "Dr. Ali's website focuses on his professional work rather than personal details like age. I can tell you about his education, which includes a Medical Degree from The University of Texas Medical Branch, residency at Baylor College of Medicine, and fellowships at Texas Heart Institute.",

    "I don't have Dr. Ali's age information. However, I can share that he has been a partner at Houston Cardiology Consultants since 2011 and has extensive experience in treating heart rhythm disorders and autonomic conditions like POTS.",

    "Information about Dr. Ali's age isn't available through this platform. I can provide details about his professional background, including his clinical practice, research, and work with health technology companies. What aspect of his professional work would you like to know about?",
  ]

  // Get a random response from the array
  const randomIndex = Math.floor(Math.random() * ageResponses.length)
  return ageResponses[randomIndex]
}

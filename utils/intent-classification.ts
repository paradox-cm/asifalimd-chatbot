// Advanced intent classification system for Dr. Ali's chat interface

// Define intent types
export type IntentType =
  | "clinical"
  | "research"
  | "ventures"
  | "technology"
  | "speaking"
  | "media"
  | "contact"
  | "location"
  | "about"
  | "cv"
  | "greeting"
  | "off-topic"
  | "complex"
  | "identity"
  | "unknown"

// Intent detection result with confidence score
export interface IntentResult {
  intent: IntentType
  confidence: number
  subIntents: IntentType[]
}

// Define keyword sets for each intent
const intentKeywords: Record<IntentType, string[]> = {
  clinical: [
    "practice",
    "patient",
    "treat",
    "doctor",
    "pots",
    "dysautonomia",
    "heart",
    "cardiac",
    "cardiovascular",
    "treatment",
    "diagnosis",
    "houston cardiology",
    "preventive",
    "prevention",
    "arrhythmia",
    "hypertension",
    "medical",
    "medicine",
    "condition",
    "symptom",
    "disease",
    "disorder",
    "therapy",
    "procedure",
    "appointment",
    "consultation",
    "specialist",
    "electrophysiology",
    "electrophysiologist",
    "cardiologist",
    "cardiology",
  ],

  research: [
    "research",
    "study",
    "publication",
    "paper",
    "academic",
    "scientific",
    "trial",
    "clinical trial",
    "investigation",
    "findings",
    "discovery",
    "journal",
    "article",
    "publish",
    "published",
    "author",
    "authored",
    "cena research",
    "institute",
    "data",
    "analysis",
    "experiment",
    "methodology",
    "results",
    "conclusion",
    "hypothesis",
    "theory",
    "evidence",
    "peer-reviewed",
    "collaborate",
    "collaboration",
  ],

  ventures: [
    "company",
    "venture",
    "startup",
    "business",
    "advisor",
    "cmo",
    "digital health",
    "tech",
    "tabia",
    "firsthx",
    "qardio",
    "healthseers",
    "avive",
    "thrive360",
    "advisory",
    "board",
    "director",
    "leadership",
    "management",
    "corporate",
    "commercial",
    "industry",
    "market",
    "product",
    "service",
    "solution",
    "executive",
    "founder",
    "entrepreneur",
    "investor",
    "investment",
    "partner",
    "strategic",
  ],

  technology: [
    "technology",
    "tech",
    "device",
    "wearable",
    "ai",
    "artificial intelligence",
    "remote monitoring",
    "digital",
    "platform",
    "application",
    "software",
    "hardware",
    "system",
    "innovation",
    "innovative",
    "cutting edge",
    "state of the art",
    "advanced",
    "modern",
    "future",
    "emerging",
    "novel",
    "new",
    "latest",
    "smart",
    "intelligent",
    "algorithm",
    "data",
    "analytics",
    "machine learning",
    "ml",
    "virtual reality",
    "vr",
  ],

  speaking: [
    "speak",
    "speaker",
    "speaking",
    "talk",
    "presentation",
    "lecture",
    "keynote",
    "conference",
    "event",
    "summit",
    "symposium",
    "forum",
    "panel",
    "discussion",
    "webinar",
    "seminar",
    "workshop",
    "meeting",
    "convention",
    "audience",
    "attendee",
    "participant",
    "engagement",
    "appearance",
    "schedule",
    "booking",
    "fee",
    "topic",
    "subject",
    "content",
    "present",
    "presenter",
    "presenting",
    "speech",
  ],

  media: [
    "media",
    "press",
    "news",
    "interview",
    "tv",
    "television",
    "radio",
    "podcast",
    "fox news",
    "dr oz",
    "appearance",
    "feature",
    "contributor",
    "medical expert",
    "appearances",
    "appeared",
    "appear",
    "featured",
    "host",
    "presenter",
    "broadcast",
    "public speaking",
    "publicity",
    "journalist",
    "reporter",
    "editor",
    "producer",
    "program",
    "show",
    "segment",
    "quote",
    "commentary",
    "opinion",
    "editorial",
  ],

  contact: [
    "contact",
    "reach",
    "email",
    "message",
    "connect",
    "appointment",
    "get in touch",
    "phone",
    "call",
    "text",
    "form",
    "submit",
    "send",
    "receive",
    "response",
    "reply",
    "answer",
    "availability",
    "schedule",
    "meeting",
    "consultation",
    "office hours",
    "contact form",
    "contact info",
    "contact information",
    "contact details",
    "contact page",
    "email address",
    "phone number",
    "office contact",
    "assistant",
    "secretary",
    "staff",
  ],

  location: [
    "where",
    "located",
    "location",
    "based",
    "office",
    "practice location",
    "city",
    "state",
    "address",
    "region",
    "area",
    "place",
    "town",
    "country",
    "work from",
    "live",
    "reside",
    "residence",
    "hometown",
    "houston",
    "texas",
    "tx",
    "medical center",
    "texas medical center",
    "clinic location",
    "office address",
    "practice address",
    "directions",
    "map",
    "find",
    "visit",
  ],

  about: [
    "about",
    "bio",
    "biography",
    "background",
    "history",
    "profile",
    "information",
    "detail",
    "personal",
    "professional",
    "career",
    "experience",
    "expertise",
    "specialty",
    "qualification",
    "credential",
    "certification",
    "education",
    "training",
    "degree",
    "school",
    "university",
    "college",
    "graduate",
    "alumni",
    "achievement",
    "award",
    "recognition",
    "honor",
    "life",
    "who is",
    "tell me about",
    "background info",
  ],

  cv: [
    "cv",
    "curriculum vitae",
    "resume",
    "credentials",
    "qualifications",
    "experience",
    "history",
    "background",
    "education",
    "training",
    "certification",
    "skill",
    "expertise",
    "specialty",
    "achievement",
    "accomplishment",
    "publication",
    "presentation",
    "award",
    "honor",
    "recognition",
    "affiliation",
    "membership",
    "association",
    "society",
    "committee",
    "position",
    "role",
    "title",
    "professional history",
    "work history",
    "career summary",
    "professional summary",
    "academic record",
    "download cv",
    "view cv",
  ],

  greeting: [
    "hello",
    "hi",
    "hey",
    "greetings",
    "good morning",
    "good afternoon",
    "good evening",
    "howdy",
    "what's up",
    "how are you",
    "how's it going",
    "nice to meet",
    "pleasure",
    "welcome",
    "hola",
    "bonjour",
    "ciao",
    "namaste",
    "g'day",
    "yo",
    "sup",
  ],

  off_topic: [
    "weather",
    "politics",
    "sports",
    "funny",
    "joke",
    "movies",
    "music",
    "games",
    "food",
    "travel",
    "news",
    "stock",
    "market",
    "investment",
    "crypto",
    "bitcoin",
    "ethereum",
    "nft",
    "celebrity",
    "gossip",
    "entertainment",
    "hobby",
    "recipe",
    "vacation",
    "holiday",
    "birthday",
    "anniversary",
    "party",
    "celebration",
  ],

  complex: [
    "specific case",
    "my situation",
    "personalized",
    "individualized",
    "tailored",
    "custom",
    "for me",
    "in my case",
    "recommend for",
    "advise me",
    "should i",
    "would he suggest",
    "what would he do",
    "what should i do",
    "what's best for",
    "what is best for",
    "my symptoms",
    "my condition",
    "my health",
    "my heart",
    "my doctor",
    "my treatment",
    "my diagnosis",
    "my test",
    "my results",
  ],

  identity: [
    "who are you",
    "what are you",
    "your name",
    "your purpose",
    "your function",
    "your role",
    "your job",
    "assistant",
    "bot",
    "ai",
    "chatbot",
    "virtual assistant",
    "digital assistant",
    "identify yourself",
    "introduce yourself",
    "tell me about you",
    "tell me about yourself",
    "what do you do",
    "how do you work",
    "what can you do",
    "what should I call you",
    "are you human",
    "are you a bot",
    "are you real",
    "are you ai",
  ],

  unknown: [],
}

// Define intent patterns for more accurate detection
const intentPatterns: Record<IntentType, RegExp[]> = {
  clinical: [
    /what.*(conditions|diseases|disorders|patients).*(he|dr\.? ali|doctor ali|asif ali|his).*(treat|manage|help|care|specialize)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(treat|manage|help|care|specialize).*(conditions|diseases|disorders|patients)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(practice|clinic|hospital|medical center)/i,
    /what.*(he|dr\.? ali|doctor ali|asif ali|his).*(clinical|medical).*(practice|approach|specialty)/i,
    /(tell|describe).*(clinical|medical).*(practice|approach|specialty)/i,
    /(pots|dysautonomia|heart|cardiac|cardiovascular).*(treat|manage|help|care|specialize)/i,
    /how.*(he|dr\.? ali|doctor ali|asif ali|his).*(treat|manage|help|care|approach|handle).*(pots|dysautonomia)/i,
    /(pots|dysautonomia).*(treatment|management|approach|protocol|therapy|care).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /what.*(he|dr\.? ali|doctor ali|asif ali|his).*(do|recommend|prescribe|suggest).*(pots|dysautonomia)/i,
  ],

  research: [
    /what.*(research|study|studies|investigate|publication|resaerch|reserch).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(research|study|studies|investigate|publication|resaerch|reserch)/i,
    /(tell|describe).*(research|study|studies|investigate|publication|resaerch|reserch)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(publish|author|write|contribute)/i,
    /what.*(papers|articles|journals).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(clinical trial|publication|paper|journal|article).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(clinical trial|publication|paper|journal|article)/i,
    /what.*(he|dr\.? ali|doctor ali|asif ali|his).*(study|studying|studied)/i,
  ],

  ventures: [
    /what (companies|ventures|startups|businesses|organizations|firms).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(work|advise|consult|partner|collaborate) with.*(companies|ventures|startups|businesses|organizations|firms)/i,
    /which (companies|ventures|startups|businesses|organizations|firms).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(companies|ventures|startups|businesses|organizations|firms).*(he|dr\.? ali|doctor ali|asif ali|his).*(work|advise|consult|partner|collaborate) with/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(companies|ventures|startups|businesses|organizations|firms)/i,
    /(companies|ventures|startups|businesses|organizations|firms).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(tell|list|name).*(companies|ventures|startups|businesses|organizations|firms)/i,
    /(cmo|chief medical officer|advisor|advisory).*(role|position)/i,
    /(tabia|qardio|firsthx|healthseers|avive|thrive360).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(tabia|qardio|firsthx|healthseers|avive|thrive360)/i,
  ],

  technology: [
    /(?:use|work with|develop|advise on|consult|involved with).+(?:technology|tech|device|wearable|digital|platform|solution)/i,
    /(?:technology|tech|device|wearable|digital|platform|solution).+(?:use|work with|develop|advise on|consult|involved with)/i,
    /(?:what|which|how).+(?:technology|tech|device|wearable|digital|platform|solution)/i,
    /(?:experience|expertise|background|work).+(?:technology|tech|device|wearable|digital|platform|solution)/i,
    /\b(wearable|device|fitbit|apple watch|smartwatch|smart watch|fitness tracker|activity tracker|heart monitor|ecg|ekg|holter|loop recorder|implantable|implant)\b/i,
    /\b(remote monitoring|remote patient monitoring|rpm|telehealth|telemedicine|virtual care|digital care)\b/i,
    /\b(ai|artificial intelligence|machine learning|ml|algorithm|predictive|analytics)\b/i,
    /\b(virtual reality|vr|oculus)\b/i,
    /\b(aed|defibrillator)\b/i,
  ],

  speaking: [
    /what.*(speak|speaker|speaking|talk|presentation|lecture).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(speak|speaker|speaking|talk|presentation|lecture)/i,
    /(speak|speaker|speaking|talk|presentation|lecture).*(topic|subject|event).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(conference|event|summit|symposium).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(conference|event|summit|symposium)/i,
  ],

  media: [
    /what.*(media|press|news|interview|tv|television|radio|podcast|appear).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(media|press|news|interview|tv|television|radio|podcast|appear)/i,
    /(media|press|news|interview|tv|television|radio|podcast|appear).*(appearance|feature|interview).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(fox news|dr oz|dr. oz).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(fox news|dr oz|dr. oz)/i,
    /what about.*(media|press|appearance|interview|news|tv)/i,
    /(tell|talk|more about).*(media|press|appearance|interview)/i,
  ],

  contact: [
    /how.*(contact|reach|get in touch|connect with|email|call|message).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif|him)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif|him).*(contact|reach|get in touch|connect with|email|call|message)/i,
    /contact.*(information|details|info).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif|him)/i,
    /(appointment|consultation|meeting).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif|him)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif|him).*(appointment|consultation|meeting)/i,
    /(how|where).*(can|do|could|should|would|might|to|I).*(contact|reach|get in touch|connect|email|call|message|schedule|book|make|set up|arrange)/i,
    /how.*contact/i,
    /how.*reach/i,
    /contact.*info/i,
    /email.*address/i,
    /phone.*number/i,
    /office.*contact/i,
  ],

  location: [
    /where.*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(located|based|practice|work|live|office|reside)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(located|based|practice|work|live|office|reside).*(where|location|city|state|address)/i,
    /where.*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /location.*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|his|dr\.? asif).*(location|address|city|state)/i,
    /what.*(city|state|location).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(city|state|location).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /where.*office/i,
    /where.*practice/i,
    /where.*clinic/i,
    /where.*based/i,
  ],

  about: [
    /what.*(about|bio|biography|background|history).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(about|bio|biography|background|history)/i,
    /(about|bio|biography|background|history).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /who.*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /tell me about.*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /tell me about dr\.? ali/i,
    /about dr\.? ali/i,
    /what.*(education|training|degree|school|university).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(education|training|degree|school|university)/i,
    /^(who is|tell me about) dr\.? ali/i,
    /^dr\.? ali/i,
  ],

  cv: [
    /what.*(cv|curriculum vitae|resume).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(cv|curriculum vitae|resume)/i,
    /(cv|curriculum vitae|resume).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /can i.*(see|view|download).*(cv|curriculum vitae|resume)/i,
    /where.*(cv|curriculum vitae|resume)/i,
  ],

  greeting: [
    /^(hello|hi|hey|greetings|good morning|good afternoon|good evening)(\s|$)/i,
    /^(howdy|what's up|how are you|how's it going)(\s|$)/i,
    /^(nice to meet|pleasure|welcome)(\s|$)/i,
  ],

  complex: [
    /(?:symptoms|signs|problems|issues|conditions).+(?:and|also|additionally|moreover|furthermore|besides|plus).+(?:symptoms|signs|problems|issues|conditions)/i,
    /(?:history|background|years|months|weeks).+(?:diagnosed|treatment|medication|therapy|doctor)/i,
    /(?:test|scan|mri|echocardiogram|ekg|ecg|holter|blood work|lab).+(?:results|showed|indicated|found)/i,
    /(?:taking|prescribed|medication|medicine|drug).+(?:and|also|additionally|moreover|plus).+(?:medication|medicine|drug)/i,
    /(?:second opinion|another doctor|different perspective|alternative treatment)/i,
    /(?:my|i have|i've been|i am|i'm experiencing|in my case|for me personally)/i,
    /(?:\?).+(?:\?)/i,
    /(?:should i|would he recommend|is it better to|what would he do|how would he handle|what's the best approach)/i,
    /(?:pots|dysautonomia).+(?:specific|protocol|approach|treatment plan|management strategy|medication regimen)/i,
  ],

  off_topic: [
    /\b(weather|forecast|rain|snow|sunny|cloudy|temperature|climate|hot|cold)\b/i,
    /\b(politics|election|vote|president|congress|senate|democrat|republican|political|government|policy)\b/i,
    /\b(sports|game|team|player|score|win|lose|championship|tournament|league|match)\b/i,
    /\b(movie|film|actor|actress|director|cinema|theater|show|series|episode|season|watch)\b/i,
    /\b(music|song|artist|band|album|concert|playlist|genre|singer|musician)\b/i,
    /\b(food|recipe|cook|restaurant|meal|dish|cuisine|ingredient|taste|flavor|delicious)\b/i,
    /\b(travel|vacation|trip|destination|hotel|flight|tourist|visit|country|city|sightseeing)\b/i,
  ],

  identity: [
    /^who are you/i,
    /^what are you/i,
    /^what is your name/i,
    /^what do you do/i,
    /^what can you (do|help with)/i,
    /^tell me about (yourself|you)/i,
    /^introduce yourself/i,
    /^how (do|can|should) I (use|talk to|interact with) you/i,
    /^are you (human|real|a bot|an ai|a person|a robot)/i,
    /^what (is|are) your (purpose|function|role|job)/i,
    /^how do you work/i,
    /^what should I call you/i,
    /^who (am I|is this) (talking|speaking|chatting) (to|with)/i,
    /^who (created|made|built|designed|programmed) you/i,
  ],

  unknown: [],
}

// Function to check if text contains Dr. Ali references
function containsDrAliReference(text: string): boolean {
  return /(he|his|him|dr|doctor|ali|asif)/i.test(text)
}

// Function to calculate keyword match score
function calculateKeywordScore(text: string, keywords: string[]): number {
  const normalizedText = text.toLowerCase()
  let matchCount = 0
  let totalWeight = 0

  for (const keyword of keywords) {
    // More specific or longer keywords get higher weight
    const weight = Math.min(1, 0.3 + keyword.length / 20)
    totalWeight += weight

    if (normalizedText.includes(keyword.toLowerCase())) {
      matchCount += weight
    }
  }

  return totalWeight > 0 ? (matchCount / totalWeight) * 100 : 0
}

// Function to calculate pattern match score
function calculatePatternScore(text: string, patterns: RegExp[]): number {
  let matchCount = 0

  for (const pattern of patterns) {
    if (pattern.test(text)) {
      // Patterns are stronger signals than keywords
      matchCount += 1.5
    }
  }

  // Normalize to percentage (max score would typically be from 1-2 pattern matches)
  return Math.min(100, matchCount * 50)
}

// Main function to classify intent
export function classifyIntent(text: string): IntentResult {
  const normalizedText = text.toLowerCase().trim()

  // Initialize scores for each intent
  const scores: Record<IntentType, number> = {
    clinical: 0,
    research: 0,
    ventures: 0,
    technology: 0,
    speaking: 0,
    media: 0,
    contact: 0,
    location: 0,
    about: 0,
    cv: 0,
    greeting: 0,
    off_topic: 0,
    complex: 0,
    identity: 0,
    unknown: 0,
  }

  // Check for Dr. Ali reference (except for greetings and some other categories)
  const hasDrAliReference = containsDrAliReference(normalizedText)

  // Calculate scores for each intent
  for (const intent of Object.keys(intentKeywords) as IntentType[]) {
    // Skip unknown intent
    if (intent === "unknown") continue

    // Calculate keyword score
    const keywordScore = calculateKeywordScore(normalizedText, intentKeywords[intent])

    // Calculate pattern score
    const patternScore = calculatePatternScore(normalizedText, intentPatterns[intent])

    // Combine scores (patterns are more important than keywords)
    let combinedScore = keywordScore * 0.4 + patternScore * 0.6

    // Adjust score based on presence of Dr. Ali reference
    // For most intents, we want a reference to Dr. Ali
    if (intent !== "greeting" && intent !== "off_topic" && intent !== "complex") {
      if (!hasDrAliReference) {
        combinedScore *= 0.5 // Reduce score if no reference to Dr. Ali
      }
    }

    // Special case for greetings - they should be at the beginning and short
    if (intent === "greeting") {
      // Greetings are typically short
      if (normalizedText.length > 30) {
        combinedScore *= 0.3
      }

      // Greetings typically start with greeting words
      if (!intentPatterns.greeting.some((pattern) => pattern.test(normalizedText))) {
        combinedScore *= 0.5
      }
    }

    // Special case for complex questions - they're typically longer
    if (intent === "complex") {
      if (normalizedText.length < 100) {
        combinedScore *= 0.7
      }
    }

    // Store the final score
    scores[intent] = combinedScore
  }

  // Find the intent with the highest score
  let maxScore = -1
  let primaryIntent: IntentType = "unknown"

  for (const [intent, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score
      primaryIntent = intent as IntentType
    }
  }

  // If no clear intent is found, mark as unknown
  if (maxScore < 20) {
    primaryIntent = "unknown"
    maxScore = 0
  }

  // Find secondary intents (those with scores at least 70% of the max score)
  const subIntents: IntentType[] = []
  const threshold = maxScore * 0.7

  for (const [intent, score] of Object.entries(scores)) {
    if (intent !== primaryIntent && score >= threshold) {
      subIntents.push(intent as IntentType)
    }
  }

  // Sort subIntents by score in descending order
  subIntents.sort((a, b) => scores[b] - scores[a])

  // Return the result
  return {
    intent: primaryIntent,
    confidence: maxScore,
    subIntents: subIntents.slice(0, 3), // Keep only top 3 secondary intents
  }
}

// Function to get a description of the intent for debugging
export function getIntentDescription(result: IntentResult): string {
  return `Primary intent: ${result.intent} (${result.confidence.toFixed(2)}%)
Secondary intents: ${result.subIntents.join(", ") || "none"}`
}

// Function to check if a question is a follow-up to a previous question
export function isFollowUpQuestion(query: string, previousQuery?: string): boolean {
  if (!previousQuery) return false

  const text = query.toLowerCase().trim()

  // Follow-up indicators at the beginning of the question
  const followUpPrefixes = [
    /^(and|also|what about|how about|tell me more|more about|what else|can you elaborate|please elaborate|elaborate on|expand on|could you explain|explain more|additional|another|other)/i,
    /^(what|how|where|when|why|who|which|can|do|does|is|are|was|were) (else|more|also|too|additionally|further)/i,
    /^(besides|apart from|in addition to|other than)/i,
  ]

  for (const pattern of followUpPrefixes) {
    if (pattern.test(text)) {
      return true
    }
  }

  // Very short questions without mentioning Dr. Ali are likely follow-ups
  if (text.split(/\s+/).length <= 3 && !text.includes("dr") && !text.includes("ali")) {
    return true
  }

  // Questions with pronouns referring to previous content
  if (/\b(it|this|that|these|those|they|them|he|his|him)\b/i.test(text)) {
    return true
  }

  return false
}

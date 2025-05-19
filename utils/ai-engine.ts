// Import the new personal questions utility
import { identifyPersonalQuestion, getPersonalQuestionResponse } from "./personal-questions-utils"

export type MessageRole = "user" | "assistant" | "system"

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
}

export interface LinkSuggestion {
  text: string
  url: string
  context?: string
}

export interface ChatContext {
  messages: ChatMessage[]
  topics: string[]
  entities: Set<string>
  questionCount: number
  lastTopic?: string
  searchHistory: string[]
  usedPhrases: Set<string>
  lastResponseStyle: string
  suggestedLinks: LinkSuggestion[]
  usedOffTopicResponses: Set<string>
  lastOffTopicIndex: number
  previousQuestions: Set<string>
  // New properties to track content shown to the user
  shownTopics: Set<string> // Track which topics have been covered
  shownContent: Set<string> // Track specific content pieces shown
  topicDepth: Map<string, number> // Track how deep we've gone into each topic
}

export const initChatContext = (): ChatContext => ({
  messages: [],
  topics: [],
  entities: new Set(),
  questionCount: 0,
  searchHistory: [],
  usedPhrases: new Set(),
  lastResponseStyle: "",
  suggestedLinks: [],
  usedOffTopicResponses: new Set(),
  lastOffTopicIndex: 0,
  previousQuestions: new Set(),
  // Initialize new tracking properties
  shownTopics: new Set(),
  shownContent: new Set(),
  topicDepth: new Map(),
})

// Function to extract topics from text and convert them to questions
export function extractTopicsFromText(text: string): string[] {
  // Initialize array to store extracted topics as questions
  const topicQuestions: string[] = []

  // Look for numbered lists which often indicate distinct topics
  const numberedItems = text.match(/\d+\.\s+([^\n]+)/g)
  if (numberedItems && numberedItems.length > 0) {
    // Convert numbered items to questions, but keep them general
    numberedItems.forEach((item) => {
      // Extract the text after the number
      const content = item.replace(/^\d+\.\s+/, "")
      if (content.length > 10 && content.length < 60) {
        // Ensure it's substantial enough but not too long
        // Extract just the main topic, not the full detailed content
        const mainTopic = content.split(/[:.,-]/, 1)[0].trim()
        if (mainTopic.length > 5) {
          topicQuestions.push(`Tell me more about ${mainTopic}`)
        }
      }
    })
  }

  // Look for section headers or topic transitions
  const sectionHeaders = text.match(/\n([A-Z][^.!?:]+):/g)
  if (sectionHeaders && sectionHeaders.length > 0) {
    sectionHeaders.forEach((header) => {
      const content = header.replace(/\n|:/g, "").trim()
      if (content.length > 5 && content.length < 40) {
        topicQuestions.push(`What about ${content.toLowerCase()}?`)
      }
    })
  }

  // Look for key phrases that indicate topics, but keep them general
  const topicIndicators = [
    /\b(POTS|dysautonomia|arrhythmia|heart rhythm|heart failure|cardiovascular)\b/gi,
    /\b(research|clinical trials|publications|studies)\b/gi,
    /\b(digital health|health tech|technology|wearable|AI|artificial intelligence)\b/gi,
    /\b(companies|ventures|advisory roles|Tabia|Qardio|FirstHX|Healthseers|Avive)\b/gi,
    /\b(speaking|media|appearances|presentations)\b/gi,
  ]

  // Extract topics based on indicators
  topicIndicators.forEach((indicator) => {
    const matches = text.match(indicator)
    if (matches) {
      // Get unique matches
      const uniqueMatches = [...new Set(matches)]
      uniqueMatches.forEach((match) => {
        // Create a question based on the topic
        if (match.length > 3 && match.length < 30) {
          // Avoid very short or very long matches
          topicQuestions.push(`Can you tell me more about Dr. Ali's work with ${match}?`)
        }
      })
    }
  })

  // If we still don't have enough topics, look for sentences that might be important
  if (topicQuestions.length < 2) {
    const sentences = text.split(/[.!?]/).filter((s) => s.trim().length > 20 && s.trim().length < 100)
    for (let i = 0; i < Math.min(sentences.length, 3); i++) {
      const sentence = sentences[i].trim()
      // Extract key noun phrases
      const words = sentence.split(/\s+/)
      if (words.length >= 3) {
        // Just take the first few words to keep it general
        const keyPhrase = words.slice(0, 3).join(" ")
        topicQuestions.push(`Tell me more about ${keyPhrase.toLowerCase()}`)
      }
    }
  }

  // Filter out overly specific suggestions about publications or detailed content
  const filteredQuestions = topicQuestions.filter((question) => {
    // Avoid suggestions with publication titles, dates, or journal names
    return !(
      (
        /\([^)]+journal|publication|published|paper|article|study|review|primer|terminology/i.test(question) ||
        /\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.test(question) ||
        /\b\d{4}\b/.test(question) || // Avoid years
        question.length > 80
      ) // Avoid very long questions
    )
  })

  // Deduplicate and limit the number of questions
  const uniqueQuestions = [...new Set(filteredQuestions)]

  // Return up to 4 questions
  return uniqueQuestions.slice(0, 4)
}

// Function to check if a response is similar to previously shown content
export function isContentDuplicate(newContent: string, context: ChatContext): boolean {
  // If we haven't shown any content yet, it's not a duplicate
  if (context.shownContent.size === 0) return false

  // Create a simplified version of the content for comparison
  const simplifiedContent = newContent
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?()'"]/g, "")
    .trim()

  // Check if we've shown this exact content before
  if (context.shownContent.has(simplifiedContent)) return true

  // Check for significant overlap with previous content
  for (const previousContent of context.shownContent) {
    // Calculate similarity (simple approach - shared words)
    const newWords = new Set(simplifiedContent.split(" "))
    const previousWords = new Set(previousContent.split(" "))

    // Count shared words
    let sharedWords = 0
    for (const word of newWords) {
      if (previousWords.has(word)) sharedWords++
    }

    // If more than 70% of words are shared, consider it a duplicate
    const similarityRatio = sharedWords / Math.min(newWords.size, previousWords.size)
    if (similarityRatio > 0.7) return true
  }

  return false
}

// Function to get a follow-up response that provides new information
export function getFollowUpResponse(topic: string, context: ChatContext): string {
  // Get the current depth for this topic (default to 0 if not set)
  const currentDepth = context.topicDepth.get(topic) || 0

  // Update the depth for next time
  context.topicDepth.set(topic, currentDepth + 1)

  // Mark this topic as shown
  context.shownTopics.add(topic)

  // Generate different responses based on the topic and depth
  switch (topic) {
    case "research":
      if (currentDepth === 0) {
        return getResearchResponse(context)
      } else if (currentDepth === 1) {
        return getResearchPublicationsResponse(context)
      } else if (currentDepth === 2) {
        return getResearchMethodologyResponse(context)
      } else {
        return getNoMoreInfoResponse(topic, context)
      }

    case "clinical":
      if (currentDepth === 0) {
        return getClinicalResponse(context)
      } else if (currentDepth === 1) {
        return getClinicalApproachResponse(context)
      } else if (currentDepth === 2) {
        return getClinicalSpecialtiesResponse(context)
      } else {
        return getNoMoreInfoResponse(topic, context)
      }

    case "ventures":
    case "technology":
      if (currentDepth === 0) {
        return getVenturesResponse(context)
      } else if (currentDepth === 1) {
        return getTechnologyCompaniesResponse(context)
      } else if (currentDepth === 2) {
        return getTechnologyInnovationsResponse(context)
      } else {
        return getNoMoreInfoResponse(topic, context)
      }

    // Add cases for other topics
    default:
      // For topics without multiple depth levels
      return getNoMoreInfoResponse(topic, context)
  }
}

// Function to generate a response when we have no more information
function getNoMoreInfoResponse(topic: string, context: ChatContext): string {
  // Check if this is a direct question about Dr. Ali
  const isDirectAboutQuestion =
    context.searchHistory &&
    context.searchHistory.length > 0 &&
    (/^tell me about dr\.? ali/i.test(context.searchHistory[context.searchHistory.length - 1].trim()) ||
      /^about dr\.? ali/i.test(context.searchHistory[context.searchHistory.length - 1].trim()) ||
      /^who is dr\.? ali/i.test(context.searchHistory[context.searchHistory.length - 1].trim()))

  // If it's a direct question about Dr. Ali, always provide the general response
  if (isDirectAboutQuestion) {
    return getGeneralResponse(context)
  }

  // Check if this is the first question about this topic
  const isFirstQuestion = !context.shownTopics.has(topic)

  // If it's the first question, we should provide information instead of saying we've shared everything
  if (isFirstQuestion) {
    // Return the appropriate response based on the topic
    if (topic === "clinical") {
      return getClinicalResponse(context)
    } else if (topic === "research") {
      return getResearchResponse(context)
    } else if (topic === "ventures" || topic === "technology") {
      return getVenturesResponse(context)
    } else if (topic === "speaking") {
      return getSpeakingResponse(context)
    } else if (topic === "media") {
      return getMediaResponse(context)
    } else if (topic === "about") {
      return getAboutResponse(context)
    } else if (topic === "cv") {
      return getCVResponse(context)
    } else if (topic === "contact") {
      return getContactResponse(context)
    } else {
      // For general topic, provide a comprehensive overview
      return getGeneralResponse(context)
    }
  }

  // Add the current topic to shown topics
  context.shownTopics.add(topic)

  // Suggest other topics the user might be interested in
  const otherTopics = ["clinical", "research", "ventures", "technology", "speaking", "media", "about"].filter(
    (t) => t !== topic && !context.shownTopics.has(t),
  )

  let response = `I've shared the main information I have about Dr. Ali's ${topic} work. `

  if (otherTopics.length > 0) {
    response += `You might be interested in learning about other aspects of Dr. Ali's work. Would you like to know about his ${otherTopics.slice(0, 3).join(", ")} ${otherTopics.length > 3 ? "or other areas" : ""}?`
  } else {
    response += `If you have specific questions about any aspect of Dr. Ali's work, please feel free to ask.`
  }

  // Add a link to the relevant page
  const topicPageMap: Record<string, string> = {
    clinical: "/clinical",
    research: "/research",
    ventures: "/ventures",
    technology: "/ventures",
    speaking: "/speaking",
    media: "/media",
    about: "/about",
    cv: "/cv",
    contact: "/contact",
  }

  if (topicPageMap[topic]) {
    response += `\n\n[LINK:${topicPageMap[topic]}:View Dr. Ali's complete ${topic} profile]`
  }

  return response
}

// Function to generate a general response about Dr. Ali
function getGeneralResponse(context: ChatContext): string {
  context.lastTopic = "general"

  // Create an array of different response variations
  const responseVariations = [
    `Dr. Asif Ali is a board-certified cardiologist and cardiac electrophysiologist based in Houston, Texas. He serves as the Director of Cardiac Electrophysiology at Houston Cardiovascular Center, where he specializes in treating heart rhythm disorders and autonomic conditions like POTS (Postural Orthostatic Tachycardia Syndrome).

Beyond his clinical practice, Dr. Ali is deeply involved in research through the Cena Research Institute and serves as an advisor to several major healthcare and technology companies, including JP Morgan Health, Abbott Laboratories, and Fitbit Health Solutions.

His current leadership roles include Chief Medical Officer at Tabia Health, Managing Director US at FirstHX, and Chief Medical Officer at Healthseers/Cardio, where he bridges the gap between medical expertise and technological innovation.

Dr. Ali is also a sought-after speaker on topics at the intersection of cardiology and technology, and has made media appearances on platforms like Fox News and the Dr. Oz Show.

[LINK:/about:Learn more about Dr. Ali's background] [LINK:/clinical:Explore Dr. Ali's clinical practice]`,

    `Dr. Asif Ali combines expertise in cardiology, research, and health technology innovation. As a board-certified cardiologist and electrophysiologist, he directs cardiac electrophysiology at Houston Cardiovascular Center, specializing in heart rhythm disorders and conditions like POTS.

His education includes a Medical Degree from The University of Texas Medical Branch, with residency at Baylor College of Medicine and fellowships at Texas Heart Institute.

Dr. Ali's work extends beyond clinical practice to include directing the Cena Research Institute and serving in leadership roles at several health technology companies, including Tabia Health, FirstHX, and Healthseers/Cardio.

He regularly speaks at medical conferences and healthcare innovation summits, and has appeared as a medical expert on Fox News and the Dr. Oz Show.

[LINK:/about:Read Dr. Ali's full biography] [LINK:/ventures:Explore Dr. Ali's health tech ventures]`,

    `Dr. Asif Ali is a nationally recognized cardiologist, academic leader, and digital health advisor based in Houston, Texas. His professional work spans three interconnected domains:

1. Clinical Practice: As Director of Cardiac Electrophysiology at Houston Cardiovascular Center, he specializes in heart rhythm disorders and autonomic conditions like POTS.

2. Research: Through the Cena Research Institute, he conducts studies on digital health technologies, remote monitoring, and AI applications in cardiac care.

3. Health Technology: He serves in leadership roles at companies developing innovative healthcare solutions, including Tabia Health, FirstHX, and Healthseers/Cardio.

Dr. Ali holds board certifications in Internal Medicine, Cardiovascular Disease, and Clinical Cardiac Electrophysiology, with training from prestigious institutions including Baylor College of Medicine and Texas Heart Institute.

[LINK:/clinical:Learn about Dr. Ali's clinical practice] [LINK:/research:Explore Dr. Ali's research]`,
  ]

  // Select a random variation to provide different responses for the same question
  const randomIndex = Math.floor(Math.random() * responseVariations.length)
  return responseVariations[randomIndex]
}

// New function for research publications details
function getResearchPublicationsResponse(context: ChatContext): string {
  context.lastTopic = "research"

  const response = `Dr. Ali has authored numerous publications in peer-reviewed medical journals. His recent publications include:

1. "Circle of Vieussens: Its Importance in the Presence of Significant Coronary Artery Stenosis in a 26-Year-Old Female With Kawasaki Disease" (Cureus, August 2024)
   - This case study examines a rare coronary anomaly and its clinical significance in the context of Kawasaki Disease.

2. "Mal De Debarquement Syndrome: An Often Unrecognized and Unreported Condition" (Cureus, July 2024)
   - This paper highlights the neurological condition that can occur after sea travel and its potential cardiovascular implications.

3. "Brief Review and Primer of Key Terminology for Artificial Intelligence and Machine Learning in Hypertension" (American Heart Association Journals – Hypertension, July 2024)
   - This educational review provides clinicians with essential AI/ML terminology relevant to hypertension management.

4. "Mental Health Applications of Generative AI and Large Language Modeling in the United States" (MDPI-Digital Mental Health, July 2024)
   - This paper explores the intersection of AI and mental health, with implications for patients with cardiovascular conditions.

5. "High Altitude, Air Travel, and Heart Disease" (UpToDate, March 2023)
   - This clinical reference guide addresses the physiological effects of altitude and air travel on cardiac patients.

His earlier publications focused on arrhythmia management, autonomic dysfunction, and novel cardiac monitoring technologies. Dr. Ali's publication strategy emphasizes translational research that bridges clinical practice and technological innovation.

[LINK:/research:View Dr. Ali's complete publication list]`

  // Store this content as shown
  context.shownContent.add(
    response
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[.,;:!?()'"]/g, "")
      .trim(),
  )

  return response
}

// New function for research methodology details
function getResearchMethodologyResponse(context: ChatContext): string {
  context.lastTopic = "research"

  const response = `Dr. Ali employs several innovative research methodologies in his work at the Cena Research Institute:

1. Digital Biomarker Development
   - Using machine learning algorithms to identify novel digital biomarkers from wearable device data
   - Validating these biomarkers against traditional clinical measures
   - Developing predictive models for early detection of cardiac events

2. Inclusive Clinical Trial Design
   - Implementing protocols that ensure diverse patient representation
   - Utilizing remote monitoring to expand geographic reach of trials
   - Developing multilingual research materials and consent processes

3. Real-World Evidence Generation
   - Collecting and analyzing data from clinical practice settings
   - Comparing outcomes across different practice environments
   - Identifying factors that influence treatment effectiveness outside controlled trials

4. Patient-Centered Outcome Measures
   - Developing and validating quality-of-life instruments specific to cardiac conditions
   - Incorporating patient-reported outcomes into all research protocols
   - Using mixed-methods approaches to capture both quantitative and qualitative data

Dr. Ali's research team includes data scientists, clinical research coordinators, and patient advocates who collaborate to ensure methodological rigor while maintaining clinical relevance. The institute has developed proprietary data analysis pipelines that comply with healthcare privacy regulations while enabling sophisticated pattern recognition.

[LINK:/research:Learn more about Dr. Ali's research methodologies]`

  // Store this content as shown
  context.shownContent.add(
    response
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[.,;:!?()'"]/g, "")
      .trim(),
  )

  return response
}

// New function for clinical approach details
function getClinicalApproachResponse(context: ChatContext): string {
  context.lastTopic = "clinical"

  const response = `Dr. Ali's clinical approach is characterized by several distinctive elements that set his practice apart:

1. Comprehensive Initial Assessment
   - Extended first consultations (typically 60-90 minutes)
   - Detailed review of prior medical records and test results
   - Thorough physical examination with special attention to autonomic indicators
   - Screening for often-overlooked comorbidities

2. Precision Diagnostics
   - Selective use of advanced cardiac imaging
   - Extended monitoring protocols for intermittent symptoms
   - Specialized autonomic testing for POTS and dysautonomia
   - Genetic testing when family history suggests hereditary factors

3. Multimodal Treatment Planning
   - Integration of pharmacological and non-pharmacological approaches
   - Personalized exercise prescriptions based on individual capacity
   - Nutritional guidance tailored to cardiac condition
   - Stress management and sleep optimization strategies

4. Collaborative Care Coordination
   - Regular communication with primary care providers
   - Coordination with other specialists (neurology, gastroenterology, etc.)
   - Integration of mental health support when needed
   - Patient advocacy within the healthcare system

5. Continuous Monitoring and Adaptation
   - Regular follow-up schedule based on condition severity
   - Adjustment of treatment plans based on patient response
   - Utilization of remote monitoring when appropriate
   - Proactive management of medication side effects

Dr. Ali emphasizes patient education and empowerment, ensuring that patients understand their condition and treatment options. His approach recognizes the complex interplay between cardiovascular health and other body systems, particularly the autonomic nervous system.

[LINK:/clinical:Learn more about Dr. Ali's clinical approach]`

  // Store this content as shown
  context.shownContent.add(
    response
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[.,;:!?()'"]/g, "")
      .trim(),
  )

  return response
}

// New function for clinical specialties details
function getClinicalSpecialtiesResponse(context: ChatContext): string {
  context.lastTopic = "clinical"

  const response = `Dr. Ali's clinical practice encompasses several specialized areas of cardiovascular medicine:

1. Autonomic Disorders
   - POTS (Postural Orthostatic Tachycardia Syndrome)
   - Neurocardiogenic syncope
   - Inappropriate sinus tachycardia
   - Autonomic dysfunction following viral illness
   - Post-COVID dysautonomia

2. Cardiac Electrophysiology
   - Atrial fibrillation and flutter
   - Supraventricular tachycardias
   - Ventricular arrhythmias
   - Bradyarrhythmias and conduction disorders
   - Sudden cardiac death risk assessment

3. Preventive Cardiology
   - Advanced lipid management
   - Hypertension optimization
   - Metabolic syndrome
   - Cardiovascular risk assessment
   - Lifestyle medicine for heart health

4. Specialized Populations
   - Athletes with cardiac concerns
   - Women's cardiovascular health
   - Cardiac issues in young adults
   - Pregnancy-related cardiac conditions
   - Cardiac rehabilitation

5. Integrative Cardiology
   - Evidence-based complementary approaches
   - Nutritional interventions for heart health
   - Mind-body techniques for cardiovascular wellness
   - Supplement safety and efficacy evaluation
   - Stress management strategies

Dr. Ali maintains active board certifications in Cardiovascular Disease and Clinical Cardiac Electrophysiology, allowing him to provide comprehensive care across these specialty areas. His practice is particularly known for success with complex and refractory cases that have not responded to conventional approaches.

[LINK:/clinical:Learn more about Dr. Ali's clinical specialties]`

  // Store this content as shown
  context.shownContent.add(
    response
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[.,;:!?()'"]/g, "")
      .trim(),
  )

  return response
}

// New function for technology companies details
function getTechnologyCompaniesResponse(context: ChatContext): string {
  context.lastTopic = "technology"

  const response = `Dr. Ali has worked with numerous health technology companies in various capacities. Here's a more detailed look at his key company relationships:

1. Tabia Health (2024-Present)
   - Role: Chief Medical Officer
   - Focus: AI-powered digital care pathway orchestration
   - Contributions: Clinical validation of AI algorithms, development of specialty-specific care pathways, integration of clinical guidelines into digital workflows

2. FirstHX (2024-Present)
   - Role: Managing Director US
   - Focus: Knowledge-based history taking solutions
   - Contributions: Adaptation of clinical questionnaires for digital platforms, validation of patient-reported data accuracy, implementation strategy for US healthcare systems

3. Healthseers/Cardio (2024-Present)
   - Role: Chief Medical Officer
   - Focus: AI-enhanced PhonoCardioGraphy for heart defect detection
   - Contributions: Clinical trial design, algorithm refinement based on clinical outcomes, regulatory strategy development

4. Avive AED (2017-Present)
   - Role: Chief Medical Advisor
   - Focus: Next-generation Automated External Defibrillators
   - Contributions: User interface optimization, implementation of latest resuscitation guidelines, development of post-event data analysis tools

5. Qardio (2022-2024)
   - Role: Global Chief Medical Officer
   - Focus: Remote Patient Monitoring and Remote Cardiac Rehabilitation
   - Contributions: Development of cardiac monitoring protocols, clinical validation studies, integration with electronic health records

6. Thrive360 (2021-2023)
   - Role: Chief Medical Officer
   - Focus: Oculus-based Virtual Reality Mental Health Solutions
   - Contributions: Design of therapeutic VR experiences, clinical trials of VR therapy efficacy, development of physiological monitoring during VR sessions

Dr. Ali's approach to technology advisory roles emphasizes clinical rigor, user-centered design, and practical implementation considerations. He helps companies bridge the gap between technological capabilities and real-world clinical needs.

[LINK:/ventures:Learn more about Dr. Ali's technology company roles]`

  // Store this content as shown
  context.shownContent.add(
    response
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[.,;:!?()'"]/g, "")
      .trim(),
  )

  return response
}

// New function for technology innovations details
function getTechnologyInnovationsResponse(context: ChatContext): string {
  context.lastTopic = "technology"

  const response = `Dr. Ali has been involved in developing several innovative health technologies throughout his career:

1. Remote Cardiac Monitoring Systems
   - Helped develop algorithms for detecting subtle arrhythmias in ambulatory monitoring
   - Created clinical protocols for remote monitoring implementation
   - Designed patient engagement strategies to improve adherence to monitoring

2. AI-Powered Diagnostic Tools
   - Contributed to machine learning models for ECG interpretation
   - Validated AI algorithms against gold-standard clinical diagnoses
   - Developed implementation frameworks for AI tools in clinical workflows

3. Digital Therapeutics
   - Designed digital interventions for cardiac rehabilitation
   - Created personalized exercise protocols based on patient data
   - Developed cognitive-behavioral components for heart health applications

4. Virtual Reality Applications
   - Pioneered VR-based anxiety management for cardiac patients
   - Developed immersive educational experiences for patient education
   - Created VR environments for cardiac rehabilitation exercises

5. Wearable Technology Integration
   - Established clinical validation protocols for consumer wearables
   - Developed frameworks for integrating wearable data into clinical decision-making
   - Created guidelines for patient selection for wearable monitoring

Dr. Ali's innovation approach focuses on clinical validation, user experience, and practical implementation considerations. He emphasizes technologies that can be integrated into existing clinical workflows and that provide meaningful, actionable data to both clinicians and patients.

[LINK:/ventures:Learn more about Dr. Ali's technology innovations]`

  // Store this content as shown
  context.shownContent.add(
    response
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[.,;:!?()'"]/g, "")
      .trim(),
  )

  return response
}

// Function to identify technology and wearable device questions
function identifyTechnologyQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  // Comprehensive list of technology-related keywords
  const technologyKeywords = [
    // Wearable devices
    "wearable",
    "wearables",
    "device",
    "devices",
    "wear",
    "wearing",
    "worn",
    "fitbit",
    "apple watch",
    "smartwatch",
    "smart watch",
    "fitness tracker",
    "activity tracker",
    "heart monitor",
    "ecg monitor",
    "ekg monitor",
    "holter",
    "loop recorder",
    "implantable",
    "implant",
    "implanted",
    "implantable device",

    // Digital health
    "digital health",
    "health tech",
    "healthtech",
    "health technology",
    "telehealth",
    "telemedicine",
    "remote monitoring",
    "remote patient monitoring",
    "rpm",
    "virtual care",
    "digital care",
    "digital medicine",
    "digital therapeutic",

    // AI and data
    "ai",
    "artificial intelligence",
    "machine learning",
    "ml",
    "algorithm",
    "predictive",
    "analytics",
    "data",
    "big data",
    "health data",
    "patient data",
    "monitoring",
    "monitor",
    "track",
    "tracking",
    "sensor",
    "sensors",

    // Specific technologies
    "phonocardiography",
    "aed",
    "defibrillator",
    "cardiac rehabilitation",
    "virtual reality",
    "vr",
    "oculus",
    "digital platform",
    "app",
    "application",
    "software",
    "hardware",
    "system",
    "solution",
    "technology",

    // Specific companies
    "qardio",
    "tabia",
    "firsthx",
    "healthseers",
    "avive",
    "thrive360",
    "abbott",
    "jp morgan health",
    "epam",
    "cloudsteam",
    "lumi health",

    // Research-related tech
    "valencell",
    "blood pressure",
    "counterpulsation",
    "renal denervation",

    // General tech terms
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
  ]

  // Check if any technology keyword is present
  const hasTechKeyword = technologyKeywords.some((keyword) => text.includes(keyword))

  // Check for specific patterns related to technology
  const techPatterns = [
    /(?:use|work with|develop|advise on|consult|involved with).+(?:technology|tech|device|wearable|digital|platform|solution)/i,
    /(?:technology|tech|device|wearable|digital|platform|solution).+(?:use|work with|develop|advise on|consult|involved with)/i,
    /(?:what|which|how).+(?:technology|tech|device|wearable|digital|platform|solution)/i,
    /(?:experience|expertise|background|work).+(?:technology|tech|device|wearable|digital|platform|solution)/i,
  ]

  const hasTechPattern = techPatterns.some((pattern) => pattern.test(text))

  // Check if Dr. Ali is mentioned
  const mentionsDrAli = /(he|his|dr|ali|asif)/i.test(text)

  return (hasTechKeyword || hasTechPattern) && mentionsDrAli
}

// Function to generate responses for technology and wearable device questions
function getTechnologyResponse(query: string, context: ChatContext): string {
  context.lastTopic = "technology"
  const text = query.toLowerCase().trim()

  // Determine the specific technology area being asked about
  const isAboutWearables =
    /\b(wearable|device|fitbit|apple watch|smartwatch|smart watch|fitness tracker|activity tracker|heart monitor|ecg|ekg|holter|loop recorder|implantable|implant)\b/i.test(
      text,
    )

  const isAboutRemoteMonitoring =
    /\b(remote monitoring|remote patient monitoring|rpm|telehealth|telemedicine|virtual care|digital care)\b/i.test(
      text,
    )

  const isAboutAI = /\b(ai|artificial intelligence|machine learning|ml|algorithm|predictive|analytics)\b/i.test(text)

  const isAboutVR = /\b(virtual reality|vr|oculus)\b/i.test(text)

  const isAboutAED = /\b(aed|defibrillator)\b/i.test(text)

  const isAboutSpecificCompany =
    /\b(qardio|tabia|firsthx|healthseers|avive|thrive360|abbott|jp morgan health|epam|cloudsteam|lumi health)\b/i.test(
      text,
    )

  // Generate a response based on the specific technology area
  if (isAboutWearables) {
    return `Yes, Dr. Ali has extensive experience with wearable devices in both his clinical practice and research. He has worked with various wearable technologies including:

1. Cardiac monitoring devices such as implantable loop recorders and Holter monitors
2. Consumer wearables like Fitbit (he served as an advisor to Fitbit Health Solutions)
3. Remote patient monitoring devices through his role as Global Chief Medical Officer at Qardio (2022-2024)
4. Research on wearable blood pressure monitoring technology with Valencell (2023)

Dr. Ali integrates wearable technology data into his clinical practice for more comprehensive patient monitoring and has published research on digital biomarkers for early detection of cardiac conditions. His approach combines clinical expertise with technological innovation to improve patient outcomes.

[LINK:/ventures:Learn more about Dr. Ali's technology work] [LINK:/research:View Dr. Ali's research with wearable technologies]`
  } else if (isAboutRemoteMonitoring) {
    return `Yes, Dr. Ali is deeply involved with remote patient monitoring (RPM) technologies. His experience includes:

1. Serving as Global Chief Medical Officer at Qardio (2022-2024), a leader in remote patient monitoring and remote cardiac rehabilitation
2. Implementing RPM solutions in his clinical practice for patients with cardiac conditions
3. Researching the effectiveness of remote monitoring for post-procedure cardiac care
4. Advising several companies developing remote monitoring platforms

Dr. Ali is particularly interested in how remote monitoring can improve care for patients with chronic cardiac conditions and those in post-procedure recovery phases. He has spoken extensively about the potential of RPM to transform healthcare delivery and improve patient outcomes.

[LINK:/ventures:Learn more about Dr. Ali's remote monitoring work]`
  } else if (isAboutAI) {
    return `Yes, Dr. Ali works extensively with artificial intelligence and machine learning technologies in healthcare. His involvement includes:

1. Serving as Chief Medical Officer at Tabia Health (2024-Present), an AI-powered digital care pathway orchestration platform
2. Publishing research on AI applications in cardiology, including "Brief Review and Primer of Key Terminology for Artificial Intelligence and Machine Learning in Hypertension" (American Heart Association Journals, 2024)
3. Developing predictive analytics models for cardiac events
4. Advising companies on the clinical implementation of AI algorithms

Dr. Ali believes in the responsible integration of AI into clinical workflows, ensuring that these technologies enhance rather than replace the physician-patient relationship. His work focuses on how AI can improve diagnostic accuracy, treatment personalization, and healthcare efficiency.

[LINK:/research:Learn more about Dr. Ali's AI research] [LINK:/ventures:View Dr. Ali's AI-related ventures]`
  } else if (isAboutVR) {
    return `Yes, Dr. Ali has worked with virtual reality technology in healthcare. He served as Chief Medical Officer at Thrive360 (2021-2023), an Oculus-based Virtual Reality Mental Health Solution. In this role, he:

1. Helped develop VR-based cognitive behavioral therapy applications
2. Conducted clinical trials on the effectiveness of VR therapy (2022-2023)
3. Explored applications of VR for cardiac rehabilitation and patient education
4. Advised on the clinical implementation of VR technologies

Dr. Ali recognizes the potential of immersive technologies like VR to transform healthcare delivery, particularly in areas of mental health, pain management, and patient education.

[LINK:/ventures:Learn more about Dr. Ali's work with VR technology]`
  } else if (isAboutAED) {
    return `Yes, Dr. Ali has been involved with AED (Automated External Defibrillator) technology as Chief Medical Advisor at Avive AED (2017-Present). In this role, he:

1. Provides clinical guidance on the development of next-generation AEDs
2. Advises on user experience and deployment strategies to improve cardiac arrest outcomes
3. Contributes to educational initiatives around sudden cardiac arrest response
4. Helps bridge the gap between clinical needs and technological capabilities

Dr. Ali is passionate about improving survival rates for sudden cardiac arrest through better technology, wider AED deployment, and enhanced public education.

[LINK:/ventures:Learn more about Dr. Ali's work with AED technology]`
  } else if (isAboutSpecificCompany) {
    // Extract company name from query
    let companyName = ""
    const companies = [
      "qardio",
      "tabia",
      "firsthx",
      "healthseers",
      "avive",
      "thrive360",
      "abbott",
      "jp morgan health",
      "epam",
      "cloudsteam",
      "lumi health",
    ]
    for (const company of companies) {
      if (text.includes(company)) {
        companyName = company
        break
      }
    }

    // Company-specific responses
    const companyResponses: { [key: string]: string } = {
      tabia: `Yes, Dr. Ali currently serves as Chief Medical Officer at Tabia Health (2024-Present). Tabia Health is an AI-powered digital care pathway orchestration platform. In this role, Dr. Ali provides clinical leadership and expertise to ensure the platform effectively addresses healthcare needs while maintaining clinical accuracy and patient safety.`,

      qardio: `Yes, Dr. Ali served as Global Chief Medical Officer at Qardio (2022-2024), a leader in Remote Patient Monitoring and Remote Cardiac Rehabilitation. During his tenure, he helped guide the company's clinical strategy, product development, and implementation of remote monitoring solutions for cardiac patients.`,

      firsthx: `Yes, Dr. Ali currently serves as Managing Director US at FirstHX (2024-Present). FirstHX is a knowledge-based history taking solution for patient communication. Dr. Ali helps guide the company's expansion in the US market and ensures their solutions effectively address clinical needs while improving patient communication.`,

      healthseers: `Yes, Dr. Ali currently serves as Chief Medical Officer at Healthseers/Cardio (2024-Present). The company develops AI-enhanced PhonoCardioGraphy solutions for heart defect detection. Dr. Ali provides clinical expertise to ensure the technology accurately identifies cardiac abnormalities and integrates effectively into clinical workflows.`,

      avive: `Yes, Dr. Ali has been serving as Chief Medical Advisor at Avive AED (2017-Present). Avive manufactures next-generation Automated External Defibrillators. Dr. Ali provides clinical guidance on product development and deployment strategies to improve outcomes for sudden cardiac arrest victims.`,

      thrive360: `Yes, Dr. Ali served as Chief Medical Officer at Thrive360 (2021-2023), an Oculus-based Virtual Reality Mental Health Solution. He helped develop VR applications for cognitive behavioral therapy and conducted clinical trials on their effectiveness.`,

      abbott: `Yes, Dr. Ali has served as an advisor to Abbott Laboratories, a global healthcare company that develops medical devices, diagnostics, and pharmaceuticals. He provides clinical insights on cardiac devices and monitoring technologies.`,

      "jp morgan health": `Yes, Dr. Ali has served as an advisor to JP Morgan Health, providing expertise on healthcare innovation, digital health technologies, and the evolving landscape of healthcare delivery.`,

      epam: `Yes, Dr. Ali has served as an advisor to EPAM Systems, a global provider of digital platform engineering and software development services. He provides healthcare expertise to guide their development of digital health solutions.`,

      cloudsteam: `Yes, Dr. Ali has advised CloudSteam Medical Imaging, providing clinical expertise on medical imaging technologies and their applications in cardiac care.`,

      "lumi health": `Yes, Dr. Ali has advised Lumi Health, providing clinical expertise on their health technology solutions.`,
    }

    if (companyName && companyResponses[companyName]) {
      return (
        companyResponses[companyName] +
        `\n\n[LINK:/ventures:Learn more about Dr. Ali's advisory roles and technology companies]`
      )
    }
  }

  // Default technology response if no specific area is identified
  return `Yes, Dr. Ali is deeply involved with healthcare technology across multiple domains. His experience includes:

1. Leadership roles in health tech companies:
  - Chief Medical Officer at Tabia Health (AI-powered care pathway orchestration)
  - Managing Director US at FirstHX (knowledge-based history taking solution)
  - Chief Medical Officer at Healthseers/Cardio (AI-enhanced PhonoCardioGraphy)
  - Chief Medical Advisor at Avive AED (next-generation defibrillators)
  - Former Global CMO at Qardio (remote patient monitoring)
  - Former CMO at Thrive360 (VR-based mental health solutions)

2. Research on digital health technologies:
  - Wearable devices for cardiac monitoring
  - Remote patient monitoring systems
  - AI applications in cardiovascular care
  - Digital biomarkers for early detection of cardiac conditions

3. Advisory roles with major technology companies:
  - Abbott Laboratories
  - Fitbit Health Solutions
  - JP Morgan Health
  - EPAM Systems

Dr. Ali's approach bridges the gap between clinical medicine and technological innovation, ensuring that digital health solutions address real healthcare needs while maintaining clinical accuracy and patient safety.

[LINK:/ventures:Learn more about Dr. Ali's technology work] [LINK:/research:View Dr. Ali's research on health technologies]`
}

// Function to identify complex questions that should be directed to contact form
function identifyComplexQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  // Check if the question is very long (over 150 characters)
  const isLengthy = text.length > 150

  // Check if the question contains multiple sentences
  const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
  const hasMultipleSentences = sentenceCount > 2

  // Check for patterns indicating complex medical inquiries
  const complexMedicalPatterns = [
    // Multiple symptoms or conditions
    /(?:symptoms|signs|problems|issues|conditions).+(?:and|also|additionally|moreover|furthermore|besides|plus).+(?:symptoms|signs|problems|issues|conditions)/i,

    // Detailed medical history
    /(?:history|background|years|months|weeks).+(?:diagnosed|treatment|medication|therapy|doctor)/i,

    // Specific test results
    /(?:test|scan|mri|echocardiogram|ekg|ecg|holter|blood work|lab).+(?:results|showed|indicated|found)/i,

    // Multiple medications
    /(?:taking|prescribed|medication|medicine|drug).+(?:and|also|additionally|moreover|plus).+(?:medication|medicine|drug)/i,

    // Seeking second opinion
    /(?:second opinion|another doctor|different perspective|alternative treatment)/i,

    // Personal case details
    /(?:my|i have|i've been|i am|i'm experiencing|in my case|for me personally)/i,

    // Multiple questions in one
    /(?:\?).+(?:\?)/i,

    // Specific treatment questions
    /(?:should i|would he recommend|is it better to|what would he do|how would he handle|what's the best approach)/i,

    // Detailed POTS questions
    /(?:pots|dysautonomia).+(?:specific|protocol|approach|treatment plan|management strategy|medication regimen)/i,
  ]

  // Check for complex medical patterns
  const hasComplexMedicalPattern = complexMedicalPatterns.some((pattern) => pattern.test(text))

  // Check for keywords indicating need for personalized advice
  const personalizedAdviceKeywords = [
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
  ]

  const hasPersonalizedAdviceKeywords = personalizedAdviceKeywords.some((keyword) => text.includes(keyword))

  // Return true if the question meets criteria for complexity
  return (
    (isLengthy && hasMultipleSentences) ||
    hasComplexMedicalPattern ||
    hasPersonalizedAdviceKeywords ||
    (isLengthy && hasPersonalizedAdviceKeywords)
  )
}

// Function to generate response for complex questions
function getComplexQuestionResponse(query: string, context: ChatContext): string {
  // Set the context topic to "contact" since we're directing to contact form
  context.lastTopic = "contact"

  // Check for specific keywords to customize the response
  const text = query.toLowerCase()

  // Determine if it's a medical/clinical question
  const isMedicalQuestion =
    /\b(pots|dysautonomia|arrhythmia|afib|atrial fibrillation|heart|cardiac|symptoms|treatment|medication|diagnosis|therapy|condition|disease|disorder)\b/i.test(
      text,
    )

  // Determine if it's a research question
  const isResearchQuestion = /\b(research|study|publication|clinical trial|investigation|findings)\b/i.test(text)

  // Determine if it's a ventures/business question
  const isVenturesQuestion =
    /\b(company|venture|startup|business|advisor|cmo|digital health|technology|partnership|collaboration)\b/i.test(text)

  // Determine if it's a speaking/media question
  const isSpeakingMediaQuestion =
    /\b(speak|speaker|presentation|media|interview|press|appearance|event|conference)\b/i.test(text)

  // Create a tailored response based on the question type
  let response = ""

  if (isMedicalQuestion) {
    response = `Thank you for your detailed question about ${text.includes("pots") ? "POTS/dysautonomia" : "this medical condition"}. Your question requires a more personalized response than this chat interface can provide.

For specific medical inquiries like yours, Dr. Ali recommends scheduling a consultation where he can provide guidance tailored to your individual situation. This ensures you receive the most accurate and helpful information for your specific circumstances.`
  } else if (isResearchQuestion) {
    response = `Thank you for your interest in Dr. Ali's research. Your detailed question would be best addressed directly by Dr. Ali or his research team, as it requires specific information about his research activities.

The contact form on the website allows you to specify your research-related inquiry, ensuring it reaches the appropriate team member who can provide you with the most current and comprehensive information.`
  } else if (isVenturesQuestion) {
    response = `Thank you for your interest in Dr. Ali's work with health technology companies. Your detailed question about his ventures and advisory roles would be best addressed directly.

For specific inquiries about potential collaborations, partnerships, or his work with particular companies, please use the contact form on the website. This will ensure your message reaches Dr. Ali or the appropriate team member who can provide you with the information you're seeking.`
  } else if (isSpeakingMediaQuestion) {
    response = `Thank you for your interest in Dr. Ali's speaking engagements or media appearances. For detailed inquiries about booking Dr. Ali for an event, interview, or other professional engagement, direct contact is recommended.

The contact form on the website allows you to provide specific details about your request, ensuring it reaches the appropriate team member who handles Dr. Ali's speaking and media schedule.`
  } else {
    response = `Thank you for your detailed question. This appears to require a more personalized response than this chat interface can provide.

For complex inquiries like yours, Dr. Ali recommends using the contact form on the website. This ensures your question reaches the appropriate team member who can provide you with the most comprehensive and accurate information.`
  }

  // Add standard closing with link to contact page
  response += `\n\nPlease use the contact form on the website to submit your question. Dr. Ali's team reviews all inquiries and will respond to your specific question in a timely manner.

[LINK:/contact:Contact Dr. Ali directly]`

  return response
}

// Function to handle exact matches with suggested questions
function handleExactSuggestedQuestions(query: string): string | null {
  const normalizedQuery = query.toLowerCase().trim()

  // Create context objects with lastTopic set for each response type
  const clinicalContext = {
    lastTopic: "clinical",
    searchHistory: [],
    shownContent: new Set(),
    shownTopics: new Set(),
    topicDepth: new Map(),
  } as ChatContext
  const researchContext = {
    lastTopic: "research",
    searchHistory: [],
    shownContent: new Set(),
    shownTopics: new Set(),
    topicDepth: new Map(),
  } as ChatContext
  const venturesContext = {
    lastTopic: "ventures",
    searchHistory: [],
    shownContent: new Set(),
    shownTopics: new Set(),
    topicDepth: new Map(),
  } as ChatContext
  const contactContext = {
    lastTopic: "contact",
    searchHistory: [],
    shownContent: new Set(),
    shownTopics: new Set(),
    topicDepth: new Map(),
  } as ChatContext
  const aboutContext = {
    lastTopic: "about",
    searchHistory: [],
    shownContent: new Set(),
    shownTopics: new Set(),
    topicDepth: new Map(),
  } as ChatContext
  const mediaContext = {
    lastTopic: "media",
    searchHistory: [],
    shownContent: new Set(),
    shownTopics: new Set(),
    topicDepth: new Map(),
  } as ChatContext
  const speakingContext = {
    lastTopic: "speaking",
    searchHistory: [],
    shownContent: new Set(),
    shownTopics: new Set(),
    topicDepth: new Map(),
  } as ChatContext
  const locationContext = {
    lastTopic: "location",
    searchHistory: [],
    shownContent: new Set(),
    shownTopics: new Set(),
    topicDepth: new Map(),
  } as ChatContext
  const cvContext = {
    lastTopic: "cv",
    searchHistory: [],
    shownContent: new Set(),
    shownTopics: new Set(),
    topicDepth: new Map(),
  } as ChatContext
  const technologyContext = {
    lastTopic: "technology",
    searchHistory: [],
    shownContent: new Set(),
    shownTopics: new Set(),
    topicDepth: new Map(),
  } as ChatContext
  const identityContext = {
    lastTopic: "identity",
    searchHistory: [],
    shownContent: new Set(),
    shownTopics: new Set(),
    topicDepth: new Map(),
  } as ChatContext

  // Map of exact suggested questions to their appropriate responses
  const suggestedQuestionsMap: Record<string, string> = {
    // Contact questions
    "how can i contact dr. ali?": getContactResponse(contactContext),
    "how can i get in touch with dr. ali?": getContactResponse(contactContext),

    // Clinical questions
    "what conditions does dr. ali treat?": getClinicalResponse(clinicalContext),
    "what is dr. ali's clinical practice like?": getClinicalResponse(clinicalContext),
    "how does dr. ali treat pots?": getSpecificClinicalResponse("How does Dr. Ali treat POTS?", clinicalContext),
    "where does dr. ali practice?": getLocationResponse(locationContext),

    // Research questions
    "tell me more about dr. ali's research interests": getResearchResponse(researchContext),
    "what kind of research does dr. ali do?": getResearchResponse(researchContext),
    "what publications has dr. ali authored?": getResearchResponse(researchContext),
    "what clinical trials is dr. ali involved in?": getResearchResponse(researchContext),

    // Ventures questions
    "what companies has dr. ali advised?": getVenturesResponse(venturesContext),
    "which companies has dr. ali worked with?": getVenturesResponse(venturesContext),
    "tell me about dr. ali's role in health tech": getVenturesResponse(venturesContext),
    "what is dr. ali's work with tabia health?": getTechnologyResponse(
      "What is Dr. Ali's work with Tabia Health?",
      technologyContext,
    ),

    // About questions
    "tell me more about dr. ali's background": getAboutResponse(aboutContext),
    "what is dr. ali's education?": getAboutResponse(aboutContext),

    // Media questions
    "what media appearances has dr. ali made?": getMediaResponse(mediaContext),

    // Speaking questions
    "what speaking topics does dr. ali cover?": getSpeakingResponse(speakingContext),

    // POTS specific
    "how does dr. ali approach pots treatment?": getSpecificClinicalResponse(
      "How does Dr. Ali treat POTS?",
      clinicalContext,
    ),

    // Technology questions
    "what digital health technologies does dr. ali work with?": getTechnologyResponse(
      "What digital health technologies does Dr. Ali work with?",
      technologyContext,
    ),
    "does dr. ali work with wearable devices?": getTechnologyResponse(
      "Does Dr. Ali work with wearable devices?",
      technologyContext,
    ),
    "what is dr. ali's experience with wearables?": getTechnologyResponse(
      "What is Dr. Ali's experience with wearables?",
      technologyContext,
    ),
    "does dr. ali use ai in his practice?": getTechnologyResponse(
      "Does Dr. Ali use AI in his practice?",
      technologyContext,
    ),
    "what remote monitoring solutions does dr. ali work with?": getTechnologyResponse(
      "What remote monitoring solutions does Dr. Ali work with?",
      technologyContext,
    ),
    "who are you?": getIdentityResponse(identityContext),
    "what are you?": getIdentityResponse(identityContext),
    "tell me about yourself": getIdentityResponse(identityContext),
    "what can you do?": getIdentityResponse(identityContext),
  }

  // Check for exact matches (case insensitive)
  return suggestedQuestionsMap[normalizedQuery] || null
}

// Function to identify specific clinical questions about conditions like POTS
function identifySpecificClinicalQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  // Specific patterns for POTS and other clinical conditions
  const specificClinicalPatterns = [
    // POTS specific patterns
    /how.*(he|dr\.? ali|doctor ali|asif ali|his).*(treat|manage|help|care|approach|handle).*(pots|dysautonomia)/i,
    /(pots|dysautonomia).*(treatment|management|approach|protocol|therapy|care).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /what.*(he|dr\.? ali|doctor ali|asif ali|his).*(do|recommend|prescribe|suggest).*(pots|dysautonomia)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(treat|manage|help|care|approach|handle).*(pots|dysautonomia)/i,
    /(pots|dysautonomia).*(he|dr\.? ali|doctor ali|asif ali|his).*(treat|manage|help|care|approach|handle)/i,

    // General treatment patterns
    /how.*(he|dr\.? ali|doctor ali|asif ali|his).*(treat|manage|help|care|approach|handle).*(patient|condition|disease|disorder)/i,
    /what.*(treatment|management|approach|protocol|therapy|care).*(he|dr\.? ali|doctor ali|asif ali|his).*(use|provide|offer)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(treatment|management|approach|protocol|therapy|care).*(method|style|philosophy)/i,

    // Specific conditions
    /how.*(he|dr\.? ali|doctor ali|asif ali|his).*(treat|manage|help|care|approach|handle).*(arrhythmia|afib|atrial fibrillation|heart rhythm|heart failure|coronary|cardiovascular)/i,
    /(arrhythmia|afib|atrial fibrillation|heart rhythm|heart failure|coronary|cardiovascular).*(treatment|management|approach|protocol|therapy|care).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
  ]

  for (const pattern of specificClinicalPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  // Check for specific clinical keywords in combination
  const hasPOTS = /\b(pots|dysautonomia)\b/i.test(text)
  const hasTreatment = /\b(treat|treatment|manage|management|approach|protocol|therapy|care|handle|help)\b/i.test(text)
  const mentionsDrAli = /\b(he|his|dr|ali|asif)\b/i.test(text)

  if (hasPOTS && (hasTreatment || mentionsDrAli)) {
    return true
  }

  // Check for other specific conditions
  const hasCardiacCondition =
    /\b(arrhythmia|afib|atrial fibrillation|heart rhythm|heart failure|coronary|cardiovascular)\b/i.test(text)

  if (hasCardiacCondition && (hasTreatment || mentionsDrAli)) {
    return true
  }

  return false
}

// Function to generate responses for specific clinical questions
function getSpecificClinicalResponse(query: string, context: ChatContext): string {
  context.lastTopic = "clinical"
  const text = query.toLowerCase().trim()

  // Standard medical disclaimer to add to all clinical responses
  const medicalDisclaimer =
    "\n\n**Important Note:** This information is provided for educational purposes only and is not intended as medical advice. Every patient's situation is unique. Please consult with your healthcare provider or schedule an appointment with Dr. Ali for personalized medical guidance tailored to your specific health needs."

  // Check if the question is about POTS
  if (/\b(pots|dysautonomia)\b/i.test(text)) {
    return `Dr. Ali has developed "The POTS Doc Protocol" - a comprehensive approach to managing POTS (Postural Orthostatic Tachycardia Syndrome) and dysautonomia. His treatment philosophy focuses on several key areas:

1. Hydration and Electrolyte Management - Supporting blood volume and circulation
2. Compression Therapy - Reducing blood pooling in the lower extremities
3. Gut Health Support - Addressing the gut-autonomic nervous system connection
4. Stress Reduction Techniques - Helping regulate the autonomic nervous system
5. Sleep Optimization - Improving recovery and nervous system function
6. Targeted Supplementation - Based on individual symptom patterns
7. Medication Management - Personalized to each patient's specific needs

Dr. Ali's approach is holistic and individualized, recognizing that POTS manifests differently in each patient. His protocol aligns with current best practices while incorporating innovative elements based on emerging research.

For the complete protocol details and personalized recommendations, a consultation with Dr. Ali is recommended.${medicalDisclaimer}

[LINK:/clinical:Learn more about Dr. Ali's clinical practice] [LINK:/contact:Schedule a consultation with Dr. Ali]`
  }

  // Check if the question is about arrhythmias or heart rhythm disorders
  if (/\b(arrhythmia|afib|atrial fibrillation|heart rhythm)\b/i.test(text)) {
    return `Dr. Ali specializes in the treatment of heart rhythm disorders (arrhythmias), including atrial fibrillation. His approach to arrhythmia management includes:

1. Comprehensive diagnostic evaluation:
  - Advanced cardiac monitoring (Holter, event monitors, implantable loop recorders)
  - Electrophysiology studies when indicated
  - Cardiac imaging to assess structural heart disease

2. Personalized treatment options:
  - Medication management with antiarrhythmic drugs
  - Catheter ablation procedures for various arrhythmias
  - Device therapy including pacemakers and implantable cardioverter-defibrillators (ICDs)
  - Cardiac resynchronization therapy for heart failure patients with conduction disorders

3. For atrial fibrillation specifically:
  - Rate control vs. rhythm control strategies based on individual patient factors
  - Anticoagulation management to prevent stroke
  - Pulmonary vein isolation procedures
  - Left atrial appendage closure for patients who cannot take blood thinners

4. Risk factor modification and lifestyle interventions:
  - Sleep apnea screening and management
  - Weight management counseling
  - Stress reduction techniques
  - Exercise recommendations

Dr. Ali emphasizes shared decision-making with patients, discussing the benefits and risks of each treatment option to develop a plan that aligns with the patient's goals and preferences.${medicalDisclaimer}

[LINK:/clinical:Learn more about Dr. Ali's arrhythmia management] [LINK:/contact:Schedule a consultation with Dr. Ali]`
  }

  // Check if the question is about heart failure or coronary disease
  if (/\b(heart failure|coronary|cardiovascular)\b/i.test(text)) {
    return `Dr. Ali's approach to cardiovascular disease management, including heart failure and coronary artery disease, involves:

1. Evidence-based medical therapy:
  - Guideline-directed medical therapy for heart failure (ACE inhibitors/ARBs, beta-blockers, MRAs, SGLT2 inhibitors)
  - Lipid management for coronary artery disease
  - Antiplatelet therapy when indicated

2. Advanced diagnostic testing:
  - Cardiac MRI and CT imaging
  - Stress testing with advanced imaging
  - Coronary calcium scoring
  - Biomarker assessment

3. Device therapy when appropriate:
  - Cardiac resynchronization therapy
  - Implantable cardioverter-defibrillators
  - Remote monitoring systems

4. Coordination with interventional cardiologists and cardiac surgeons for:
  - Coronary interventions
  - Structural heart procedures
  - Surgical options

5. Comprehensive risk factor modification:
  - Hypertension management
  - Diabetes care coordination
  - Smoking cessation
  - Exercise prescription
  - Dietary counseling

Dr. Ali takes a holistic approach to cardiovascular care, addressing not only the primary cardiac condition but also comorbidities that impact heart health. He emphasizes preventive strategies and early intervention to improve long-term outcomes.${medicalDisclaimer}

[LINK:/clinical:Learn more about Dr. Ali's cardiovascular care] [LINK:/contact:Schedule a consultation with Dr. Ali]`
  }

  // Default clinical response for other specific clinical questions
  return `Dr. Ali's clinical approach emphasizes personalized, evidence-based care tailored to each patient's specific condition and circumstances. His treatment methodology includes:

1. Comprehensive evaluation using the latest diagnostic technologies
2. Personalized treatment plans that may include medications, procedures, and lifestyle modifications
3. Patient education to ensure understanding of the condition and treatment options
4. Regular follow-up and monitoring to adjust treatment as needed
5. Coordination with other specialists when appropriate for multidisciplinary care

Dr. Ali stays current with the latest advances in cardiology and electrophysiology, incorporating new evidence-based treatments into his practice when appropriate. He believes in shared decision-making, working with patients to develop treatment plans that align with their goals and preferences  working with patients to develop treatment plans that align with their goals and preferences.${medicalDisclaimer}

[LINK:/clinical:Learn more about Dr. Ali's clinical practice] [LINK:/contact:Schedule a consultation with Dr. Ali]`
}

// Function to identify ventures questions
function identifyVenturesQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  const venturePatterns = [
    /what (companies|ventures|startups|businesses|organizations|firms).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(company|business|venture|startup|advise|consult)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(work|advise|consult|partner|collaborate) with.*(companies|ventures|startups|businesses|organizations|firms)/i,
    /which (companies|ventures|startups|businesses|organizations|firms).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(companies|ventures|startups|businesses|organizations|firms).*(he|dr\.? ali|doctor ali|asif ali|his).*(work|advise|consult|partner|collaborate) with/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(companies|ventures|startups|businesses|organizations|firms)/i,
    /(companies|ventures|startups|businesses|organizations|organizations|firms).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /what.*(health tech|digital health|technology).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(health tech|digital health|technology)/i,
    /(tell|list|name).*(companies|ventures|startups|businesses|organizations|firms)/i,
    /(cmo|chief medical officer|advisor|advisory).*(role|position)/i,
    // Specific company patterns
    /(tabia|qardio|firsthx|healthseers|avive|thrive360).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(tabia|qardio|firsthx|healthseers|avive|thrive360)/i,
    /what.*(he|dr\.? ali|doctor ali|asif ali|his).*(do|role|position).*(tabia|qardio|firsthx|healthseers|avive|thrive360)/i,
    /(tabia|qardio|firsthx|healthseers|avive|thrive360).*(what|tell|role|position)/i,
  ]

  for (const pattern of venturePatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  const ventureKeywords = [
    "tabia",
    "qardio",
    "thrive360",
    "avive",
    "plx",
    "fruit street",
    "cmo",
    "chief medical officer",
    "advisor",
    "advisory",
    "board",
    "digital health",
    "health tech",
    "technology companies",
    "firsthx",
    "healthseers",
  ]

  const hasVentureKeyword = ventureKeywords.some((keyword) => text.includes(keyword))
  const mentionsDrAli = /(he|his|dr|ali|asif)/i.test(text)

  // Check if this is specifically about technology rather than ventures
  const isTechnologySpecific =
    /\b(wearable|device|ai|artificial intelligence|remote monitoring|vr|virtual reality)\b/i.test(text)

  if (hasVentureKeyword && mentionsDrAli && !isTechnologySpecific) {
    return true
  }

  return false
}

// Function to identify clinical questions
function identifyClinicalQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  const clinicalPatterns = [
    /what.*(conditions|diseases|disorders|patients).*(he|dr\.? ali|doctor ali|asif ali|his).*(treat|manage|help|care|specialize)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(treat|manage|help|care|specialize).*(conditions|diseases|disorders|patients)/i,
    /where.*(he|dr\.? ali|doctor ali|asif ali|his).*(practice|work|see patients)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(practice|clinic|hospital|medical center)/i,
    /what.*(he|dr\.? ali|doctor ali|asif ali|his).*(clinical|medical).*(practice|approach|specialty)/i,
    /(tell|describe).*(clinical|medical).*(practice|approach|specialty)/i,
    /(pots|dysautonomia|heart|cardiac|cardiovascular).*(treat|manage|help|care|specialize)/i,
    /(houston cardiology consultants)/i,
  ]

  for (const pattern of clinicalPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  const clinicalKeywords = [
    "pots",
    "dysautonomia",
    "heart",
    "cardiac",
    "cardiovascular",
    "patient",
    "treatment",
    "diagnosis",
    "houston cardiology",
    "preventive",
    "prevention",
    "arrhythmia",
    "hypertension",
  ]

  const hasClinicalKeyword = clinicalKeywords.some((keyword) => text.includes(keyword))
  const mentionsDrAli = /(he|his|dr|ali|asif)/i.test(text)

  // Check if this is specifically about technology rather than clinical practice
  const isTechnologySpecific =
    /\b(wearable|device|ai|artificial intelligence|remote monitoring|vr|virtual reality)\b/i.test(text)

  if (hasClinicalKeyword && mentionsDrAli && !isTechnologySpecific) {
    return true
  }

  return false
}

// Function to identify research questions
function identifyResearchQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  // Add more flexible pattern matching for research, including common typos
  const researchPatterns = [
    /what.*(research|study|studies|investigate|publication|resaerch|reserch).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(research|study|studies|investigate|publication|resaerch|reserch)/i,
    /(tell|describe).*(research|study|studies|investigate|publication|resaerch|reserch)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(publish|author|write|contribute)/i,
    /what.*(papers|articles|journals).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(cena research institute)/i,
    /research/i, // Simple pattern to catch "research" anywhere in the query
    /resaerch/i, // Common typo
    /reserch/i, // Another common typo
    // Specific research topics
    /(clinical trial|publication|paper|journal|article).*(he|dr\.? ali|doctor ali|asif ali|his)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his).*(clinical trial|publication|paper|journal|article)/i,
    /what.*(he|dr\.? ali|doctor ali|asif ali|his).*(study|studying|studied)/i,
  ]

  for (const pattern of researchPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  const researchKeywords = [
    "research",
    "resaerch", // Common typo
    "reserch", // Another common typo
    "study",
    "publication",
    "journal",
    "paper",
    "academic",
    "scientific",
    "clinical trial",
    "investigation",
    "cena research",
    "publish",
    "author",
    "article",
    "findings",
    "discovery",
  ]

  const hasResearchKeyword = researchKeywords.some((keyword) => text.includes(keyword))
  const mentionsDrAli = /(he|his|dr|ali|asif)/i.test(text)

  // Check if this is specifically about technology rather than research
  const isTechnologySpecific =
    /\b(wearable|device|ai|artificial intelligence|remote monitoring|vr|virtual reality)\b/i.test(text)

  // If it contains any research keyword, consider it a research question
  if (hasResearchKeyword && !isTechnologySpecific) {
    return true
  }

  // If it mentions Dr. Ali and has any word starting with "res", it might be about research
  if (mentionsDrAli && /\bres/i.test(text) && !isTechnologySpecific) {
    return true
  }

  return false
}

// Function to identify location questions
function identifyLocationQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  const locationPatterns = [
    /where.*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(located|based|practice|work|live|office|reside)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(located|based|practice|work|live|office|reside).*(where|location|city|state|address)/i,
    /where.*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i, // This pattern should catch "Where is he located"
    /location.*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|his|dr\.? asif).*(location|address|city|state)/i,
    /what.*(city|state|location).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(city|state|location).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
  ]

  for (const pattern of locationPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  const locationKeywords = [
    "where",
    "located",
    "location",
    "based",
    "office",
    "practice location",
    "city",
    "state",
    "address",
    "houston",
    "texas",
  ]

  const hasLocationKeyword = locationKeywords.some((keyword) => text.includes(keyword))
  const mentionsDrAli = /(he|his|dr|ali|asif)/i.test(text)

  if (hasLocationKeyword && mentionsDrAli) {
    return true
  }

  return false
}

// Find the identifyContactQuestion function and enhance it
function identifyContactQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  const contactPatterns = [
    /how.*(contact|reach|get in touch|connect with|email|call|message).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif|him)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif|him).*(contact|reach|get in touch|connect with|email|call|message)/i,
    /contact.*(information|details|info).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif|him)/i,
    /(appointment|consultation|meeting).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif|him)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif|him).*(appointment|consultation|meeting)/i,
    /(how|where).*(can|do|could|should|would|might|to|I).*(contact|reach|get in touch|connect|email|call|message|schedule|book|make|set up|arrange)/i,
    /(contact|reach|get in touch|connect|email|call|message|schedule|book|make|set up|arrange)/i,
    /how.*contact/i,
    /how.*reach/i,
    /contact.*info/i,
    /email.*address/i,
    /phone.*number/i,
    /office.*contact/i,
  ]

  for (const pattern of contactPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  const contactKeywords = [
    "contact",
    "reach",
    "get in touch",
    "connect",
    "email",
    "phone",
    "call",
    "message",
    "appointment",
    "consultation",
    "meeting",
    "schedule",
    "book",
    "contact form",
    "contact info",
    "address",
    "location",
    "office hours",
  ]

  const hasContactKeyword = contactKeywords.some((keyword) => text.includes(keyword))
  const mentionsDrAli = /(he|his|dr|ali|asif|him)/i.test(text)

  if (hasContactKeyword && (mentionsDrAli || text.length < 30)) {
    return true
  }

  return false
}

// Function to generate media response
function getMediaResponse(context: ChatContext): string {
  context.lastTopic = "media"

  return `Dr. Asif Ali has established a strong media presence as a medical expert with over 110+ media appearances. His notable media appearances include:

• Fox News NY Studio (2016) - Appeared as a medical contributor discussing "How Telewellness is Changing Healthcare"
• The Dr. Oz Show (2010) - Featured expert on "Sudden Cardiac Death in Adolescents"
• Fox & Friends National TV (2016) - Discussed "Wearables and Wellness"
• Fox News NY (2016) - Medical expert on the topic "Can a Heart Really Break?"
• McGraw Hill HQ Video Panel (2018) - Participated in discussion on "Digital Therapeutics & Health 2.0"
• Abbott Nutrition HQ (2019) - Speaker on "The Future of Personalized Nutrition"
• American Heart Association's Scientific Sessions (2022-2023) - Multiple panels, keynotes, and poster sessions
• EPAM Systems Podcast with Lisa Butcher (2021) - "Imagine if COVID Struck an IoMT World"

Dr. Ali is a trusted voice on digital health, dysautonomia, equity, and medical innovation. He speaks nationally on autonomic disorders, clinical AI, post-COVID care, and translational strategy. His ability to communicate complex medical concepts in an accessible way makes him a valued medical expert for media outlets.

For media inquiries or to request Dr. Ali for an interview or commentary, please use the contact form on the website.

[LINK:/media:View Dr. Ali's complete media profile]`
}

// Function to identify media questions
function identifyMediaQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  // Enhanced media patterns to catch more variations of queries
  const mediaPatterns = [
    /what.*(media|press|news|interview|tv|television|radio|podcast|appear).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(media|press|news|interview|tv|television|radio|podcast|appear)/i,
    /(media|press|news|interview|tv|television|radio|podcast|appear).*(appearance|feature|interview).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(fox news|dr oz|dr. oz).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(fox news|dr oz|dr. oz)/i,
    /what about.*(media|press|appearance|interview|news|tv)/i,
    /(tell|talk|more about).*(media|press|appearance|interview)/i,
    /media appearance/i,
    /speaking engagement/i,
    /host/i,
    /presenter/i,
    /keynote/i,
    /panel/i,
    /television/i,
    /broadcast/i,
    /public speaking/i,
    /media experience/i,
    /been on tv/i,
    /been interviewed/i,
  ]

  for (const pattern of mediaPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  const mediaKeywords = [
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
    "dr. oz",
    "appearance",
    "feature",
    "contributor",
    "medical expert",
    "appearances",
    "appeared",
    "appear",
    "featured",
    "speaking",
    "speaker",
    "host",
    "presenter",
    "keynote",
    "panel",
    "broadcast",
    "public speaking",
  ]

  // Improve media detection for simpler queries
  if (text.includes("media") || text.includes("appearance") || text.includes("speaking") || text.includes("tv")) {
    return true
  }

  const hasMediaKeyword = mediaKeywords.some((keyword) => text.includes(keyword))
  const mentionsDrAli = /(he|his|dr|ali|asif)/i.test(text)

  if (hasMediaKeyword) {
    return true
  }

  return false
}

// Function to identify speaking questions
function identifySpeakingQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  const speakingPatterns = [
    /what.*(speak|speaker|speaking|talk|presentation|lecture).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(speak|speaker|speaking|talk|presentation|lecture)/i,
    /(speak|speaker|speaking|talk|presentation|lecture).*(topic|subject|event).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(conference|event|summit|symposium).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(conference|event|summit|symposium)/i,
  ]

  for (const pattern of speakingPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  const speakingKeywords = [
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
  ]

  const hasSpeakingKeyword = speakingKeywords.some((keyword) => text.includes(keyword))
  const mentionsDrAli = /(he|his|dr|ali|asif)/i.test(text)

  if (hasSpeakingKeyword && mentionsDrAli) {
    return true
  }

  return false
}

// Function to generate speaking response
function getSpeakingResponse(context: ChatContext): string {
  context.lastTopic = "speaking"

  return `Dr. Asif Ali is a sought-after speaker on topics at the intersection of cardiology and technology. His speaking topics include:

• POTS and Dysautonomia: From confusion to clarity
• Post-COVID care models and long-COVID diagnostics
• Physician-led innovation in digital health
• AI + ML in real-world cardiology
• Clinical trial inclusivity & community-based research
• Health equity in med-tech and academia

He regularly addresses diverse audiences at medical conferences, healthcare innovation summits, investment forums, corporate events, and academic institutions. His notable speaking engagements include:

• Fox News NY Studio (2016) - "How Telewellness is Changing Healthcare"
• The Dr. Oz Show (2010) - "Sudden Cardiac Death in Adolescents"
• McGraw Hill HQ Video Panel (2018) - "Digital Therapeutics & Health 2.0"
• Abbott Nutrition HQ (2019) - "The Future of Personalized Nutrition"
• American Heart Association's Scientific Sessions (2022-2023) - Multiple panels and keynotes

Dr. Ali tailors his presentations to the specific audience, whether it's clinical professionals, technology experts, investors, or patients. His speaking style combines clinical expertise with technological insights, delivered in an engaging and accessible manner.

If you're interested in booking Dr. Ali for a speaking engagement, please use the speaking request form on the website.

[LINK:/speaking:Learn more about Dr. Ali's speaking engagements]`
}

// Function to identify about/background questions
function identifyAboutQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  // Enhanced patterns to catch more variations of "about" questions
  const aboutPatterns = [
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
  ]

  for (const pattern of aboutPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  const aboutKeywords = [
    "about",
    "bio",
    "biography",
    "background",
    "history",
    "profile",
    "education",
    "training",
    "degree",
    "school",
    "university",
    "college",
    "who is",
    "tell me about",
    "information",
  ]

  const hasAboutKeyword = aboutKeywords.some((keyword) => text.includes(keyword))
  const mentionsDrAli = /(he|his|dr|ali|asif)/i.test(text)

  // If the query is very short and mentions Dr. Ali, it's likely an about question
  if (text.length < 30 && mentionsDrAli) {
    return true
  }

  if (hasAboutKeyword && mentionsDrAli) {
    return true
  }

  return false
}

// Function to identify CV questions
function identifyCVQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  const cvPatterns = [
    /what.*(cv|curriculum vitae|resume).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif).*(cv|curriculum vitae|resume)/i,
    /(cv|curriculum vitae|resume).*(he|dr\.? ali|doctor ali|asif ali|his|dr\.? asif)/i,
    /can i.*(see|view|download).*(cv|curriculum vitae|resume)/i,
    /where.*(cv|curriculum vitae|resume)/i,
  ]

  for (const pattern of cvPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  const cvKeywords = [
    "cv",
    "curriculum vitae",
    "resume",
    "professional history",
    "work history",
    "career summary",
    "download cv",
    "view cv",
  ]

  const hasCVKeyword = cvKeywords.some((keyword) => text.includes(keyword))
  const mentionsDrAli = /(he|his|dr|ali|asif)/i.test(text)

  if (hasCVKeyword && mentionsDrAli) {
    return true
  }

  return false
}

// Function to check if a question is a follow-up
function isFollowUpQuestion(query: string, context: ChatContext): boolean {
  const text = query.toLowerCase()

  const followUpIndicators = [
    /^(and|also|what about|how about|tell me more|more about|what else|can you elaborate|please elaborate|elaborate on|expand on|could you explain|explain more|additional|another|other)/i,
    /^(what|how|where|when|why|who|which|can|do|does|is|are|was|were) (else|more|also|too|additionally|further)/i,
    /^(besides|apart from|in addition to|other than)/i,
  ]

  for (const pattern of followUpIndicators) {
    if (pattern.test(text)) {
      return true
    }
  }

  if (text.split(/\s+/).length <= 3 && !text.includes("dr") && !text.includes("ali")) {
    return true
  }

  if (/\b(it|this|that|these|those|they|them|he|his|him)\b/i.test(text) && context.messages.length > 1) {
    return true
  }

  return false
}

// Function to extract keywords from a query
function extractKeywords(query: string): string[] {
  const text = query.toLowerCase()
  const keywords: string[] = []

  const topicKeywords = {
    clinical: ["practice", "patient", "treat", "doctor", "pots", "dysautonomia", "heart", "cardiac"],
    research: ["research", "study", "publication", "paper", "academic", "scientific"],
    ventures: ["company", "venture", "startup", "advisor", "cmo", "digital health", "tech"],
    speaking: ["speak", "talk", "presentation", "conference", "event", "media"],
    contact: ["contact", "reach", "email", "message", "connect", "appointment"],
    technology: [
      "wearable",
      "device",
      "ai",
      "artificial intelligence",
      "remote monitoring",
      "digital health",
      "health tech",
    ],
  }

  for (const [topic, words] of Object.entries(topicKeywords)) {
    for (const word of words) {
      if (text.includes(word)) {
        keywords.push(topic)
        break
      }
    }
  }

  if (keywords.length === 0) {
    if (text.includes("dr") || text.includes("ali") || text.includes("asif")) {
      keywords.push("general")
    }
  }

  return keywords
}

// Function to determine relevant links based on query and keywords
function determineRelevantLinks(query: string, keywords: string[], context: ChatContext): LinkSuggestion[] {
  const links: LinkSuggestion[] = []

  const sitePages = {
    clinical: {
      url: "/clinical",
      context: "clinical practice, cardiology, patient care, POTS, dysautonomia",
    },
    research: {
      url: "/research",
      context: "research, publications, academic work, studies",
    },
    ventures: {
      url: "/ventures",
      context: "health tech, companies, advisory roles, digital health",
    },
    speaking: {
      url: "/speaking",
      context: "speaking engagements, presentations, talks, conferences",
    },
    media: {
      url: "/media",
      context: "media appearances, interviews, press",
    },
    about: {
      url: "/about",
      context: "biography, background, education, career",
    },
    contact: {
      url: "/contact",
      context: "contact information, reach out, connect, appointment",
    },
    cv: {
      url: "/cv",
      context: "curriculum vitae, resume, professional history, experience",
    },
  }

  for (const keyword of keywords) {
    for (const [page, info] of Object.entries(sitePages)) {
      if (info.context.includes(keyword) || page === keyword) {
        links.push({
          text: page.charAt(0).toUpperCase() + page.slice(1),
          url: info.url,
        })
        break
      }
    }
  }

  return links
}

// Function to create a balanced description based on the primary topic
function createBalancedDescription(primaryTopic: string, context: ChatContext): string {
  let response = ""

  const sentenceVariants = {
    clinical: [
      "Dr. Ali practices at Houston Cardiology Consultants, where he specializes in cardiovascular disease management.",
      "At his clinical practice, Dr. Ali focuses on preventive cardiology and autonomic disorders like POTS.",
      "Dr. Ali's patient care approach integrates traditional cardiology with personalized treatment plans.",
    ],
    research: [
      "Dr. Ali conducts research through the Cena Research Institute, focusing on cardiovascular medicine.",
      "His research activities include clinical trials and publishing in peer-reviewed medical journals.",
      "Dr. Ali investigates autonomic disorders, digital health technologies, and inclusive clinical research.",
    ],
    ventures: [
      "Dr. Ali advises several health technology companies, serving as Chief Medical Officer for multiple organizations.",
      "In the health technology space, Dr. Ali bridges medical science with technological innovation.",
      "Dr. Ali works with companies developing AI-powered healthcare solutions, remote monitoring, and digital therapeutics.",
    ],
    technology: [
      "Dr. Ali works extensively with healthcare technology, including wearable devices, AI systems, and remote monitoring platforms.",
      "In the digital health space, Dr. Ali has leadership roles with companies developing innovative medical technologies.",
      "Dr. Ali integrates cutting-edge technology into both his clinical practice and research activities.",
    ],
    general: [
      "Dr. Ali is a board-certified cardiologist combining clinical practice, research, and health technology advisory roles.",
      "His work spans clinical cardiology at Houston Cardiology Consultants, research through the Cena Research Institute, and advising health tech companies.",
      "Dr. Ali specializes in cardiovascular disease management, with expertise in preventive cardiology and autonomic disorders like POTS.",
    ],
  }

  if (primaryTopic in sentenceVariants) {
    const options = sentenceVariants[primaryTopic as keyof typeof sentenceVariants]
    response = options[Math.floor(Math.random() * options.length)]
  } else {
    response = sentenceVariants.general[Math.floor(Math.random() * sentenceVariants.general.length)]
  }

  return response
}

// Function to generate ventures response
function getVenturesResponse(context: ChatContext): string {
  context.lastTopic = "ventures"

  return `Dr. Ali advises several health technology companies in various capacities. His current roles include:

1. Chief Medical Officer at Tabia Health (2024-Present) - An AI-powered digital care pathway orchestration platform

2. Managing Director US at FirstHX (2024-Present) - A knowledge-based history taking solution for patient communication

3. Chief Medical Officer at Healthseers/Cardio (2024-Present) - An AI-enhanced PhonoCardioGraphy solution for heart defect detection

4. Chief Medical Advisor at Avive AED (2017-Present) - A manufacturer of next-generation Automated External Defibrillators

He previously served as Global Chief Medical Officer at Qardio (2022-2024), a leader in Remote Patient Monitoring and Remote Cardiac Rehabilitation, and as Chief Medical Officer at Thrive360 (2021-2023), an Oculus-based Virtual Reality Mental Health Solution.

Additionally, he has been Chief Consultant at Cena Ventures (2005-Present), an advisory practice serving emerging companies in the healthcare technology space. His advisory roles have also included CloudSteam Medical Imaging, Lumi Health, PLX Pharma, Preventric, Curogram, Vsee, Fruit Street, and Fitbit.

Dr. Ali's approach focuses on bridging the gap between medical science and technological innovation, ensuring that digital health solutions are clinically sound and address real healthcare needs.

[LINK:/ventures:View Dr. Ali's complete ventures profile]
`
}

// Function to generate clinical response
function getClinicalResponse(context: ChatContext): string {
  context.lastTopic = "clinical"

  // Standard medical disclaimer - only used for specific medical questions
  const medicalDisclaimer =
    "\n\n**Important Note:** This information is provided for educational purposes only and is not intended as medical advice. Every patient's situation is unique. Please consult with your healthcare provider or schedule an appointment with Dr. Ali for personalized medical guidance tailored to your specific health needs."

  // Check if the query is about a specific medical condition
  const isSpecificMedicalQuestion =
    context.searchHistory &&
    context.searchHistory.length > 0 &&
    /\b(pots|dysautonomia|arrhythmia|afib|atrial fibrillation|heart failure|coronary|cardiovascular|symptoms|treatment|medication|diagnosis|therapy)\b/i.test(
      context.searchHistory[context.searchHistory.length - 1],
    )

  const response = `Dr. Ali practices at Houston Cardiology Consultants, where he has been a partner since 2011. His clinical practice focuses on several key areas:

1. Cardiovascular disease management, with particular emphasis on preventive cardiology
2. Specialized care for autonomic disorders, particularly POTS (Postural Orthostatic Tachycardia Syndrome) and dysautonomia
3. Diagnosis and treatment of arrhythmias, heart failure, and coronary artery disease
4. Post-COVID cardiovascular complications

His approach integrates traditional cardiology with preventive strategies and personalized treatment plans. For POTS patients, he implements comprehensive protocols including medication management, specialized exercise rehabilitation, and lifestyle modifications.

Dr. Ali is also affiliated with academic institutions, currently serving as Clinical Assistant Professor at both the College of Medicine, University of Houston (2024-Present) and McGovern Medical School, The University of Texas (2010-2021, 2024-Present).

His clinical methodology emphasizes patient education and shared decision-making, helping patients understand their cardiovascular health and make informed choices about their care.`

  // Only add the disclaimer for specific medical questions
  const finalResponse = isSpecificMedicalQuestion ? response + medicalDisclaimer : response

  return (
    finalResponse +
    "\n\n[LINK:/clinical:Learn more about Dr. Ali's clinical practice] [LINK:/contact:Schedule a consultation with Dr. Ali]"
  )
}

// Function to generate research response
function getResearchResponse(context: ChatContext): string {
  context.lastTopic = "research"

  return `Dr. Ali conducts research across several interconnected areas of cardiovascular medicine. His research activities include:

1. Founding and directing the Cena Research Institute (2023-Present), which provides turn-key clinical research solutions for innovative cardiology-related medical technologies

2. Recent clinical trials including:
  - Valencell: Fingertip and Wrist Blood Pressure Data Collection in Older Adults (2023)
  - Enhanced External Counterpulsation Effects (2022-2023)
  - Thrive360: Virtual Reality Cognitive Behavioral Therapy (2022-2023)
  - TargetBP: Renal Denervation Study (2019-2022)

3. Recent publications including:
  - "Circle of Vieussens: Its Importance in the Presence of Significant Coronary Artery Stenosis in a 26-Year-Old Female With Kawasaki Disease" (Cureus, August 2024)
  - "Mal De Debarquement Syndrome: An Often Unrecognized and Unreported Condition" (Cureus, July 2024)
  - "Brief Review and Primer of Key Terminology for Artificial Intelligence and Machine Learning in Hypertension" (American Heart Association Journals – Hypertension, July 2024)
  - "Mental Health Applications of Generative AI and Large Language Modeling in the United States" (MDPI-Digital Mental Health, July 2024)
  - "High Altitude, Air Travel, and Heart Disease" (UpToDate, March 2023)

His research focuses on autonomic disorders like POTS and dysautonomia, digital health monitoring technologies, post-COVID cardiovascular effects, and health equity in cardiovascular care.

[LINK:/research:View Dr. Ali's complete research profile]`
}

// Function to generate location response
function getLocationResponse(context: ChatContext): string {
  context.lastTopic = "location"

  return `Dr. Ali is based in Houston, Texas. He practices at Houston Cardiology Consultants, where he has been a partner since 2011. His clinical practice is located in the Texas Medical Center area, which is one of the world's largest medical complexes.

In addition to his clinical practice, Dr. Ali is affiliated with several institutions in the Houston area:

1. Clinical Assistant Professor at the College of Medicine, University of Houston (2024-Present)
2. Clinical Assistant Professor at McGovern Medical School, The University of Texas (2010-2021, 2024-Present)
3. Director of the Cena Research Institute in Houston (2023-Present)

Dr. Ali's location in Houston's Texas Medical Center provides him with access to cutting-edge medical technology and collaboration opportunities with other leading healthcare professionals and researchers.

[LINK:/clinical:Learn more about Dr. Ali's practice location]`
}

// Function to generate contact response
function getContactResponse(context: ChatContext): string {
  context.lastTopic = "contact"

  return `You can reach Dr. Asif Ali through the following channels:

• For professional inquiries: Please use the contact form on this website
• For speaking engagements: Please submit details through the speaking request form
• For media inquiries: Please indicate the nature of your request in the contact form
• For patient appointments: Please contact Houston Cardiology Consultants directly at (713) 464-4140

Dr. Ali's team reviews all inquiries and will respond to appropriate requests in a timely manner. For urgent matters, please indicate this in your message.

[LINK:/contact:Go to the contact page]`
}

// Function to generate about response
function getAboutResponse(context: ChatContext): string {
  context.lastTopic = "about"

  return `Dr. Asif Ali is a board-certified cardiologist and cardiac electrophysiologist based in Houston, Texas. He currently serves as the Director of Cardiac Electrophysiology at Houston Cardiovascular Center.

His education includes:
• Medical Degree from The University of Texas Medical Branch
• Internal Medicine Residency at Baylor College of Medicine
• Cardiology Fellowship at Texas Heart Institute
• Cardiac Electrophysiology Fellowship at Texas Heart Institute

He holds board certifications in:
• Internal Medicine
• Cardiovascular Disease
• Clinical Cardiac Electrophysiology

Dr. Ali's professional career spans clinical practice, academic medicine, research, and health technology innovation. He is known for his expertise in treating complex cardiac conditions, particularly heart rhythm disorders and autonomic conditions like POTS.

Beyond his clinical practice, Dr. Ali is actively involved in research through the Cena Research Institute and serves as an advisor to several major healthcare and technology companies, including JP Morgan Health, Abbott Laboratories, and Fitbit Health Solutions.

Dr. Ali is passionate about leveraging technology to improve cardiac care and patient outcomes, and he continues to bridge the gap between traditional medicine and innovative healthcare solutions.

[LINK:/about:Learn more about Dr. Ali's background]`
}

// Function to generate CV response
function getCVResponse(context: ChatContext): string {
  context.lastTopic = "cv"

  return `Dr. Ali's Curriculum Vitae provides a comprehensive overview of his professional background, including his education, training, certifications, clinical experience, research activities, publications, presentations, and advisory roles.

Key highlights from his CV include:

• Board certifications in Internal Medicine, Cardiovascular Disease, and Clinical Cardiac Electrophysiology
• Fellowship training at the Texas Heart Institute
• Clinical practice at Houston Cardiology Consultants since 2011
• Directorship of the Cena Research Institute
• Advisory roles with leading healthcare and technology companies

His CV demonstrates a consistent commitment to excellence across clinical practice, academic medicine, research, and health technology innovation.

For a detailed view of Dr. Ali's credentials and accomplishments, please refer to the complete CV document available on this website.

[LINK:/cv:View Dr. Ali's Curriculum Vitae]`
}

// Function to identify identity questions
function identifyIdentityQuestion(query: string): boolean {
  const text = query.toLowerCase().trim()

  const identityPatterns = [
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
  ]

  for (const pattern of identityPatterns) {
    if (pattern.test(text)) {
      return true
    }
  }

  const identityKeywords = [
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
  ]

  // Check if the query contains identity keywords
  for (const keyword of identityKeywords) {
    if (text.includes(keyword)) {
      return true
    }
  }

  return false
}

// Function to generate identity response
function getIdentityResponse(context: ChatContext): string {
  context.lastTopic = "identity"

  // Create an array of different response variations
  const responseVariations = [
    `I am Dr. Ali's virtual assistant. It's nice to meet you. How can I be of service? I can provide information about Dr. Ali's clinical practice, research, ventures, speaking engagements, and more.`,

    `I'm Dr. Asif Ali's virtual assistant, designed to help answer questions about his work as a cardiologist, researcher, and health technology advisor. It's a pleasure to assist you today. What would you like to know?`,

    `Hello! I'm Dr. Ali's digital assistant. I'm here to provide information about his clinical practice, research activities, health technology ventures, speaking engagements, and more. How may I help you?`,

    `I'm a virtual assistant created to provide information about Dr. Asif Ali, a board-certified cardiologist, researcher, and digital health advisor. I'd be happy to answer your questions about his work and expertise.`,
  ]

  // Select a random variation to provide different responses
  const randomIndex = Math.floor(Math.random() * responseVariations.length)
  return responseVariations[randomIndex]
}

// Mock implementations for the missing functions
function identifyCasualGreeting(query: string): boolean {
  // Implement your casual greeting identification logic here
  const text = query.toLowerCase().trim()
  const greetingKeywords = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"]

  return greetingKeywords.some((keyword) => text.startsWith(keyword))
}

function getCasualGreetingResponse(query: string, context: ChatContext): string {
  // Implement your casual greeting response logic here
  context.lastTopic = "greeting"
  const text = query.toLowerCase().trim()

  const responses = [
    "Hello! How can I help you today?",
    "Hi there! What can I tell you about Dr. Ali?",
    "Hey! What are you interested in learning?",
    "Greetings! How may I assist you?",
  ]

  const randomIndex = Math.floor(Math.random() * responses.length)
  return responses[randomIndex]
}

function identifyOffTopic(query: string): boolean {
  // Implement your off-topic identification logic here
  const text = query.toLowerCase().trim()

  // List of keywords that are considered off-topic
  const offTopicKeywords = [
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
  ]

  // Check if any off-topic keyword is present
  const hasOffTopicKeyword = offTopicKeywords.some((keyword) => text.includes(keyword))

  return hasOffTopicKeyword
}

function getOffTopicResponse(context: ChatContext): string {
  // Implement your off-topic response logic here
  context.lastTopic = "offtopic"

  const responses = [
    "I'm sorry, but I'm designed to provide information about Dr. Ali. Is there anything specific you'd like to know about him?",
    "I'm not able to answer questions about that topic. However, I can provide information about Dr. Ali's clinical practice, research, ventures, and more.",
    "I'm afraid I can't help you with that. Would you like to know more about Dr. Ali's work in cardiology and health technology?",
    "I'm programmed to focus on Dr. Ali's professional activities. What can I tell you about his work?",
  ]

  const randomIndex = Math.floor(Math.random() * responses.length)
  return responses[randomIndex]
}

// Add this function after the identifyQuestionCategory function:

// Function to handle ambiguous or unclear questions
function handleAmbiguousQuestion(query: string, context: ChatContext): string {
  const text = query.toLowerCase().trim()

  // Check if the query is very short (less than 4 words)
  const isVeryShort = text.split(/\s+/).length < 4

  // Check if the query is a single word or very ambiguous
  const isSingleWord = text.split(/\s+/).length === 1

  // Check if the query contains Dr. Ali's name or references him
  const mentionsDrAli = /(dr|doctor|ali|asif)/i.test(text)

  // Responses for ambiguous questions that mention Dr. Ali
  const drAliAmbiguousResponses = [
    "I'd be happy to tell you about Dr. Ali. What specific aspect of his work are you interested in? His clinical practice, research, or health technology ventures?",

    "Dr. Ali is a cardiologist specializing in heart rhythm disorders and conditions like POTS. Would you like to know more about his clinical practice, research, or technology advisory roles?",

    "I can provide information about various aspects of Dr. Ali's work. Are you interested in his clinical practice, research activities, or his work with health technology companies?",
  ]

  // Responses for very short or ambiguous questions that don't mention Dr. Ali
  const generalAmbiguousResponses = [
    "I'm not sure what you're asking. I can provide information about Dr. Ali's cardiology practice, research, or health technology ventures. What would you like to know?",

    "Could you please clarify your question? I'm here to provide information about Dr. Ali's professional work as a cardiologist, researcher, and health technology advisor.",

    "I'm not sure I understand your question. I can help with information about Dr. Ali's clinical practice, research, or advisory roles. What would you like to know about?",

    "To better assist you, could you please ask a more specific question about Dr. Ali's work? I can provide information about his specialization in cardiac electrophysiology, his research, or his health technology ventures.",
  ]

  // Select appropriate response based on query characteristics
  if (mentionsDrAli) {
    const randomIndex = Math.floor(Math.random() * drAliAmbiguousResponses.length)
    return drAliAmbiguousResponses[randomIndex]
  } else {
    const randomIndex = Math.floor(Math.random() * generalAmbiguousResponses.length)
    return generalAmbiguousResponses[randomIndex]
  }
}

// Add this function after the handleAmbiguousQuestion function:

// Function to handle random inputs that might be mistaken for questions about Dr. Ali
function handleRandomInput(query: string, context: ChatContext): string {
  // Responses for random inputs
  const randomInputResponses = [
    "I'm not sure I understand your question. I'm here to provide information about Dr. Ali's work as a cardiologist, researcher, and health technology advisor. How can I help you?",

    "I'm designed to answer questions about Dr. Ali's professional work. Could you please ask a specific question about his clinical practice, research, or health technology ventures?",

    "I'm having trouble understanding your request. I can provide information about Dr. Ali's cardiology practice, research activities, or his advisory roles with health technology companies. What would you like to know?",

    "To help you better, could you please ask a clear question about Dr. Ali's professional work? I can provide information about his specialization in cardiac electrophysiology, his research, or his health technology ventures.",

    "I'm Dr. Ali's virtual assistant, focused on providing information about his professional work. Could you please clarify what you'd like to know about his cardiology practice, research, or health technology advisory roles?",
  ]

  // Get a random response
  const randomIndex = Math.floor(Math.random() * randomInputResponses.length)
  return randomInputResponses[randomIndex]
}

export const generateAIResponse = (userInput: string, context: ChatContext): string => {
  // Check for casual greetings
  if (identifyCasualGreeting(userInput)) {
    return getCasualGreetingResponse(userInput, context)
  }

  // Check for off-topic questions
  if (identifyOffTopic(userInput)) {
    return getOffTopicResponse(context)
  }

  // Check for exact matches with suggested questions
  const exactMatchResponse = handleExactSuggestedQuestions(userInput)
  if (exactMatchResponse) {
    return exactMatchResponse
  }

  // Check for complex questions that should be directed to contact form
  if (identifyComplexQuestion(userInput)) {
    return getComplexQuestionResponse(userInput, context)
  }

  // Check for specific clinical questions about conditions like POTS
  if (identifySpecificClinicalQuestion(userInput)) {
    return getSpecificClinicalResponse(userInput, context)
  }

  // Identify the question category
  const isClinical = identifyClinicalQuestion(userInput)
  const isResearch = identifyResearchQuestion(userInput)
  const isLocation = identifyLocationQuestion(userInput)
  const isVentures = identifyVenturesQuestion(userInput)
  const isContact = identifyContactQuestion(userInput)
  const isMedia = identifyMediaQuestion(userInput)
  const isSpeaking = identifySpeakingQuestion(userInput)
  const isAbout = identifyAboutQuestion(userInput)
  const isCV = identifyCVQuestion(userInput)
  const isTechnology = identifyTechnologyQuestion(userInput)
  const isIdentity = identifyIdentityQuestion(userInput)
  const isPersonal = identifyPersonalQuestion(userInput)

  // Determine primary topic based on identification results
  let primaryTopic = "general" // Default topic
  if (isClinical) {
    primaryTopic = "clinical"
  } else if (isResearch) {
    primaryTopic = "research"
  } else if (isLocation) {
    primaryTopic = "location"
  } else if (isVentures) {
    primaryTopic = "ventures"
  } else if (isContact) {
    primaryTopic = "contact"
  } else if (isMedia) {
    primaryTopic = "media"
  } else if (isSpeaking) {
    primaryTopic = "speaking"
  } else if (isAbout) {
    primaryTopic = "about"
  } else if (isCV) {
    primaryTopic = "cv"
  } else if (isTechnology) {
    primaryTopic = "technology"
  } else if (isIdentity) {
    primaryTopic = "identity"
  } else if (isPersonal) {
    return getPersonalQuestionResponse(userInput, context)
  }

  // Generate a response based on the identified topic
  let aiResponse = ""
  switch (primaryTopic) {
    case "clinical":
      aiResponse = getClinicalResponse(context)
      break
    case "research":
      aiResponse = getResearchResponse(context)
      break
    case "ventures":
      aiResponse = getVenturesResponse(context)
      break
    case "location":
      aiResponse = getLocationResponse(context)
      break
    case "contact":
      aiResponse = getContactResponse(context)
      break
    case "media":
      aiResponse = getMediaResponse(context)
      break
    case "speaking":
      aiResponse = getSpeakingResponse(context)
      break
    case "about":
      aiResponse = getAboutResponse(context)
      break
    case "cv":
      aiResponse = getCVResponse(context)
      break
    case "technology":
      aiResponse = getTechnologyResponse(userInput, context)
      break
    case "identity":
      aiResponse = getIdentityResponse(context)
      break
    default:
      aiResponse = getGeneralResponse(context)
      break
  }

  // Extract keywords from the query
  const keywords = extractKeywords(userInput)

  // Determine relevant links based on query and keywords
  const suggestedLinks = determineRelevantLinks(userInput, keywords, context)

  // Create a balanced description based on the primary topic
  const balancedDescription = createBalancedDescription(primaryTopic, context)

  // Add suggested links to the response
  let responseWithLinks = aiResponse

  if (suggestedLinks.length > 0) {
    responseWithLinks += "\n\nHere are some related pages you might find helpful:\n"
    suggestedLinks.forEach((link) => {
      responseWithLinks += `- [LINK:${link.url}:${link.text}]\n`
    })
  }

  // If we've reached this point with a very general or potentially random input,
  // provide a redirect response instead of detailed information
  if (primaryTopic === "general" && userInput.length < 20) {
    console.log("Handling as potential random input")
    return handleRandomInput(userInput, context)
  }

  return responseWithLinks
}

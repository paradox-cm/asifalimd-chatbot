export function identifyQuestionType(input: string): string {
  const text = input.toLowerCase()

  // Check for general questions about Dr. Ali's profession or what he does
  const professionalPatterns = [
    /what (does|is|are) (he|dr\.? ali|doctor ali|asif ali) (do|doing)/i,
    /who (is|was) (he|dr\.? ali|doctor ali|asif ali)/i,
    /what('s| is) (his|dr\.? ali'?s) (job|profession|specialty|work|role)/i,
    /tell me about (him|dr\.? ali|doctor ali|asif ali)/i,
    /what (does|is) (he|dr\.? ali|doctor ali|asif ali)/i,
    /what (kind|type) of (doctor|physician|specialist) (is|was) (he|dr\.? ali|doctor ali|asif ali)/i,
  ]

  for (const pattern of professionalPatterns) {
    if (pattern.test(text)) {
      return "professional"
    }
  }

  // Define patterns for each question type
  const patterns = {
    location: [
      /where is|where('s| is) (he|dr\.? ali|doctor ali|asif ali) (located|based|practice|work)/i,
      /location|address|office|clinic address|practice location/i,
      /where (can|do) (i|you|we|patients) (find|see|visit|meet)/i,
      /where (does|is) (he|dr\.? ali) (work|practice|see patients|treat|based)/i,
      /what (is|are) the (location|address|office|clinic)/i,
      /which (city|state|area|region|part of town)/i,
      /how (do|can) (i|we) get (to|there)/i,
    ],

    contact: [
      /how (can|do) I (contact|reach|get in touch|connect|schedule|book|make appointment)/i,
      /contact (info|information|details)/i,
      /how (to|do i|can i|should i) (contact|reach|connect with|get in touch with|communicate with)/i,
      /what('s| is) (the|his) (contact|email|phone|number|website)/i,
      /can i (contact|email|call|message|text|reach)/i,
      /how (long|soon) (does it take|will it take|to get) (a response|an answer|to hear back)/i,
      /is (he|dr\.? ali) (available|accepting|taking) (new patients|appointments|consultations)/i,
    ],

    conditions: [
      /what (does|condition|disease|disorder|problem)/i && /treat|specialize|focus/i,
      /what (conditions|diseases|disorders|problems|ailments|illnesses) (does|can|will|is) (he|dr\.? ali) (treat|handle|manage|care for|specialize in)/i,
      /what (kind|type|sort) of (patients|conditions|cases|problems) (does|can) (he|dr\.? ali) (treat|handle|manage|help with)/i,
      /does (he|dr\.? ali) treat (.*?)/i,
      /can (he|dr\.? ali) help (with|me with|patients with|people with) (.*?)/i,
      /what (is|are) (his|dr\.? ali'?s) (specialty|specialties|specialization|expertise|focus)/i,
      /what (cardiac|heart|cardiovascular) (conditions|diseases|disorders|problems) (does|can) (he|dr\.? ali) (treat|handle|manage)/i,
    ],

    education: [
      /where did (he|dr\.? ali) (study|train|graduate|get (his|a) (degree|education|training))/i,
      /education|background|training|degree|medical school|fellowship/i,
      /what (is|was) (his|dr\.? ali'?s) (education|educational background|academic background|training|schooling)/i,
      /where (did|has) (he|dr\.? ali) (study|studied|train|trained|graduate|graduated|attend|attended)/i,
      /which (school|university|college|institution|program|fellowship) (did|has) (he|dr\.? ali) (attend|complete|graduate from)/i,
      /what (degree|degrees|qualification|qualifications|certification|certifications) (does|has) (he|dr\.? ali) (have|hold|earned|received)/i,
      /is (he|dr\.? ali) (board certified|certified|qualified|accredited|licensed)/i,
    ],

    ventures: [
      /what (ventures|companies|startups|businesses|organizations|firms|enterprises|entities) (is|does|has) (he|dr\.? ali) (involved with|involved in)/i,
      /which (ventures|companies|startups|businesses|organizations|firms|enterprises|entities) (is|does|has) (he|dr\.? ali) (involved with|involved in)/i,
      /what (companies|ventures|startups|businesses)/i,
      /what.*companies/i,
      /companies.*work with/i,
    ],

    clinical: [/clinical practice/i, /medical practice/i, /where does he practice/i, /patients/i, /treat/i],

    research: [/research interest/i, /what.*research/i, /publication/i, /study/i, /trial/i],
  }

  // Check each pattern set against the input text
  for (const [type, patternList] of Object.entries(patterns)) {
    for (const pattern of patternList) {
      if (pattern.test(text)) {
        return type
      }
    }
  }

  // Return "general" if no specific question type is identified
  return "general"
}

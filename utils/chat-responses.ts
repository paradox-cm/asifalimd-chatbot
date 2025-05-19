// Chat responses for Dr. Ali's website
// This file contains predefined responses for common questions

import { identifyQuestionCategory, getRelevantInformation } from "./knowledge-base"

// Function to generate a response based on the user's question
export function generateResponse(question: string): string {
  const categories = identifyQuestionCategory(question)
  const information = getRelevantInformation(categories)

  // Check if the question is about companies or ventures
  const isAboutCompanies =
    question.toLowerCase().includes("compan") ||
    question.toLowerCase().includes("work with") ||
    question.toLowerCase().includes("advise")

  if (isAboutCompanies && (categories.includes("ventures") || categories.includes("general"))) {
    return generateVenturesResponse()
  }

  // Handle different categories of questions
  if (categories.includes("clinical")) {
    return generateClinicalResponse()
  } else if (categories.includes("research")) {
    return generateResearchResponse()
  } else if (categories.includes("ventures")) {
    return generateVenturesResponse()
  } else if (categories.includes("speaking")) {
    return generateSpeakingResponse()
  } else if (categories.includes("media")) {
    return generateMediaResponse()
  } else if (categories.includes("contact")) {
    return generateContactResponse()
  } else if (categories.includes("about")) {
    return generateAboutResponse()
  } else if (categories.includes("cv")) {
    return generateCVResponse()
  } else {
    return generateDefaultResponse()
  }
}

// Generate response about Dr. Ali's clinical practice
function generateClinicalResponse(): string {
  return `
Dr. Asif Ali is the Director of Cardiac Electrophysiology at Houston Cardiovascular Center. 

His clinical expertise includes:
• Heart Rhythm Disorders
• Atrial Fibrillation
• Ventricular Tachycardia
• Cardiac Device Implantation
• Catheter Ablation

He performs advanced procedures including pacemaker implantation, defibrillator implantation, cardiac resynchronization therapy, and catheter ablation for arrhythmias.

Dr. Ali takes a patient-centered approach to care, combining clinical expertise with technological innovation to provide the best possible outcomes for his patients.

Would you like to know more about his specific procedures or approach to patient care?
  `
}

// Generate response about Dr. Ali's research
function generateResearchResponse(): string {
  return `
Dr. Asif Ali's research focuses on advancing cardiac care through technology and innovation. His research interests include:

• Digital Health Technologies in Cardiology
• Remote Patient Monitoring
• AI Applications in Cardiac Care
• Wearable Cardiac Devices
• Predictive Analytics for Cardiac Events

He has published over 50 peer-reviewed articles in prestigious medical journals, with notable contributions in:
• Digital Biomarkers for Early Detection of Atrial Fibrillation
• Machine Learning Algorithms for Predicting Heart Failure Readmissions
• Wearable Technology for Continuous Cardiac Monitoring
• Remote Patient Monitoring in Post-Procedure Cardiac Care

His research collaborations include Texas Heart Institute, University of Texas Health Science Center, PLX Health, and several major medical device companies.

Would you like to know more about any specific area of his research?
  `
}

// Generate response about Dr. Ali's ventures and companies
function generateVenturesResponse(): string {
  return `
Dr. Asif Ali works with several prominent companies and organizations in the healthcare and technology sectors. He serves as an advisor to:

• JP Morgan Health
• Abbott Laboratories
• Fitbit Health Solutions
• EPAM Systems
• Avive Solutions

He also provides consulting services to various digital health startups, medical device companies, and healthcare investment firms. His expertise in these roles includes:

• Digital Health Strategy
• Medical Device Development
• Healthcare Innovation
• Clinical Validation of Health Technologies
• Regulatory Pathways for Health Tech

Additionally, Dr. Ali is an entrepreneur who has founded health technology ventures focused on improving cardiac care delivery and patient outcomes.

Would you like more specific information about his role with any of these companies?
  `
}

// Generate response about Dr. Ali's speaking engagements
function generateSpeakingResponse(): string {
  return `
Dr. Asif Ali is a sought-after speaker on topics at the intersection of cardiology and technology. His speaking topics include:

• The Future of Digital Cardiology
• AI and Machine Learning in Cardiac Care
• Remote Patient Monitoring Revolution
• Digital Transformation in Healthcare
• Physician Entrepreneurship in Health Tech

He regularly addresses diverse audiences at medical conferences, healthcare innovation summits, investment forums, corporate events, and academic institutions.

Dr. Ali has also made media appearances as a medical contributor on Fox News, the Dr. Oz Show, healthcare innovation podcasts, and has been interviewed by various medical journals.

If you're interested in booking Dr. Ali for a speaking engagement, please use the speaking request form on the website.
  `
}

// Generate response about Dr. Ali's media appearances
function generateMediaResponse(): string {
  return `
Dr. Asif Ali has established a strong media presence as a medical expert. His media experience includes:

• Medical Contributor on Fox News
• Featured guest on the Dr. Oz Show
• Appearances on healthcare innovation podcasts
• Interviews in medical journals and publications

He provides expert commentary on cardiovascular health, medical technology, and healthcare innovation.

For media inquiries or to request Dr. Ali for an interview or commentary, please use the contact form on the website and indicate the nature of your media request.
  `
}

// Generate response about contacting Dr. Ali
function generateContactResponse(): string {
  return `
You can reach Dr. Asif Ali through the following channels:

• For professional inquiries: Please use the contact form on this website
• For speaking engagements: Please submit details through the speaking request form
• For media inquiries: Please indicate the nature of your request in the contact form

Dr. Ali's team reviews all inquiries and will respond to appropriate requests in a timely manner.
  `
}

// Generate response about Dr. Ali's background
function generateAboutResponse(): string {
  return `
Dr. Asif Ali is a board-certified cardiologist and cardiac electrophysiologist based in Houston, Texas. He currently serves as the Director of Cardiac Electrophysiology at Houston Cardiovascular Center.

His education includes:
• Medical Degree from The University of Texas Medical Branch
• Internal Medicine Residency at Baylor College of Medicine
• Cardiology Fellowship at Texas Heart Institute
• Cardiac Electrophysiology Fellowship at Texas Heart Institute

He holds board certifications in:
• Internal Medicine
• Cardiovascular Disease
• Clinical Cardiac Electrophysiology

Beyond his clinical practice, Dr. Ali is actively involved in research, innovation, and entrepreneurship in the healthcare technology space. He serves as an advisor to several major healthcare and technology companies, including JP Morgan Health, Abbott Laboratories, and Fitbit Health Solutions.

Dr. Ali is passionate about leveraging technology to improve cardiac care and patient outcomes.
  `
}

// Generate response about Dr. Ali's CV
function generateCVResponse(): string {
  return `
Dr. Asif Ali's curriculum vitae highlights his extensive experience and accomplishments in cardiology, research, and healthcare innovation.

Key highlights from his CV include:

• Current position: Director of Cardiac Electrophysiology at Houston Cardiovascular Center
• Board certifications in Internal Medicine, Cardiovascular Disease, and Clinical Cardiac Electrophysiology
• Over 50 peer-reviewed publications in prestigious medical journals
• Advisory roles with JP Morgan Health, Abbott Laboratories, Fitbit Health Solutions, EPAM Systems, and Avive Solutions
• Regular speaking engagements at major medical conferences and healthcare innovation events
• Media appearances as a medical expert on platforms including Fox News and the Dr. Oz Show

You can view or download his complete CV on the website's CV page for a comprehensive overview of his education, training, professional experience, research, publications, and achievements.
  `
}

// Generate default response for general or unclear questions
function generateDefaultResponse(): string {
  return `
I'm here to provide information about Dr. Asif Ali, a board-certified cardiologist, cardiac electrophysiologist, and digital health advisor based in Houston, Texas.

I can tell you about:
• His clinical practice and expertise
• His research interests and publications
• His work with companies and ventures
• His speaking engagements
• His media appearances
• How to contact him

What specific aspect of Dr. Ali's work would you like to know more about?
  `
}

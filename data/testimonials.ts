export interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string
  source?: {
    name: string
    url: string
  }
  featured?: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Dr. Ali has been fantastic! He took my unusual symptoms and made a quick diagnosis of a pretty rare disease which numerous other doctors were perplexed by. Couldn't be more grateful for his help!",
    author: "Patient",
    source: {
      name: "Vitals Review",
      url: "https://www.vitals.com/doctors/Dr_Asif_Ali.html",
    },
    featured: true,
  },
  {
    id: "2",
    quote:
      "Dr. Ali has been my cardiologist for almost three years, and I owe him everything. He has been there for me more than any doctor I've had over the years.",
    author: "Patient",
    source: {
      name: "Yelp Review",
      url: "https://www.yelp.com/biz/ali-abdul-md-houston",
    },
    featured: true,
  },
  {
    id: "3",
    quote:
      "Dr. Ali took my unusual symptoms and made a quick diagnosis of a pretty rare disease which numerous other doctors were perplexed by. Couldn't be more grateful.",
    author: "Patient",
    source: {
      name: "Vitals Review",
      url: "https://www.vitals.com/doctors/Dr_Asif_Ali.html",
    },
    featured: true,
  },
  {
    id: "4",
    quote:
      "Dr. Ali is top-notch and is by far one of the best cardiologists in Houston. He is professional, accurate, efficient, helpful, and also has an above and beyond concern for the outcome, well-being, and health of his patients.",
    author: "Patient",
    source: {
      name: "Vitals Review",
      url: "https://www.vitals.com/doctors/Dr_Asif_Ali.html",
    },
    featured: true,
  },
  {
    id: "5",
    quote:
      "Dr. Ali has been the first doctor to fix my chronic medical issues with a listening and caring attitude. His bedside manner is second to none. He explained everything to me and spent extra time to answer all my questions.",
    author: "Patient",
    source: {
      name: "Vitals Review",
      url: "https://www.vitals.com/doctors/Dr_Asif_Ali.html",
    },
    featured: true,
  },
  {
    id: "6",
    quote:
      "Dr. Ali is great. Very thoughtful and caring. Appreciate the time he takes with patients and his friendliness.",
    author: "Patient",
    source: {
      name: "Yelp Review",
      url: "https://www.yelp.com/biz/houston-cardiology-consultants-houston-2",
    },
    featured: true,
  },
  {
    id: "7",
    quote:
      "Dr. Ali has been fantastic! He took my unusual symptoms and made a quick diagnosis of a pretty rare disease which numerous other doctors were perplexed by. Couldn't be more grateful for his help!",
    author: "Patient",
    source: {
      name: "Vitals Review",
      url: "https://www.vitals.com/doctors/Dr_Asif_Ali.html",
    },
    featured: true,
  },
  // Keep some of the original testimonials for the testimonials page, but mark them as not featured
  {
    id: "8",
    quote: "Dr. Ali bridges diagnostics, equity, and innovation across medicine, research, and technology.",
    author: "Dr. Sarah Johnson",
    role: "Peer Review, Med-Tech Collaborator",
  },
  {
    id: "9",
    quote:
      "His exceptional fund of knowledge is matched only by his bedside manner and visionary ability to integrate innovation with care.",
    author: "Michael Chen",
    role: "Healthcare Executive",
  },
  {
    id: "10",
    quote:
      "Dr. Ali's approach to complex cardiovascular cases combines cutting-edge diagnostics with deep empathy for patient experiences.",
    author: "Dr. Emily Rodriguez",
    role: "Cardiologist, Texas Medical Center",
  },
  {
    id: "11",
    quote:
      "Working with Dr. Ali on our clinical validation was transformative. His insights bridged the gap between technology and real patient outcomes.",
    author: "Samantha Lee",
    role: "CEO, Health Tech Startup",
  },
  {
    id: "12",
    quote: "A true doctorpreneur with an unparalleled med-tech network and the clinical expertise to back it up.",
    author: "James Wilson",
    role: "Venture Capital Partner",
  },
  {
    id: "13",
    quote:
      "Dr. Ali brings a rare combination of clinical precision, technological vision, and genuine compassion to every project.",
    author: "Dr. Rebecca Martinez",
    role: "Research Director, Cardiovascular Institute",
  },
  {
    id: "14",
    quote:
      "Dr. Ali's research on post-COVID dysautonomia has been groundbreaking for our understanding of long-term cardiovascular impacts.",
    author: "Dr. Robert Martinez",
    role: "Research Director, Cardiovascular Institute",
  },
  {
    id: "15",
    quote:
      "His ability to translate complex medical concepts for diverse audiences makes him an exceptional educator and communicator.",
    author: "Lisa Thompson",
    role: "Medical Education Director",
  },
  {
    id: "16",
    quote:
      "Dr. Ali's commitment to inclusive clinical trials has set a new standard for equity in cardiovascular research.",
    author: "Dr. Aisha Patel",
    role: "Public Health Researcher",
  },
  {
    id: "17",
    quote:
      "Working alongside Dr. Ali has elevated our entire team's approach to precision diagnostics and patient care.",
    author: "Dr. Thomas Wright",
    role: "Colleague, Houston Cardiology Consultants",
  },
  {
    id: "18",
    quote:
      "His strategic insights helped us navigate regulatory challenges while keeping patient outcomes at the center of our innovation.",
    author: "Jennifer Garcia",
    role: "COO, Medical Device Company",
  },
  {
    id: "19",
    quote:
      "Dr. Ali's mentorship has been invaluable in shaping my approach to both clinical practice and research methodology.",
    author: "Dr. David Kim",
    role: "Former Fellow, McGovern Medical School",
  },
  {
    id: "20",
    quote:
      "Few physicians understand the intersection of digital health and clinical practice as thoroughly as Dr. Ali.",
    author: "Mark Johnson",
    role: "Digital Health Strategist",
  },
]

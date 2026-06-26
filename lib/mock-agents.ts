export interface AgentReview {
  author: string
  role: string
  rating: number
  comment: string
  date: string
}

export interface AgentFAQ {
  q: string
  a: string
}

export interface AIAgent {
  id: string
  name: string
  category: string
  icon: string
  gradient: string // CSS gradient string for card accent
  tagline: string
  description: string
  longDescription: string
  features: string[]
  whatItDoes: string[]
  whoItsFor: string[]
  integrations: string[]
  setupTime: string
  rating: number
  reviewCount: number
  installs: number
  price: string
  priceMonthly: number
  badge?: 'Popular' | 'New' | 'Featured' | 'Trending'
  tags: string[]
  faqs: AgentFAQ[]
  reviews: AgentReview[]
  conversationExamples: { role: 'user' | 'agent'; message: string }[][]
}

export const CATEGORIES = [
  'All',
  'Sales',
  'Marketing',
  'Customer Support',
  'Healthcare',
  'Real Estate',
  'Restaurants',
  'Construction',
  'Finance',
  'HR',
  'Operations',
  'Productivity',
]

export const ALL_INTEGRATIONS = [
  'Google Calendar',
  'Gmail',
  'Slack',
  'HubSpot',
  'Twilio',
  'Stripe',
  'Notion',
  'Zapier',
  'Calendly',
  'Microsoft 365',
  'WhatsApp',
  'Salesforce',
]

export const MOCK_AGENTS: AIAgent[] = [
  {
    id: 'ai-receptionist',
    name: 'AI Receptionist',
    category: 'Customer Support',
    icon: '📞',
    gradient: 'from-blue-500 to-indigo-600',
    tagline: 'Never miss a call or lead again',
    description: 'Handles inbound calls, qualifies leads, books appointments, and answers FAQs 24/7 — so you never miss a customer.',
    longDescription: 'The AI Receptionist is your always-on front desk. It answers calls in your brand voice, collects caller information, qualifies inbound leads, books appointments directly into your calendar, and routes urgent issues to the right team member. Most businesses deploy it in under 5 minutes.',
    features: [
      '24/7 inbound call handling',
      'Automatic appointment booking',
      'Lead qualification and scoring',
      'SMS follow-up after every call',
      'Instant Slack/email notifications',
      'Call transcripts and summaries',
      'Custom FAQ knowledge base',
      'Multi-language support',
    ],
    whatItDoes: [
      'Answers calls in your brand voice, 24/7',
      'Collects caller name, number, and reason for calling',
      'Books appointments directly into Google Calendar or Calendly',
      'Sends instant SMS/email follow-ups',
      'Notifies your team in Slack for urgent requests',
      'Logs every interaction to your CRM',
    ],
    whoItsFor: [
      'Local businesses that miss calls after hours',
      'Service businesses with high call volume',
      'Clinics and healthcare providers',
      'Real estate agents and brokerages',
      'Law firms and professional services',
    ],
    integrations: ['Google Calendar', 'Twilio', 'Slack', 'HubSpot', 'Calendly'],
    setupTime: '~5 min',
    rating: 4.9,
    reviewCount: 312,
    installs: 4821,
    price: 'From $49/mo',
    priceMonthly: 49,
    badge: 'Popular',
    tags: ['calls', 'receptionist', 'appointments', 'lead-gen', '24/7'],
    faqs: [
      { q: 'Does it work with my existing phone number?', a: 'Yes. We provide a forwarding number, or you can port your existing number. Setup takes under 2 minutes.' },
      { q: 'What happens when the AI can\'t answer something?', a: 'It gracefully transfers to a human or takes a message and alerts your team via Slack or SMS immediately.' },
      { q: 'Can I customize what it says?', a: 'Absolutely. During setup you define your brand voice, FAQs, and scripts. You can update them anytime from your dashboard.' },
    ],
    reviews: [
      { author: 'Sarah M.', role: 'Owner, Bloom Dental', rating: 5, comment: 'We went from missing 40% of after-hours calls to capturing every single one. Booked 23 appointments in the first week.', date: '2 weeks ago' },
      { author: 'James K.', role: 'Real Estate Broker', rating: 5, comment: 'My AI receptionist qualifies leads better than my old VA did. Absolutely worth every penny.', date: '1 month ago' },
      { author: 'Lisa T.', role: 'Law Firm Manager', rating: 4, comment: 'Very impressed. Setup was genuinely 5 minutes. The AI handles initial intake questions perfectly.', date: '3 weeks ago' },
    ],
    conversationExamples: [
      [
        { role: 'user', message: 'Hi, I\'d like to book a consultation.' },
        { role: 'agent', message: 'Hi there! I\'d love to help you schedule that. What\'s your name and the best number to reach you?' },
        { role: 'user', message: 'It\'s Mike, 555-0192.' },
        { role: 'agent', message: 'Perfect, Mike! I have openings tomorrow at 2 PM or Thursday at 10 AM. Which works better for you?' },
      ],
    ],
  },
  {
    id: 'ai-appointment-setter',
    name: 'AI Appointment Setter',
    category: 'Sales',
    icon: '📅',
    gradient: 'from-violet-500 to-purple-600',
    tagline: 'Fill your calendar while you sleep',
    description: 'Proactively reaches out to leads via email and SMS, follows up automatically, and books qualified meetings on your calendar.',
    longDescription: 'Stop chasing leads manually. The AI Appointment Setter reaches out to your prospect list, sends personalized follow-up sequences, handles objections conversationally, and only books meetings when the prospect is genuinely interested. Your calendar fills itself.',
    features: [
      'Personalized outreach sequences',
      'Multi-channel: email + SMS',
      'Handles objections automatically',
      'Books only qualified prospects',
      'Timezone-aware scheduling',
      'CRM sync after every booking',
      'A/B tests your messaging automatically',
      'Detailed conversion analytics',
    ],
    whatItDoes: [
      'Sends personalized outreach to your lead list',
      'Follows up 3–5x across email and SMS',
      'Answers questions and handles common objections',
      'Books only qualified, interested prospects',
      'Syncs booked meetings to your CRM',
      'Sends reminders to reduce no-shows',
    ],
    whoItsFor: [
      'B2B sales teams with large prospect lists',
      'Coaches and consultants selling discovery calls',
      'SaaS companies doing product demos',
      'Agencies booking strategy sessions',
    ],
    integrations: ['Gmail', 'Google Calendar', 'HubSpot', 'Calendly', 'Twilio', 'Slack'],
    setupTime: '~10 min',
    rating: 4.8,
    reviewCount: 198,
    installs: 3104,
    price: 'From $79/mo',
    priceMonthly: 79,
    badge: 'Trending',
    tags: ['sales', 'outreach', 'appointments', 'email', 'sms'],
    faqs: [
      { q: 'How do I give it my lead list?', a: 'Upload a CSV or connect your CRM directly. It starts outreach within minutes of setup.' },
      { q: 'Does it sound robotic?', a: 'No — you define your brand voice and the AI personalizes each message using the prospect\'s details. Most recipients can\'t tell it\'s automated.' },
    ],
    reviews: [
      { author: 'David R.', role: 'VP Sales, TechCo', rating: 5, comment: 'Booked 47 demos in the first month without a single SDR. This thing is a machine.', date: '1 month ago' },
      { author: 'Anna P.', role: 'Business Coach', rating: 5, comment: 'I uploaded 200 leads on Monday. By Friday I had 18 discovery calls booked. Insane ROI.', date: '3 weeks ago' },
    ],
    conversationExamples: [
      [
        { role: 'agent', message: 'Hi Marcus — I noticed you downloaded our pricing guide. Would a 20-min call to walk through ROI numbers make sense this week?' },
        { role: 'user', message: 'Maybe — what\'s it about exactly?' },
        { role: 'agent', message: 'I\'ll show you exactly how similar companies cut lead response time by 80%. Happy to keep it tight at 15 minutes. Tuesday at 3 PM work?' },
      ],
    ],
  },
  {
    id: 'ai-sales-assistant',
    name: 'AI Sales Assistant',
    category: 'Sales',
    icon: '💼',
    gradient: 'from-emerald-500 to-teal-600',
    tagline: 'Close more deals with less effort',
    description: 'Qualifies inbound leads in real time, answers product questions, handles pricing objections, and hands off hot leads to your team.',
    longDescription: 'The AI Sales Assistant sits on your website and chat channels, engaging every visitor instantly. It qualifies budget and intent, answers questions with your product knowledge base, and alerts your sales team the moment a hot lead is ready to talk.',
    features: [
      'Real-time lead qualification',
      'Product Q&A from your knowledge base',
      'Handles pricing and objection questions',
      'Hot lead alerts to your team',
      'Automatic follow-up sequences',
      'Pipeline reporting dashboard',
    ],
    whatItDoes: [
      'Engages every website visitor within seconds',
      'Asks qualifying questions for budget and timeline',
      'Answers product questions using your docs',
      'Flags hot leads to your sales team instantly',
      'Books demos or calls for qualified prospects',
    ],
    whoItsFor: [
      'SaaS companies with inbound traffic',
      'E-commerce brands with high-value products',
      'B2B companies with long sales cycles',
    ],
    integrations: ['Slack', 'HubSpot', 'Salesforce', 'Gmail', 'Calendly', 'Stripe'],
    setupTime: '~8 min',
    rating: 4.7,
    reviewCount: 156,
    installs: 2290,
    price: 'From $69/mo',
    priceMonthly: 69,
    badge: 'Featured',
    tags: ['sales', 'chat', 'lead-qualification', 'b2b'],
    faqs: [
      { q: 'How does it learn about my product?', a: 'During setup, you paste in your website URL and any docs. The AI builds a knowledge base automatically.' },
    ],
    reviews: [
      { author: 'Chris L.', role: 'Head of Sales', rating: 5, comment: 'Our inbound conversion rate jumped 34% in the first 30 days. The AI qualifies better than our junior reps.', date: '2 months ago' },
    ],
    conversationExamples: [
      [
        { role: 'user', message: 'What\'s the difference between your Starter and Pro plans?' },
        { role: 'agent', message: 'Great question! Starter covers up to 5 users and core features. Pro adds advanced analytics, API access, and priority support. Most teams our size find Pro pays for itself within 60 days. Want me to show you the ROI calculator?' },
      ],
    ],
  },
  {
    id: 'ai-customer-support',
    name: 'AI Customer Support',
    category: 'Customer Support',
    icon: '🎧',
    gradient: 'from-sky-500 to-blue-600',
    tagline: 'Resolve 80% of tickets automatically',
    description: 'Handles your support inbox 24/7 — answering questions, processing refunds, tracking orders, and escalating only when needed.',
    longDescription: 'Deploy an AI support agent that knows your product inside out. It handles tier-1 tickets instantly, processes standard requests like refunds and password resets, and only escalates the complex stuff to your human team. Your customers get instant responses. Your team gets their time back.',
    features: [
      'Instant ticket response 24/7',
      'Auto-resolves tier-1 tickets',
      'Processes refunds and returns',
      'Order tracking and status updates',
      'Smart escalation to human agents',
      'Multi-channel: email, chat, WhatsApp',
      'CSAT tracking and reporting',
    ],
    whatItDoes: [
      'Responds to every ticket within 30 seconds',
      'Resolves common questions from your knowledge base',
      'Processes standard requests automatically',
      'Escalates edge cases with full context to your team',
      'Follows up on resolved tickets for CSAT',
    ],
    whoItsFor: [
      'E-commerce brands with high ticket volume',
      'SaaS companies with onboarding questions',
      'Small businesses without a full support team',
    ],
    integrations: ['Gmail', 'Slack', 'Notion', 'WhatsApp', 'Stripe', 'Zapier'],
    setupTime: '~7 min',
    rating: 4.8,
    reviewCount: 423,
    installs: 6712,
    price: 'From $59/mo',
    priceMonthly: 59,
    badge: 'Popular',
    tags: ['support', 'tickets', 'customer-service', 'e-commerce', '24/7'],
    faqs: [
      { q: 'What if the AI doesn\'t know the answer?', a: 'It gracefully escalates to your team with full context — the customer never knows the difference.' },
      { q: 'Can it process actual refunds?', a: 'Yes, when connected to Stripe or your e-commerce platform, it can issue refunds within your preset limits.' },
    ],
    reviews: [
      { author: 'Emma W.', role: 'E-commerce Founder', rating: 5, comment: 'Went from 48-hour response times to under 30 seconds. Our support team now handles only the hard stuff.', date: '1 month ago' },
      { author: 'Ryan B.', role: 'SaaS CEO', rating: 5, comment: 'Closed 78% of tickets without human intervention in the first week. Customers love the instant responses.', date: '3 weeks ago' },
    ],
    conversationExamples: [
      [
        { role: 'user', message: 'My order hasn\'t arrived and it\'s been 2 weeks.' },
        { role: 'agent', message: 'I\'m so sorry about the delay! Let me pull up your order right now. Can I get your order number?' },
        { role: 'user', message: '#48291' },
        { role: 'agent', message: 'Found it! Your package is showing delayed at the Memphis facility. I\'ve flagged it for priority handling and you\'ll receive an update within 24 hours. As an apology, I\'ve applied a 15% discount to your next order — it\'s in your account now.' },
      ],
    ],
  },
  {
    id: 'ai-lead-qualifier',
    name: 'AI Lead Qualifier',
    category: 'Sales',
    icon: '🎯',
    gradient: 'from-orange-500 to-red-500',
    tagline: 'Spend time only on your best leads',
    description: 'Scores and qualifies every inbound lead using BANT or your custom criteria — so your sales team only talks to buyers.',
    longDescription: 'Stop wasting time on unqualified leads. The AI Lead Qualifier scores every inbound inquiry against your ideal customer profile, asks the right qualifying questions, and delivers a hot-lead ranking so your team knows exactly who to call first.',
    features: [
      'BANT or custom qualification frameworks',
      'Automatic lead scoring 1–100',
      'Conversational qualifying questions',
      'ICP matching against your criteria',
      'Hot lead routing to sales rep',
      'Weekly pipeline quality reports',
    ],
    whatItDoes: [
      'Engages every new lead within 60 seconds',
      'Asks budget, authority, need, and timeline questions',
      'Scores each lead 1–100 based on your ICP',
      'Routes hot leads to the right sales rep',
      'Logs all data to your CRM automatically',
    ],
    whoItsFor: [
      'Sales teams flooded with inbound inquiries',
      'Marketing teams running high-volume lead gen',
      'B2B companies with complex qualification criteria',
    ],
    integrations: ['HubSpot', 'Salesforce', 'Slack', 'Gmail', 'Calendly'],
    setupTime: '~6 min',
    rating: 4.7,
    reviewCount: 89,
    installs: 1543,
    price: 'From $59/mo',
    priceMonthly: 59,
    tags: ['sales', 'leads', 'qualification', 'scoring', 'bant'],
    faqs: [
      { q: 'Can I define my own qualification criteria?', a: 'Yes. During setup you define exactly what makes a lead qualified for your business — industry, budget range, company size, and more.' },
    ],
    reviews: [
      { author: 'Tom H.', role: 'Sales Director', rating: 5, comment: 'Our close rate went up 28% because we stopped wasting time on tire-kickers. The scoring is scarily accurate.', date: '2 months ago' },
    ],
    conversationExamples: [
      [
        { role: 'agent', message: 'Thanks for reaching out! Quick question — what\'s driving your interest in an AI solution right now?' },
        { role: 'user', message: 'We\'re scaling fast and our support team is overwhelmed.' },
        { role: 'agent', message: 'Got it. And roughly how many support tickets do you handle per week today?' },
      ],
    ],
  },
  {
    id: 'ai-research-assistant',
    name: 'AI Research Assistant',
    category: 'Productivity',
    icon: '🔍',
    gradient: 'from-cyan-500 to-blue-500',
    tagline: 'Research done in minutes, not hours',
    description: 'Researches competitors, prospects, markets, and topics — delivering structured reports straight to your inbox or Notion.',
    longDescription: 'The AI Research Assistant does the deep work so you don\'t have to. Feed it a company name, topic, or question and get back a structured, sourced report in minutes. Perfect for sales prep, market analysis, competitive intelligence, and investor research.',
    features: [
      'Web research with source citations',
      'Competitive analysis reports',
      'Prospect research for sales teams',
      'Market sizing and trend analysis',
      'Delivers to Notion, email, or Slack',
      'Scheduled weekly research digests',
    ],
    whatItDoes: [
      'Researches companies, people, and markets',
      'Pulls structured data from public sources',
      'Compiles findings into readable reports',
      'Delivers to your preferred tool',
      'Runs scheduled research automatically',
    ],
    whoItsFor: [
      'Sales teams doing prospect research',
      'Investors doing due diligence',
      'Marketers tracking competitors',
      'Executives needing market intelligence',
    ],
    integrations: ['Notion', 'Slack', 'Gmail', 'Microsoft 365', 'Zapier'],
    setupTime: '~3 min',
    rating: 4.6,
    reviewCount: 74,
    installs: 1102,
    price: 'From $39/mo',
    priceMonthly: 39,
    badge: 'New',
    tags: ['research', 'productivity', 'reports', 'competitive-intel'],
    faqs: [
      { q: 'Where does it pull data from?', a: 'Public web sources, LinkedIn, news sites, company websites, and more. All findings are cited.' },
    ],
    reviews: [
      { author: 'Nina S.', role: 'Investment Analyst', rating: 5, comment: 'What used to take my team 4 hours now takes 8 minutes. The reports are actually better too.', date: '1 month ago' },
    ],
    conversationExamples: [
      [
        { role: 'user', message: 'Research Acme Corp for a sales call tomorrow.' },
        { role: 'agent', message: 'On it! I\'ll pull their recent funding, tech stack, key decision makers, recent news, and likely pain points. Sending to your Notion in 3 minutes.' },
      ],
    ],
  },
  {
    id: 'ai-marketing-manager',
    name: 'AI Marketing Manager',
    category: 'Marketing',
    icon: '📣',
    gradient: 'from-pink-500 to-rose-600',
    tagline: 'Your marketing team, on autopilot',
    description: 'Plans and executes your marketing calendar — writing content, scheduling posts, analyzing performance, and suggesting improvements.',
    longDescription: 'The AI Marketing Manager keeps your brand consistently visible without you lifting a finger. It creates content calendars, writes posts and emails, schedules them across channels, tracks performance, and suggests what to do more of every week.',
    features: [
      'Monthly content calendar creation',
      'Blog, social, and email copywriting',
      'Auto-scheduling across channels',
      'Performance analytics weekly',
      'A/B testing recommendations',
      'Brand voice enforcement',
      'Competitor content monitoring',
    ],
    whatItDoes: [
      'Builds your content calendar for the month',
      'Writes posts, emails, and blog outlines',
      'Schedules content across platforms',
      'Tracks engagement and suggests improvements',
      'Alerts you to trending topics in your niche',
    ],
    whoItsFor: [
      'Small businesses without a marketing team',
      'Solo founders who want consistent content',
      'Agencies managing multiple client brands',
    ],
    integrations: ['Gmail', 'Notion', 'Slack', 'Zapier', 'Microsoft 365'],
    setupTime: '~12 min',
    rating: 4.6,
    reviewCount: 112,
    installs: 1876,
    price: 'From $89/mo',
    priceMonthly: 89,
    tags: ['marketing', 'content', 'social-media', 'email', 'calendar'],
    faqs: [
      { q: 'Can I approve content before it goes out?', a: 'Yes. You can set it to approval mode where every piece of content requires your sign-off before publishing.' },
    ],
    reviews: [
      { author: 'Priya K.', role: 'Founder, StyleBrand', rating: 5, comment: 'I went from posting once a week to daily. My engagement tripled and I spend maybe 10 minutes reviewing content per week.', date: '6 weeks ago' },
    ],
    conversationExamples: [
      [
        { role: 'user', message: 'Create this month\'s content calendar.' },
        { role: 'agent', message: 'Done! I\'ve planned 20 posts across Instagram, LinkedIn, and your newsletter — themed around your Q4 launch. Here\'s the calendar in Notion. Want me to start drafting the first week?' },
      ],
    ],
  },
  {
    id: 'ai-email-assistant',
    name: 'AI Email Assistant',
    category: 'Productivity',
    icon: '✉️',
    gradient: 'from-amber-500 to-orange-500',
    tagline: 'Inbox zero, every single day',
    description: 'Triages your inbox, drafts smart replies, follows up on threads you\'ve forgotten, and summarizes long email chains instantly.',
    longDescription: 'The AI Email Assistant learns your communication style and handles your inbox like a world-class EA. It triages by priority, drafts responses in your voice, follows up on stale threads, and delivers daily briefings so nothing slips through the cracks.',
    features: [
      'Priority inbox triage',
      'Smart reply drafts in your voice',
      'Automatic follow-up reminders',
      'Thread summaries in one line',
      'Unsubscribe from junk automatically',
      'Daily email briefing at 8 AM',
      'Meeting request handling',
    ],
    whatItDoes: [
      'Labels and prioritizes your inbox automatically',
      'Drafts replies for your review in seconds',
      'Follows up on emails you haven\'t replied to',
      'Summarizes long threads in plain English',
      'Handles routine requests automatically',
    ],
    whoItsFor: [
      'Founders and executives with overflowing inboxes',
      'Sales reps managing high email volume',
      'Anyone spending 3+ hours per day on email',
    ],
    integrations: ['Gmail', 'Microsoft 365', 'Slack', 'Notion', 'Calendly'],
    setupTime: '~4 min',
    rating: 4.8,
    reviewCount: 267,
    installs: 3942,
    price: 'From $29/mo',
    priceMonthly: 29,
    badge: 'Popular',
    tags: ['email', 'productivity', 'inbox', 'gmail', 'follow-up'],
    faqs: [
      { q: 'Does it send emails without my approval?', a: 'By default, all replies are drafted for your review. You can enable auto-send for specific reply types.' },
    ],
    reviews: [
      { author: 'Jake M.', role: 'CEO, Agency', rating: 5, comment: 'I went from 4 hours a day in email to 45 minutes. I can\'t believe I waited this long.', date: '3 weeks ago' },
    ],
    conversationExamples: [
      [
        { role: 'agent', message: '🌅 Good morning! You have 43 unread emails. 3 are urgent (client replies), 8 need action this week, and I\'ve drafted replies for 12 routine threads. Want to review?' },
        { role: 'user', message: 'Show me the urgent ones.' },
        { role: 'agent', message: 'Here\'s a summary of each + my draft reply. All three are ready to send with one click.' },
      ],
    ],
  },
  {
    id: 'ai-social-media-manager',
    name: 'AI Social Media Manager',
    category: 'Marketing',
    icon: '📱',
    gradient: 'from-fuchsia-500 to-pink-600',
    tagline: 'Post daily without lifting a finger',
    description: 'Creates, schedules, and posts content across all your social channels — tailored to each platform\'s style and algorithm.',
    longDescription: 'The AI Social Media Manager keeps your brand active everywhere. It writes platform-native content for LinkedIn, Instagram, X, and more, schedules at optimal times, engages with comments, and reports on what\'s actually working.',
    features: [
      'Content creation for all platforms',
      'Auto-scheduling at peak times',
      'Comment moderation and replies',
      'Hashtag and trend research',
      'Performance reports weekly',
      'Competitor benchmarking',
      'Repurposes long content into posts',
    ],
    whatItDoes: [
      'Creates platform-specific content daily',
      'Schedules posts at optimal engagement times',
      'Monitors and replies to comments',
      'Tracks follower growth and engagement',
      'Repurposes blogs and videos into social clips',
    ],
    whoItsFor: [
      'Small businesses without a social media team',
      'Personal brands and thought leaders',
      'E-commerce brands needing consistent presence',
    ],
    integrations: ['Notion', 'Slack', 'Gmail', 'Zapier'],
    setupTime: '~8 min',
    rating: 4.5,
    reviewCount: 93,
    installs: 1654,
    price: 'From $49/mo',
    priceMonthly: 49,
    badge: 'New',
    tags: ['social-media', 'marketing', 'instagram', 'linkedin', 'content'],
    faqs: [
      { q: 'Which platforms does it post to?', a: 'LinkedIn, Instagram, X (Twitter), Facebook, and TikTok — any combination you choose.' },
    ],
    reviews: [
      { author: 'Mia L.', role: 'Personal Brand Coach', rating: 5, comment: 'My LinkedIn went from 200 followers to 4,800 in 90 days. I reviewed posts for maybe 10 minutes per week.', date: '2 months ago' },
    ],
    conversationExamples: [
      [
        { role: 'user', message: 'Turn this blog post into a week of social content.' },
        { role: 'agent', message: 'Done! I\'ve created 5 LinkedIn posts, 7 Instagram captions with hashtags, and 3 tweet threads — all scheduled for peak engagement times. Here\'s the preview.' },
      ],
    ],
  },
  {
    id: 'ai-real-estate-assistant',
    name: 'AI Real Estate Assistant',
    category: 'Real Estate',
    icon: '🏠',
    gradient: 'from-green-500 to-emerald-600',
    tagline: 'Nurture every lead, close more deals',
    description: 'Responds to buyer and seller inquiries instantly, books showings, follows up on leads, and keeps prospects warm until they\'re ready.',
    longDescription: 'Real estate moves fast. The AI Real Estate Assistant makes sure you never lose a lead to slow response times. It responds to inquiries within seconds, pre-qualifies buyers, books showings directly into your calendar, and nurtures leads with personalized follow-up sequences for months.',
    features: [
      'Instant inquiry response 24/7',
      'Buyer and seller pre-qualification',
      'Automatic showing bookings',
      'Long-term lead nurture sequences',
      'Market update emails to your list',
      'CRM sync and deal tracking',
      'Open house follow-up automation',
    ],
    whatItDoes: [
      'Responds to every new inquiry in under 60 seconds',
      'Pre-qualifies buyers with budget and timeline questions',
      'Books showings directly into your calendar',
      'Follows up with leads every 2 weeks for 12 months',
      'Sends personalized market updates to your sphere',
    ],
    whoItsFor: [
      'Real estate agents managing 20+ active leads',
      'Brokerages with large inbound inquiry volume',
      'Agents who struggle with consistent follow-up',
    ],
    integrations: ['Google Calendar', 'Gmail', 'Twilio', 'HubSpot', 'Calendly', 'Slack'],
    setupTime: '~10 min',
    rating: 4.9,
    reviewCount: 178,
    installs: 2893,
    price: 'From $79/mo',
    priceMonthly: 79,
    badge: 'Popular',
    tags: ['real-estate', 'leads', 'showings', 'nurture', 'agents'],
    faqs: [
      { q: 'Does it know about my listings?', a: 'Yes. During setup you connect your MLS or paste listing details. The AI references them in every conversation.' },
    ],
    reviews: [
      { author: 'Carlos V.', role: 'Real Estate Agent', rating: 5, comment: 'I closed 3 deals from leads I would have given up on. The 12-month nurture sequence is a game changer.', date: '5 weeks ago' },
    ],
    conversationExamples: [
      [
        { role: 'user', message: 'I saw your listing on Zillow for the 3br on Maple St. Is it still available?' },
        { role: 'agent', message: 'Yes, 42 Maple is still available! It\'s a gorgeous 3BR/2BA with a newly renovated kitchen. Are you looking to buy in the next 1–3 months, or just starting to explore?' },
      ],
    ],
  },
]

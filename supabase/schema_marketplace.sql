-- Zentro Marketplace Schema
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT,
  what_it_does TEXT,
  who_its_for TEXT,
  pricing TEXT DEFAULT 'Contact for pricing',
  external_link TEXT,
  creator_name TEXT NOT NULL,
  creator_website TEXT,
  demo_video_url TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  hire_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending_review',
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved listings"
  ON listings FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Anyone can insert listings"
  ON listings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update listings"
  ON listings FOR UPDATE
  USING (true);

-- Seed data: 12 sample listings

INSERT INTO listings (name, slug, category, short_description, full_description, what_it_does, who_its_for, pricing, external_link, creator_name, creator_website, rating, review_count, hire_count, status, tags) VALUES
(
  'SalesBot Pro',
  'salesbot-pro',
  'Sales',
  'AI-powered cold outreach specialist that books qualified meetings on autopilot for B2B companies.',
  'SalesBot Pro is the most advanced AI cold outreach specialist on the market. It researches prospects, personalizes emails at scale, handles follow-ups automatically, and books meetings directly into your calendar.',
  'Research and qualify prospects from LinkedIn and company databases
Write personalized cold emails using company-specific context
Automate multi-step follow-up sequences
Handle objections with AI-generated responses
Book meetings directly into your calendar
Track open rates, reply rates, and booked meetings',
  'B2B founders, sales teams, SDRs, and growth hackers who need to generate consistent pipeline without scaling headcount.',
  '$97/mo',
  'https://growthlabs.ai/salesbot',
  'GrowthLabs AI',
  'https://growthlabs.ai',
  4.9,
  128,
  340,
  'approved',
  ARRAY['Cold Email', 'B2B', 'Outreach']
),
(
  'ContentGenius',
  'contentgenius',
  'Marketing',
  'Generates high-converting blog posts, social content, and ad copy tuned to your brand voice.',
  'ContentGenius learns your brand voice, studies your competitors, and produces SEO-optimized content at scale. From long-form blog posts to Twitter threads to Facebook ads, it handles every content format your marketing team needs.',
  'Write SEO-optimized blog posts with keyword research built in
Generate social media content for LinkedIn, Twitter, Instagram
Create high-converting ad copy for Meta and Google
Repurpose long-form content into multiple formats
Maintain consistent brand voice across all content
Track content performance and iterate',
  'Marketing teams, content agencies, and solo founders who need high-quality content at scale.',
  '$79/mo',
  'https://sparkcreative.io/contentgenius',
  'Spark Creative Studio',
  'https://sparkcreative.io',
  4.8,
  94,
  210,
  'approved',
  ARRAY['SEO', 'Copywriting', 'Social Media']
),
(
  'FBA Scout AI',
  'fba-scout-ai',
  'Amazon FBA',
  'Finds profitable product opportunities, analyzes competition, and tracks margins for Amazon sellers.',
  'FBA Scout AI scans millions of Amazon listings daily to surface high-demand, low-competition product opportunities with healthy margins. It does the product research that used to take 40 hours per week in minutes.',
  'Scan Amazon for high-demand, low-competition products
Analyze competitor listings and review counts
Calculate accurate FBA margins including all fees
Track seasonal trends and demand patterns
Monitor competitor price changes
Generate sourcing recommendations',
  'Amazon FBA sellers at all levels — from beginners finding their first product to 7-figure sellers expanding their catalog.',
  '$149/mo',
  'https://selleredge.io/fba-scout',
  'SellerEdge Tools',
  'https://selleredge.io',
  4.7,
  211,
  480,
  'approved',
  ARRAY['Product Research', 'Amazon', 'FBA']
),
(
  'TalentMatcher AI',
  'talentmatcher-ai',
  'Recruiting',
  'Screens resumes, ranks candidates, and drafts outreach messages to fill roles 5x faster.',
  'TalentMatcher AI eliminates the painful parts of recruiting — reading hundreds of resumes, writing outreach messages, and tracking applicants. It surfaces the best candidates and keeps your pipeline moving.',
  'Parse and score resumes against your job requirements
Rank candidates with detailed match explanations
Draft personalized outreach messages for top candidates
Schedule screening calls automatically
Track candidate pipeline status
Generate interview question suggestions',
  'HR teams, recruiters, and founders who are drowning in applicants and need to find the best candidates faster.',
  '$199/mo',
  'https://hireiq.ai/talentmatcher',
  'HireIQ Systems',
  'https://hireiq.ai',
  4.8,
  67,
  150,
  'approved',
  ARRAY['Resume Screening', 'Recruiting', 'HR']
),
(
  'DealFinder Real Estate AI',
  'dealfinder-real-estate-ai',
  'Real Estate',
  'Analyzes MLS data, identifies undervalued properties, and generates investment reports instantly.',
  'DealFinder AI connects to MLS data and public records to surface investment opportunities before they hit the mainstream market. It generates detailed investment analysis reports in seconds.',
  'Connect to MLS data and scan for undervalued properties
Calculate cap rates, cash-on-cash returns, and IRR
Generate professional investment analysis reports
Monitor neighborhoods for price movement
Identify distressed properties and motivated sellers
Track your deal pipeline',
  'Real estate investors, wholesalers, and agents who want to find more deals with less manual research.',
  '$129/mo',
  'https://proptechlabs.co/dealfinder',
  'PropTech Labs',
  'https://proptechlabs.co',
  4.6,
  45,
  90,
  'approved',
  ARRAY['MLS Analysis', 'Investment', 'Real Estate']
),
(
  'DeepResearch AI',
  'deepresearch-ai',
  'Research',
  'Synthesizes academic papers, market reports, and web sources into clear executive summaries.',
  'DeepResearch AI reads hundreds of sources so you don''t have to. It synthesizes academic papers, market research reports, news articles, and competitor content into clear, actionable executive summaries.',
  'Ingest and analyze academic papers and market reports
Synthesize multiple sources into coherent summaries
Extract key statistics and findings with citations
Compare competing viewpoints on a topic
Generate literature reviews and state-of-field reports
Answer specific research questions with cited sources',
  'Consultants, analysts, academics, investors, and executives who need deep research without spending days in the library.',
  '$59/mo',
  'https://synthesis.ai/deepresearch',
  'Synthesis AI',
  'https://synthesis.ai',
  4.9,
  83,
  200,
  'approved',
  ARRAY['Research', 'Summarization', 'Analysis']
),
(
  'InboxZero AI',
  'inboxzero-ai',
  'Productivity',
  'Manages your email inbox, drafts replies, unsubscribes from junk, and keeps you at inbox zero every day.',
  'InboxZero AI sits in your inbox and handles the flood of email so you can focus on high-value work. It drafts replies, categorizes messages, unsubscribes from newsletters, and ensures nothing important falls through the cracks.',
  'Categorize and prioritize incoming emails automatically
Draft replies in your writing style for your approval
Unsubscribe from marketing emails and newsletters
Summarize long email threads into key points
Flag urgent messages that need your attention
Schedule send times for optimal reply rates',
  'Executives, founders, and anyone who spends more than 2 hours per day managing email.',
  '$49/mo',
  'https://flowstate.app/inboxzero',
  'FlowState Apps',
  'https://flowstate.app',
  4.7,
  156,
  390,
  'approved',
  ARRAY['Email', 'Productivity', 'Automation']
),
(
  'SupportGenie AI',
  'supportgenie-ai',
  'Support',
  'Handles 80% of customer support tickets automatically with accurate, on-brand responses 24/7.',
  'SupportGenie AI trains on your knowledge base, past tickets, and product documentation to handle customer questions with the accuracy and tone of your best support rep — at any hour, at any volume.',
  'Train on your knowledge base and past support tickets
Respond to customer questions 24/7 automatically
Escalate complex issues to human agents
Learn from every interaction to improve over time
Generate weekly support analytics reports
Draft suggested responses for human review',
  'SaaS companies, e-commerce brands, and any business getting more support tickets than their team can handle.',
  '$149/mo',
  'https://cxinnovations.io/supportgenie',
  'CX Innovations',
  'https://cxinnovations.io',
  4.8,
  302,
  620,
  'approved',
  ARRAY['Customer Support', 'Helpdesk', 'Automation']
),
(
  'LinkedInLeads AI',
  'linkedinleads-ai',
  'Sales',
  'Automates LinkedIn prospecting, connection requests, and follow-up sequences for consistent pipeline growth.',
  'LinkedInLeads AI builds your LinkedIn pipeline on autopilot. It identifies your ideal prospects, sends personalized connection requests, and runs nurture sequences that convert connections into calls.',
  'Identify ideal prospects using LinkedIn Sales Navigator filters
Send personalized connection requests at scale
Automate follow-up message sequences
Track connection and reply rates by sequence
Integrate with your CRM to push qualified leads
A/B test message copy to maximize conversion',
  'B2B sales teams, consultants, coaches, and anyone who sells to professionals and wants more pipeline from LinkedIn.',
  '$79/mo',
  'https://prospecthq.com/linkedin-leads',
  'ProspectHQ',
  'https://prospecthq.com',
  4.6,
  89,
  175,
  'approved',
  ARRAY['LinkedIn', 'Prospecting', 'Sales']
),
(
  'AdOptimizer AI',
  'adopter-ai',
  'Marketing',
  'Continuously tests and optimizes your Meta and Google ad creatives to maximize ROAS automatically.',
  'AdOptimizer AI connects to your Meta and Google Ads accounts and continuously tests creative variations, audiences, and bidding strategies to maximize your return on ad spend.',
  'Analyze existing ad performance and identify opportunities
Generate new creative variations for split testing
Automate audience segmentation and expansion
Optimize bidding strategies in real-time
Pause underperforming ads automatically
Generate weekly performance reports with insights',
  'E-commerce brands, DTC companies, and performance marketers who want to maximize ROAS without a full-time media buyer.',
  '$199/mo',
  'https://paidgrowth.io/adopter',
  'PaidGrowth Labs',
  'https://paidgrowth.io',
  4.7,
  71,
  140,
  'approved',
  ARRAY['Meta Ads', 'Google Ads', 'ROAS']
),
(
  'ListingPro AI',
  'listingpro-ai',
  'Real Estate',
  'Creates compelling MLS listings, virtual tour scripts, and buyer follow-up sequences for realtors.',
  'ListingPro AI is built for real estate agents who want to spend less time writing and more time selling. It creates MLS listings that attract buyers, writes virtual tour scripts, and handles follow-up email sequences automatically.',
  'Write compelling MLS property descriptions in minutes
Generate virtual tour narration scripts
Create social media posts for new listings
Write buyer and seller follow-up email sequences
Draft offer letters and negotiation emails
Generate neighborhood and market reports for clients',
  'Real estate agents and brokers who want to close more deals without drowning in paperwork and writing.',
  '$89/mo',
  'https://realty.ai/listingpro',
  'RealtyAI',
  'https://realty.ai',
  4.5,
  38,
  70,
  'approved',
  ARRAY['MLS Listings', 'Real Estate', 'Copywriting']
),
(
  'InventoryIQ',
  'inventoryiq',
  'Amazon FBA',
  'Predicts restock needs, monitors competitor pricing, and automates repricing to protect your Buy Box.',
  'InventoryIQ is the all-in-one inventory intelligence system for Amazon sellers. It predicts when you''ll run out of stock, monitors competitor pricing 24/7, and automatically reprices your listings to protect your Buy Box.',
  'Predict restock dates based on sales velocity and lead times
Monitor competitor prices in real-time
Automate repricing to win and protect the Buy Box
Alert you to sudden demand spikes or drops
Track inventory across multiple warehouses and FBA
Generate inventory health reports weekly',
  'Amazon FBA sellers with active product catalogs who are losing the Buy Box or constantly running out of inventory.',
  '$99/mo',
  'https://fbamastery.io/inventoryiq',
  'FBA Mastery Tools',
  'https://fbamastery.io',
  4.8,
  142,
  300,
  'approved',
  ARRAY['Inventory', 'Repricing', 'Amazon']
);

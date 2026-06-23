-- ============================================================
-- ZENTRO DEMO SEED — run this in Supabase SQL Editor
-- Populates dashboard with impressive AI employee data
-- ============================================================

DO $$
DECLARE
  v_user_id UUID;
  v_aria_id UUID := uuid_generate_v4();
  v_max_id  UUID := uuid_generate_v4();
  v_nova_id UUID := uuid_generate_v4();
  v_rex_id  UUID := uuid_generate_v4();
BEGIN
  -- Get your user ID
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'cole.krachmer3@gmail.com';

  -- Clear old demo data
  DELETE FROM activity_logs WHERE user_id = v_user_id;
  DELETE FROM tasks WHERE user_id = v_user_id;
  DELETE FROM employees WHERE user_id = v_user_id;

  -- ── EMPLOYEES ──────────────────────────────────────────────
  INSERT INTO employees (id, user_id, name, role, goal, system_prompt, status, performance_score, created_at) VALUES

  (v_aria_id, v_user_id, 'Aria', 'SDR',
   'Book 10 qualified meetings per week',
   'You are Aria, an elite AI Sales Development Rep. Your job is to find leads, write personalized cold emails, and book meetings. You are direct, compelling, and data-driven.',
   'active', 94, NOW() - INTERVAL '6 days'),

  (v_max_id, v_user_id, 'Max', 'Research',
   'Analyze market trends and competitor activity weekly',
   'You are Max, an expert AI Research Analyst. You dig deep into markets, competitors, and data to surface actionable insights that drive business decisions.',
   'active', 91, NOW() - INTERVAL '5 days'),

  (v_nova_id, v_user_id, 'Nova', 'Support',
   'Resolve all customer tickets within 2 hours',
   'You are Nova, a world-class AI Support Agent. You handle customer issues with empathy, speed, and accuracy. Your goal is to resolve tickets on first contact.',
   'active', 98, NOW() - INTERVAL '4 days'),

  (v_rex_id, v_user_id, 'Rex', 'Analyst',
   'Generate weekly performance reports and surface growth opportunities',
   'You are Rex, an AI Business Analyst. You transform raw data into clear executive summaries, identify trends, and recommend actions to accelerate growth.',
   'active', 89, NOW() - INTERVAL '3 days');

  -- ── ARIA'S TASKS (SDR) ────────────────────────────────────
  INSERT INTO tasks (employee_id, user_id, prompt, response, status, cost_estimate, tokens_used, created_at) VALUES

  (v_aria_id, v_user_id,
   'Find 25 qualified SaaS founders in the US who raised Series A in the last 6 months',
   'Found 25 qualified leads:
1. Sarah Chen – CEO, DataFlow AI (raised $8M Series A, April 2024)
2. Marcus Webb – Founder, Streamline.io (raised $12M Series A, March 2024)
3. Priya Patel – CEO, NovaSoft (raised $6M Series A, May 2024)
[+22 more contacts with LinkedIn URLs, company size, and funding details]

All leads verified via LinkedIn + Crunchbase. Avg company size: 18 employees. Avg funding: $9.2M.',
   'completed', 0.04, 3200, NOW() - INTERVAL '18 hours'),

  (v_aria_id, v_user_id,
   'Write 25 personalized cold emails for the leads you found',
   'Generated 25 personalized cold emails. Sample:

Subject: Quick question, Sarah

Hi Sarah,

Saw DataFlow AI just closed your Series A — congrats on the $8M round.

Most founders at your stage are drowning in repetitive tasks right before scaling. We built Zentro so you can hire AI employees (SDR, Research, Support) that work 24/7 for $0.12/day each.

Worth a 15-min call this week?

— Cole

[All 25 emails personalized with company details, recent news, and specific pain points]',
   'completed', 0.06, 5100, NOW() - INTERVAL '14 hours'),

  (v_aria_id, v_user_id,
   'Send follow-up sequences to leads who opened but did not reply',
   'Sent 11 follow-up emails to leads with 40%+ open rate but no reply.

Follow-up template used:
"Hey [Name], just bumping this up — did you get a chance to look? Happy to send a quick demo video instead if that''s easier."

Results so far: 3 replies received (27% reply rate on follow-ups). 2 meetings booked.',
   'completed', 0.03, 2400, NOW() - INTERVAL '8 hours'),

  (v_aria_id, v_user_id,
   'Book meetings from interested leads',
   'Booked 4 meetings this week:

1. Sarah Chen (DataFlow AI) — Thursday 2pm EST
2. Marcus Webb (Streamline.io) — Friday 11am EST
3. Priya Patel (NovaSoft) — Next Monday 10am EST
4. James Liu (Carta Health) — Next Tuesday 3pm EST

Calendar invites sent. Meeting prep briefs created for each call.',
   'completed', 0.02, 1800, NOW() - INTERVAL '2 hours'),

  (v_aria_id, v_user_id,
   'Research 10 more leads for tomorrow''s outreach batch',
   NULL, 'pending', 0, 0, NOW() - INTERVAL '5 minutes');

  -- ── MAX'S TASKS (RESEARCH) ────────────────────────────────
  INSERT INTO tasks (employee_id, user_id, prompt, response, status, cost_estimate, tokens_used, created_at) VALUES

  (v_max_id, v_user_id,
   'Research our top 12 competitors and identify their weaknesses',
   'Competitive Analysis — Zentro vs Market

Competitors analyzed: Clay, Apollo, Instantly, Reply.io, Jasper, Copy.ai, Zapier, Make, n8n, Relevance AI, AgentGPT, AutoGen

Key findings:
• None offer a "hire an AI employee" framing — massive positioning gap
• Clay focuses on data enrichment only ($800+/mo)
• Apollo is outbound-only, no task execution ($99–$449/mo)
• Relevance AI is closest but requires technical setup

Zentro advantage: Non-technical, role-based AI workers at 1/10th the cost.

5 opportunities identified:
1. Target Apollo users frustrated by low reply rates
2. Target Zapier power users who want AI, not just automation
3. Own the "AI employee" category before others catch on
4. Partner with startup accelerators (Y Combinator, Techstars)
5. Build templates for the 5 highest-demand roles',
   'completed', 0.08, 6800, NOW() - INTERVAL '22 hours'),

  (v_max_id, v_user_id,
   'Find the top 20 subreddits and communities where our target customers hang out',
   'Target Community Map:

Reddit (2.3M combined members):
• r/startups (900k) — founders venting about operations
• r/entrepreneur (1.2M) — early-stage builders
• r/SaaS (180k) — product builders
• r/sales (90k) — SDRs looking for edge

Twitter/X: #buildinpublic, #indiemaker, #saas
LinkedIn: Startup Founders groups, RevOps communities
Slack: Lenny''s Newsletter, FounderSlack, SaaS Alliance

Best hook per channel:
• Reddit: "I replaced my $4k/mo SDR with a $0.12/day AI"
• TikTok: Screen recording of AI booking a meeting
• LinkedIn: ROI comparison post',
   'completed', 0.05, 4200, NOW() - INTERVAL '16 hours'),

  (v_max_id, v_user_id,
   'Analyze this week''s product usage patterns and surface insights',
   'Weekly Usage Report:

Peak activity: 9am–11am EST and 8pm–10pm EST (users running AI overnight)
Most used role: SDR (62% of all tasks)
Avg tasks per user per day: 7.3
Avg cost per task: $0.04
Most common prompt type: Lead generation (41%), Email writing (28%), Research (19%), Support (12%)

Insight: Users who run overnight tasks have 3x retention rate. Recommend: add "overnight mode" feature + push notification on wake-up showing what AI completed.',
   'completed', 0.03, 2900, NOW() - INTERVAL '6 hours');

  -- ── NOVA'S TASKS (SUPPORT) ────────────────────────────────
  INSERT INTO tasks (employee_id, user_id, prompt, response, status, cost_estimate, tokens_used, created_at) VALUES

  (v_nova_id, v_user_id,
   'Handle all incoming support tickets from the last 24 hours',
   'Resolved 18 support tickets in 1h 24m avg response time.

Ticket breakdown:
• 8 billing questions → resolved with policy info
• 5 feature requests → logged and sent to product team
• 3 bug reports → escalated with full reproduction steps
• 2 onboarding help → sent video walkthrough + setup guide

Customer satisfaction: 96% (based on post-ticket survey)
First-contact resolution rate: 89%

1 ticket escalated to human review: user reporting data export issue (investigating).',
   'completed', 0.05, 4100, NOW() - INTERVAL '10 hours'),

  (v_nova_id, v_user_id,
   'Write FAQ answers for the top 10 most common support questions',
   'Created 10 FAQ entries:

1. How do I create my first AI employee?
→ Click "Add Employee" in the sidebar, choose a role, set a goal, and hit Save. Your AI is ready in 30 seconds.

2. What can AI employees actually do?
→ They can research leads, write emails, analyze data, respond to customers, generate reports, and more — anything you can describe in a prompt.

3. How much does it cost per task?
→ Average task costs $0.04. Most users spend under $1/day total.

[+7 more answers drafted and ready to publish]',
   'completed', 0.04, 3300, NOW() - INTERVAL '4 hours'),

  (v_nova_id, v_user_id,
   'Monitor for any negative sentiment in recent feedback and flag issues',
   NULL, 'pending', 0, 0, NOW() - INTERVAL '10 minutes');

  -- ── REX'S TASKS (ANALYST) ─────────────────────────────────
  INSERT INTO tasks (employee_id, user_id, prompt, response, status, cost_estimate, tokens_used, created_at) VALUES

  (v_rex_id, v_user_id,
   'Generate this week''s executive performance report',
   'ZENTRO WEEKLY EXECUTIVE REPORT
Week of June 16–22, 2024

━━━━━━━━━━━━━━━━━━━━━━━━
WORKFORCE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━
Active AI Employees: 4
Tasks Completed: 142
Avg Performance Score: 93%
Total AI Cost (MTD): $2.40
Human Hours Saved: ~38 hrs

━━━━━━━━━━━━━━━━━━━━━━━━
HIGHLIGHTS
━━━━━━━━━━━━━━━━━━━━━━━━
• Aria booked 4 sales meetings (→ est. $48k pipeline)
• Max identified 5 growth opportunities
• Nova resolved 18 tickets at 96% CSAT
• Total spend: $2.40 vs ~$12,000 for equivalent human team

━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━
Add 2 more SDR employees to 3x outreach volume.',
   'completed', 0.06, 5000, NOW() - INTERVAL '12 hours'),

  (v_rex_id, v_user_id,
   'Calculate ROI of AI workforce vs hiring equivalent humans',
   'ROI Analysis: AI Workforce vs Human Hires

Human equivalent cost (monthly):
• 1 SDR: $4,500/mo
• 1 Research Analyst: $5,000/mo
• 1 Support Agent: $3,500/mo
• 1 Business Analyst: $6,000/mo
TOTAL: $19,000/mo

Zentro AI workforce cost:
• 4 AI employees running 24/7: $2.40/mo (current usage)
• At scale (1000 tasks/day): ~$40/mo

ROI: 99.8% cost reduction
Payback period: Day 1

Additional advantages:
• Works 24/7 (no sick days, no PTO)
• Scales instantly (add employees in 30 seconds)
• No management overhead',
   'completed', 0.04, 3500, NOW() - INTERVAL '1 hour');

  -- ── ACTIVITY LOGS ─────────────────────────────────────────
  INSERT INTO activity_logs (user_id, employee_id, employee_name, message, type, created_at) VALUES

  (v_user_id, v_aria_id, 'Aria', 'Booked meeting with Sarah Chen (DataFlow AI) — Thursday 2pm EST', 'task', NOW() - INTERVAL '2 hours'),
  (v_user_id, v_aria_id, 'Aria', 'Booked meeting with Marcus Webb (Streamline.io) — Friday 11am EST', 'task', NOW() - INTERVAL '2 hours 5 minutes'),
  (v_user_id, v_rex_id,  'Rex',  'Weekly executive report generated — 142 tasks, $2.40 total cost', 'task', NOW() - INTERVAL '1 hour'),
  (v_user_id, v_rex_id,  'Rex',  'ROI analysis complete — 99.8% cost savings vs human team', 'task', NOW() - INTERVAL '1 hour 5 minutes'),
  (v_user_id, v_nova_id, 'Nova', 'Resolved 18 support tickets — 96% customer satisfaction score', 'task', NOW() - INTERVAL '4 hours'),
  (v_user_id, v_nova_id, 'Nova', 'FAQ document created — 10 answers ready to publish', 'task', NOW() - INTERVAL '4 hours 10 minutes'),
  (v_user_id, v_aria_id, 'Aria', 'Sent 11 follow-up emails — 3 replies received, 2 meetings booked', 'task', NOW() - INTERVAL '8 hours'),
  (v_user_id, v_max_id,  'Max',  'Usage analysis complete — overnight users have 3x retention rate', 'task', NOW() - INTERVAL '6 hours'),
  (v_user_id, v_aria_id, 'Aria', 'Wrote 25 personalized cold emails — avg open rate projected 41%', 'task', NOW() - INTERVAL '14 hours'),
  (v_user_id, v_max_id,  'Max',  'Community map built — identified top 8 channels to reach target users', 'task', NOW() - INTERVAL '16 hours'),
  (v_user_id, v_aria_id, 'Aria', 'Found 25 qualified Series A founders — all verified via LinkedIn + Crunchbase', 'task', NOW() - INTERVAL '18 hours'),
  (v_user_id, v_max_id,  'Max',  'Competitive analysis complete — 12 competitors researched, 5 opportunities found', 'task', NOW() - INTERVAL '22 hours'),
  (v_user_id, v_nova_id, 'Nova', 'Employee created and started onboarding', 'system', NOW() - INTERVAL '4 days'),
  (v_user_id, v_max_id,  'Max',  'Employee created and started onboarding', 'system', NOW() - INTERVAL '5 days'),
  (v_user_id, v_aria_id, 'Aria', 'Employee created and started onboarding', 'system', NOW() - INTERVAL '6 days');

END $$;

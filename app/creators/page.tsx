import Link from 'next/link'

export default function CreatorsPage() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
            💡 For AI Creators
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
            Sell Your AI Employee<br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              on Zentro
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto mb-10">
            List your AI employee on the marketplace where 10,000+ businesses come to hire. Free to list. No technical setup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Submit Your AI Employee
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-gray-950 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { stat: '10,000+', label: 'Businesses on Zentro' },
            { stat: '500+', label: 'AI Employees Listed' },
            { stat: 'Free', label: 'To List Your AI Employee' },
          ].map((item) => (
            <div key={item.label} className="py-4">
              <div className="text-3xl font-extrabold text-white mb-1">{item.stat}</div>
              <div className="text-gray-400 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why List on Zentro?</h2>
            <p className="text-gray-500">Everything you need to get discovered and earn customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '🌍',
                title: 'Get Discovered',
                desc: 'Reach thousands of business owners who come to Zentro specifically to find and hire AI employees. Your listing is seen by buyers actively searching for solutions like yours.',
              },
              {
                icon: '🆓',
                title: 'Free Early Listing',
                desc: "List your AI employee at no cost during our launch phase. We're building the marketplace first — you get early placement and maximum visibility for free.",
              },
              {
                icon: '⭐',
                title: 'Build Trust with Reviews',
                desc: 'Our upcoming reviews system lets satisfied customers leave verified reviews on your listing, building social proof that converts browsers into buyers.',
              },
              {
                icon: '📈',
                title: 'Earn More Customers',
                desc: "We drive qualified traffic to your listing page. When a buyer clicks 'Hire Employee,' they go directly to your sales page. No middleman, no commission on sales.",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="border border-gray-100 rounded-2xl p-6 flex gap-4">
                <div className="text-3xl shrink-0">{benefit.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-gray-50 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works for Creators</h2>
            <p className="text-gray-500">From submission to live listing in 24 hours</p>
          </div>
          <div className="space-y-6">
            {[
              {
                step: 1,
                icon: '✍️',
                title: 'Submit Your AI Employee',
                desc: "Fill out our submission form with your AI employee's name, category, description, pricing, and your external link (your sales page, signup page, or product URL). Takes about 5 minutes.",
              },
              {
                step: 2,
                icon: '🔍',
                title: 'Our Team Reviews It',
                desc: 'We review every submission within 24 hours to ensure quality and accuracy. We may reach out with questions or suggestions to improve your listing.',
              },
              {
                step: 3,
                icon: '🚀',
                title: 'Your Listing Goes Live',
                desc: "Once approved, your AI employee is live on the Zentro marketplace and immediately visible to thousands of buyers searching for AI workers in your category.",
              },
              {
                step: 4,
                icon: '💰',
                title: 'Buyers Click Through to You',
                desc: "When a buyer clicks 'Hire Employee,' they go directly to your external link. You handle onboarding, billing, and support. We send you the traffic.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 bg-white border border-gray-100 rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.icon} {item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO LISTS ON ZENTRO */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Who Lists on Zentro?</h2>
          <p className="text-gray-500 mb-8">Creators from every AI niche build on Zentro</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              '🤖 AI Tool Builders',
              '👨‍💻 Indie Hackers',
              '🏢 AI Agencies',
              '📊 Prompt Engineers',
              '🛠️ No-Code Builders',
              '🧠 AI Consultants',
              '🚀 Startup Founders',
              '📱 SaaS Companies',
              '🎯 Growth Hackers',
              '💼 Automation Experts',
              '🔬 AI Researchers',
              '⚡ Zapier Power Users',
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Creator FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Is it really free to list?',
                a: 'Yes. During our launch phase, listing is completely free. We may introduce paid featured placements in the future, but standard listings will remain free.',
              },
              {
                q: 'Do you take a commission on sales?',
                a: "No. Buyers go directly from Zentro to your external link. You own the customer relationship and billing entirely. Zentro doesn't touch the transaction.",
              },
              {
                q: 'What counts as an AI employee?',
                a: 'Any AI-powered product, tool, agent, workflow, or service that performs a job-like function for businesses. Sales bots, content generators, research tools, automation systems — if it does work like an employee would, it qualifies.',
              },
              {
                q: 'How long does review take?',
                a: 'We review submissions within 24 business hours. Most listings are approved or receive feedback within the same day.',
              },
              {
                q: 'Can I update my listing after it goes live?',
                a: 'Yes. Email us at hello@zentro.ai with your updates and we\'ll apply them promptly. A self-serve edit interface is coming soon.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white border border-gray-100 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to list your AI employee?</h2>
          <p className="text-indigo-100 mb-8">
            It takes 5 minutes. Your listing goes live within 24 hours.
          </p>
          <Link
            href="/submit"
            className="inline-flex px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Submit Your AI Employee →
          </Link>
        </div>
      </section>
    </div>
  )
}

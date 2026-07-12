import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Database, Cookie, UserCheck, Mail, Phone, MapPin, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Hitayu Surgical Clinic',
  description: 'Privacy Policy for Hitayu Surgical Clinic. Learn how we collect, use and protect your personal information.',
}

const sections = [
  {
    id: 'information-collection',
    icon: Database,
    color: '#2B7ABB',
    bg: 'bg-[#e6f0fa]',
    title: 'Information Collection',
    content: [
      {
        heading: 'Personal Information',
        text: 'When you book an appointment, contact us, or use our website, we may collect personal information including your name, phone number, email address, and any health information you voluntarily provide to facilitate your consultation.',
      },
      {
        heading: 'Automatically Collected Information',
        text: 'We may collect non-personally identifiable information automatically when you visit our website, including your browser type, device type, pages visited, time spent on pages, and the referring URL. This helps us improve our website experience.',
      },
      {
        heading: 'Medical Information',
        text: 'Any medical or health-related information you share with us — whether through our appointment form, phone, or in-clinic consultation — is treated with the highest level of confidentiality in accordance with applicable Indian healthcare privacy standards.',
      },
    ],
  },
  {
    id: 'data-usage',
    icon: Shield,
    color: '#9BD22A',
    bg: 'bg-[#f0f9e1]',
    title: 'Data Usage',
    content: [
      {
        heading: 'How We Use Your Information',
        text: 'We use the information we collect to schedule and confirm appointments, communicate with you about your consultation, respond to your queries, and provide the healthcare services you request.',
      },
      {
        heading: 'Communications',
        text: 'We may use your contact details to send appointment reminders, follow-up messages, or important clinic updates. We will never send unsolicited marketing messages without your consent.',
      },
      {
        heading: 'We Do Not Sell Your Data',
        text: 'Hitayu Surgical Clinic does not sell, trade, or rent your personal information to third parties. Your data is used solely to provide and improve our medical services to you.',
      },
    ],
  },
  {
    id: 'cookies',
    icon: Cookie,
    color: '#2B7ABB',
    bg: 'bg-[#e6f0fa]',
    title: 'Cookies',
    content: [
      {
        heading: 'What Are Cookies',
        text: 'Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and understand how visitors interact with our site.',
      },
      {
        heading: 'How We Use Cookies',
        text: 'We use essential cookies to ensure the website functions correctly and analytics cookies to understand visitor behaviour and improve our content. We do not use advertising or tracking cookies.',
      },
      {
        heading: 'Managing Cookies',
        text: 'You can control and delete cookies through your browser settings at any time. Disabling cookies may affect the functionality of certain parts of our website.',
      },
    ],
  },
  {
    id: 'user-rights',
    icon: UserCheck,
    color: '#9BD22A',
    bg: 'bg-[#f0f9e1]',
    title: 'User Rights',
    content: [
      {
        heading: 'Access & Correction',
        text: 'You have the right to request access to the personal information we hold about you, and to request corrections if any information is inaccurate or incomplete.',
      },
      {
        heading: 'Deletion',
        text: 'You may request deletion of your personal data from our records at any time, subject to any legal or medical record-keeping obligations that may apply.',
      },
      {
        heading: 'Withdrawal of Consent',
        text: 'Where you have provided consent for us to contact you, you may withdraw that consent at any time by contacting us directly. Withdrawal will not affect the lawfulness of any processing carried out before your withdrawal.',
      },
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Header Nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/df01whs60/image/upload/v1782033745/Welcome_to_FigJam-removebg-preview_vwsbys.png"
              alt="Hitayu Surgical Clinic Logo"
              className="h-9 w-auto object-contain"
            />
            <div>
              <div className="font-bold text-gray-900 text-sm">Hitayu Surgical</div>
              <div className="text-xs text-[#9BD22A] font-semibold">Clinic</div>
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-[#2B7ABB] font-semibold hover:text-[#1e5a8a] transition"
          >
            <span>Back to Home</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#e6f0fa] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 bg-[#2B7ABB]/10 text-[#2B7ABB] px-4 py-1.5 rounded-full border border-[#2B7ABB]/20 mb-5">
            <div className="w-2 h-2 bg-[#2B7ABB] rounded-full"></div>
            <span className="text-xs sm:text-sm font-semibold tracking-wider">LEGAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            We are committed to protecting your privacy. This policy explains how Hitayu Surgical Clinic collects, uses, and safeguards your personal information.
          </p>
          <p className="text-gray-400 text-sm mt-4">Last updated: July 2026</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h2 className="font-bold text-gray-900 text-sm tracking-wider mb-4">ON THIS PAGE</h2>
                <nav className="space-y-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="flex items-center gap-2 text-gray-500 text-sm hover:text-[#2B7ABB] transition py-1 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#2B7ABB] transition flex-shrink-0"></div>
                      {s.title}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    className="flex items-center gap-2 text-gray-500 text-sm hover:text-[#2B7ABB] transition py-1 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#2B7ABB] transition flex-shrink-0"></div>
                    Contact Information
                  </a>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 ${section.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <section.icon size={20} style={{ color: section.color }} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="space-y-5">
                  {section.content.map((item) => (
                    <div key={item.heading} className="bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.heading}</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Contact Section */}
            <section id="contact" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#e6f0fa] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-[#2B7ABB]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Contact Information</h2>
              </div>
              <div className="bg-gradient-to-br from-[#2B7ABB] to-[#1e5a8a] rounded-2xl p-6 sm:p-8 text-white">
                <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed">
                  If you have any questions about this Privacy Policy, or wish to exercise your rights regarding your personal data, please contact us using the details below.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <a href="mailto:hitayusurgicals2026@gmail.com" className="flex items-start gap-3 bg-white/10 rounded-xl p-4 hover:bg-white/20 transition">
                    <Mail size={18} className="text-[#9BD22A] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-white/60 mb-0.5">Email</div>
                      <div className="text-sm font-semibold text-white break-all">hitayusurgicals2026@gmail.com</div>
                    </div>
                  </a>
                  <a href="tel:+918447119161" className="flex items-start gap-3 bg-white/10 rounded-xl p-4 hover:bg-white/20 transition">
                    <Phone size={18} className="text-[#9BD22A] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-white/60 mb-0.5">Phone</div>
                      <div className="text-sm font-semibold text-white">84471 19161</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                    <MapPin size={18} className="text-[#9BD22A] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-white/60 mb-0.5">Address</div>
                      <div className="text-sm font-semibold text-white leading-relaxed">Prem Nagar, Najafgarh, New Delhi – 110043</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-slate-500 text-xs sm:text-sm">© 2026 Hitayu Surgical Clinic. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-[#9BD22A] text-xs sm:text-sm font-medium hover:underline">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-slate-400 text-xs sm:text-sm hover:text-[#9BD22A] transition">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Calendar, AlertTriangle, User, Lock, Mail, Phone, MapPin, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Hitayu Surgical Clinic',
  description: 'Terms and Conditions for using the Hitayu Surgical Clinic website and booking appointments.',
}

const sections = [
  {
    id: 'website-usage',
    icon: FileText,
    color: '#2B7ABB',
    bg: 'bg-[#e6f0fa]',
    title: 'Website Usage',
    content: [
      {
        heading: 'Acceptance of Terms',
        text: 'By accessing and using the Hitayu Surgical Clinic website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.',
      },
      {
        heading: 'Permitted Use',
        text: 'This website is provided for informational purposes and to facilitate appointment bookings. You agree to use it only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the website.',
      },
      {
        heading: 'Accuracy of Information',
        text: 'While we strive to keep all information on this website accurate and up to date, we make no warranties regarding the completeness, accuracy, or reliability of any content. Medical information on this site is general in nature and should not replace professional medical advice.',
      },
    ],
  },
  {
    id: 'appointment-terms',
    icon: Calendar,
    color: '#9BD22A',
    bg: 'bg-[#f0f9e1]',
    title: 'Appointment Terms',
    content: [
      {
        heading: 'Booking an Appointment',
        text: 'Submitting an appointment request through our website, phone, or WhatsApp does not guarantee a confirmed appointment until you receive an explicit confirmation from our clinic team. We will contact you to confirm within clinic hours.',
      },
      {
        heading: 'Cancellation & Rescheduling',
        text: 'If you need to cancel or reschedule an appointment, please notify us as early as possible — ideally at least 24 hours in advance — so we can offer the slot to another patient. Repeated no-shows may affect future booking priority.',
      },
      {
        heading: 'Consultation Scope',
        text: 'An appointment at Hitayu Surgical Clinic constitutes a medical consultation, not a second opinion or emergency service. For medical emergencies, please contact emergency services (112) or visit the nearest hospital immediately.',
      },
    ],
  },
  {
    id: 'medical-disclaimer',
    icon: AlertTriangle,
    color: '#2B7ABB',
    bg: 'bg-[#e6f0fa]',
    title: 'Medical Disclaimer',
    content: [
      {
        heading: 'Not a Substitute for Professional Advice',
        text: 'The health and medical information provided on this website — including descriptions of conditions, treatments, and procedures — is for general informational purposes only. It is not intended to be a substitute for professional medical diagnosis, advice, or treatment.',
      },
      {
        heading: 'Individual Results May Vary',
        text: 'Testimonials and case references on this website represent individual experiences. Medical outcomes vary based on a patient\'s unique health profile, and no specific result should be expected or implied from content on this website.',
      },
      {
        heading: 'Emergency Situations',
        text: 'If you are experiencing a medical emergency, do not use this website to seek help. Call emergency services (112) or proceed immediately to the nearest hospital emergency department.',
      },
    ],
  },
  {
    id: 'user-responsibilities',
    icon: User,
    color: '#9BD22A',
    bg: 'bg-[#f0f9e1]',
    title: 'User Responsibilities',
    content: [
      {
        heading: 'Accurate Information',
        text: 'When submitting appointment requests or contacting us, you agree to provide accurate, complete, and current information. Providing false or misleading information may result in the cancellation of your appointment.',
      },
      {
        heading: 'Respectful Conduct',
        text: 'You agree to interact with clinic staff — in person, by phone, or digitally — with respect and courtesy. Abusive, threatening, or inappropriate behaviour may result in refusal of service.',
      },
      {
        heading: 'Prohibited Activities',
        text: 'You must not attempt to gain unauthorised access to any part of our website, disrupt its operation, transmit harmful or malicious content, or misuse any information obtained through this website.',
      },
    ],
  },
  {
    id: 'intellectual-property',
    icon: Lock,
    color: '#2B7ABB',
    bg: 'bg-[#e6f0fa]',
    title: 'Intellectual Property',
    content: [
      {
        heading: 'Ownership',
        text: 'All content on this website — including text, images, graphics, logos, and the overall design — is the property of Hitayu Surgical Clinic or its content providers and is protected under applicable Indian and international copyright laws.',
      },
      {
        heading: 'Permitted Use',
        text: 'You may view, print, and download content from this website for personal, non-commercial use only. Any reproduction, distribution, modification, or commercial use of any content without prior written consent from Hitayu Surgical Clinic is strictly prohibited.',
      },
      {
        heading: 'Trademarks',
        text: 'The Hitayu Surgical Clinic name, logo, and all related marks are trademarks of the clinic. Unauthorised use of these marks is not permitted and may constitute an infringement of trademark rights.',
      },
    ],
  },
]

export default function TermsAndConditionsPage() {
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
      <div className="bg-gradient-to-br from-[#f0f9e1] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 bg-[#9BD22A]/10 text-[#2B7ABB] px-4 py-1.5 rounded-full border border-[#9BD22A]/20 mb-5">
            <div className="w-2 h-2 bg-[#9BD22A] rounded-full"></div>
            <span className="text-xs sm:text-sm font-semibold tracking-wider">LEGAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            Please read these terms carefully before using our website or booking an appointment at Hitayu Surgical Clinic.
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
                <div className="w-10 h-10 bg-[#f0f9e1] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-[#9BD22A]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Contact Information</h2>
              </div>
              <div className="bg-gradient-to-br from-[#f0f9e1] to-white rounded-2xl p-6 sm:p-8 border border-[#9BD22A]/20">
                <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                  If you have any questions about these Terms and Conditions, please contact us using the details below.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <a href="mailto:hitayusurgicals2026@gmail.com" className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:border-[#9BD22A]/40 hover:shadow-sm transition">
                    <Mail size={18} className="text-[#2B7ABB] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">Email</div>
                      <div className="text-sm font-semibold text-gray-900 break-all">hitayusurgicals2026@gmail.com</div>
                    </div>
                  </a>
                  <a href="tel:+918447119161" className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:border-[#9BD22A]/40 hover:shadow-sm transition">
                    <Phone size={18} className="text-[#2B7ABB] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">Phone</div>
                      <div className="text-sm font-semibold text-gray-900">84471 19161</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                    <MapPin size={18} className="text-[#2B7ABB] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">Address</div>
                      <div className="text-sm font-semibold text-gray-900 leading-relaxed">Prem Nagar, Najafgarh, New Delhi – 110043</div>
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
            <Link href="/privacy-policy" className="text-slate-400 text-xs sm:text-sm hover:text-[#9BD22A] transition">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-[#9BD22A] text-xs sm:text-sm font-medium hover:underline">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

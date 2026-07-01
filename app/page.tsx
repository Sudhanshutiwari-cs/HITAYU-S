'use client';

import { Phone, Calendar, PhoneCall, Heart, Leaf, Shield, CheckCircle, User, Check, Zap, Scissors, Stethoscope, Activity, ArrowRight, Briefcase, MapPin, Clock, TrendingUp, Search, Pill, Syringe, Star, Quote, ChevronDown, Navigation, MessageCircle, ChevronRight, Mail, Award, Users, Sparkles, Droplets, Brain } from 'lucide-react';
import { useState } from 'react';

function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    condition: '',
    preferredDate: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({ fullName: '', phone: '', condition: '', preferredDate: '', message: '' });
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#9BD22A]/20">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[#9BD22A] rounded-full flex items-center justify-center">
          <Calendar className="text-white" size={24} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Book Appointment</h3>
      </div>

      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-16 h-16 bg-[#f0f9e1] rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="text-[#9BD22A]" size={36} />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Appointment Requested!</h4>
          <p className="text-gray-600 mb-6">We&apos;ve received your request and will confirm within a few hours during clinic hours.</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-[#2B7ABB] font-semibold underline underline-offset-2 hover:text-[#1e5a8a] transition"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2B7ABB] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9BD22A] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9BD22A] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Health Concern</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2B7ABB] focus:border-transparent text-gray-500 bg-white"
            >
              <option value="">Select your condition</option>
              <option value="piles">Piles (Hemorrhoids)</option>
              <option value="fissure">Anal Fissure</option>
              <option value="fistula">Fistula</option>
              <option value="warts">Genital Warts</option>
              <option value="pilonidal">Pilonidal Sinus</option>
              <option value="hernia">Hernia</option>
              <option value="hydrocele">Hydrocele</option>
              <option value="skin">Skin &amp; Cosmetic Procedures</option>
              <option value="pain">Pain Management</option>
              <option value="gi">Gastrointestinal Problems</option>
              <option value="migraine">Migraine</option>
              <option value="wound">Wound Management</option>
              <option value="general">General Surgical Conditions</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2B7ABB] focus:border-transparent text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your symptoms or any specific concerns..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2B7ABB] focus:border-transparent resize-none"
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#9BD22A] text-gray-900 py-3 rounded-full font-bold hover:bg-[#7fb024] transition flex items-center justify-center gap-2 shadow-lg shadow-[#9BD22A]/25 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Calendar size={18} />
            {status === 'loading' ? 'Sending...' : 'Request Appointment'}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Your information is confidential and used only for appointment purposes.
          </p>
        </form>
      )}
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is the treatment for piles?",
      answer: "We offer both conservative and advanced surgical treatments for piles. Conservative treatments include dietary changes, Ayurvedic therapies, and medications. For severe cases, we perform minimally invasive surgical procedures with faster recovery and minimal pain."
    },
    {
      question: "Do all fissures require surgery?",
      answer: "Most fissures respond well to conservative treatment including dietary modifications, topical medications, and Ayurvedic therapies. Surgical options are available for chronic cases that don't respond to conservative treatment."
    },
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment by clicking the 'Book Appointment' button on our website, calling us at 84471 19161, or visiting our clinic directly. We offer flexible scheduling to accommodate your needs."
    },
    {
      question: "What surgical services are available?",
      answer: "We provide comprehensive surgical services including hemorrhoid treatment, fissure management, fistula repair, hernia repairs, appendicitis treatment, and other general surgical procedures using minimally invasive techniques."
    },
    {
      question: "Can Ayurveda help alongside surgical treatment?",
      answer: "Yes, our integrated approach combines modern surgical expertise with Ayurvedic healing principles. This combination helps in faster recovery, better pain management, and long-term wellness."
    },
    {
      question: "How long is recovery after treatment?",
      answer: "Recovery time varies depending on the treatment type. Conservative treatments typically show improvement within 2-4 weeks. After minimally invasive surgery, most patients can resume normal activities within 1-2 weeks with proper post-treatment care."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#f0f9e1] transition"
          >
            <span className="text-left font-semibold text-gray-900">{faq.question}</span>
            <ChevronDown
              size={20}
              className={`text-[#9BD22A] flex-shrink-0 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 bg-[#f0f9e1] border-t border-[#9BD22A]/20">
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HitayuSurgicalClinic() {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/df01whs60/image/upload/v1782033745/Welcome_to_FigJam-removebg-preview_vwsbys.png"
              alt="Hitayu Surgical Clinic Logo"
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-700 hover:text-[#2B7ABB] text-sm font-medium transition">
              About
            </a>
            <a href="#conditions" className="text-gray-700 hover:text-[#9BD22A] text-sm font-medium transition">
              Conditions
            </a>
            <a href="#services" className="text-gray-700 hover:text-[#2B7ABB] text-sm font-medium transition">
              Services
            </a>
            <a href="#why-us" className="text-gray-700 hover:text-[#2B7ABB] text-sm font-medium transition">
              Why Us
            </a>
            <a href="#treatment" className="text-gray-700 hover:text-[#2B7ABB] text-sm font-medium transition">
              Treatment
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-[#9BD22A] text-sm font-medium transition">
              Testimonials
            </a>
            <a href="#location" className="text-gray-700 hover:text-[#2B7ABB] text-sm font-medium transition">
              Location
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <a href="tel:+918447119161" className="hidden sm:flex items-center gap-2 text-gray-700 font-medium hover:text-[#9BD22A] transition">
              <Phone size={18} className="text-[#9BD22A]" />
              <span>84471 19161</span>
            </a>
            <a href="#book-appointment" className="bg-[#2B7ABB] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#1e5a8a] transition shadow-lg shadow-[#2B7ABB]/25">
              Book Appointment
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#e6f0fa] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Tagline */}
              <div className="inline-flex items-center gap-2 bg-[#9BD22A]/10 text-[#2B7ABB] px-4 py-1.5 rounded-full mb-6 border border-[#9BD22A]/20">
                <div className="w-2 h-2 bg-[#9BD22A] rounded-full"></div>
                <span className="text-sm font-semibold">NAJAFARGARH&apos;S TRUSTED SURGICAL CLINIC</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Expert Surgical Care with the{' '}
                <span className="relative inline-block">
                  <span className="text-[#9BD22A]">Healing Wisdom</span>
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#9BD22A] rounded-full"></span>
                </span>{' '}
                of Ayurveda
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
                Specialized treatment for Piles, Fissure, Fistula and Surgical Conditions with a patient-first approach.
              </p>

              {/* Phone Number & Clinic Timing */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-[#f0f9e1] px-4 py-2 rounded-full border border-[#9BD22A]/20">
                  <Phone size={18} className="text-[#9BD22A]" />
                  <span className="text-gray-900 font-semibold text-sm">84471 19161</span>
                </div>
                <div className="flex items-center gap-2 bg-[#e6f0fa] px-4 py-2 rounded-full border border-[#2B7ABB]/20">
                  <Clock size={18} className="text-[#2B7ABB]" />
                  <span className="text-gray-900 font-semibold text-sm">9AM – 7PM</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-8">
                <a href="#book-appointment" className="bg-[#2B7ABB] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#1e5a8a] transition flex items-center gap-2 shadow-lg shadow-[#2B7ABB]/25 text-sm">
                  <Calendar size={16} />
                  Book Appointment
                </a>
                <a href="tel:+918447119161" className="border-2 border-[#9BD22A] text-[#9BD22A] px-5 py-2.5 rounded-full font-semibold hover:bg-[#f0f9e1] transition flex items-center gap-2 text-sm">
                  <PhoneCall size={16} />
                  Call Now
                </a>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-[#2B7ABB]/20 rounded-2xl p-4 hover:shadow-md hover:border-[#2B7ABB]/50 transition">
                  <div className="flex items-start gap-2">
                    <Heart className="text-[#2B7ABB] mt-0.5 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Experienced Care</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#9BD22A]/20 rounded-2xl p-4 hover:shadow-md hover:border-[#9BD22A]/50 transition">
                  <div className="flex items-start gap-2">
                    <Shield className="text-[#9BD22A] mt-0.5 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Surgical Expertise</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#9BD22A]/20 rounded-2xl p-4 hover:shadow-md hover:border-[#9BD22A]/50 transition">
                  <div className="flex items-start gap-2">
                    <Leaf className="text-[#9BD22A] mt-0.5 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Ayurvedic Support</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#2B7ABB]/20 rounded-2xl p-4 hover:shadow-md hover:border-[#2B7ABB]/50 transition">
                  <div className="flex items-start gap-2">
                    <Shield className="text-[#2B7ABB] mt-0.5 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Personalized Treatment</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div>
              <div className="bg-gradient-to-br from-[#2B7ABB] to-[#1e5a8a] rounded-3xl p-6 md:p-8 text-white shadow-xl">
                {/* Doctor Info */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/20">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/30">
                    <img
                      src="https://res.cloudinary.com/df01whs60/image/upload/v1782921937/11fbddac-ad32-43c6-ad41-5af489ea091c.png"
                      alt="Dr. Hitesh Dagar"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-base">Dr. Hitesh Dagar</div>
                    <div className="text-white/70 text-xs">BAMS, MS (Surgery)</div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/10 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">06</div>
                    <div className="text-white/70 text-xs">Years Experience</div>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">1000+</div>
                    <div className="text-white/70 text-xs">Patients Treated</div>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">2000+</div>
                    <div className="text-white/70 text-xs">Surgeries Done</div>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">98%</div>
                    <div className="text-white/70 text-xs">Success Rate</div>
                  </div>
                </div>

                {/* Calling Number & Timing */}
                <div className="space-y-3 mb-6">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <div className="flex items-start gap-2">
                      <Phone size={20} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm mb-0.5">Calling No.</div>
                        <div className="text-white/70 text-xs">84471 19161</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <div className="flex items-start gap-2">
                      <Clock size={20} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm mb-0.5">Clinic Timing</div>
                        <div className="text-white/70 text-xs">9AM – 7PM</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ayurvedic Integration */}
                <div className="bg-white/10 rounded-2xl p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Leaf size={20} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm mb-0.5">Ayurvedic Integration</div>
                      <div className="text-white/70 text-xs">Modern surgery + traditional healing</div>
                    </div>
                  </div>
                </div>

                {/* Accepting Appointments */}
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} />
                  <span className="text-xs font-medium">Accepting Appointments Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="text-[#9BD22A] font-semibold text-sm mb-4 tracking-wider">ABOUT US</div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Compassionate Surgical Care for Every Patient
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Hitayu Surgical Clinic combines modern surgical expertise with the healing principles of Ayurveda to provide comprehensive and patient-centered healthcare. We focus on accurate diagnosis, effective treatment and long-term wellness while ensuring patient comfort and confidence throughout their treatment journey.
              </p>

              <div className="space-y-4 mb-12">
                <div className="flex items-start gap-3">
                  <Check className="text-[#2B7ABB] mt-1 flex-shrink-0" size={24} />
                  <span className="text-gray-700 font-medium">Accurate diagnosis with modern surgical techniques</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-[#9BD22A] mt-1 flex-shrink-0" size={24} />
                  <span className="text-gray-700 font-medium">Ayurvedic healing principles integrated into care</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-[#2B7ABB] mt-1 flex-shrink-0" size={24} />
                  <span className="text-gray-700 font-medium">Patient comfort prioritized throughout treatment</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-[#9BD22A] mt-1 flex-shrink-0" size={24} />
                  <span className="text-gray-700 font-medium">Long-term wellness and follow-up support</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-bold text-[#9BD22A] mb-2">1000+</div>
                  <div className="text-gray-600 text-sm">Patients Treated</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#2B7ABB] mb-2">2000+</div>
                  <div className="text-gray-600 text-sm">Surgeries</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#9BD22A] mb-2">06</div>
                  <div className="text-gray-600 text-sm">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-[#f0f9e1] rounded-3xl p-8 border border-[#9BD22A]/30">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-[#2B7ABB]/30 bg-gray-100">
                    <img
                      src="https://res.cloudinary.com/df01whs60/image/upload/v1782921937/11fbddac-ad32-43c6-ad41-5af489ea091c.png"
                      alt="Dr. Hitesh Dagar - Hitayu Surgical Clinic"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#9BD22A] rounded-full flex items-center justify-center text-white border-4 border-[#f0f9e1]">
                    <Check size={16} />
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Dr. Hitesh Dagar</h3>
                <div className="text-[#9BD22A] font-semibold mb-1">BAMS, MS (Surgery)</div>
                <div className="text-gray-600 text-sm">Specialist in Colorectal &amp; GI Surgery</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-6 text-center border border-[#2B7ABB]/20 shadow-sm">
                  <Award className="text-[#2B7ABB] mx-auto mb-2" size={28} />
                  <div className="text-sm font-semibold text-gray-900">BAMS, MS Surgery</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center border border-[#9BD22A]/20 shadow-sm">
                  <Users className="text-[#9BD22A] mx-auto mb-2" size={28} />
                  <div className="text-sm font-semibold text-gray-900">1000+ Patients</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 mb-8 border border-[#9BD22A]/20">
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  &ldquo;Our goal is to give every patient the same quality of care we would give to our own family — with compassion, precision, and a commitment to lasting wellness.&rdquo;
                </p>
              </div>

              <button className="w-full bg-[#9BD22A] text-gray-900 py-3 rounded-full font-bold hover:bg-[#7fb024] transition flex items-center justify-center gap-2 shadow-lg shadow-[#9BD22A]/25">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Available for Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Gallery Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="text-[#2B7ABB] font-semibold text-sm mb-2 tracking-wider">OUR CLINIC</div>
            <h2 className="text-3xl font-bold text-gray-900">A Look Inside Hitayu Surgical Clinic</h2>
          </div>

          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridTemplateRows: 'repeat(2, 240px)',
            }}
          >
            {/* Image 1 — top-left */}
            <div className="relative overflow-hidden rounded-xl bg-gray-100 group" style={{ gridColumn: '1', gridRow: '1' }}>
              <img src="https://res.cloudinary.com/df01whs60/image/upload/v1782922276/76ba585c-8475-4638-b24c-fac8d7219dc6.png" alt="Hitayu Surgical Clinic" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-semibold tracking-wide">Clinic</span>
              </div>
            </div>

            {/* Image 2 — large centre, spans 2 cols + 2 rows */}
            <div className="relative overflow-hidden rounded-xl bg-gray-100 group" style={{ gridColumn: '2 / span 2', gridRow: '1 / span 2' }}>
              <img src="https://res.cloudinary.com/df01whs60/image/upload/v1782922182/a9aa3d65-b66a-48d2-8451-34a9b7f4bbb7.png" alt="Hitayu Surgical Clinic" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-semibold tracking-wide">Hitayu Surgical Clinic</span>
              </div>
            </div>

            {/* Image 3 — top-right */}
            <div className="relative overflow-hidden rounded-xl bg-gray-100 group" style={{ gridColumn: '4', gridRow: '1' }}>
              <img src="https://res.cloudinary.com/df01whs60/image/upload/v1782922389/44efdec6-2e26-4698-b56e-05646c6b02d8.png" alt="Hitayu Surgical Clinic" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-semibold tracking-wide">Clinic</span>
              </div>
            </div>

            {/* Image 4 — bottom-left */}
            <div className="relative overflow-hidden rounded-xl bg-gray-100 group" style={{ gridColumn: '1', gridRow: '2' }}>
              <img src="https://res.cloudinary.com/df01whs60/image/upload/v1782922326/081e1dcd-306d-4131-8c52-3ae392e876bc.png" alt="Hitayu Surgical Clinic" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-semibold tracking-wide">Clinic</span>
              </div>
            </div>

            {/* Image 5 — bottom-right */}
            <div className="relative overflow-hidden rounded-xl bg-gray-100 group" style={{ gridColumn: '4', gridRow: '2' }}>
              <img src="https://res.cloudinary.com/df01whs60/image/upload/v1782922458/dc4cc3b7-faf0-4a8f-8192-b2924024da02.png" alt="Hitayu Surgical Clinic" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-semibold tracking-wide">Clinic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions We Treat Section */}
      <section id="conditions" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="text-[#9BD22A] font-semibold text-sm mb-4 tracking-wider">CONDITIONS WE TREAT</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Expert Care for Your Health Concerns
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive surgical and Ayurvedic treatment for a range of conditions — with a focus on accurate diagnosis and lasting recovery.
            </p>
          </div>

          {/* Conditions Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#2B7ABB]/30 transition">
              <div className="w-16 h-16 bg-[#e6f0fa] rounded-full flex items-center justify-center mb-6">
                <Zap className="text-[#2B7ABB]" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Piles (Hemorrhoids)</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Swollen blood vessels in and around the rectum and anus. We offer both conservative and advanced surgical treatments for lasting relief.
              </p>
              <a href="#book-appointment" className="text-[#2B7ABB] font-semibold flex items-center gap-2 hover:gap-3 transition">
                Book Consultation <ArrowRight size={18} />
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#9BD22A]/30 transition">
              <div className="w-16 h-16 bg-[#f0f9e1] rounded-full flex items-center justify-center mb-6">
                <Scissors className="text-[#9BD22A]" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Anal Fissure</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A small cut or tear in the lining of the anus. Most fissures respond well to conservative treatment; surgical options available for chronic cases.
              </p>
              <a href="#book-appointment" className="text-[#9BD22A] font-semibold flex items-center gap-2 hover:gap-3 transition">
                Book Consultation <ArrowRight size={18} />
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#2B7ABB]/30 transition">
              <div className="w-16 h-16 bg-[#e6f0fa] rounded-full flex items-center justify-center mb-6">
                <Stethoscope className="text-[#2B7ABB]" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fistula</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                An abnormal channel between the anal canal and the skin surface. Our minimally invasive techniques ensure faster recovery and lower recurrence.
              </p>
              <a href="#book-appointment" className="text-[#2B7ABB] font-semibold flex items-center gap-2 hover:gap-3 transition">
                Book Consultation <ArrowRight size={18} />
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#9BD22A]/30 transition">
              <div className="w-16 h-16 bg-[#f0f9e1] rounded-full flex items-center justify-center mb-6">
                <Activity className="text-[#9BD22A]" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rectal Disorders</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Including rectal prolapse, rectal bleeding, and other colorectal conditions managed with expert surgical and medical care.
              </p>
              <a href="#book-appointment" className="text-[#9BD22A] font-semibold flex items-center gap-2 hover:gap-3 transition">
                Book Consultation <ArrowRight size={18} />
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#2B7ABB]/30 transition">
              <div className="w-16 h-16 bg-[#e6f0fa] rounded-full flex items-center justify-center mb-6">
                <Shield className="text-[#2B7ABB]" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">General Surgical Conditions</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hernia repairs, appendicitis, gallbladder conditions, and other surgical needs handled with modern techniques and patient safety.
              </p>
              <a href="#book-appointment" className="text-[#2B7ABB] font-semibold flex items-center gap-2 hover:gap-3 transition">
                Book Consultation <ArrowRight size={18} />
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#9BD22A]/30 transition">
              <div className="w-16 h-16 bg-[#f0f9e1] rounded-full flex items-center justify-center mb-6">
                <Heart className="text-[#9BD22A]" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chronic Pain Management</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Integrated approach to managing chronic abdominal and anorectal pain using both surgical and Ayurvedic healing principles.
              </p>
              <a href="#book-appointment" className="text-[#9BD22A] font-semibold flex items-center gap-2 hover:gap-3 transition">
                Book Consultation <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="text-[#2B7ABB] font-semibold text-sm mb-4 tracking-wider">OUR SERVICES</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Surgical &amp; Medical Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Advanced techniques and personalized care across a wide range of surgical and medical treatments.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Ano-Rectal Surgery */}
            <div className="bg-gradient-to-br from-[#e6f0fa] to-white rounded-2xl p-6 border border-[#2B7ABB]/20 hover:shadow-lg hover:border-[#2B7ABB]/50 transition group">
              <div className="w-14 h-14 bg-[#2B7ABB] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Scissors className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ano-Rectal Surgery</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Genital Warts — Modern Treatment</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Piles (Hemorrhoids)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Anal Fissure</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Anal Fistula</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Pilonidal Sinus</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Incision &amp; Drainage</span>
                </li>
              </ul>
            </div>

            {/* Card 2: General Surgery */}
            <div className="bg-gradient-to-br from-[#f0f9e1] to-white rounded-2xl p-6 border border-[#9BD22A]/20 hover:shadow-lg hover:border-[#9BD22A]/50 transition group">
              <div className="w-14 h-14 bg-[#9BD22A] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Stethoscope className="text-gray-900" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">General Surgery</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#2B7ABB] flex-shrink-0 mt-0.5" size={14} />
                  <span>Hydrocele</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#2B7ABB] flex-shrink-0 mt-0.5" size={14} />
                  <span>Hernia — Advanced Repair</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#2B7ABB] flex-shrink-0 mt-0.5" size={14} />
                  <span>Phimosis &amp; Paraphimosis</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Skin & Cosmetic Procedures */}
            <div className="bg-gradient-to-br from-[#e6f0fa] to-white rounded-2xl p-6 border border-[#2B7ABB]/20 hover:shadow-lg hover:border-[#2B7ABB]/50 transition group">
              <div className="w-14 h-14 bg-[#2B7ABB] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Skin &amp; Cosmetic Procedures</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Skin Tag Removal</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Mole Removal</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Warts Removal</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Cyst Removal</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Vitiligo Treatment</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Keloid Surgery</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Corn Surgery — Advanced Techniques</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Skin Brightening</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Melasma &amp; Acne Vulgaris Treatment</span>
                </li>
              </ul>
            </div>

            {/* Card 4: Pain Management */}
            <div className="bg-gradient-to-br from-[#f0f9e1] to-white rounded-2xl p-6 border border-[#9BD22A]/20 hover:shadow-lg hover:border-[#9BD22A]/50 transition group">
              <div className="w-14 h-14 bg-[#9BD22A] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Activity className="text-gray-900" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Pain Management</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#2B7ABB] flex-shrink-0 mt-0.5" size={14} />
                  <span>Cervical Pain</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#2B7ABB] flex-shrink-0 mt-0.5" size={14} />
                  <span>Backache</span>
                </li>
              </ul>
            </div>

            {/* Card 5: Gastrointestinal Problems */}
            <div className="bg-gradient-to-br from-[#e6f0fa] to-white rounded-2xl p-6 border border-[#2B7ABB]/20 hover:shadow-lg hover:border-[#2B7ABB]/50 transition group">
              <div className="w-14 h-14 bg-[#2B7ABB] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Droplets className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Gastrointestinal Problems</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Comprehensive GI Care</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#9BD22A] flex-shrink-0 mt-0.5" size={14} />
                  <span>Digestive Health Management</span>
                </li>
              </ul>
            </div>

            {/* Card 6: Additional Services */}
            <div className="bg-gradient-to-br from-[#f0f9e1] to-white rounded-2xl p-6 border border-[#9BD22A]/20 hover:shadow-lg hover:border-[#9BD22A]/50 transition group">
              <div className="w-14 h-14 bg-[#9BD22A] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Brain className="text-gray-900" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Services</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#2B7ABB] flex-shrink-0 mt-0.5" size={14} />
                  <span>Migraine Treatment</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <CheckCircle className="text-[#2B7ABB] flex-shrink-0 mt-0.5" size={14} />
                  <span>Wound Management</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm mb-6">All services are performed with advanced techniques and personalized care plans</p>
            <a href="#book-appointment" className="bg-[#2B7ABB] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1e5a8a] transition flex items-center gap-2 mx-auto shadow-lg shadow-[#2B7ABB]/25 w-fit">
              <Calendar size={18} />
              Book Consultation for Any Service
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="text-[#2B7ABB] font-semibold text-sm mb-4 tracking-wider">WHY CHOOSE US</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Sets Hitayu Clinic Apart
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A care experience built on trust, expertise, and the belief that every patient deserves the best possible outcome.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#2B7ABB]/20 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#e6f0fa] rounded-full flex items-center justify-center mb-4">
                <Briefcase className="text-[#2B7ABB]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Modern Surgical Expertise</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Advanced minimally invasive surgical techniques with the latest medical equipment.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#9BD22A]/30 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#f0f9e1] rounded-full flex items-center justify-center mb-4">
                <Leaf className="text-[#9BD22A]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Ayurvedic Supportive Care</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Healing plant-based therapies integrated with surgery for faster, holistic recovery.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#2B7ABB]/20 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#e6f0fa] rounded-full flex items-center justify-center mb-4">
                <Heart className="text-[#2B7ABB]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Patient-Centric Treatment</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every care plan is built around your comfort, concerns, and individual health goals.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#9BD22A]/30 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#f0f9e1] rounded-full flex items-center justify-center mb-4">
                <Calendar className="text-[#9BD22A]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Personalized Recovery Plans</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tailored post-treatment guidance and diet plans to ensure long-lasting results.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#2B7ABB]/20 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#e6f0fa] rounded-full flex items-center justify-center mb-4">
                <Phone className="text-[#2B7ABB]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Affordable Consultation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Quality healthcare accessible to all — transparent pricing with no hidden costs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#2B7ABB]/20 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#e6f0fa] rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-[#2B7ABB]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Convenient Najafargh Location</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Easily accessible from Dwarka, Nangloi, and surrounding Delhi NCR areas.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#9BD22A]/20 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#f0f9e1] rounded-full flex items-center justify-center mb-4">
                <Clock className="text-[#9BD22A]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Minimal Waiting Time</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Respect for your time with scheduled appointments and efficient clinic management.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#9BD22A]/30 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#f0f9e1] rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="text-[#9BD22A]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Long-Term Health Focus</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We care about your lifelong wellness — not just the immediate surgical outcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Treatment Approach Section */}
      <section id="treatment" className="bg-[#2B7ABB] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-[#9BD22A] font-semibold text-sm mb-4 tracking-wider">OUR PROCESS</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Treatment Approach
            </h2>
            <p className="text-[#e6f0fa] text-lg max-w-2xl mx-auto">
              A clear, patient-guided journey from first consultation to full recovery.
            </p>
          </div>

          {/* Timeline Steps */}
          <div className="relative mb-12">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-[#9BD22A]/30" style={{ marginLeft: '60px', marginRight: '60px' }}></div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-5 gap-4 md:gap-0 relative z-10">
              {/* Step 1: Consultation & Diagnosis */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-[#2B7ABB] font-bold text-lg">01</div>
                    <Calendar className="text-[#2B7ABB] mx-auto" size={24} />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg text-center mb-2">Consultation &amp; Diagnosis</h3>
                <p className="text-[#e6f0fa] text-sm text-center">
                  A thorough one-on-one consultation to understand your symptoms, medical history, and health goals. We listen before we act.
                </p>
              </div>

              {/* Step 2: Detailed Assessment */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-[#9BD22A] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#9BD22A]/30">
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">02</div>
                    <Search className="text-white mx-auto" size={24} />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg text-center mb-2">Detailed Assessment</h3>
                <p className="text-[#e6f0fa] text-sm text-center">
                  Advanced diagnostic tools and clinical examination to precisely identify the condition and determine the optimal treatment pathway.
                </p>
              </div>

              {/* Step 3: Conservative Treatment */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-[#2B7ABB] font-bold text-lg">03</div>
                    <Pill className="text-[#2B7ABB] mx-auto" size={24} />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg text-center mb-2">Conservative Treatment</h3>
                <p className="text-[#e6f0fa] text-sm text-center">
                  Where possible, we begin with non-surgical methods — dietary changes, Ayurvedic therapies, medications — to resolve the condition without surgery.
                </p>
              </div>

              {/* Step 4: Advanced Surgical Care */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-[#2B7ABB] font-bold text-lg">04</div>
                    <Syringe className="text-[#2B7ABB] mx-auto" size={24} />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg text-center mb-2">Advanced Surgical Care</h3>
                <p className="text-[#e6f0fa] text-sm text-center">
                  When required, we perform minimally invasive surgery using the latest techniques for precision, minimal pain, and rapid recovery.
                </p>
              </div>

              {/* Step 5: Recovery & Follow-Up */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-[#9BD22A] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#9BD22A]/30">
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">05</div>
                    <Star className="text-white mx-auto" size={24} />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg text-center mb-2">Recovery &amp; Follow-Up</h3>
                <p className="text-[#e6f0fa] text-sm text-center">
                  Comprehensive post-treatment support with recovery plans, dietary guidance, and scheduled follow-ups to ensure lasting results.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a href="#book-appointment" className="bg-[#9BD22A] text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-[#7fb024] transition flex items-center gap-2 shadow-lg shadow-[#9BD22A]/30">
              Start Your Treatment Journey
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Patient Stories Section */}
      <section id="testimonials" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="text-[#9BD22A] font-semibold text-sm mb-4 tracking-wider">PATIENT STORIES</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Real experiences from patients who trusted Hitayu Surgical Clinic with their health.
            </p>
          </div>

          {/* Testimonials Grid - Row 1 */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-[#2B7ABB]/20 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#2B7ABB]/50 transition">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#9BD22A] fill-[#9BD22A]" size={16} />
                ))}
              </div>
              <Quote className="text-[#2B7ABB] mb-3" size={24} />
              <p className="text-gray-700 italic mb-4 leading-relaxed text-sm">
                &ldquo;Excellent surgical care with a compassionate approach. The clinic maintains high professional standards and the treatment outcomes have been remarkable. Highly recommended for anyone seeking quality surgical treatment.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2B7ABB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  RV
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Dr. Rohit Verma</div>
                  <div className="text-gray-500 text-xs">Verified Patient</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#9BD22A]/20 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#9BD22A]/50 transition">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#9BD22A] fill-[#9BD22A]" size={16} />
                ))}
              </div>
              <Quote className="text-[#9BD22A] mb-3" size={24} />
              <p className="text-gray-700 italic mb-4 leading-relaxed text-sm">
                &ldquo;Hitayu Surgical Clinic combines modern surgical techniques with personalized care. The recovery was smooth and the follow-up support was exceptional. Truly a patient-first approach that makes a difference.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9BD22A] rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                  IP
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Dr. Ishan Prashar</div>
                  <div className="text-gray-500 text-xs">Verified Patient</div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Grid - Row 2 */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-[#9BD22A]/20 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#9BD22A]/50 transition">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#9BD22A] fill-[#9BD22A]" size={16} />
                ))}
              </div>
              <Quote className="text-[#9BD22A] mb-3" size={24} />
              <p className="text-gray-700 italic mb-4 leading-relaxed text-sm">
                &ldquo;I was impressed by the professionalism and expertise at Hitayu Clinic. The doctors take time to explain everything clearly and ensure you&apos;re comfortable throughout the treatment journey.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9BD22A] rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                  DG
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Dr. Gopal</div>
                  <div className="text-gray-500 text-xs">Verified Patient</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#2B7ABB]/20 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#2B7ABB]/50 transition">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#9BD22A] fill-[#9BD22A]" size={16} />
                ))}
              </div>
              <Quote className="text-[#2B7ABB] mb-3" size={24} />
              <p className="text-gray-700 italic mb-4 leading-relaxed text-sm">
                &ldquo;The integrated approach of modern surgery with Ayurvedic healing at Hitayu Clinic is truly unique. My recovery was faster than expected and the care I received was outstanding.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2B7ABB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  DH
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Dr. Himanshu</div>
                  <div className="text-gray-500 text-xs">Verified Patient</div>
                </div>
              </div>
            </div>
          </div>

          {/* Condition-Specific Testimonials Header */}
          <div className="mb-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 inline-block relative">
                Condition-Specific Patient Experiences
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#9BD22A] rounded-full"></span>
              </h3>
            </div>
          </div>

          {/* Testimonials Grid - Row 3 (Condition Specific) */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-[#f0f9e1] to-white rounded-2xl p-6 border border-[#9BD22A]/30 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 bg-[#9BD22A]/20 rounded-full text-[#2B7ABB] text-xs font-semibold">
                  Hemorrhoids Treatment
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#9BD22A] fill-[#9BD22A]" size={16} />
                ))}
              </div>
              <Quote className="text-[#9BD22A] mb-3" size={24} />
              <p className="text-gray-700 italic mb-4 leading-relaxed text-sm">
                &ldquo;I underwent treatment for hemorrhoids at Hitayu Clinic and the results have been excellent. The procedure was smooth and the post-treatment care was thorough. I&apos;m now completely pain-free and grateful for the care I received.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9BD22A] rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Shubham</div>
                  <div className="text-gray-500 text-xs">Hemorrhoids Treatment</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#e6f0fa] to-white rounded-2xl p-6 border border-[#2B7ABB]/30 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 bg-[#2B7ABB]/20 rounded-full text-[#2B7ABB] text-xs font-semibold">
                  Surgical Treatment
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#9BD22A] fill-[#9BD22A]" size={16} />
                ))}
              </div>
              <Quote className="text-[#2B7ABB] mb-3" size={24} />
              <p className="text-gray-700 italic mb-4 leading-relaxed text-sm">
                &ldquo;The treatment for my condition at Hitayu Clinic was exceptional. The doctors understood my problem immediately and the surgical intervention was precise. Recovery has been smooth and I&apos;m back to my normal routine.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2B7ABB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  D
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Deepak</div>
                  <div className="text-gray-500 text-xs">Verified Patient</div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Grid - Row 4 (Condition Specific) */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-[#e6f0fa] to-white rounded-2xl p-6 border border-[#2B7ABB]/30 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 bg-[#2B7ABB]/20 rounded-full text-[#2B7ABB] text-xs font-semibold">
                  Post-Surgical Recovery
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#9BD22A] fill-[#9BD22A]" size={16} />
                ))}
              </div>
              <Quote className="text-[#2B7ABB] mb-3" size={24} />
              <p className="text-gray-700 italic mb-4 leading-relaxed text-sm">
                &ldquo;I was nervous about the surgery but the team at Hitayu Clinic made me feel completely at ease. The procedure went well and the post-operative care was excellent. Thank you for taking such good care of me.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2B7ABB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  G
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Geeta</div>
                  <div className="text-gray-500 text-xs">Verified Patient</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#f0f9e1] to-white rounded-2xl p-6 border border-[#9BD22A]/30 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 bg-[#9BD22A]/20 rounded-full text-[#2B7ABB] text-xs font-semibold">
                  Surgical Care
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#9BD22A] fill-[#9BD22A]" size={16} />
                ))}
              </div>
              <Quote className="text-[#9BD22A] mb-3" size={24} />
              <p className="text-gray-700 italic mb-4 leading-relaxed text-sm">
                &ldquo;Hitayu Surgical Clinic provided me with excellent treatment for my condition. The doctors are highly skilled and the staff is very supportive. I would definitely recommend this clinic to anyone needing surgical care.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9BD22A] rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Sonu</div>
                  <div className="text-gray-500 text-xs">Verified Patient</div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Review CTA */}
          <div className="text-center bg-gradient-to-r from-[#e6f0fa] to-[#f0f9e1] rounded-2xl p-8 border border-[#2B7ABB]/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Share Your Experience</h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Your feedback helps us improve and helps other patients make informed decisions about their healthcare.
            </p>
            <a
              href="https://g.page/r/hitayu-surgical-clinic/review"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2B7ABB] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1e5a8a] transition inline-flex items-center gap-2 shadow-lg shadow-[#2B7ABB]/25"
            >
              <Star size={18} className="fill-white" />
              Leave a Google Review
            </a>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left Column */}
            <div>
              <div className="text-[#9BD22A] font-semibold text-sm mb-4 tracking-wider">FAQS</div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Common questions about our treatments, procedures, and clinic. Can&apos;t find your answer? Call us directly.
              </p>

              {/* Contact Box */}
              <div className="bg-[#f0f9e1] rounded-2xl p-6 border border-[#9BD22A]/30">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Still have questions?</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Our team is happy to answer any specific queries about your condition or our treatments.
                </p>
                <a
                  href="tel:+918447119161"
                  className="w-full bg-[#9BD22A] text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-[#7fb024] transition flex items-center justify-center gap-2 shadow-lg shadow-[#9BD22A]/25"
                >
                  <Phone size={18} />
                  Call 84471 19161
                </a>
              </div>
            </div>

            {/* Right Column - FAQ Accordion */}
            <div className="md:col-span-2">
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section id="location" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="text-[#2B7ABB] font-semibold text-sm mb-4 tracking-wider">FIND US</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Visit Hitayu Surgical Clinic
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Conveniently located in Prem Nagar, Najafgarh — easily accessible from Dwarka, Nangloi, and nearby Delhi areas.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Info Cards */}
            <div className="space-y-6">
              {/* Clinic Address Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#2B7ABB]/20 hover:border-[#2B7ABB]/50 transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#9BD22A] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Clinic Address</h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      318, 28 Feet Road, Block D, Main Gopal Nagar, Prem Nagar, Najafgarh, New Delhi – 110043
                    </p>
                    <a href="https://www.google.com/maps?q=Hitayu+surgical+clinic+Najafgarh+New+Delhi" target="_blank" rel="noopener noreferrer" className="text-[#9BD22A] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition">
                      <Navigation size={16} />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9BD22A]/20 hover:border-[#9BD22A]/50 transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#f0f9e1] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#9BD22A]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
                    <p className="text-[#2B7ABB] font-semibold text-lg mb-1">84471 19161</p>
                    <p className="text-gray-500 text-sm">Available during clinic hours</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#2B7ABB]/20 hover:border-[#2B7ABB]/50 transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#e6f0fa] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#2B7ABB]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                    <p className="text-[#2B7ABB] font-semibold text-sm mb-1">hitayusurgicals2026@gmail.com</p>
                    <p className="text-gray-500 text-sm">For inquiries and appointments</p>
                  </div>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#9BD22A]/20 hover:border-[#9BD22A]/50 transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#f0f9e1] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-[#9BD22A]" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-3">Working Hours</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Monday – Saturday</span>
                        <span className="text-[#2B7ABB] font-semibold">9:00 AM – 7:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Sunday</span>
                        <span className="text-[#9BD22A] font-semibold">10:00 AM – 2:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border-2 border-[#9BD22A]/20 min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.8499013181813!2d76.978731!3d28.6042794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0f000eefd34f%3A0xebf0741e82a28183!2sHitayu%20surgical%20clinic!5e0!3m2!1sen!2sin!4v1782479307657!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="min-h-[400px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Hitayu Surgical Clinic Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Book Appointment Section */}
      <section id="book-appointment" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div>
              <div className="text-[#9BD22A] font-semibold text-sm mb-4 tracking-wider">BOOK AN APPOINTMENT</div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Start Your Path to Better Health
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Fill in your details and we&apos;ll confirm your appointment. We typically respond within a few hours during clinic hours.
              </p>

              {/* Contact Options */}
              <div className="space-y-4 mb-8">
                {/* Call Us Card */}
                <a href="tel:+918447119161" className="bg-[#e6f0fa] rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:bg-[#cce0f5] transition border border-[#2B7ABB]/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#2B7ABB] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-white" size={22} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Call Us Directly</div>
                      <div className="text-[#2B7ABB] font-semibold text-lg">84471 19161</div>
                    </div>
                  </div>
                  <ChevronRight className="text-[#2B7ABB]" size={22} />
                </a>

                {/* WhatsApp Card */}
                <a href="https://wa.me/918447119161" target="_blank" rel="noopener noreferrer" className="bg-[#f0f9e1] rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:bg-[#e1f3c3] transition border border-[#9BD22A]/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#9BD22A] rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="text-white" size={22} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">WhatsApp Appointment</div>
                      <div className="text-[#7fb024] font-semibold text-sm">Quick reply via WhatsApp</div>
                    </div>
                  </div>
                  <ChevronRight className="text-[#9BD22A]" size={22} />
                </a>

                {/* Email Card */}
                <a href="mailto:hitayusurgicals2026@gmail.com" className="bg-white rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition border border-[#2B7ABB]/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#e6f0fa] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-[#2B7ABB]" size={22} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Email Us</div>
                      <div className="text-[#2B7ABB] font-semibold text-sm">hitayusurgicals2026@gmail.com</div>
                    </div>
                  </div>
                  <ChevronRight className="text-[#2B7ABB]" size={22} />
                </a>
              </div>

              {/* What to Expect Box */}
              <div className="bg-[#f0f9e1] rounded-2xl p-6 border border-[#9BD22A]/20">
                <h3 className="font-bold text-gray-900 mb-4">What to expect:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-[#2B7ABB] flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Confirmation call or WhatsApp within a few hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-[#9BD22A] flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Bring any previous medical reports or prescriptions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-[#2B7ABB] flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Consultation typically takes 20–30 minutes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-[#9BD22A] flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Both Ayurvedic and surgical options discussed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Column 1: Logo & Description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://res.cloudinary.com/df01whs60/image/upload/v1782033745/Welcome_to_FigJam-removebg-preview_vwsbys.png"
                  alt="Hitayu Surgical Clinic Logo"
                  className="h-10 w-auto object-contain"
                />
                <div>
                  <div className="font-bold text-white">Hitayu Surgical</div>
                  <div className="text-xs text-[#9BD22A] font-semibold">Clinic</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Expert surgical care integrated with Ayurvedic healing — serving Najafgarh, Dwarka, Nangloi, and Delhi NCR.
              </p>
              <div className="flex gap-3">
                <a href="#" aria-label="Facebook" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#2B7ABB] transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#9BD22A] transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#9BD22A] transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-bold text-[#9BD22A] text-sm tracking-wider mb-5">QUICK LINKS</h3>
              <ul className="space-y-3">
                {[
                  { label: 'About Clinic', href: '#about' },
                  { label: 'Conditions We Treat', href: '#conditions' },
                  { label: 'Services', href: '#services' },
                  { label: 'Why Choose Us', href: '#why-us' },
                  { label: 'Treatment Approach', href: '#treatment' },
                  { label: 'Testimonials', href: '#testimonials' },
                  { label: 'FAQs', href: '#faqs' },
                  { label: 'Location', href: '#location' },
                  { label: 'Book Appointment', href: '#book-appointment' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-slate-400 text-sm hover:text-[#9BD22A] transition">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Conditions */}
            <div>
              <h3 className="font-bold text-[#2B7ABB] text-sm tracking-wider mb-5">CONDITIONS &amp; SERVICES</h3>
              <ul className="space-y-3">
                {['Piles (Hemorrhoids)', 'Anal Fissure', 'Fistula', 'Hernia', 'Skin & Cosmetic Procedures', 'Pain Management'].map((link) => (
                  <li key={link}>
                    <a href="#conditions" className="text-slate-400 text-sm hover:text-[#2B7ABB] transition">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="font-bold text-[#9BD22A] text-sm tracking-wider mb-5">CONTACT</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="text-[#2B7ABB] flex-shrink-0 mt-1" size={18} />
                  <span className="text-slate-400 text-sm leading-relaxed">
                    318, 28 Feet Road, Block D, Main Gopal Nagar, Prem Nagar, Najafgarh, New Delhi – 110043
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-[#9BD22A] flex-shrink-0" size={18} />
                  <span className="text-slate-400 text-sm">84471 19161</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-[#2B7ABB] flex-shrink-0" size={18} />
                  <span className="text-slate-400 text-sm">hitayusurgicals2026@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="text-[#2B7ABB] flex-shrink-0 mt-1" size={18} />
                  <span className="text-slate-400 text-sm leading-relaxed">
                    Mon – Sat: 9:00 AM – 7:00 PM<br />
                    Sunday: 10:00 AM – 2:00 PM
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-sm">© 2026 Hitayu Surgical Clinic. All rights reserved.</p>
            <p className="text-[#9BD22A] text-sm font-medium">Piles Doctor Najafgarh | Fissure Treatment Najafgarh | Fistula Specialist Delhi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

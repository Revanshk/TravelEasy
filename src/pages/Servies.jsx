import React from 'react'

const services = [
  {
    title: "Easy Hotel Search",
    icon: (
      <svg className="w-10 h-10 text-[var(--ultra-violet)] mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="18" height="10" x="3" y="7" rx="2" stroke="currentColor"/>
        <path strokeLinecap="round" d="M8 17v2M16 17v2"/><circle cx="8" cy="12" r="1" fill="currentColor"/>
        <circle cx="16" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
    desc: "Find and compare thousands of hotels quickly by city, price, and rating."
  },
  {
    title: "Secure Booking",
    icon: (
      <svg className="w-10 h-10 text-[var(--ultra-violet)] mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="10" width="18" height="11" rx="2" stroke="currentColor"/>
        <path strokeLinecap="round" d="M7 10V7a5 5 0 1110 0v3"/>
      </svg>
    ),
    desc: "Book your stay securely with instant confirmation and flexible payment options."
  },
  {
    title: "Curated Experiences",
    icon: (
      <svg className="w-10 h-10 text-[var(--ultra-violet)] mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 20l4.35-6.18a3.25 3.25 0 10-8.7 0L12 20z" stroke="currentColor"/>
        <circle cx="12" cy="9" r="3" stroke="currentColor"/>
      </svg>
    ),
    desc: "Explore unique stays and handpicked travel experiences with verified reviews."
  },
  {
    title: "24/7 Customer Support",
    icon: (
      <svg className="w-10 h-10 text-[var(--ultra-violet)] mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor"/>
        <path strokeLinecap="round" d="M8 12h.01M12 16a4 4 0 100-8 4 4 0 000 8zm3.5-8.5l2.5-2.5"/>
      </svg>
    ),
    desc: "We're here to help. Reach out anytime for booking or travel assistance."
  }
]

const Servies = () => {
  return (
    <div className="bg-gradient-to-br from-[var(--pale-dogwood)] via-[var(--isabelline)] to-[var(--pale-dogwood)] min-h-screen py-14 px-3">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--space-cadet)] mb-3 tracking-tight drop-shadow-sm">Our Services</h1>
        <p className="text-lg text-[var(--space-cadet)] font-semibold opacity-90">Making your hotel search and travel simple, secure, and joyful.</p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((svc, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-[var(--isabelline)] rounded-2xl shadow-lg p-7 hover:shadow-2xl transition border border-[var(--rose-quartz)]"
          >
            {svc.icon}
            <h2 className="text-xl font-bold text-[var(--space-cadet)] mb-1">{svc.title}</h2>
            <p className="text-[var(--space-cadet)] text-sm font-medium opacity-90">{svc.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-14 text-center text-[var(--rose-quartz)] text-md">
        More exciting services coming soon!
      </div>
    </div>
  )
}

export default Servies
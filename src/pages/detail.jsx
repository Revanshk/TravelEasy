import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, ArrowLeft, Home } from 'lucide-react'
import delhiHotels from '../store/delhi'
import mumbaiHotels from '../store/mumbai'
import puneHotels from '../store/pune'
import indoreHotels from '../store/indore'
import jabalpurHotels from '../store/jabalpur'

const Detail = () => {
  const { id, city } = useParams()
  const navigate = useNavigate()

  // Map city names to their respective hotel data
  const cityHotelsMap = {
    delhi: delhiHotels,
    mumbai: mumbaiHotels,
    pune: puneHotels,
    indore: indoreHotels,
    jabalpur: jabalpurHotels
  }

  const hotels = cityHotelsMap[city] || jabalpurHotels
  const hotel = hotels[parseInt(id)]

  if (!hotel) {
    return (
      <div className="p-8 text-center min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-[var(--pale-dogwood)] via-[var(--isabelline)] to-[var(--pale-dogwood)] rounded-2xl shadow-lg">
        <h1 className="text-3xl font-black text-[var(--space-cadet)] mb-2">Hotel Not Found</h1>
        <p className="text-[var(--space-cadet)] mt-2 mb-8 font-semibold">The hotel you're looking for doesn't exist.</p>
        <Link to="/" className="mt-4 inline-block bg-[var(--space-cadet)] text-[var(--isabelline)] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[var(--ultra-violet)] hover:scale-105 transition">
          Return to Home
        </Link>
      </div>
    )
  }

  // Use fallback image if the image URL is invalid or from example.com
  const imageSrc = hotel?.image && !hotel.image.includes('example.com')
    ? hotel.image.startsWith('./') ? hotel.image.replace('./', '/') : hotel.image
    : '/Overview.jpg'

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gradient-to-br from-[var(--pale-dogwood)] via-[var(--isabelline)] to-[var(--pale-dogwood)] min-h-screen">
      {/* Navigation Links */}
      <div className="mb-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--ultra-violet)] hover:text-[var(--space-cadet)] bg-[var(--isabelline)] rounded-full px-4 py-2 shadow transition hover:scale-105 active:scale-100 border border-[var(--rose-quartz)]"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 text-[var(--ultra-violet)] hover:text-[var(--space-cadet)] bg-[var(--isabelline)] rounded-full px-4 py-2 shadow transition hover:scale-105 active:scale-100 border border-[var(--rose-quartz)]"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
      </div>
      <div className="bg-[var(--isabelline)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--rose-quartz)] hover:shadow-3xl transition-all duration-300">
        <div className="md:flex">
          <div className="md:w-1/2 relative group">
            <img
              src={imageSrc}
              alt={hotel.name}
              className="w-full h-64 md:h-[32rem] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4 bg-gradient-to-br from-[var(--isabelline)]/60 to-[var(--isabelline)]/20 backdrop-blur-sm rounded-xl px-3 py-2 shadow text-[var(--space-cadet)] font-bold text-sm flex items-center gap-2">
              <Star size={16} className="inline" fill="currentColor" />
              {hotel.rating.toFixed(1)}
            </div>
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-between min-h-[28rem]">
            <div>
              <h1 className="text-4xl font-black text-[var(--space-cadet)] mb-3 tracking-tight drop-shadow-sm">{hotel.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                {hotel.rating >= 4.3 && (
                  <span className="bg-[var(--pale-dogwood)] text-[var(--space-cadet)] px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow">
                    <Star size={14} fill="currentColor" className="mr-0.5" />
                    Guest Favorite
                  </span>
                )}
                <span className="bg-[var(--pale-dogwood)] text-[var(--space-cadet)] px-2 py-1 rounded-lg text-xs font-bold ml-2 capitalize tracking-wide shadow-sm">
                  {city}
                </span>
              </div>
              <div className="mb-8">
                <h2 className="text-3xl font-black text-[var(--space-cadet)] mb-1 flex items-end gap-2">
                  ₹{hotel.price.toLocaleString('en-IN')} 
                  <span className="text-lg font-bold text-[var(--space-cadet)] opacity-70">/ night</span>
                </h2>
                <span className="inline-block mt-1 text-sm text-[var(--space-cadet)] font-semibold tracking-wide italic opacity-75">
                  Taxes and fees may apply
                </span>
              </div>
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-[var(--space-cadet)] mb-2">Description</h3>
                <p className="text-[var(--space-cadet)] leading-relaxed text-lg bg-[var(--pale-dogwood)] rounded-xl px-4 py-3 shadow-inner font-medium">
                  {hotel.description}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 gap-3">
              <Link
                to="/pay"
                className="w-full bg-gradient-to-r from-[var(--ultra-violet)] to-[var(--space-cadet)] text-[var(--isabelline)] py-3 px-8 rounded-xl font-bold shadow-lg hover:scale-105 hover:from-[var(--space-cadet)] hover:to-[var(--ultra-violet)] transition text-center text-lg tracking-wide"
              >
                Book Now
              </Link>
              <a
                href="tel:+911234567890"
                className="w-full bg-[var(--isabelline)] border border-[var(--rose-quartz)] text-[var(--ultra-violet)] py-3 px-8 rounded-xl font-semibold shadow hover:bg-[var(--pale-dogwood)] hover:border-[var(--space-cadet)] hover:text-[var(--space-cadet)] transition text-center text-lg"
              >
                Contact Hotel
              </a>
            </div>
          </div>
        </div>
        {/* Divider line */}
        <div className="w-full border-t border-[var(--rose-quartz)] mt-6"></div>
        {/* Suggestion/Note Block */}
        <div className="px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-[var(--pale-dogwood)] to-[var(--rose-quartz)]/30">
          <div className="flex items-center gap-2 text-[var(--space-cadet)] font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m2-4h.01M12 20c4.418 0 8-1.79 8-4V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10c0 2.21 3.582 4 8 4z" />
            </svg>
            Looking for more options?{' '}
            <Link
              to="/"
              className="underline text-[var(--space-cadet)] hover:text-[var(--space-cadet)] font-black ml-1 hover:opacity-80 transition-opacity"
            >
              Browse all hotels
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-[var(--space-cadet)] text-sm text-right italic font-semibold opacity-80">
            Secure your room quickly — popular dates book fast!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
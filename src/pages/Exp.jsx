import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, Dumbbell, Plane, Landmark, Backpack, Volleyball, PersonStanding, Star } from 'lucide-react'
import activities from '../store/exp'

// Icon mapping based on keywords in title for better UI
const getIconForActivity = (title) => {
  const key = title.toLowerCase()
  if (key.includes('gym')) return <Dumbbell className="text-blue-500 bg-blue-100 rounded-full p-1 w-7 h-7 shadow" />;
  if (key.includes('travel')) return <Plane className="text-green-600 bg-green-100 rounded-full p-1 w-7 h-7 shadow" />;
  if (key.includes('places') || key.includes('landmark')) return <Landmark className="text-orange-500 bg-orange-100 rounded-full p-1 w-7 h-7 shadow" />;
  if (key.includes('yoga')) return <PersonStanding className="text-pink-500 bg-pink-100 rounded-full p-1 w-7 h-7 shadow" />;
  if (key.includes('sports')) return <Volleyball className="text-purple-500 bg-purple-100 rounded-full p-1 w-7 h-7 shadow" />;
  return <Star className="text-yellow-400 bg-yellow-100 rounded-full p-1 w-7 h-7 shadow" />;
}

// Animating Card UI for an activity with hover overlay, gradient and icon styling
const ActivityCard = ({ activity }) => (
  <div
    className="
      relative flex-shrink-0
      w-72 h-[370px]
      bg-gradient-to-br from-white to-gray-100
      rounded-2xl shadow-lg overflow-hidden mx-3 my-2
      transform transition duration-300 hover:scale-105 group
      border-t-2 border-b-4 border-l-2 border-gray-100 hover:border-blue-200
      ring-1 ring-blue-50
      flex flex-col
    "
    style={{ minWidth: 288, maxWidth: 288, minHeight: 370, maxHeight: 370 }} // Ensure fixed size
  >
    <div className="relative">
      <img
        src={activity.image}
        alt={activity.title}
        className="w-full h-44 object-cover object-center transition-transform duration-300 group-hover:scale-110"
        style={{ minHeight: 176, maxHeight: 176, height: 176 }} // ensure img doesn't push card size
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-700/40 to-transparent opacity-70 pointer-events-none" />
      {/* Floating icon */}
      <div className="absolute -top-5 left-4 z-10">
        <div className="shadow-lg">
          {getIconForActivity(activity.title)}
        </div>
      </div>
    </div>
    {/* Card content */}
    <div className="p-5 flex flex-col gap-2 relative z-10 flex-grow justify-between min-h-0">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg text-gray-900 drop-shadow">{activity.title}</h3>
        </div>
        <p className="text-gray-600 text-[15px] leading-relaxed line-clamp-3">{activity.description}</p>
      </div>
      {/* CTA Button for more visual interest */}
      <button className="mt-2 w-max px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition">
        Explore
      </button>
    </div>
    {/* Hover overlay effect */}
    <div className="absolute inset-0 bg-blue-100/30 opacity-0 group-hover:opacity-30 transition pointer-events-none rounded-2xl" />
  </div>
)

const Exp = () => {
  const carouselRef = useRef(null)

  const scroll = (direction) => {
    if (carouselRef.current) {
      const cardWidth = 320 // Card width + gap
      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
      } else {
        carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-black mb-3 text-gradient bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent text-center tracking-wide drop-shadow-lg">
        Experiences
      </h2>
      <p className="text-xl text-gray-500 text-center mb-10">
        Discover a variety of activities that enhance your journey and well-being.
      </p>
      <div className="relative">
        {/* Left button */}
        <button
          className="absolute z-20 left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-xl p-3 hover:bg-blue-50 hover:shadow-2xl transition border border-blue-100"
          style={{ display: 'flex' }}
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-7 h-7 text-blue-600" />
        </button>
        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth py-4 px-7 space-x-6 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {activities.map((activity, idx) => (
            <div key={idx} className="snap-center flex items-stretch h-[370px]">
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>
        {/* Right button */}
        <button
          className="absolute z-20 right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-xl p-3 hover:bg-blue-50 hover:shadow-2xl transition border border-blue-100"
          style={{ display: 'flex' }}
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-7 h-7 text-blue-600" />
        </button>
      </div>
      {/* Animated underline for section */}
      <div className="mx-auto mt-10 w-32 h-1 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse" />
    </section>
  )
}

export default Exp
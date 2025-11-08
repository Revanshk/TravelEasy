import React, { useRef } from 'react'
import Card from '../components/Card'
import hotels from '../store/jabalpur'

const Jbp = () => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    // Adjust scroll amount as per card width, here assuming 340px/card + 24px gap
    const scrollAmount = 364 * 3; // 3 cards at a time
    if (container) {
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <p className="text-gray-600 text-center">Find your perfect stay in Jabalpur</p>
      </div>
      <div className="flex items-center">
        <button
          className="px-2 py-1 text-xl rounded-full bg-gray-200 hover:bg-gray-300 mr-2"
          aria-label="Previous"
          onClick={() => handleScroll('left')}
        >
          &#8592;
        </button>
        <div
          className="flex gap-6 w-full justify-start overflow-x-auto scroll-smooth hide-scrollbar"
          ref={scrollRef}
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {hotels.map((hotel, index) => (
            <div
              className="min-w-[340px] max-w-[340px] flex-shrink-0"
              key={index}
            >
              <Card hotel={hotel} index={index} city="jabalpur" />
            </div>
          ))}
        </div>
        <button
          className="px-2 py-1 text-xl rounded-full bg-gray-200 hover:bg-gray-300 ml-2"
          aria-label="Next"
          onClick={() => handleScroll('right')}
        >
          &#8594;
        </button>
      </div>
      {/* Optional: Hide scrollbar cross-browser */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </div>
  )
}

export default Jbp
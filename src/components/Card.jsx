import { Heart, Star } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ hotel, index, city }) => {
  const navigate = useNavigate()
  

  const handleCardClick = () => {
    navigate(`/detail/${city}/${index}`)
  }

  // Use fallback image if the image URL is invalid or from example.com
  const imageSrc = hotel?.image && !hotel.image.includes('example.com') 
    ? hotel.image 
    : '/Overview.jpg'

  return (
    <div>
        <div 
          className="bg-[var(--isabelline)] rounded-xl shadow-md overflow-hidden w-80 hover:shadow-xl transition-shadow duration-300 border border-[var(--rose-quartz)] cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="flex justify-between items-center p-3">
            <div>
              {hotel?.rating >= 4.3 && (
                <span className="bg-[var(--pale-dogwood)] text-[var(--space-cadet)] text-xs px-2 py-1 rounded font-semibold">Guest Favorite</span>
              )}
            </div>
            <button 
              className="text-[var(--rose-quartz)] hover:text-[var(--ultra-violet)]"
              onClick={(e) => {
                e.stopPropagation()
                // Handle favorite button click here
              }}
            >
              <Heart size={20} />
            </button>
          </div>
          <img
            src={imageSrc}
            alt={hotel?.name || "Hotel"}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col gap-1">
            <h3 className="font-bold text-lg mb-1 text-[var(--space-cadet)]">{hotel?.name || "Hotel"}</h3>
            <div className="flex items-center justify-between">
              <span className="text-[var(--space-cadet)] font-bold">
                Price: ₹{hotel?.price?.toLocaleString('en-IN') || 'N/A'} 
                <span className='text-sm font-semibold text-[var(--space-cadet)] opacity-75'> / night</span>
              </span>
              <span className="flex items-center text-[var(--space-cadet)] font-bold">
                <Star size={18} className="mr-0.5" fill="currentColor" /> {hotel?.rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
            <p className="text-[var(--space-cadet)] text-sm mt-2 line-clamp-2 font-medium opacity-90">
              {hotel?.description || "A comfortable stay with top amenities."}
            </p>
          </div>
        </div>
        </div>
       
  )
}
export default Card

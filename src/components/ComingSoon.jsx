import React from 'react'

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-blue-50 to-white px-4">
      <img 
        src="/under_construction.svg" 
        alt="Page under construction"
        className="w-56 h-56 mb-6"
        onError={e => { e.target.style.display = "none" }} // fallback if image missing
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2 tracking-wide">
        Page Under Construction
      </h1>
      <p className="text-lg text-gray-600 mb-4 text-center max-w-md">
        We're working hard to bring you this page.<br />
        Please check back soon!
      </p>
      <span className="inline-flex items-center px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-semibold">
        <svg className="w-5 h-5 mr-2 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12zm0 0v2m0 0h2m-2 0H9"/>
        </svg>
        Coming Soon
      </span>
    </div>
  )
}

export default ComingSoon
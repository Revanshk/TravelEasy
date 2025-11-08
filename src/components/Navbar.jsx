import { BedDouble, Bell, Earth, Laugh, ListCheck, TextAlignJustify } from 'lucide-react'
import React,{useState}from 'react'
import { Link } from 'react-router-dom'
import Pop2 from './Pop2'
import Pop from './Pop'

const Navabar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  // Add a submit handler for signup logic
  
  return (
    <div className='flex justify-between px-4 items-center text-center mt-3.5 bg-[var(--isabelline)]'>
      <Link to='/' className='flex items-center transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-100'>      
        <img className='h-[80px] w-[100px]' alt='img' src='/public/logo/logo (1).png' />
        <h1 className='text-2xl font-serif text-[var(--space-cadet)] font-bold tracking-wide'>Travel Easy</h1>
      </Link>

      <ul className='flex gap-4 items-center'>
        <li>
          <Link 
            className='flex gap-2 items-center px-3 py-2 rounded-lg transition-all duration-300 text-[var(--space-cadet)] font-semibold hover:text-[var(--space-cadet)] hover:bg-[var(--pale-dogwood)] hover:shadow-md hover:scale-105 active:scale-100 relative group' 
            to='/'
          >
            <span className="relative">
              Homes
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--space-cadet)] transition-all duration-300 group-hover:w-full"></span>
            </span>
            <BedDouble className="group-hover:scale-110 transition-transform duration-300" size={18} />
          </Link>
        </li>
        <li>
          <Link 
            className='flex gap-2 items-center px-3 py-2 rounded-lg transition-all duration-300 text-[var(--space-cadet)] font-semibold hover:text-[var(--space-cadet)] hover:bg-[var(--pale-dogwood)] hover:shadow-md hover:scale-105 active:scale-100 relative group' 
            to='/experience'
          >
            <span className="relative">
              Experience
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--space-cadet)] transition-all duration-300 group-hover:w-full"></span>
            </span>
            <Laugh className="group-hover:scale-110 transition-transform duration-300" size={18} />
          </Link>
        </li>
        <li>
          <Link 
            className='flex gap-2 items-center px-3 py-2 rounded-lg transition-all duration-300 text-[var(--space-cadet)] font-semibold hover:text-[var(--space-cadet)] hover:bg-[var(--pale-dogwood)] hover:shadow-md hover:scale-105 active:scale-100 relative group' 
            to='/services'
          >
            <span className="relative">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--space-cadet)] transition-all duration-300 group-hover:w-full"></span>
            </span>
            <Bell className="group-hover:scale-110 transition-transform duration-300" size={18} />
          </Link>
        </li>
        
      </ul>

      <div className='flex gap-1 items-center'>
        <Link to='/underCon' className='rounded-full border-2 border-[var(--rose-quartz)] px-4 py-2 transition-all duration-300 text-[var(--space-cadet)] font-semibold hover:border-[var(--space-cadet)] hover:bg-[var(--space-cadet)] hover:text-[var(--isabelline)] hover:shadow-lg hover:scale-105 active:scale-100'>
          Become a host
        </Link>
        <Link to='/underCon' className='rounded-full border-2 border-[var(--rose-quartz)] p-2 transition-all duration-300 text-[var(--space-cadet)] hover:border-[var(--space-cadet)] hover:bg-[var(--space-cadet)] hover:text-[var(--isabelline)] hover:shadow-lg hover:scale-110 active:scale-100 hover:rotate-12'>
          <Earth size={20} />
        </Link>

        
        <div className="relative">
          <button
            className="rounded-full border-2 border-[var(--rose-quartz)] p-2 transition-all duration-300 text-[var(--space-cadet)] hover:border-[var(--space-cadet)] hover:bg-[var(--space-cadet)] hover:text-[var(--isabelline)] hover:shadow-lg hover:scale-110 active:scale-100 flex items-center"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            <TextAlignJustify size={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[var(--isabelline)] border border-[var(--rose-quartz)] rounded-md shadow-lg z-50">
              <button
                className="block w-full text-left px-4 py-2 text-[var(--space-cadet)] font-semibold hover:bg-[var(--pale-dogwood)] hover:text-[var(--space-cadet)] transition-all duration-200 rounded-md hover:shadow-sm hover:translate-x-1"
                onClick={() => {
                  setShowLogin(true)
                  setDropdownOpen(false)
                }}
              >
                Login
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-[var(--space-cadet)] font-semibold hover:bg-[var(--pale-dogwood)] hover:text-[var(--space-cadet)] transition-all duration-200 rounded-md hover:shadow-sm hover:translate-x-1"
                onClick={() => {
                  setShowSignup(true)
                  setDropdownOpen(false)
                }}
              >
                Sign Up
              </button>
            </div>
          )}
          {/* Popups for Login and Signup */}
          {showLogin && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--space-cadet)]/40">
              <div className="relative">
                <button
                  className="absolute -top-4 -right-4 text-lg bg-[var(--isabelline)] rounded-full shadow p-2 hover:text-[var(--space-cadet)] text-[var(--ultra-violet)]"
                  onClick={() => setShowLogin(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <Pop
                  setShow={setShowLogin}
                  onSubmitSuccess={() => setShowLogin(false)}
                />
              </div>
            </div>
          )}
          {showSignup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--space-cadet)]/40">
              <Pop2
                onSubmitSuccess={() => setShowSignup(false)}
                setShow={setShowSignup}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navabar

import React, { useState, useRef } from 'react'
import { MapPin, Calendar, Users, Search as SearchIcon, X } from 'lucide-react'
import cityList from '../store/ city'

const GUEST_OPTIONS = [
  { label: 'Adults', name: 'adults', min: 1, max: 16 },
  { label: 'Children', name: 'children', min: 0, max: 5 }
]

const getToday = () => new Date().toISOString().split("T")[0]

const Search = () => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [location, setLocation] = useState('')
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [guests, setGuests] = useState({ adults: 2, children: 0 })
  const [guestDropdown, setGuestDropdown] = useState(false)
  const [datePanel, setDatePanel] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const locationInputRef = useRef(null)
  const dateButtonRef = useRef(null)
  const guestPanelRef = useRef(null);

  // Date display helpers
  const formatDate = (str) =>
    str ? new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
  const showDateText = (start, end) => {
    if (!start && !end) return 'Add dates'
    if (start && !end) return `${formatDate(start)} -`
    if (start && end) return `${formatDate(start)} - ${formatDate(end)}`
    return ''
  }

  // City Autocomplete logic
  const [citySearch, setCitySearch] = useState('')
  // Sort city list alphabetically first for UI
  const sortedCityList = [...cityList].sort((a, b) => a.localeCompare(b));
  // Filter then sort the filtered result
  const filteredCities = sortedCityList
    .filter(city =>
      city.toLowerCase().includes(citySearch.toLowerCase())
    );

  const handleLocationInputChange = e => {
    setCitySearch(e.target.value)
    setLocation(e.target.value)
    setShowCityDropdown(true)
  }

  const handleSelectCity = city => {
    setLocation(city)
    setCitySearch(city)
    setShowCityDropdown(false)
    setSelectedPlace(city)
    if (locationInputRef.current) locationInputRef.current.value = city
  }

  // Prevent closing on click inside guestDropdown panel
  // Fix: GuestChange should not run if value unchanged
  const handleGuestChange = (type, value) => {
    const opt = GUEST_OPTIONS.find(opt => opt.name === type);
    const nextValue = Math.max(opt.min, Math.min(value, opt.max));
    if (nextValue !== guests[type]) {
      setGuests((prev) => ({
        ...prev,
        [type]: nextValue
      }))
    }
  }

  const totalGuests = guests.adults + guests.children

  // Date Panel: dropdown style, aligns downward under date button
  const renderDatePanel = () => (
    <>
      <div className="fixed inset-0 bg-transparent z-20" onClick={() => setDatePanel(false)} />
      <div
        className="absolute left-0 top-full mt-2 w-[320px] sm:w-[350px] bg-[var(--isabelline)] rounded-2xl border border-[var(--rose-quartz)] shadow-2xl z-30 animate-fade-in-fast px-6 py-6"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-black text-[var(--space-cadet)]">Select dates</h3>
          <button
            onClick={() => setDatePanel(false)}
            className="p-2 rounded-full hover:bg-[var(--pale-dogwood)] transition text-[var(--ultra-violet)]"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Calendar Section */}
        <div className="flex flex-col gap-3 text-base font-medium">
          <label className="text-[var(--space-cadet)] text-xs mb-1 font-bold" htmlFor="checkin-inp">Check in</label>
          <input
            id="checkin-inp"
            type="date"
            value={checkIn}
            min={getToday()}
            onChange={e => {
              setCheckIn(e.target.value)
              if (checkOut && e.target.value > checkOut) setCheckOut('')
            }}
            className="w-full px-3 py-2 mb-4 rounded-xl border border-[var(--rose-quartz)] outline-none focus:ring-2 focus:ring-[var(--ultra-violet)] text-[var(--space-cadet)] font-medium shadow-small bg-[var(--isabelline)]"
            autoFocus
          />
          <label className="text-[var(--space-cadet)] text-xs mb-1 font-bold" htmlFor="checkout-inp">Check out</label>
          <input
            id="checkout-inp"
            type="date"
            value={checkOut}
            min={checkIn || getToday()}
            disabled={!checkIn}
            onChange={e => setCheckOut(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[var(--rose-quartz)] outline-none focus:ring-2 focus:ring-[var(--ultra-violet)] text-[var(--space-cadet)] font-medium shadow-small bg-[var(--isabelline)] disabled:bg-[var(--pale-dogwood)] disabled:opacity-50"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            disabled={!checkIn}
            onClick={() => setDatePanel(false)}
            className={`bg-gradient-to-r from-[var(--ultra-violet)] to-[var(--space-cadet)] text-[var(--isabelline)] px-6 py-2 rounded-full font-semibold transition 
              ${!checkIn ? 'bg-[var(--pale-dogwood)] opacity-70 cursor-not-allowed text-[var(--rose-quartz)]' : 'shadow-lg hover:scale-105 active:scale-100'}`
            }
          >
            Save
          </button>
        </div>
      </div>
    </>
  )

  // Handle outside click for guestDropdown
  React.useEffect(() => {
    if (!guestDropdown) return;
    const handleClick = (e) => {
      if (
        guestPanelRef.current &&
        !guestPanelRef.current.contains(e.target)
      ) {
        setGuestDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick, true);
    return () => document.removeEventListener('mousedown', handleClick, true);
  }, [guestDropdown]);

  return (
    <section className="flex justify-center bg-gradient-to-b from-[var(--pale-dogwood)] to-[var(--isabelline)] py-4">
      <div className="w-full max-w-3xl px-2 relative">
        <div className="rounded-3xl shadow-xl bg-[var(--isabelline)] px-3 py-2 flex flex-wrap md:flex-nowrap gap-1 md:gap-3 items-stretch border border-[var(--rose-quartz)] hover:shadow-2xl transition-shadow relative z-10">
          {/* Location */}
          <div className="flex-1 flex items-center min-w-[150px] group relative">
            <MapPin className="w-5 h-5 text-[var(--rose-quartz)] group-hover:text-[var(--space-cadet)] transition-colors duration-200 mr-2" />
            <div className="w-full relative">
              <input
                ref={locationInputRef}
                type="text"
                placeholder="Where to?"
                value={citySearch}
                onFocus={() => setShowCityDropdown(true)}
                onChange={handleLocationInputChange}
                className="outline-none border-none bg-transparent text-base font-bold w-full placeholder-[var(--rose-quartz)] text-[var(--space-cadet)] py-2 focus:placeholder-[var(--ultra-violet)]"
                style={{ minWidth: 0 }}
                autoComplete="off"
              />
              {showCityDropdown && citySearch && filteredCities.length > 0 && (
                <div className="absolute left-0 top-full mt-1 w-full z-40 bg-[var(--isabelline)] border border-[var(--rose-quartz)] rounded-xl shadow-xl max-h-56 overflow-y-auto animate-fade-in-fast">
                  {filteredCities.map((city, idx) => (
                    <button
                      key={city}
                      tabIndex={0}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-[var(--pale-dogwood)] focus:bg-[var(--pale-dogwood)] cursor-pointer font-medium text-[var(--space-cadet)]"
                      onMouseDown={() => handleSelectCity(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
              {showCityDropdown && citySearch && filteredCities.length === 0 && (
                <div className="absolute left-0 top-full mt-1 w-full z-40 bg-[var(--isabelline)] border border-[var(--rose-quartz)] rounded-xl shadow-xl max-h-56 overflow-y-auto animate-fade-in-fast">
                  <div className="px-4 py-2 text-[var(--space-cadet)] font-semibold">No matches found.</div>
                </div>
              )}
            </div>
          </div>
          <div className="w-px bg-[var(--rose-quartz)] my-2 mx-2 md:my-3" />
          {/* Date Panel - Button & Dropdown, aligned downward */}
          <div className="flex flex-1 flex-col md:flex-row gap-1 items-stretch relative">
            <button
              type="button"
              ref={dateButtonRef}
              className="group flex-1 flex items-center relative px-2 py-2 rounded-xl hover:bg-[var(--pale-dogwood)] transition cursor-pointer"
              onClick={() => setDatePanel(p => !p)}
            >
              <Calendar className="w-5 h-5 text-[var(--rose-quartz)] mr-2" />
              <div className="flex flex-col items-start w-full text-left">
                <span className="text-xs text-[var(--space-cadet)] font-bold">
                  Check-in / Check-out
                </span>
                <span className="text-base font-bold text-[var(--space-cadet)] group-hover:text-[var(--space-cadet)] transition px-0">
                  {showDateText(checkIn, checkOut)}
                </span>
              </div>
            </button>
            {datePanel && (
              <div className="absolute left-0 top-full w-full z-30 flex">
                {renderDatePanel()}
              </div>
            )}
          </div>
          <div className="w-px bg-[var(--rose-quartz)] my-2 mx-2 md:my-3" />

          {/* Guests */}
          <div className="relative flex items-center min-w-[140px] select-none">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setGuestDropdown(true);
              }}
              className="flex items-center bg-transparent px-2 py-2 rounded-xl hover:bg-[var(--pale-dogwood)] w-full transition-colors group"
              aria-expanded={guestDropdown}
              aria-haspopup="true"
              tabIndex={0}
            >
              <Users className="w-5 h-5 text-[var(--rose-quartz)] mr-2" />
              <span className="font-bold text-base text-[var(--space-cadet)] pr-1">
                {totalGuests} guest{totalGuests > 1 ? 's' : ''}
              </span>
              <span className="hidden sm:inline text-xs text-[var(--space-cadet)] font-semibold">
                ({`${guests.adults} adult${guests.adults > 1 ? 's' : ''}${guests.children ? `, ${guests.children} child${guests.children > 1 ? 'ren' : ''}` : ''}`})
              </span>
            </button>
            {guestDropdown && (
              <div
                ref={guestPanelRef}
                className="absolute left-0 top-full mt-2 w-64 bg-[var(--isabelline)] p-4 rounded-2xl shadow-2xl border border-[var(--rose-quartz)] animate-fade-in-fast z-30"
                tabIndex={-1}
              >
                {GUEST_OPTIONS.map(opt => (
                  <div key={opt.name} className="flex items-center justify-between py-2">
                    <span className="font-bold text-[var(--space-cadet)]">{opt.label}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={guests[opt.name] <= opt.min}
                        className={`w-8 h-8 flex items-center justify-center bg-[var(--pale-dogwood)] rounded-full text-[var(--space-cadet)] text-xl ${guests[opt.name] <= opt.min ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--rose-quartz)] hover:text-[var(--isabelline)]'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGuestChange(opt.name, guests[opt.name] - 1)
                        }}
                      >-</button>
                      <span className="px-2 text-[var(--space-cadet)]">{guests[opt.name]}</span>
                      <button
                        type="button"
                        disabled={guests[opt.name] >= opt.max}
                        className={`w-8 h-8 flex items-center justify-center bg-[var(--pale-dogwood)] rounded-full text-[var(--space-cadet)] text-xl ${guests[opt.name] >= opt.max ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--rose-quartz)] hover:text-[var(--isabelline)]'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGuestChange(opt.name, guests[opt.name] + 1)
                        }}
                      >+</button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGuestDropdown(false);
                    }}
                    className="text-[var(--space-cadet)] font-bold hover:text-[var(--space-cadet)] hover:underline text-sm"
                  >Done</button>
                </div>
              </div>
            )}
          </div>
          {/* Search button */}
          <div className="flex items-center">
            <button
              type="button"
              className="flex items-center bg-gradient-to-r from-[var(--ultra-violet)] to-[var(--space-cadet)] hover:from-[var(--space-cadet)] hover:to-[var(--ultra-violet)] transition-colors shadow-lg text-[var(--isabelline)] px-5 py-3 rounded-full font-bold text-base whitespace-nowrap group"
              style={{ boxShadow: '0 4px 24px 0 rgba(34, 34, 59, 0.2)' }}
            >
              <SearchIcon className="w-5 h-5 mr-1.5" />
              <span className="hidden md:inline">Search</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}



export default Search

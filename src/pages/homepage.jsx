import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import Del from '../cities/Del'
import Mum from '../cities/Mum'
import Pun from '../cities/Pun'
import Indb from '../cities/Indb'
import Jbp from '../cities/Jbp'

const homepage = () => {
  const cities = [
    { name: 'Jabalpur', path: '/cities/jabalpur', component: Jbp },
    { name: 'Delhi', path: '/cities/delhi', component: Del },
    { name: 'Mumbai', path: '/cities/mumbai', component: Mum },
    { name: 'Pune', path: '/cities/pune', component: Pun },
    { name: 'Indore', path: '/cities/indore', component: Indb }
  ]

  return (
    <div className="pb-8 bg-[var(--isabelline)]">
      <h1 className='text-4xl font-extrabold text-center font-serif text-[var(--space-cadet)] mb-8 tracking-tight drop-shadow-sm'>Discover Hotels</h1>
      {/* Show all cities */}
      {cities.map((city) => {
        const CityComponent = city.component
        return (
          <div key={city.name} className="mb-8">
            <div className="flex items-center justify-between mb-4 px-4">
            </div>
            <CityComponent />
          </div>
        )
      })}
    </div>
  )
}

export default homepage
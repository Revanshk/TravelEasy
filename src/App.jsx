import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Homepage from './pages/homepage'
import Exp from './pages/Exp'
import Servies from './pages/Servies'
import Detail from './pages/detail'
import Pay from './pages/pay'
import Search from './components/Search'
import Del from './cities/Del'
import Mum from './cities/Mum'
import Pun from './cities/Pun'
import Indb from './cities/Indb'
import Jbp from './cities/Jbp'
import Footer from './components/Footer'
import ComingSoon from './components/ComingSoon'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar  />
        <Search />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/underCon' element={<ComingSoon/>}/>
          <Route path='/experience' element={<Exp />} />
          <Route path='/services' element={<Servies />} />
          <Route path='/cities/delhi' element={<Del />} />
          <Route path='/cities/mumbai' element={<Mum />} />
          <Route path='/cities/pune' element={<Pun />} />
          <Route path='/cities/indore' element={<Indb />} />
          <Route path='/cities/jabalpur' element={<Jbp />} />
          <Route path='/detail/:city/:id' element={<Detail />} />
          <Route path='/pay' element={<Pay />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}

export default App

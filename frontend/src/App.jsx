import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Snippetpage from './pages/Snippetpage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/snippet/:uuid' element={<Snippetpage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

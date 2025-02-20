import { useState } from 'react'

import './App.css'
import Timer from './components/Timer.jsx'
import Couter from './components/Counter.jsx'
import KillCounter from './components/KillCounter.jsx'

function App() {


  return (
    <>
      <Timer />
      <Couter />
      <KillCounter />
    </>
  )
}

export default App

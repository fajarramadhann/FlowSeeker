import { useState } from 'react'
import './App.css'
import Bottomnav from './components/Bottomnav';
import HomePage from './components/Homepage';

function App() {
  return (
    <div className="min-h-screen bg-bg dark:bg-darkBg flex flex-col items-center">
      <div className="w-full max-w-lg px-2">
        <HomePage />
        <Bottomnav />
      </div>
    </div>
  )
}

export default App
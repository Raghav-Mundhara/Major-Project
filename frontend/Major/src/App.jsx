import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Upload from './Upload'
import Fetch from './Fetch'

function App() {
  return (
    <div className="App">
      <Upload />
      <Fetch />
    </div>
  )
}

export default App

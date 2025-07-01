import { useState } from 'react'
import './App.css'
import Login from './Login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App(){
  return(
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/forgot-password" element={<Login/>} />

      </Routes>
    </Router>
    </>
  )
}

export default App;


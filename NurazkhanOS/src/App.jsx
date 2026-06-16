
import React from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import Icon from './components/Icon'
export default function App() {
  return (
    <div className="Wallpaper">
      <img src="./bg2.jpg" alt="" />
      <NavBar />
      <h1>Nurazkhan OS</h1>
      <SearchBar />
      <div className="Icons">
        <Icon />
        <Icon />
        <Icon />
      </div>
      
      </div>
  )
}

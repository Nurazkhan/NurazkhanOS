
import React, {Component, useEffect, useState} from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import Icon from './components/Icon'
import Window from './components/Window'
import Player from './components/Player';
import Calculator from './components/Calculator'
import { IoMusicalNotes, IoCalculator ,IoPersonCircleOutline } from "react-icons/io5";
import { VscCircuitBoard } from "react-icons/vsc";
import CircuitLab from './components/CircuitLab'
import About from './components/About'

function MusicIcon(){
  return <IoMusicalNotes size='48' color="white" style={{filter:'drop-shadow(0 0 10px rgba(0,0,0,0.8))'}} />
}


function CalculatorIcon(){
  return <IoCalculator size='48' color="white" style={{filter:'drop-shadow(0 0 10px rgba(0,0,0,0.8))'}} />
}

function CircuitIcon(){
  return <VscCircuitBoard size='48' color="white" style={{filter:'drop-shadow(0 0 10px rgba(0,0,0,0.8))'}} />
}

function AboutIcon(){
  return <IoPersonCircleOutline size='48' color="white" style={{filter:'drop-shadow(0 0 10px rgba(0,0,0,0.8))'}} />
}
const APPS = [
  { id: 1, name: "Player" , Component: Player, icon: MusicIcon},
  { id: 2, name: "Calculator", Component: Calculator, icon: CalculatorIcon },
  { id: 3, name: "Circuit Lab" , Component: CircuitLab ,icon: CircuitIcon},
  {id: 4, name: "About", Component: About ,icon: AboutIcon}
]

export default function App() {
const [isOpen, setIsOpen] = useState(true);
const [windows, setWindows] = useState([
  {id:4},
  
]);

useEffect(()=>{
  console.log(windows)
},[windows])

const [isMinimized, setIsMinimized] = useState(false);
  return (
    <div className="Wallpaper">
      <img src="./bg2.jpg" alt="" />
      <NavBar />
      <h1>Nurazkhan OS</h1>
      <SearchBar />
      <div className="Icons">
        {APPS.map((app) => (
          <Icon key={app.id} app={app} setWindows={setWindows} />
        ))}
      </div>
        

      {windows.map((window, index)=>(
        <Window key={index} id={window.id} app ={APPS.find(a => a.id === window.id)} setClose={()=>{setWindows(prevWindows => prevWindows.filter(item => item.id !== window.id ))}} >
          {APPS.find(a => a.id === window.id)?.Component && React.createElement(APPS.find(a => a.id === window.id).Component)}
        </Window>
      ))}
      
      </div>
  )
}

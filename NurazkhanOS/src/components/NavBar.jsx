import React, {useState, useEffect} from 'react'

export default function NavBar() {
const [time, setTime] = useState(new Date().toLocaleTimeString())

useEffect(() => {
    const timer = 
        setInterval(()=> {
            setTime(new Date().toLocaleTimeString())}, 1000);

            return () => clearInterval(timer);},[])
        


  return (
    <div className="NavBar">
        <p>Nurazkhan OS</p>
        <div className='NavBarComponents'>
            <p>Emperor</p>
        <p>Settings</p>
        {/* in future will add icons */}
        <p>{time}</p>
        <p>Wifi</p>
        </div>
        
    </div>
  )
}

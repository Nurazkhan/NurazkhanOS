import React from 'react'

export default function Icon({setWindows, app }) {

  const handleIconPress =()=>{
    setWindows( prevWindows => {

      const AlreadyExists = prevWindows.some(window => window.id === app.id)

      if (AlreadyExists) {
        return prevWindows;
      }else{
        return [...prevWindows, {id:app.id}]
      }

    }


    )
    
  }

  const IconComponent =app.icon

  return (
    <div className="Icon" onClick={handleIconPress} >
     < IconComponent />
      
        </div>
  )
}

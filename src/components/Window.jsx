import React, { useState, useEffect, useRef, Component } from 'react'



export default function Window({setClose, id, children, app}) {


const Wheight = window.innerHeight;
const Wwidth = window.innerWidth;  

const clickOffset = useRef({x: 0, y: 0});
const startingPosition = useRef({x:0, y:0})
const [position, setPosition] = useState({x: Wwidth/4, y: Wheight/4});
const [windowSize, setWindowSize] = useState({width: Wwidth*0.2, height: Wheight*0.4})
const isDragging = useRef(false)
const isResizing = useRef(false)

const handlePointerDown = (e) => {
    isDragging.current = true;
   const headerRect = e.currentTarget.getBoundingClientRect();
    clickOffset.current = {
        x: e.clientX - headerRect.left,
        y: e.clientY - headerRect.top
    }
    e.currentTarget.setPointerCapture(e.pointerId);
}

const handlePointerMove = (e)=>{
 const windowElement = e.currentTarget.parentElement;
 const parent = windowElement?.parentElement?.getBoundingClientRect();

 const parentX = parent ? parent.left : 0;
 const parentY = parent ? parent.top :0;
    if (!isDragging.current) return;

setPosition({
    x: e.clientX - parentX - clickOffset.current.x,
    y: e.clientY - parentY - clickOffset.current.y
})
}

const handlePointerUp = (e)=> {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId)
}


const handlePointerDownResize = (e) => {
    isResizing.current = true;

   const Rect = e.currentTarget.getBoundingClientRect();
    startingPosition.current = {
        x: e.clientX,
        y: e.clientY 
    }
    e.currentTarget.setPointerCapture(e.pointerId);
}

const handlePointerMoveResize = (e)=>{
 

    if (!isResizing.current) return;

    const deltaX = e.clientX-startingPosition.current.x;
    const deltaY =e.clientY-startingPosition.current.y;

setWindowSize((prev) => ({ 
    width: Math.max(200, prev.width + deltaX),
    height: Math.max(150, prev.height + deltaY)
}))
startingPosition.current = {x: e.clientX, y: e.clientY}
}

const handlePointerUpResize = (e)=> {
    isResizing.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId)
}



  return (
    <div className="Window"  style={{left: `${position.x}px`, top: `${position.y}px`,width: `${windowSize.width}px`,height: `${windowSize.height}px`, touchAction: 'none', userSelect: 'none'}} >
<div className="WindowHead" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}   >
            <p className='AppTitle'>{app.name}</p> 
            <div className= "WindowHeadButtons"  onPointerDown={(e) => e.stopPropagation()}>
                <button id="minimize" onClick={setClose}></button>
                <button id="maximize"></button>
                <button id="close"></button>
            </div>
        </div>
        
            {children}
        
    <div className='Resize' onPointerDown={handlePointerDownResize} onPointerMove={handlePointerMoveResize} onPointerUp={handlePointerUpResize}></div>
    </div>
    
        
        
  )
}

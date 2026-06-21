import React, { useEffect, useRef, useState } from 'react'

export default function CircuitLab() {
    // is components in circuit
const [isRunning,setIsRunning]= useState(false)
const [isCorrect,setIsCorrect]= useState(false);
const [isBatteryCon, setIsBatteryCon] = useState(false); // is battery in circuit
const [isLEDCon, setIsLEDCon] = useState(false); 
const [isResistorCon, setIsResistorCon] = useState(false); 
const [isWireOpen, setIsWireOpen] =useState(false);
const [OpenWire, setOpenWire] = useState({
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0
})
// for dragging
const dragStart = useRef({
    x:0, y:0
});
const labRef = useRef(null);
const [Position, setPosition]= useState({
   battery:{x:0, y:0},
   resistor:{x:100,y:40},
   LED: {x:50, y:0} 
})

const [connections, setConnections] =useState([

])

useEffect(()=>{
    console.log(connections);
        console.log( OpenWire)
}, [connections])

const circuitCon = []

const handlePointerDown = (e, activeId)=>{
    const rect = e.currentTarget.getBoundingClientRect();
    
    const elementStartX = rect.left;
    const elementStartY= rect.top;

    const mouseStartX = e.clientX;
    const mouseStartY = e.clientY;
   


    const dragging = true;

    dragStart.current = {
        elementStartX,
        elementStartY,
        mouseStartX,
        mouseStartY,
        dragging,
        activeId
    }
    
    e.currentTarget.setPointerCapture(e.pointerId)
}


const handlePointerMove = (e, activeId)=>{

    if (!dragStart.current.dragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = labRef.current.getBoundingClientRect();
    
    const deltaX = e.clientX - dragStart.current.mouseStartX;
    const deltaY = e.clientY - dragStart.current.mouseStartY;

    const minX = 0;
    const minY = 0;
    const maxX = parentRect.width - rect.width;
    const maxY = parentRect.height - rect.height;

   

    const elementX = dragStart.current.elementStartX + deltaX - parentRect.left ;
    const elementY = dragStart.current.elementStartY + deltaY - parentRect.top  ;

     const BoundedX = Math.min(maxX, Math.max(35,elementX ))  ;
     const BoundedY = Math.min(maxY, Math.max(30,elementY ));
    
    switch (activeId){
case "battery":
setPosition(prev => ({
        battery:{x:BoundedX, y:BoundedY},
   resistor:{x:prev.resistor.x,y:prev.resistor.y},
   LED: {x:prev.LED.x, y:prev.LED.y} 
    }))
    break;
    case "resistor":
        setPosition(prev => ({
        battery:{x:prev.battery.x, y:prev.battery.y},
   resistor:{x:BoundedX,y:BoundedY},
   LED: {x:prev.LED.x, y:prev.LED.y} 
    }))
    break;
    case "LED":
        setPosition(prev => ({
        battery:{x:prev.battery.x, y:prev.battery.y},
   resistor:{x:prev.resistor.x,y:prev.resistor.y},
   LED: {x:BoundedX,y:BoundedY} 
    }))
    break;

    }

    
    
}

const handlePointerUp = (e) =>{
    dragStart.current.dragging = false;
    e.currentTarget.releasePointerCapture(e.pointerId)
}

const handlePinClick = (e,pin) => {

if (isWireOpen){
setIsWireOpen(false);
const rect = e.currentTarget.getBoundingClientRect();
const parent = labRef.current.getBoundingClientRect();
setConnections(prev => ([...prev,{
    x1: OpenWire.x1,
    y1: OpenWire.y1,
    x2: rect.left - parent.left,
    y2: rect.top + rect.height/2 - parent.top,
    from: OpenWire.pin,
    to: pin
} ]))
setOpenWire(prev => ({
    x1: prev.x1,
    y1: prev.y2,
    x2: rect.left - parent.left,
    y2: rect.top + rect.height/2 - parent.top,
    pin: pin
}))
return;
}

const rect = e.currentTarget.getBoundingClientRect();
const parent = labRef.current.getBoundingClientRect()
setOpenWire(prev => ({
    x1: rect.left - parent.left,
    y1: rect.top + rect.height/2 - parent.top,
    x2: prev.x2,
    y2: prev.y2,
    pin: pin
}))
e.currentTarget.setPointerCapture(e.pointerId)
setIsWireOpen(true);
}

const handlePinMove = (e, pin)=>{
    const parent = labRef.current.getBoundingClientRect()

    setOpenWire(prev => ({
    x1: prev.x1,
    y1: prev.y1,
    x2: e.clientX - parent.left,
    y2: e.clientY - parent.top,
    pin: prev.pin
}))

}

const checkCircuit= ()=>{
    setIsRunning(prev => !prev);
    var stage1 = false;
var stage2 = false;

    for(const connection of connections){
        if((connection.from ==1 && connection.to == 6) || (connection.from == 6 && connection.to == 1)){
            stage1=true;
        }
        else if(connection.from +1 == connection.to || connection.to +1 == connection.from){
            stage2 = true;
        }
        else{
            stage2 = false;
        }
    }
    console.log(stage1)
    console.log(stage2)
    if(stage1 && stage2){
        setIsCorrect(true)
    }

}

  return (
    <div className='WindowContent'> 

    <div className="LabArea"onPointerMove={handlePinMove} ref={labRef} >
        <svg width="100%" height="100%" style={{ border: '1px solid #ccc' }}>
          {isWireOpen ? <line x1={OpenWire.x1} x2={OpenWire.x2} y1={OpenWire.y1} y2={OpenWire.y2}  stroke="blue" strokeWidth="4" /> : ''}
            {connections.map(item => (
                 <line x1={item.x1} x2={item.x2} y1={item.y1} y2={item.y2} stroke="blue" strokeWidth="4"  />
            ))}
        </svg>

    <div className="Battery"  onPointerDown={(e) => handlePointerDown(e, "battery")} onPointerMove={(e) => handlePointerMove(e, "battery")} onPointerUp={handlePointerUp} style={{position:'absolute', top: `${Position.battery.y}px`, left: `${Position.battery.x}px`}}>
        <button onPointerDown={(e)=>handlePinClick(e,1)} >-</button>
        5V
        <button onPointerDown={(e)=>handlePinClick(e,2)}>+</button>
    </div>

    <div className="LED" onPointerDown={(e) => handlePointerDown(e, "LED")} onPointerMove={(e) => handlePointerMove(e, "LED")} onPointerUp={handlePointerUp} style={{position:'absolute', top: `${Position.LED.y}px`, left: `${Position.LED.x}px`}}>
         <button onPointerDown={(e)=>handlePinClick(e,3)}>+</button>
      <img src='/LED.png' style={{width: '2vw',height:'auto', position: 'relative' }} className={(isCorrect && isRunning) ? "LEDIMGGLOW":"LEDIMG"} />
        <button onPointerDown={(e)=>handlePinClick(e,4)}>-</button>
    </div>

    <div className="Resistor" onPointerDown={(e) => handlePointerDown(e, "resistor")} onPointerMove={(e) => handlePointerMove(e, "resistor")} onPointerUp={handlePointerUp} style={{position:'absolute', top: `${Position.resistor.y}px`, left: `${Position.resistor.x}px`}}>
         <button onPointerDown={(e)=>handlePinClick(e,5)}>*</button>
        <p>220 Ω</p>
        <button onPointerDown={(e)=>handlePinClick(e,6)}>*</button>
    </div>

<button className='RunButton' onClick={checkCircuit}>{isRunning ? "stop": "run"}</button>

    </div>
    
    </div>
  )
}

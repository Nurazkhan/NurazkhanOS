import React, {useEffect, useRef, useState} from 'react'
import { RxLoop } from "react-icons/rx";
import { IoVolumeHighSharp } from "react-icons/io5";
import { IoPlayForwardSharp, IoPlayBackSharp } from "react-icons/io5";

import { IoMdVolumeOff } from "react-icons/io";
import { MdAutoMode } from "react-icons/md"
import { FaPlay } from "react-icons/fa";
const SONGS =[
    {
        title: "Sinking Town",
        author: "𝐘𝐨𝐞𝐤𝐨 𝐊𝐮𝐫𝐚𝐡𝐚𝐬𝐡𝐢",
        src: '/SinkingTown.mp3',
        cover: '/SinkingTown.png',
        
    },
    {
        title: "Chicago",
        author: "Michael Jackson",
        src: '/Chicago.mp3',
        cover: '/Chicago.png',
        
    },
    {
        title: "Charlies Inferno",
        author: "That Handsome Devil",
        src: '/CharliesInferno.mp3',
        cover: '/CharliesInferno.png', 

    }

]

export default function Player() {
const [isPlaying, setIsPlaying] = useState(false)
const [currentSong, setCurrentSong] = useState(0);
const [ currentTime, setCurrentTime] = useState(0);
const [isPressed, setIsPressed] = useState(false)
const isPressedVolume = useRef(false);
const audio = useRef(new Audio(SONGS[currentSong].src))
const [progressPercent, setProgressPercent] = useState(currentTime / audio.current.duration *100)

const [isMuted, setIsMuted] = useState(false)
const [isLooped, setIsLooped] = useState(false)
const [isAutoPlay, setIsAutoPlay] =useState(false)




useEffect(()=>{

    const handleTimeChange = ()=>{
        
        if(isPressed) return;
        const percent = audio.current.currentTime / audio.current.duration *100;
        setProgressPercent(percent);
        
        setCurrentTime(audio.current.currentTime);
    }

    audio.current.addEventListener('timeupdate', handleTimeChange);
    audio.current.addEventListener('ended', ()=>{
        setIsPlaying(false);
        if(isAutoPlay && (currentSong <= SONGS.length-1)){
            nextSong();
        }
       
    }    
    )

return () => {
    audio.current.removeEventListener('timeupdate', handleTimeChange);
   
  };



},[isAutoPlay,currentSong, isLooped, isPressed])


const togglePlayback = () => {
    

    if(isPlaying){
        audio.current.pause();
       
      
    }else{
        audio.current.play()
       
        
    }

    setIsPlaying(!isPlaying);
}

const nextSong = () => {
    setCurrentSong(currentSong +1);
    audio.current.src = SONGS[currentSong+1].src;
    audio.current.load();
    audio.current.play();
    setIsPlaying(true);


}
const previousSong = () => {
    setCurrentSong(currentSong -1);
    audio.current.src = SONGS[currentSong-1].src;
    audio.current.load();
    audio.current.play();
    setIsPlaying(true);
}

const handlePointerDown = (e)=> {
const rect = e.currentTarget.getBoundingClientRect();

 audio.current.currentTime = (e.clientX- rect.left)/rect.width * audio.current.duration // LETSSSS GOOO IT WORKS
 setIsPressed(true);
  e.currentTarget.setPointerCapture(e.pointerId);
}

const handlePointerMove = (e)=> {
    if(isPressed){
        const rect = e.currentTarget.getBoundingClientRect();
const newPercent = ((e.clientX-rect.left)/rect.width)*100;
const boundaries = Math.max(0, Math.min(100, newPercent))

setProgressPercent(boundaries)
 
    }

}
const handlePointerUp = (e)=>{
    if(isPressed){
        const rect = e.currentTarget.getBoundingClientRect();
        const clickPositionPercent = (e.clientX - rect.left)/rect.width;
        const boundedPosition = Math.max(0, Math.min(1, clickPositionPercent))
        
        const finalTime = boundedPosition*audio.current.duration;
    audio.current.currentTime = finalTime;
    setCurrentTime(finalTime);
    setIsPressed(false);

}

    
}


const handlePointerDownVolume = (e)=> {
const rect = e.currentTarget.getBoundingClientRect();

 audio.current.volume = (e.clientX- rect.left)/rect.width  // LETSSSS GOOO IT WORKS
 isPressedVolume.current = true;
 e.currentTarget.setPointerCapture(e.pointerId);
}

const handlePointerMoveVolume = (e)=> {
    if(isPressedVolume.current){
        const rect = e.currentTarget.getBoundingClientRect();
 audio.current.volume = (e.clientX- rect.left)/rect.width
    }

}
const handlePointerUpVolume = (e)=>{
    isPressedVolume.current = false;
}
  return (
    <div className='WindowContent'>
          
    <img src={SONGS[currentSong].cover} className='SongImage' />
   

           
    
     
        
        <div className="SongInfo">
            <p className='SongTitle'>{SONGS[currentSong].title}</p>
        <p className = 'SongAuthor'> {SONGS[currentSong].author}</p>
        </div>
       


        <div className="AudioControl">
             {( 0 < currentSong) && <button onClick={previousSong}  className='SongChange'> <IoPlayBackSharp /> </button> }
            <button onClick={togglePlayback} className='SongPlay'>{isPlaying ? "||":<FaPlay />}</button>
        {(SONGS.length-1) > currentSong && <button onClick={nextSong} className='SongChange'><IoPlayForwardSharp /></button> }
       
        </div>
        
       <div className='TimeIndicatorContainer'>
        <p>{Math.floor(audio.current.currentTime/60)}:{Math.round(audio.current.currentTime%60) < 10 ? '0'+Math.round(audio.current.currentTime%60):Math.round(audio.current.currentTime%60)}</p>
        <p>{Math.floor(audio.current.duration/60)}:{Math.round(audio.current.duration%60) < 10 ? '0'+Math.round(audio.current.duration%60):Math.round(audio.current.duration%60)}</p>
       </div>
        <div className='TotalDurationBar' onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}>
        <div className="ProgressBar" style={{width: `${progressPercent +4 }% `}}>
        <div className="CircleProgress"></div></div>
        </div>
   

        <div className='VolumeContainer'>
            <div className='OnlyVolumeContainer'>
                <p onClick={()=>{setIsMuted(prevValue => !prevValue); audio.current.muted = !audio.current.muted }} style={{cursor:'pointer'}} className='VolumeIcon'>
                    {isMuted ? <IoMdVolumeOff color='white' />:<IoVolumeHighSharp  color='white' />  }
                    
                    </p>
            <div className='TotalVolumeBar' onPointerDown={handlePointerDownVolume} onPointerMove={handlePointerMoveVolume} onPointerUp={handlePointerUpVolume} onPointerLeave={handlePointerUpVolume}>
        <div className="VolumeBar" style={{width: `${audio.current.volume * 100}% `}} >
        <div className="CircleVolume"></div></div></div> </div>
            
        
        <div className="ExtraControlContainer">

        <button className={`ExtraControlContainerButton${isLooped ? 'Active': ''}`} onClick={()=>{
            const nextLoopState = !isLooped;
            setIsLooped(nextLoopState);
            setIsAutoPlay(false);
            audio.current.loop = nextLoopState;
        }} ><RxLoop /></button>
<button className={`ExtraControlContainerButton${isAutoPlay ? 'Active': ''}`} onClick={()=>{
            const nextAutoPlayState = !isAutoPlay
            setIsAutoPlay(nextAutoPlayState);
            setIsLooped(false);
        }} ><MdAutoMode /></button>
        </div>

        </div>
        

    </div>
  )
}

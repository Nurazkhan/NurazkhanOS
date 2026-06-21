import React from 'react'
import { FaGithubSquare,FaInstagramSquare ,FaLinkedin  } from "react-icons/fa";
export default function About() {
  return (
    <div className='WindowContent'>
        <img src="me.jpg" className='MeIMG' />
        <div className="Socials">
            <a href='https://github.com/Nurazkhan/' target='_blank' ><FaGithubSquare color='black' /></a>
       <a href='https://www.instagram.com/nurazkhannygmet/' target='_blank'><FaInstagramSquare color='black'  /></a> 
<a href='https://www.linkedin.com/in/nurazkhan-nygmet-4a8799370/' target='_blank'><FaLinkedin  color='black' /></a>

        </div>
        <p className='Me'>Hi! my name is Nurazkhan</p>
        <p className='Me2'>  From the start of the Middle School, I was a tech guy.
            One that codes apps that doesn't exist,
            One that builds things that are not on sale,
            One Humble soul, who is always ready for new chapters.
            Please Contact me if you have interesting idea, or something to tell to me!
        </p>
     
        <p className='Me4'>
             Made with love, Born Kazakh
        </p>
        
        
    </div>
  )
}

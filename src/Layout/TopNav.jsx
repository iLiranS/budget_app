import React, { useState } from 'react'
import {BsCalendarMonth} from 'react-icons/bs'
import {AiOutlineMenu,AiOutlineCompass} from 'react-icons/ai'
import {FiUser} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import {FaQuestionCircle} from 'react-icons/fa'
import Portal from './Portal';

const TopNav = () => {
  const [navOpen,setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(prev =>!prev);
  
  return (
    <section className={`${navOpen && ' ml-44'} duration-500 absolute transition-all flex h-max  pt-4 overflow-hidden px-4`}>
      <AiOutlineMenu onClick={toggleNav} className={`text-4xl cursor-pointer z-30 ${navOpen && 'rotate-90'} transition-all duration-500`}/>
      {navOpen &&
       <Portal closePortal={toggleNav}>
        <section className='h-max  py-2 z-30 rounded-xl bg-white bg-opacity-20 ml-2 mt-2 backdrop-blur-md w-44 animate-navEntrance transition-all left-0 px-2 flex flex-col relative justify-between'>

          <ul className='grid grid-cols-2 gap-4'>
            <NavLink onClick={toggleNav} to={'/'} className='sideItem '><AiOutlineCompass className='text-xl'/>Home</NavLink>
            <NavLink onClick={toggleNav} to={'/history'} className='sideItem '><BsCalendarMonth className='text-xl'/>History</NavLink>
            <NavLink onClick={toggleNav} to={'/faq'} className='sideItem '><FaQuestionCircle className='text-xl'/> FAQ</NavLink>
            <NavLink onClick={toggleNav} to={'/options'} className='sideItem'><FiUser className='text-xl'/>User</NavLink>
          </ul>

    

        </section>
       </Portal>

      }
  
 
  </section>
  )
}

export default TopNav
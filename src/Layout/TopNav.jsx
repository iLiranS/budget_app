import React, { useState } from 'react'
import {BsCalendarMonth} from 'react-icons/bs'
import {AiOutlineMenu,AiOutlineCompass} from 'react-icons/ai'
import {VscSettings} from 'react-icons/vsc'
import {FiUser} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import {FaQuestionCircle} from 'react-icons/fa'
import Portal from './Portal';

const TopNav = () => {
  const [navOpen,setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(prev =>!prev);
  
  return (
    <section className={`${navOpen && ' ml-44'} duration-500 absolute transition-all flex h-max  pt-4 overflow-hidden px-4`}>
      <AiOutlineMenu onClick={toggleNav} className={`text-2xl cursor-pointer z-30 ${navOpen && 'rotate-90'} transition-all duration-500`}/>
      {navOpen &&
       <Portal closePortal={toggleNav}>
        <section className='h-[100dvh] py-2 z-30 rounded-r-xl bg-gray-500 bg-opacity-30 backdrop-blur-md w-44 animate-navEntrance transition-all left-0 px-2 flex flex-col relative justify-between'>

          <ul>
            <NavLink onClick={toggleNav} to={'/'} className='sideItem '><AiOutlineCompass/>Home</NavLink>
            <NavLink onClick={toggleNav} to={'/history'} className='sideItem '><BsCalendarMonth/>Recent Months</NavLink>
            <NavLink onClick={toggleNav} to={'/faq'} className='sideItem '><FaQuestionCircle/> FAQ</NavLink>
          </ul>

        <div className='sideItem'>
        <FiUser/>
            <NavLink onClick={toggleNav} to={'/options'}> User Settings</NavLink>
        </div>

        </section>
       </Portal>

      }
  
 
  </section>
  )
}

export default TopNav
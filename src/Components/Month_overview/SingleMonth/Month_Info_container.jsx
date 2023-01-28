import React, { useRef, useState } from 'react'
import Month_Graph from './Month_Graph';
import Month_Overview from './Month_Overview'
import {AiOutlinePlus} from 'react-icons/ai'
import AddPage from '../AddPage';
const Month_Info_container = props => {
    const {currentMonthActions , isActiveMonth} = props;
    const [currentPage , setCurrentPage] = useState(0);
    const [addPageActive,setAddPageActive] = useState(false);
    const listRef = useRef();

    const checkScroll = e =>{
        const list = e.target;
        const width = list.offsetWidth;
        if (list.scrollLeft > width/2) setCurrentPage(1);
        else setCurrentPage(0);
    }
    const setScroll = index =>{
        listRef.current.scrollLeft = listRef.current.offsetWidth * index;
    }
    const addAction = () =>{
      setAddPageActive(true);
    }


  return (
    <div onScrollCapture={checkScroll} className=' overflow-auto  h-full grid grid-rows-[auto,max-content] relative gap-4'>

    <ul  ref={listRef}
    className='relative snap-mandatory overflow-y-hidden scroll-smooth snap-x overflow-x-auto grid grid-cols-[100vw,100vw]
       '>
   <Month_Overview currency={props.currency} budget={props.budget} datePath={props.datePath} deleteAction={props.deleteAction} actions={currentMonthActions}/>
   <Month_Graph currency={props.currency} page={currentPage} actions={currentMonthActions}/>
   </ul>

   <section className='flex gap-4  w-full justify-center h-max mb-2 relative'>
    <div onClick={()=>{setScroll(0)}} className={`h-4 cursor-pointer w-4 border-[1px] border-gray-700 rounded-full ${currentPage===0 ? 'bg-gray-700' : 'bg-transparent'}`}></div>
    <div onClick={()=>{setScroll(1)}} className={`h-4 cursor-pointer w-4 border-[1px] border-gray-700 rounded-full ${currentPage===1 ? 'bg-gray-700' : 'bg-transparent'}`}></div>
  
    {isActiveMonth &&
    <section onClick={addAction} className='absolute bottom-full bg-gray-700  rounded-full dark:bg-white cursor-pointer hover:scale-105 transition-all text-4xl  left-1/2 -translate-x-1/2'>
      <AiOutlinePlus className='dark:fill-gray-700 fill-white'/>
      </section>
    }
    {addPageActive && <AddPage currency={props.currency} datePath={props.datePath} closePortal={()=>{setAddPageActive(false)}}/>}
   </section>

   </div>
  )
}

export default Month_Info_container
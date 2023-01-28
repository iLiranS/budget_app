import React, { useState } from 'react'
import {FaSortAmountDown} from 'react-icons/fa'

const Month_Overview_filter = props => {
    const {filter} = props;


    const updateFilter = num => { props.updateFilter(num);  }

  return (
    <section className=' flex animate-entranceTest justify-between px-4 items-center dark:bg-white bg-gray-700 dark:bg-opacity-5 bg-opacity-20 rounded-md md:w-[90%] md:justify-self-center'>
    <p>{filter ===0 && 'Recent actions'} {filter===1 && 'Categories'} {filter===2 && 'Highest actions'}</p>


    <div  className='select-none relative cursor-pointer group'>
        <section  className='flex items-center gap-2 relative'>
            <p>Sort By</p>
         <FaSortAmountDown className='group-hover:rotate-180 transition-all'/>
        </section>
        <ul className={`flex-col  z-10 rounded-xl bg-opacity-10  absolute bg-white  gap-2 text-center right-0 bottom-0 translate-y-full hidden group-hover:flex`}>
            <li onClick={()=>{updateFilter(0)}} className='filterItem'>Recent</li>
            <li onClick={()=>{updateFilter(1)}} className='filterItem'>Categories</li>
            <li onClick={()=>{updateFilter(2)}} className='filterItem'>Highest</li>
        </ul>
    </div>
    
</section>
  )
}

export default Month_Overview_filter
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center gap-4'>
        <p>Page Not Found ! 404</p>
        <Link className='text-violet-300 p-2 bg-white bg-opacity-10 rounded-xl hover:bg-opacity-20 transition-all' to={'/'}>Back to home</Link>
        </div>
  )
}

export default NotFound
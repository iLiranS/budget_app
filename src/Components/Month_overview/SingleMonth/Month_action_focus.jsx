import React from 'react'
import Portal from '../../../Layout/Portal'
import {TiDelete} from 'react-icons/ti'


const Month_action_focus = props => {
    const {date , type , desc , amount , category,currency} = props;
    const exit = e => {
      e.stopPropagation()
      props.onExit();
    }

    const deleteAction = (e) =>{
      e.stopPropagation();
     props.deleteAction()
  }

  const editAction = e =>{
    e.stopPropagation();
    props.editAction();
  }

  return (
    <Portal closePortal={exit}>
        <div className={`flex flex-col text-white animate-entranceTest gap-2 origin-left absolute centerSelf p-4 w-[90%] max-w-[350px]  rounded-lg z-30 bg-opacity-30 backdrop-blur-sm bg-gray-700 border-[1px] ${type==='income' ? 'border-green-500' : 'border-red-500'}`}>
        <TiDelete onClick={exit} className='absolute fill-white right-0 top-0 cursor-pointer text-4xl hover:scale-105 transition-all'/>
            <p className=' tracking-wider text-center '>{date}</p>
            <p><span className='text-blue-200'>Type :</span> {type}</p>
            <p className=' w-full'><span className='text-blue-200'>Category : </span> {category}</p>
            <p className={ `w-full`}> <span className='text-blue-200'>Amount :</span> <span className={`${type==='income' ? 'text-green-500' : 'text-red-500'}`}>{currency}{amount}</span></p>
            <p className=' w-full max-w-full max-h-[200px] overflow-y-auto'><span className='text-blue-200'>Description :</span> {desc}</p>
            <section className='flex w-full justify-evenly'>
              <button onClick={editAction} className={`btn text-white ${type==='income' ? 'shadow-green-500 hover:shadow-green-500' : 'shadow-red-500 hover:shadow-red-500'}`}>Edit</button>
              <button onClick={deleteAction} className={`btn text-white ${type==='income' ? 'shadow-green-500 hover:shadow-green-500' : 'shadow-red-500 hover:shadow-red-500'}`}>Delete</button>
            </section>


        </div>
    </Portal>
  )
}

export default Month_action_focus
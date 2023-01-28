import React from 'react'
import ReactDOM from 'react-dom'


const Portal = props => {
    const closePortal = e =>{
      props.closePortal(e);

    }
    

    const content = 
    <div className='absolute w-full h-full top-0'>
        <div onClick={closePortal} className='h-full absolute top-0 w-full bg-black bg-opacity-50 z-20'></div>
        {props.children}
        
    </div>


  return ReactDOM.createPortal(content,document.getElementById('cover'));
}

export default Portal
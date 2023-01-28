import React from 'react'

const FaqPage = () => {
  return (
    <div className='w-ful h-full relative grid place-items-center'>

      <p className='text-center absolute top-4 md:top-10'> FAQ</p>
      <div className='relative animate-entranceTest px-2 py-2 overflow-y-auto rounded-xl flex flex-col gap-4  w-full h-full max-w-[500px] max-h-[500px] bg-white bg-opacity-10'>

      <section>
      <p> <span className='text-green-500'>Q:</span>Why did you create this website?</p>
      <p><span className='text-blue-500'>A:</span> I created this site for practicing some of the technologies I've learned, such as React , Tailwind , zustand , using libraries , react router , vite , PWA</p>
      </section>

      <section>
        <p><span className='text-green-500'>Q:</span> Will I update this website ?</p>
        <p><span className='text-blue-500'>A:</span> Probably no , maybe small bug fixes. overall its a ready to use website for personal use</p>
      </section>

      <section>
        <p><span className='text-green-500'>Q:</span>What is PWA app ?</p>
        <p><span className='text-blue-500'>A:</span>This website can be downloaded as <a className='text-violet-500' href='https://web.dev/progressive-web-apps/' target='_blank'>PWA APP</a>, so you can use it offline as an app! </p>
      </section>

      <section>
      <p><span className='text-green-500'>Q:</span>How can I contact you?</p>
      <p><span className='text-blue-500'>A:</span>You dont. 😙  here is my <a target='_blank' href='https://github.com/iLiranS' className='text-violet-500'>github profile</a> </p>
      </section>

      <section>
      <p><span className='text-green-500'>Q:</span>What is missing on the site?</p>
      <p><span className='text-blue-500'>A:</span> Some theme/UI customization especially for desktop , probably some bugs I didn't notice , more tools to help saving some $$$ </p>
      </section>

      <section className=' flex flex-col gap-1'>
      <p><span className='text-green-500'>Q:</span>Some info about the site's features :</p>
      <p><span className='text-blue-500'>A:</span> Transactions add/edit/remove , automatically detects new month and saves old month and option to compare them.</p>
      <p>user settings such as budget,currency, monthly basis transactions that automatically added.</p>
      <p> settings saves via localStorage and data using indexedDB .</p>
      </section>

      </div>

      </div>
  )
}

export default FaqPage
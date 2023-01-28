import React from 'react'
import { useState , useEffect } from 'react'
import {MdArrowDropDown} from 'react-icons/md'
import { TiDelete } from 'react-icons/ti';
import useCategoriesStore from '../store/Categories';
import useSettingsStore from '../store/Settings';


const OptionsPage = () => {
  const settings = useSettingsStore();
  const cattegoriesData = useCategoriesStore();
  const [theme,setTheme] = useState(settings.theme); 
  const [currency,setCurrency] = useState(settings.currency) // 0 $ , 1 € , 2 £ , 3 ₪ 
  const [currnecyListOpen,setCurrencyListOpen] = useState(false);
  const [budget,setBudget] = useState(settings.budget);
  const [monthlyDay,setMonthlyDay] = useState(settings.monthlyDay);
  const [isDone,setIsDone] = useState(false);
  
  const toggleCurrencyList = () => setCurrencyListOpen(prev =>!prev);
  const updateCurrency = curr => {setCurrency(curr); setCurrencyListOpen(false)}
  const updateBudget = e => setBudget(e.target.value);
  const updateMonthlyDay = e => setMonthlyDay(e.target.value);
  
  useEffect(() => {
    setIsDone(false);
    
    
  }, [theme,currency,budget,monthlyDay])
  const currneciesList = ['$','€','£','₪','₽','¥'];
  const currnecyMapped = currneciesList.map((category,index) => <li onClick={()=>{updateCurrency(category)}} key={index} className='categoryListItem'>{category}</li>)


  const saveChanges = () =>{
    const obj = {theme,currency,budget,monthlyDay}
    settings.setSettings(obj);
    setIsDone(true);

  }

const removeCategoryHandler = category => {
  const confirmDelete = window.confirm(`Remove category '${category}' ? `);
  if (confirmDelete) cattegoriesData.removeCategory(category);
}
const categoriesMapped = cattegoriesData.categories.map((cat,index) => <li key={index} className='flex gap-2 justify-between odd:bg-gray-800 odd:bg-opacity-20 even:bg-gray-400 even:bg-opacity-20 items-center text-xl'> <p>{cat}</p> <TiDelete onClick={()=>{removeCategoryHandler(cat)}} className='cursor-pointer text-3xl text-red-500'/> </li>)
 

  return (
    <div className='w-full h-full relative grid place-items-center'>
      <p className='absolute top-4 md:top-10'>User Settings :</p>
      <section className='w-full animate-entranceTest max-w-[500px] relative md:px-8 px-2 py-2 md:py-8 bg-white bg-opacity-10 rounded-xl h-full max-h-[500px] flex flex-col gap-4'>
        
       <div className='flex flex-col items-center gap-2 md:flex-row md:justify-between'>
        <p>Theme :</p>
        <section className='flex gap-4'>
          <div onClick={()=>{setTheme('Dark')}} className='flex flex-col items-center gap-2 cursor-pointer'> Dark <section className={`w-4 h-4 rounded-full dark:border-white border-gray-700 border-2 ${theme==='Dark' && 'bg-blue-500'}`}></section> </div>
          <div onClick={()=>{setTheme('Light')}} className='flex flex-col items-center gap-2 cursor-pointer'> Light <section className={`w-4 h-4 rounded-full dark:border-white border-gray-700 border-2 ${theme==='Light' && 'bg-blue-500'}`}></section> </div>
          <div onClick={()=>{setTheme('System')}} className='flex flex-col items-center gap-2 cursor-pointer'> System <section className={`w-4 h-4 rounded-full dark:border-white border-gray-700 border-2 ${theme==='System' && 'bg-blue-500'}`}></section> </div>
        </section>
        </div>

        <div className='flex  items-center justify-between'>
        <p>Currency :</p>

        <div className={`flex relative  bg-gray-700 bg-opacity-30 rounded-md  ${currnecyListOpen ? 'bg-opacity-20' : 'bg-opacity-10 '}`}>
          <p className='px-2'>{currency}</p>
        <section className={`text-2xl cursor-pointer bg-gray-700 bg-opacity-30 dark:bg-white dark:bg-opacity-10`}>
      <MdArrowDropDown onClick={toggleCurrencyList} className={`${currnecyListOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-500`}/>
        </section>
      {currnecyListOpen &&
       <ul className='flex bg-amber-300 group dark:bg-gray-800 z-10  overflow-y-auto max-h-36 flex-col absolute top-full left-1/2 -translate-x-1/2 gap-1 translate-y-1 w-full'>
        {currnecyMapped}
       </ul>}

       </div>
    </div>

    <section className='flex justify-between'>
        <p>Monthly Budget :</p>
        <div className='flex px-2 bg-gray-700 bg-opacity-30 dark:bg-opacity-10 dark:bg-white rounded-md relative'>
        <input min={0} placeholder='budget' className=' text-center bg-transparent w-20' type='number' value={budget} onChange={updateBudget}/>
        {currency}
        </div>
    </section>

    <section className='flex justify-between'>
      <p>Monthly Day Charge: <span className='text-sm opacity-50'>for monthly basis actions</span></p>
      <input onChange={updateMonthlyDay} className='dark:bg-white text-center dark:bg-opacity-10 w-12 bg-gray-700 bg-opacity-30 rounded-md' type='number' min={1} max={31} value={monthlyDay}></input>
    </section>

    <section className='flex flex-col gap-2'>
      <p>Categories :</p>
      <ul className='flex flex-col max-h-32 overflow-auto'>
        {categoriesMapped}
      </ul>
    </section>

      {isDone && <p className='text-green-500 absolute left-1/2 bottom-20 w-max  -translate-x-1/2'>Settings saved successfully !</p>}

        <section onClick={saveChanges} className='absolute text-white bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 p-2 rounded-md cursor-pointer hover:scale-[1.02]'>
          Save Changes
        </section>

     </section>
     

    </div>
  )
}

export default OptionsPage
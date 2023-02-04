import React, { useReducer, useRef, useState } from 'react'
import Portal from '../../Layout/Portal'
import AddPageCategory from './AddPageCategory';
import useCategoriesStore from '../../store/Categories';
import useDataStore from '../../store/Data';

// get date 
const date = new Date();
const currentDay = date.getDate();

// initial reducer value and dispatch function
const initialOptionsValues = {isExpense:true,isMonthly:false,amount:undefined,category:'',date:currentDay,desc:'' };
const optionsReducer = (state,action)=>{
  switch(action.type){
    case 'isExpense':{ return{...state,isExpense:action.payload} };
    case 'isMonthly':{return{...state,isMonthly:action.payload}};
    case 'amount':{return{...state, amount: action.payload ? parseFloat(action.payload) : undefined}};
    case 'category':{return{...state,category:action.payload}};
    case 'date':{return{...state,date:action.payload}};
    case 'desc':{return{...state,desc:action.payload}};

}
}

const AddPage = props => {
  const initial = props.editMode ? props.obj : initialOptionsValues;
  const [options,optionsDispatch] = useReducer(optionsReducer,initial);
  const [error,setError] = useState(null);
  const addCategory = useCategoriesStore((state)=>state.addCategory);
  const addAction = useDataStore((state)=>state.addAction)
  const editAction = useDataStore((state)=>state.editAction)

    // dispatch functions
    const setExpense = () => optionsDispatch({type:'isExpense',payload:true})
    const setIncome = () => optionsDispatch({type:'isExpense',payload:false})
    const setMonthly = e => optionsDispatch({type:'isMonthly',payload:e.target.checked})
    const setAmount = e => optionsDispatch({type:'amount',payload:e.target.value})
    const setCategory = val => optionsDispatch({type:'category',payload:val})
    const setDate = e => optionsDispatch({type:'date',payload:e.target.value})
    const setDesc = e => optionsDispatch({type:'desc',payload:e.target.value})
    //

    // validation function
    const validateForm = () =>{
      // need to validate amount , category , description , date 
    
      //amount
      if (!options.amount) { setError('Please enter amount !'); return false;}
      if (options.amount > 9999999) {setError(`that's too much money !`); return false;}
      if (options.amount < 1) {setError('Amount must be greater than 0'); return false;}
      // category
      if (options.category.length < 1) {setError('Please enter category !'); return false;}
      if (options.category.length > 30) { setError('Category length is too long !');return false;}
      // date
      if (options.date.length < 1) { setError('Please enter date'); return false;}
      if (parseInt(options.date)>31 || parseInt(options.date)<1) {setError('Please enter a valid date'); return false;}
      // description
      if (options.desc.length > 100) {setError('Description too long'); return false;}

      return true;
    }

      // submit entered data , calls validation function first.
    const submitForm = e =>{
      e.preventDefault();
      e.stopPropagation();
     if ( validateForm()){
      setError(null);
      // add action obj : date , type , desc , amount , category .
      const type = options.isExpense ? 'expense' : 'income';
      const addObj = { date: options.date, type , desc:options.desc , amount:options.amount , category:options.category , isMonthly:options.isMonthly};
      // add category check inside already.
      addCategory(options.category);

      // edit
      if(props.editMode) {
        editAction(props.datePath,props.id,addObj);
      }
      // add
      else {
        addAction(props.datePath,addObj);
      }

       props.closePortal();
     }
    }
    const cancelForm = (e=null) =>{
      e.preventDefault();
      e.stopPropagation();
      props.closePortal();
    }


    const accentColor = options.isExpense ? '#ef4444' : '#22c55e';
  return (
    <Portal closePortal={cancelForm}>
        <form className='absolute gap-4 text-white centerSelf w-[90%] max-w-[500px] pt-2 z-30 h-[80%] max-h-[500px] bg-gray-700 bg-opacity-40 rounded-md backdrop-blur-md flex flex-col'>
            <section className='flex animate-entranceTest justify-evenly relative'>
                <p onClick={setExpense} className={` bg-red-500 cursor-pointer  p-3 rounded-xl ${options.isExpense ? 'bg-opacity-100 text-white   border-white border-2' : 'bg-opacity-30 text-opacity-70 '}`}>Expense</p>
                <p onClick={setIncome} className={` bg-green-500 cursor-pointer  p-3 rounded-xl ${!options.isExpense ? 'bg-opacity-100 text-white  border-white border-2' : 'bg-opacity-30 text-opacity-70 '}`}>Income</p>
                <div className='absolute centerSelf bg-white h-full w-[1px] bg-opacity-50'></div>
            </section>

            <div className='flex flex-col animate-entranceTest  bg-opacity-30 h-full px-8 justify-between pb-8'>

            <div className='flex flex-col gap-4'>
            <section className='flex items-center justify-between'>
            <p>Monthly basis</p>
            <input style={{accentColor:accentColor}}  onChange={setMonthly} checked={options.isMonthly} className='w-5  aspect-square' type='checkbox'/>
            </section>

            <section className='flex items-center justify-between'>
              <p>Amount <span  style={{color:accentColor}}> ({props.currency})</span></p>
              <section className='flex gap-1'>
              <input step='any'  placeholder='1 - ∞' className='bg-opacity-10 bg-white rounded-md outline-none w-20 text-center'  onChange={setAmount} value={options.amount ?? ''} type='number'></input>     
              </section>
            </section>

          <AddPageCategory updateCategory={setCategory} category={options.category}/>

          <section className='flex items-center justify-between'>
            <p>Action date <span className='text-xs text-white opacity-50'>(day)</span></p>
            <input value={options.date} min={1} max={31} onChange={setDate} className='bg-white outline-none bg-opacity-10 w-20 rounded-md px-1' type={'number'}/>
          </section>

          <section className='flex flex-col gap-1'>
          <p>Description <span className='opacity-50 text-white text-xs'>(optional)</span> </p>
          <textarea placeholder='Type here...' value={options.desc} onChange={setDesc} className='w-full p-1 resize-none placeholder:absolute placeholder:centerSelf  h-20  bg-white bg-opacity-10 rounded-md text-sm outline-none'></textarea>
          </section>

          {error && <p className='text-center text-red-500'>{error}</p>}
          </div>

          <section className='flex justify-evenly text-white'>
            <button onClick={cancelForm} className='px-4 py-3 border-[1px] border-blue-600 rounded-md text-white text-opacity-75 cursor-pointer hover:bg-blue-600 hover:text-white hover:text-opacity-100 transition-all'>Cancel</button>
            <button onClick={submitForm} className='px-4 py-3 border-[1px] border-blue-600 rounded-md bg-blue-600 cursor-pointer   transition-all'>{props.editMode ? 'Save' : 'Submit'}</button>
          </section>
           

            </div>

        </form>
    </Portal>
  )
}


export default AddPage
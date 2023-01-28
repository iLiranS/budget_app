import React, { useRef, useState } from 'react'
import Month_overview_action from './Month_overview_action';
import Month_Overview_filter from './Month_Overview_filter';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren , buildStyles } from 'react-circular-progressbar';

const Month_Overview = props => {

    const {actions } = props;
    const listRef = useRef();
  const [expenseOutOfTotal,setExpenseOutOfTotal] = useState(0)


    // filter state handler
    const [filter,setFilter] = useState(0); // 0 = recent , 1 = categories , 2 = highest
    const updateFilterHandler = num => {setFilter(num); listRef.current.scrollTop =0;};
    let sortedActions = [...actions].sort((act1,act2)=>act2.date - act1.date);
    let categoryArray =[];
    let arrays_sorted_by_categories = []; 
    // before I render the list , I need to sort them first . by default it comes with by recent 
    let resultListRender;

 

  
    
    if (filter === 1){
      // array of categories and array of actions synced with indexes . e.x categoryArray[0] = 'other' => arrays_sorted_by_categories[0] = [action1,action2]
      for (let i = 0 ; i<sortedActions.length;i++){
        const indexInCategoryArray = categoryArray.indexOf(sortedActions[i].category);
        if (indexInCategoryArray <0) {
           arrays_sorted_by_categories.push([sortedActions[i]]);
           categoryArray.push(sortedActions[i].category) }

         else
         arrays_sorted_by_categories[indexInCategoryArray].push(sortedActions[i]);
      }

      
      resultListRender = categoryArray.map((title,categoryIndex) =>(
        <ul key={categoryIndex} className='flex relative flex-col gap-2'>
         <p>{title}</p>
         <section className='relative gap-2 flex flex-col
         after:absolute after:top-0 after:-left-2  after:h-full after:w-[1px] after:bg-opacity-30 after:bg-white'>
          {arrays_sorted_by_categories[categoryIndex].map((action,insideIndex)=><Month_overview_action currency={props.currency} isMonthly={action.isMonthly} datePath={props.datePath}  key={insideIndex} id={action.id}  date={action.date} type={action.type} desc={action.desc} amount={action.amount} category={action.category} /> )}
         </section>
        </ul>
      ))
    }


    if (filter ===2){
      // using the sort function and pass function into it to compare amount.
      sortedActions.sort((a, b) => a.amount - b.amount).reverse();


    }

    if (filter!==1) resultListRender= sortedActions.map((action,index) => <Month_overview_action currency={props.currency} isMonthly={action.isMonthly} datePath={props.datePath}   key={index} id={action.id} date={action.date} type={action.type} desc={action.desc} amount={action.amount} category={action.category}/>)

    // total income out of total actions , should be changed with some budget limitation .
    let totalExpenses = sortedActions.filter(action => action.type==='expense').reduce((acc,curr)=>{return acc+curr.amount},0);
    setTimeout(() => {
      if (totalExpenses > props.budget) setExpenseOutOfTotal(100);
      else setExpenseOutOfTotal(Math.round(totalExpenses / props.budget * 100));
    }, 500);    

    const leftToSpend = props.budget - totalExpenses >0 ? props.budget -totalExpenses : 0;
    let pathColor = '#56eb7b';
    if (expenseOutOfTotal > 25) pathColor='#b7eb56';
    if (expenseOutOfTotal > 49) pathColor='#ebd248';
    if (expenseOutOfTotal > 74) pathColor='#e99536';
    if (expenseOutOfTotal > 90) pathColor='#f54e25';
   


  return (
    <div  className='w-full relative   overflow-hidden  snap-center grid grid-rows-[max-content,1fr,10fr]'>
      <div  className=' h-[200px] w-[200px] grid justify-start items-start  justify-self-center  relative overflow-hidden animate-entranceTest'>
        <CircularProgressbarWithChildren className='h-full w-full '  circleRatio={0.75} strokeWidth={2}
        styles={buildStyles({
          pathColor,
          trailColor:'#374151',
          pathTransitionDuration:1,
          rotation:0.625
        })}
        value={expenseOutOfTotal}>
          <h3 className='text-5xl text-green-500 hover:text-5xl transition-all'>{props.currency}{leftToSpend} </h3>
          <p className='opacity-70 text-s mt-2'>Sapre to spend</p>
        </CircularProgressbarWithChildren>
           </div>


    <Month_Overview_filter filter={filter} updateFilter={updateFilterHandler}/>

            

        <ul ref={listRef} className='flex animate-entrance   scroll-smooth flex-col mt-1 gap-2 px-4 overflow-y-auto pt-1'>
            {resultListRender}
        </ul>

    </div>
  )
}

export default Month_Overview
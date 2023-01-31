import React from 'react'
import useDataStore from '../../../store/Data';
import Month_Info_container from './Month_Info_container';
import { Link } from 'react-router-dom';
import {BsArrowReturnLeft} from 'react-icons/bs'
import useSettingsStore from '../../../store/Settings';

let monthlyCheck = false;

const Month = props => {
    const {date , currentMonth , currentYear , isActiveMonth} = props;
    const dataStore  = useDataStore();
    const settings = useSettingsStore();
    const indexInData = dataStore.data.map(item => item.date).indexOf(date);
    if (indexInData < 0) return (<div>Date invalid</div>)
    const currentMonthActions = dataStore.data[indexInData].actions;


      // remove action
      const deleteAction = action =>{
        const indexInTotalActions = currentMonthActions.indexOf(action);
        dataStore.removeAction(date,indexInTotalActions);
        
      }



      // function to check if isMonthly added already , if not add .
      const previousMonth = props.previousMonthPath;
      const testName = () =>{
        if (dataStore.data.length < 2) return;
        const previousMonthActions = dataStore.data.filter(item=> item.date===previousMonth).map(item=>item.actions)[0];

        const previousMonthActionsIsMonthly = previousMonthActions.filter(action => action.isMonthly)
        previousMonthActionsIsMonthly.forEach(action =>{
          if (!currentMonthActions.includes(action)) {
            // add to current month actions
            dataStore.addAction(date,action);
            // make isMonthly to false in previous month data. to edit I need date,id,action
            dataStore.editAction(previousMonth,action.id,{...action , isMonthly:false});
            console.log('??')
          }

        })
      }

      //  should call testName only when on reset day && isactiveMonth && only ONCE A MONTH . after activating.
      // how ? localSotrage timer with time thingy ? mabye just leave it as it is it doesnt really matter because it makes ismonthly false after using it.
     if(isActiveMonth && !monthlyCheck) {testName(); monthlyCheck=true;}
    
  return(
    <div className='flex h-full overflow-hidden flex-col justify-center pt-4  gap-2 items-center relative  '>

    {!isActiveMonth &&
    <Link to='/history' className='absolute cursor-pointer z-10 top-6 right-6 text-center justify-center  items-center'>
    <p className='uppercase tracking-wider'>{date}</p> 
    <section className='flex items-center gap-2'>
    <p className='text-violet-400'>History</p>
    <BsArrowReturnLeft/>
    </section>
    </Link>
    }
        <Month_Info_container currency={settings.currency} budget={settings.budget} datePath={date} isActiveMonth={isActiveMonth} deleteAction={deleteAction} currentMonthActions={currentMonthActions}/>
    </div>
  )
}

export default Month
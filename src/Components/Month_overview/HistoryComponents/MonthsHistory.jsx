import React from 'react'
import TopNav from '../../../Layout/TopNav';
import useDataStore from '../../../store/Data'
import { useNavigate } from 'react-router-dom';
import MonthHistoryGraph from './MonthHistoryGraph';
import useSettingsStore from '../../../store/Settings';

const MonthsHistory = () => {
    const data = useDataStore((state)=>state.data);
    const currency = useSettingsStore((state)=>state.currency);
    const navigate = useNavigate();
    const navigateToMonth = date =>{
      navigate(`/month/${date}` , {replace:true});
    }

    const fixedData = data.map(item=> {
      const monthExpenses = item.actions.filter(action=>action.type==='expense').reduce((all,curr)=>all+curr.amount,0);
      const monthIncomes = item.actions.filter(action=>action.type==='income').reduce((all,curr)=>all+curr.amount,0);
      return({date:item.date,income:monthIncomes,expense:monthExpenses});
    })
    const resultData = fixedData.reverse().map((month,index) => 
      <li onClick={()=>{navigateToMonth(month.date)}} key={index} className='flex relative h-12 items-center p-3 w-full justify-between
        bg-white bg-opacity-10 border-2 border-white border-opacity-50 max-w-[500px] rounded-md cursor-pointer hover:scale-[1.02] transition-all'>
      <p className='uppercase tracking-wider'>{month.date}</p>
      <section className='flex items-center gap-2'>
        <p className='text-green-500 border-r-2 border-opacity-30 pr-2 border-white '>{currency}{month.income}</p>
        <p className='text-red-500'>{currency}{month.expense}</p>
      </section>
      </li>
    )
    let dataToPass = [...data];
    dataToPass.length > 5 && dataToPass.splice(4,dataToPass.length-1);
  return (
    
    <div className='grid animate-entranceTest grid-rows-[max-content,auto] h-full  relative pt-4 px-2'>

      <MonthHistoryGraph data={dataToPass} />

      <ul className='flex flex-col overflow-y-auto w-full gap-3  relative  items-center'>
      {resultData}
      </ul>
    </div>
  )
}

export default MonthsHistory
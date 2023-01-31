import React, { useEffect, useMemo, useState } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

function generateRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



const Month_Graph = props => {
  const {actions , page} = props;
  const isActive = page===1;
  const [showExpenses,setShowExpenses] = useState(true);
  const [colorsArray,setColorsArray] = useState([]);
  const type = showExpenses ? 'expense' : 'income';

  const actionsReduced = actions.filter(action=> action.type===type).map(action =>{ return{name:action.category ,value:action.amount}} );
  const totalVal = actionsReduced.map(item=>item.value).reduce((partialSum, a) => partialSum + a, 0);
  
  useEffect(()=>{
  // generate new colors
    const COLORS = []
    for(let i = 0 ; i<result.length;i++){
    COLORS[i] = generateRandomColor();
    }
setColorsArray(COLORS);
},[actions.length,showExpenses])





let result = useMemo(()=>{
  let result = [];
  result = actionsReduced.reduce((acc, curr) => {
    let existing = acc.find(item => item.name === curr.name);
    if (existing) {
      existing.value += curr.value;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
  return result;
},[actions.length,showExpenses])

const toggleActionType = () => setShowExpenses(prev=> !prev);

return (
  <div key={showExpenses} className='h-full snap-center w-full relative grid grid-rows-[max-content,max-content,auto]  overflow-hidden'>
      {isActive &&
      <PieChart key={Math.random()} className='relative top-0 grid place-self-center place-items-center' width={200} height={200}>
        <Pie
          data={result}
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          >
          {result.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorsArray[index]}/>
            ))}
        </Pie>
      </PieChart>
}
      {isActive &&
      <section className='w-full animate-entrance items-center justify-center flex flex-col gap-2 relative'>
        <section className='flex items-center'>
       {showExpenses ? <p> Total Expenses : <span className='text-red-500'>{props.currency}{totalVal}</span></p>
        : <p> Total Incomes : <span className='text-green-500'>{props.currency}{totalVal}</span></p>}

        </section>
      
       <p onClick={toggleActionType} className='w-fit cursor-pointer p-2 bg-white bg-opacity-30 rounded-md'>Show {showExpenses ? 'Incomes' : 'Expenses'}</p>
      </section>
  

  }
      {isActive && 
      <ul  className='flex animate-entrance max-h-[400px] flex-col w-full relative justify-center overflow-y-auto'>
        <li className='grid grid-cols-4 justify-between text-center w-full items-center border-b-[1px]'>
          <p>Color</p>
          <p>Category</p>
          <p>Amount</p>
          <p>Percent %</p>
        </li>

        
        {result.map((category,index) => 
        <li key={index}  className='grid grid-cols-4 text-center  items-center relative w-full justify-between'>
          <div style={{backgroundColor:colorsArray[index]}} className={`w-4 h-4  place-self-center  rounded-full`}> </div>
          <p className='overflow-hidden'>{category.name}</p>
          <p className='overflow-hidden'>{props.currency}{category.value}</p>
          <p className='overflow-hidden'>{Math.floor(category.value/totalVal * 100)}%</p>

        </li>)}
      </ul>
}


    </div>
  )
}

export default Month_Graph
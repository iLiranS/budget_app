import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthHistoryGraph = props => {
    const {data} = props;

    const fixedData = data.map(date=>{ // returns array format : [ { date , incomes , expenses} , {...}]
        const dateIncomes = date.actions.filter(action => action.type==='income').reduce((sum,cur)=> sum+cur.amount,0);
        const dateExpenses = date.actions.filter(action => action.type==='expense').reduce((sum,cur)=> sum+cur.amount,0);
        const name = date.date.substring(0,3);
        return(
            {name, expense : dateExpenses , income : dateIncomes}
        )
    })
  return (
<div className='relative h-[200px] w-full max-w-[500px] md:-translate-x-4 place-self-center overflow-hidden'>

<ResponsiveContainer width="100%" height="100%">
        <LineChart
            margin={{
                left:-15
            }}
          data={fixedData}
        
            >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="income" stroke="#22c55e"  activeDot={{r:8}}/>
        </LineChart>
      </ResponsiveContainer>
            </div>

  )
}


export default MonthHistoryGraph
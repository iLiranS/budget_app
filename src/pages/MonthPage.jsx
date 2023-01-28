import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SingleMonthPage from './SingleMonthPage'


const MonthPage = () => {
    const d = new Date();

    const month = d.getMonth();    
    const monthList = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    const currentMonth = monthList[month];
    
    const year = d.getFullYear().toString();
    const currentYear = year.charAt(2) + year.charAt(3);
    
    const currentPath = currentMonth+''+currentYear;
    
    const previousMonth =  month === 0 ? monthList[monthList.length-1] : monthList[month -1];
    const previousMonthPath = currentMonth === 'jan' ? previousMonth+(currentYear-1) : previousMonth+currentYear;
  return (
    <Routes>
        <Route path='/:month/*' element={<SingleMonthPage previousMonthPath={previousMonthPath} datePath={currentPath} currentMonth={currentMonth} currentYear={currentYear} activeMonthPath={currentPath}/>}/>
        <Route path='/' element={<Navigate to={`${currentPath}`} replace/>} />
    </Routes>
  )
}

export default MonthPage
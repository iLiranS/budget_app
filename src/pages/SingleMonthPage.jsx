import React from 'react'
import { useParams } from 'react-router-dom'
import Month from '../Components/Month_overview/SingleMonth/Month'


const SingleMonthPage = props => {
    const params = useParams();
    const {activeMonthPath , currentYear , currentMonth} = props;
    const currentPath = params.month;
    const isActiveMonth = currentPath===activeMonthPath; // if the month is the current , so the user can add new actions .
    // need to check if the path even legal (exists) . if so render  element ...
   
  return (
        <Month previousMonthPath={props.previousMonthPath} datePath={props.datePath} isActiveMonth={isActiveMonth} currentYear={currentYear} currentMonth={currentMonth} date={currentPath}/>
  )
}

export default SingleMonthPage
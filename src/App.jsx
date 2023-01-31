import { Routes, Route, Navigate , useNavigate, json } from "react-router-dom"
import { HistoryPage } from "./pages/HistoryPage"
import MonthPage from "./pages/MonthPage"
import TopNav from "./Layout/TopNav"
import useDataStore from "./store/Data"
import { useLiveQuery } from "dexie-react-hooks"
import {db} from './store/db'
import { useEffect } from "react"
import NotFound from "./Components/NotFound"
import OptionsPage from "./pages/OptionsPage"
import FaqPage from "./pages/FaqPage"
import Portal from "./Layout/Portal"
import { useState } from "react"
// get current month path 
const d = new Date();

const month = d.getMonth();    
const monthList = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
const currentMonth = monthList[month];

const year = d.getFullYear().toString();
const currentYear = year.charAt(2) + year.charAt(3);

const currentPath = currentMonth+''+currentYear;



const hasFirstEntered = localStorage.getItem('firstEnter');


function App() {
  const navi = useNavigate();
  const [firstEnterPortal,setFirstEnterPortal] = useState(hasFirstEntered)
  const syncData = useDataStore((state)=>state.syncData);
  const data = useLiveQuery(async()=>{
    return await db.data.toArray();
  });

  async function addCurrentMonth() {
    try {
      // Add current month 
      const id = await db.data.add({
        date:currentPath,
        actions:[]
      });
    }
     catch (error) {
    // error handler , e.x 
      console.log(error);
    }
  }

  useEffect(()=>{
  // initial db sync 
  if(data){
  let dataDatesMapped = data.map(item => item.date);
   if (!dataDatesMapped.includes(currentPath)) 
    {
    console.log('wtf man')
    addCurrentMonth();
    }

   if(data.length >0)syncData(data);
  } 
  },[data])

  const closePortal = () =>{
    setFirstEnterPortal(true);
    localStorage.setItem('firstEnter',true);
    navi('/options' , {replace:true});
  }
 
  
 

  
  return (

    <div className="h-[100dvh] overflow-hidden relative w-screen bg-amber-100 text-black dark:bg-slate-800 dark:text-white">
          <TopNav/>
          {!firstEnterPortal && <Portal closePortal={closePortal}>
            <div className="absolute z-30 text-white centerSelf animate-entranceTest origin-left bg-white bg-opacity-10 rounded-xl p-4 h-max w-max flex flex-col text-center gap-2">
             Please set preferences before you start !
            <p onClick={closePortal} className="text-violet-500 cursor-pointer" to='/options'>Go to settings</p>
            </div>
            </Portal>}
       
    <Routes>
      <Route path="/month/*" element={<MonthPage/>}/>
      <Route path="/history" element={<HistoryPage/>}/>
      <Route path="/options" element={<OptionsPage/>}/>
      <Route path="/faq" element={<FaqPage/>}/>
      <Route path="/*" element={<NotFound/>}/>
      <Route path="/" element={<Navigate to='/month' replace />}/>
      
    </Routes>
    </div>
  )
}

export default App

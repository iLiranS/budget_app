import AddPage from "../AddPage";
import Month_action_focus from "./Month_action_focus";
import { useState } from "react";
import useDataStore from "../../../store/Data";
const extractDateNumber = date =>{
let result = date.toString();
if (result ==='1') result+='st';
else if(result==='2') result+='nd'
else if (result==='3') result+='rd';
else result +='th';
return result;
}

const Month_overview_action = props => {
    const {date , type , desc , amount , category, id , isMonthly , currency} = props;
    const actionObj = {date,type,desc,amount,category};
    const dateNum = extractDateNumber(date);
    const [editAction,setEditAction] = useState(false);
    const [actionFocus,setActionFocus] = useState(false);
    const deleteAction = useDataStore((state)=>state.removeAction);
      // edit action handler
      const editActionHandler = () =>{
        setActionFocus(false);
        setEditAction(prev=>!prev);
      }
      // action focus handler
      const openFocus = (e) =>{
        if(e.target !== e.currentTarget) return;
      
       setActionFocus(true);
      }
      const disableFocus = () => setActionFocus(false);
      // date , actionIndex
      const deleteActionHandler = () => {
         deleteAction(props.datePath,id);
         setActionFocus(false);
        }

        //const initialOptionsValues = {isExpense:true,isMonthly:false,amount:undefined,category:'',date:currentDay,desc:'' };
        // this is the obj values i need to pass to obj of edit action.
        const EditObj = {isExpense:type==='expense',isMonthly,amount,category,date,desc}

  return (
    <li  onClick={openFocus} className={`p-3 relative cursor-pointer flex items-center justify-between rounded-md border-2 border-opacity-50 bg-opacity-20 dark:bg-opacity-10 ${ type==='income' ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500'}
    hover:scale-[1.02] transition-all cursor-pointe`}>
       <section className='flex  w-auto gap-4'>
        <p className=' w-8 relative after:absolute after:h-6 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:-right-2 after:bg-opacity-50 after:dark:bg-white after:bg-gray-700'>{dateNum}</p>
        <p>{category}</p>
       </section>
        <p className={`${ type==='income' ? 'text-green-500' : 'text-red-500'}`}>{currency}{amount}</p>


        {actionFocus && <Month_action_focus currency={currency} editAction={editActionHandler} deleteAction={deleteActionHandler} onExit={disableFocus} date={dateNum} type={type} desc={desc} amount={amount} category={category} />}
        {editAction && <AddPage currency={currency} id={id} datePath={props.datePath} editMode={true} obj={EditObj} closePortal={editActionHandler}/>}
    </li>   
  )
}

export default Month_overview_action
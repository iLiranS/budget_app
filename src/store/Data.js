import { create } from 'zustand'
import {db} from './db';

const updateDB = async(date,actions) =>{
    await db.open();
    const existingRecord = await db.table("data").where("date").equals(date).first();
    if (existingRecord) {
        // update actions array 
        await db.table("data").update(existingRecord.id, { actions });
    } else {
        // create new object
        await db.table("data").add({ date, actions });
    }
     db.close();
}





const useDataStore = create((set)=>({
    // structure : data : [ {date : 'monthYear' , actions : [...]} , { date : 'monthYear' , actions [...]}]
    // action has : category , day(1-31) , description , type(expense/income) , amount , isMonthly .
    // with dexie : Date and actions , update the actions . 
    data: [],
    // need to add : is monthly to action objs
    addAction: (date,action)=> {
        set((state)=>{
            let dummyData = [...state.data];
            const index = dummyData.map(item => item.date).indexOf(date);
    // need to check if date exists , if no add new date .
        if (index < 0){
            const actionWithID0 = {...action , id:0};
            dummyData.push({date , actions :[actionWithID0]});
            updateDB(date,dummyData[dummyData.length-1].actions);
            return( {data : dummyData});
        }
    // just add date , add ID to action and push it to the right actions array.
        const actionWithId = {...action,id:dummyData[index].actions.length}
        dummyData[index].actions.push(actionWithId);
        updateDB(date,dummyData[index].actions);
            return({ data:dummyData})
        })

    },
    editAction:(date,id,action) =>{
        set((state)=>{
            let dummyData = [...state.data];
              const index = dummyData.map(item => item.date).indexOf(date);
              const indexInActions = dummyData[index].actions.findIndex(item => item.id === id);
              const actionWithId = {...action , id:id};
              dummyData[index].actions[indexInActions] = actionWithId;
              updateDB(date,dummyData[index].actions);
                  return({data:dummyData})
              })
    },
    removeAction:(date,id) =>{
        set((state)=>{
            let dummyData = [...state.data];
              const index = dummyData.map(item => item.date).indexOf(date);
             const indexInActions = dummyData[index].actions.findIndex(item => item.id === id);
              dummyData[index].actions.splice(indexInActions,1);
              updateDB(date,dummyData[index].actions);
                  return({data:dummyData})
              })
    },
    syncData:(data)=>{
        set((state)=>{
            return({data})
        })
    }
   
  
    
}))

export default useDataStore;
import { create } from "zustand";

const initialLocalSet = {
    theme: 'Dark',
    currency: '$',
    budget: 500,
    monthlyDay: '1',
}


let initialObj = JSON.parse(localStorage.getItem('settings'));
if (!initialObj){
    localStorage.setItem('settings',JSON.stringify(initialLocalSet))
    initialObj = initialLocalSet;
}


 // theme handler
 const themeHandler = () =>{
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (settings){
      const theme = settings.theme;
      
      if (theme === 'Dark')
      {
        document.body.style.backgroundColor='#1e293b';
         if(!document.body.classList.contains('dark')) document.body.classList.add('dark');
        }
        if (theme==='Light'){
          document.body.style.backgroundColor='#fef3c7'
        if(document.body.classList.contains('dark'))document.body.classList.remove('dark');
      }
        
     
      if(theme==='System') {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        document.body.style.backgroundColor='#1e293b';
        if(!document.body.classList.contains('dark')) document.body.classList.add('dark');
      } else {
        document.body.style.backgroundColor='#fef3c7'
        if(document.body.classList.contains('dark'))document.body.classList.remove('dark');
      }
        }
 
    }
 }
 themeHandler();


const useSettingsStore = create((set)=>(
    {
        theme: initialObj.theme,
        currency: initialObj.currency,
        budget: initialObj.budget,
        monthlyDay: initialObj.monthlyDay,

        setSettings: (obj) =>{
            set(()=>{
                localStorage.setItem('settings',JSON.stringify(obj));
                themeHandler();
                return({theme:obj.theme,currency:obj.currency,budget:obj.budget,monthlyDay:obj.monthlyDay});
            })
        }

    }
))
export default useSettingsStore
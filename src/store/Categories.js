import { create } from "zustand";

const updateLocalStorageCategories = (categories) => localStorage.setItem('categories',JSON.stringify(categories));
const initialCategories = JSON.parse(localStorage.getItem('categories')) ?? ['food','salary','bills','stocks','clothing','groceries','rent','car','medical'];


const useCategoriesStore = create((set)=>({
    categories:initialCategories,

    addCategory:(category) => set((state)=>{
        const cate = category.toLowerCase();
        if (state.categories.includes(cate)) return state.categories;
        const fornow = [...state.categories];
        fornow.push(cate);
        updateLocalStorageCategories(fornow);
        return {categories:fornow};
       
    }),

    removeCategory:(category) => set((state)=>{
        const current = [...state.categories];
        const index = current.indexOf(category);
        current.splice(index,1);
        updateLocalStorageCategories(current);
        return {categories:current};
    })
}))

export default useCategoriesStore
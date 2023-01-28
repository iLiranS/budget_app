import { create } from "zustand";
const useCategoriesStore = create((set)=>({
    categories:['food','salary','bills','stocks','clothing','groceries','rent','car','medical','longasscateogrywtfdddddddd'],

    addCategory:(category) => set((state)=>{
        const cate = category.toLowerCase();
        if (state.categories.includes(cate)) return state.categories;
        const fornow = [...state.categories];
        fornow.push(cate);
        return {categories:fornow};
       
    }),

    removeCategory:(category) => set((state)=>{
        const current = [...state.categories];
        const index = current.indexOf(category);
        current.splice(index,1);
        return {categories:current};
    })
}))

export default useCategoriesStore
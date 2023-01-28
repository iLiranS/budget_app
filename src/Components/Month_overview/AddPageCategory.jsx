import React , {useEffect, useRef, useState} from 'react'
import {MdArrowDropDown} from 'react-icons/md'
import useCategoriesStore from '../../store/Categories';

const AddPageCategory = props => {
    const [CategoryListOpen , setCategoryListOpen] = useState(false);
    const { updateCategory , category} = props;
    const categoryList = useCategoriesStore((state)=>state.categories);

    // DO NEXT : ADD CATEGORY : CHECK IF SAME ON LOWER CASE 
    // THEN IF NOT EXISTS ADD NEW CATEOGRY . 
    // PARENT WILL NEED TO GET VALUE SOMEHOW PROBABLY REF/STATE.

    const upateInputHandler = e => {
        updateCategory(e.target.value)
       setCategoryListOpen(true);
    }
    const toggleCategoryList = () => setCategoryListOpen(prev => !prev);

    const updateCategoryHandler = category => {
        updateCategory(category);
        setCategoryListOpen(false);
    }

    const categoriesFiltered = categoryList.filter(categoryItem=> categoryItem.toLowerCase().includes(category.toLowerCase()));
    const categoriesMapped = categoriesFiltered.map((category,index) => <li onClick={()=>{updateCategoryHandler(category)}} key={index} className='categoryListItem'>{category}</li>)


  return (
    <section className='flex items-center justify-between '>
    <p>Category</p>
    <div className={`flex relative bg-white rounded-md  ${CategoryListOpen ? 'bg-opacity-20' : 'bg-opacity-10 '}`}>
      <input  onChange={upateInputHandler} value={category} placeholder='Category' type='text' className={` w-16 rounded-md bg-transparent outline-none`}/>
        <section className={`text-2xl cursor-pointer bg-white bg-opacity-10`}>
      <MdArrowDropDown onClick={toggleCategoryList} className={`${CategoryListOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-500`}/>
        </section>
      {CategoryListOpen &&
       <ul className='flex animate-entranceTest origin-left bg-gray-800 text-white   overflow-y-auto max-h-36 flex-col absolute top-full left-1/2 -translate-x-1/2 gap-1 translate-y-1 w-full'>
        {categoriesMapped}
       </ul>}

    </div>
  </section>
  )
}



export default AddPageCategory
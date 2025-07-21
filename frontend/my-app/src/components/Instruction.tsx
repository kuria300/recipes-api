import { useParams } from "react-router-dom"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Clock, Flame, Star } from 'lucide-react';

const Instruction =() => {
    const {id}= useParams()
    const [Recipe, setRecipe]= useState<any>(null);
    const [loading, setLoading]= useState(false)

    useEffect(()=>{
      const getData= async()=>{
        try{
          setLoading(true)
         const { data }= await axios.get(`https://dummyjson.com/recipes/${id}`);
         console.log(data)
         setRecipe(data)
        }catch(err){
          toast.error(String(err))
        }finally{
          setLoading(false)
        }
      }
      if (id) getData()
    }, [id])
  return (
  <>
    <Navbar />
    <div className="flex justify-center flex-col max-w-[1024px] mx-auto p-10">
    {loading ?(
     <p className="text-xl">Loading Recipe...</p>
    ): Recipe ?(
     <>
       <h1 className="text-5xl font-semibold mb-6">{Recipe.name}</h1>
        <div className='flex flex-row w-full gap-6 text-xl mb-6'>
         <div className='flex items-center gap-1'>
          <Clock color='#f79f1a'/>
          <span>{Recipe.cookTimeMinutes}</span>
         </div>
          <div className='flex items-center gap-1 '>
          <Flame color='#f79f1a' style={{fill:"#f79f1a"}}/>
          <span>{Recipe.caloriesPerServing}</span>
         </div>
          <div className='flex items-center gap-1'>
          <Star color='#f79f1a' style={{fill:"#f79f1a"}}/>
          <span>{Recipe.reviewCount}</span>
         </div>
       </div>
       <hr/>
       <img
        src={Recipe.image}
        alt="Cooking image example"
        className="rounded-md w-full max-h-[500px] object-cover mt-6 mb-10"
       />

      <div className="mb-8">
  <h2 className="text-2xl font-bold font-work-sans">Ingredients</h2>
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-lg mt-8">
    {Recipe.ingredients.map((ingredient: string, index: number) => (
      <li key={index}>
        <label className="flex items-center gap-2 cursor-pointer">
         <input type="checkbox" className="hidden peer"/>
          <div className="relative w-6 h-6 border-[3px] border-yellow-400 rounded-full peer-checked:bg-orange-400 transition-colors transition-200"></div>
          <span className="peer-checked:line-through">{ingredient}</span>
        </label>
      </li>
    ))}
  </ul>
</div>

<div className="mt-6">
  <h2 className="text-2xl font-semibold font-work-sans mb-4">Instructions</h2>
  <ul className="flex flex-col gap-4 text-lg">
    {Recipe.instructions.map((instruction: string, index: number) => (
      <li key={index} className="flex items-center">
        <label className="relative flex items-center cursor-pointer select-none gap-3">
          <input
            type="checkbox"
            className="peer sr-only"
            id={`inst-${index}`}
          />
          <div
            className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-400 text-white font-semibold peer-checked:bg-orange-600 transition-colors duration-200 select-none">
            {index + 1}
          </div>
          <span className="flex-1">{instruction}</span>
        </label>
      </li>
    ))}
  </ul>
</div>
     </>
    ):(
      <p>Recipe not found</p>
    )}
   </div>
  </>
  )
}

export default Instruction
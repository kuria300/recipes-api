import { Bounce, toast, ToastContainer } from 'react-toastify'
import './App.css'
import Navbar from './components/Navbar'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import { Clock, Flame, Star } from 'lucide-react';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import {useInView} from 'react-intersection-observer'


gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger) 

function App() {
  
   const boxRef = useRef<HTMLHeadingElement | null>(null);
   const [food, setFood]= useState([])
   const [email, setEmail]= useState('')

   const { ref, inView}= useInView({
    threshold: 0.2,
    triggerOnce: true
   })
  useEffect(() =>{
    
    if (!boxRef.current) return;
   const heading= boxRef.current?.querySelectorAll('h1 span');
   const paragraph = boxRef.current?.querySelectorAll("p span");
    const button = boxRef.current?.querySelector(".main_button");

   gsap.to(heading, {
   opacity:1,
    duration:1.2,
    stagger:{
      each:0.3,
      yoyo:true,
      repeat:2,
      from:"start"
    },
    ease:"power1.inOut"
   })

   gsap.to(paragraph, {
    opacity:1,
    duration:1,
    stagger:{
      each:0.2,
      yoyo:true,
      repeat:2,
      from:"start"
    },
    ease:"bounce.Out"
   })
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 1,
      delay:0.5,
      ease: "elastic.out(1, 0.5)",
    });


  }, []);

  useEffect(()=>{
const fetchRecipes= async ()=>{
      try{
      const {data}= await axios.get('https://dummyjson.com/recipes?limit=9');
       //console.log(data.recipes)
      setFood(data.recipes)
    } catch(err){
    toast.error(String(err))
  }
}

if(inView){
fetchRecipes()
}
  },[inView])

//  useEffect(()=>{
//    const sendData= async()=>{

//     if(food.length === 0) return;
//    try{
//     await axios.post("http://localhost:5000/send-recipes", {food});
//     alert('sent to backend')
//    }catch(err){
//     console.error('Error', err)
//     alert('Notsent to backend')
//    }
//   }

//   sendData()
//  }, [food])

 const handleSubmit= async(e: any)=>{
   e.preventDefault();

     if (!email) return toast.error("Please enter your email");
  if (food.length === 0) return toast.error("No recipes selected");

   try{
    await axios.post('https://recipes-api-2b1h.onrender.com/send-recipes', {email, food})
    toast.success('Recipes Sent to Your Inbox!')
    setEmail('')
   }catch(err){
     toast.error('Email Not Sent.Please Try Again')
   }
 }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  gsap.to(window, { duration: 1, scrollTo: "#mysection", ease: "power1.out" });
};
  const text= 'Master the Kitchen with ease: Unleash your Inner Chef today!!'
  const content= 'Discover recipes helping you to find the easiest way to cook'
  return (
    <>
        <Navbar/>
        <ToastContainer autoClose={2000} transition={Bounce} position='top-right'/>

  <section className='main_container'>
  <div className='flex flex-col lg:flex-row items-center py-3 gap-5'>
    <div className='flex-1 order-2 lg:order-1 text-center lg:text-left max-w-3xl'ref={boxRef} >
      <h1 className='text-4xl font-bold mb-4 font-work-sans'>
      {text.split(" ").map((word, index)=>(
         <span key={index} style={{display: 'inline-block', margin: '0.25rem', opacity: '0', transition: 'opacity 0.3s' }}>
           {word}
         </span>
      ))}
      </h1>
      <p className='text-lg mb-8 text-balance'>
        {content.split(" ").map((cont, index)=>(
          <span key={index} style={{display: 'inline-block', margin:"0 0.15rem", opacity: '0', transition: 'opacity 0.3s'}}>
            {cont}
          </span>
        ))}
      </p>
      <a href='#mysection' onClick={handleClick} className='main_button self-start scroll-smooth' style={{ transform: 'scale(0)', opacity: 0 }}>
        Discover Recipes
      </a>
    </div>
    <img
    sizes='xs:100vw'
      src='./nuxt-course-hero.png'
      alt="Chef cooking illustration"
      width={550}
      height={550}
      loading='lazy'
      className='flex-1 order-1 lg:order-2 text-left'
    />
  </div>
</section>
<section id='mysection' className='section_container py-10' ref={ref}>
 <div className='max-w-3xl px-10'>
  <h2 className='font-semibold text-3xl'>Discover, Create, share</h2>
  <p className='mt-3 mb-6'>Check out the most Popular recipes!</p>
 </div>
 <ul className='card_grid gap-x-2 gap-y-6 px-10'>
   {food.map((item: any)=>(
    <div key={item.id} className='flex flex-col rounded-md shadow-xl'>
     <img 
      src={item.image}
      alt='food image'
      height={300}
      width={70}
      className='w-full object-cover rounded-t-md'
     />
     <div className='flex flex-1 flex-col px-3 py-4 bg-white-100'>
       <p className='text-xl font-semibold mb-2 font-sans'>{item.name}</p>
       <div className='flex flex-row w-full gap-6 text-lg mt-auto'>
         <div className='flex items-center gap-1'>
          <Clock color='#f79f1a'/>
          <span>{item.cookTimeMinutes}</span>
         </div>
          <div className='flex items-center gap-1 '>
          <Flame color='#f79f1a' style={{fill:"#f79f1a"}}/>
          <span>{item.caloriesPerServing}</span>
         </div>
          <div className='flex items-center gap-1'>
          <Star color='#f79f1a' style={{fill:"#f79f1a"}}/>
          <span>{item.reviewCount}</span>
         </div>
       </div>
       <Link to={`/instructions/${item.id}`} className='view-button mt-4 mb-2 w-auto self-start'>
       View</Link>
     </div>
    </div>
    
   ))}
 </ul>
</section>

<section className='bg-white-200 w-full'>
 <div className='flex justify-center items-center p-8 flex-col sm:text-center'>
   <h1 className='text-4xl font-semibold mb-4'>Recipes Straight to Your Inbox!</h1>
   <p className='text-xl'>Discover tasty new recipes in our weekly newsletter!</p>
 </div>
 <div className='flex justify-center'>
  <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md px-2">
  <label className='self-start'>Email</label>
   <input 
   className='p-4  mt-4 rounded-xl w-full border-gray-100 outline-none' 
    type='email' 
    placeholder='example@gmail.com' 
    name='email' 
    required 
    value={email}
    onChange={(e)=>setEmail(e.target.value)}/>
  <button className='my-4 bg-orange-400 p-4 rounded-md w-full hover:bg-orange-500 transition' type='submit'>Join</button>
  </form>
  </div>
</section>
    </>
  )
}

export default App

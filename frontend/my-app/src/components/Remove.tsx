import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const unsubscribe = () => {
 const [searchParams]= useSearchParams()
 const token= searchParams.get('token');
 const [loading, setLoading]= useState(false)

 useEffect(()=>{

    const handleUsub= async()=>{

    if(!token) return toast.error('Token is missing from confirmation link')
    setLoading(true)
  try{
   await axios.post('http://localhost/5000/unsubscribe', {token})
   toast.success('unsubscribed successfully!')
  }catch(err){
    console.log('Error', err)
     toast.error(String(err))
  }finally{
    setLoading(false)
  }
 }
 if(token) handleUsub()
 }, [token])
 
  return (
    <div>
        {loading ?('Unsubscribing...'):('Successfully unsubscribed you can subscribe again')}
    </div>
  )
}

export default unsubscribe
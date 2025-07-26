import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Confirm = () => {

    const [searchParams]= useSearchParams()
    const token= searchParams.get('token')
    const [status, setStatus]= useState('Confirming...')

    useEffect(()=>{

    const confirmSub= async()=>{
        if (!token) {
            toast.error('Token is missing from confirmation link.');
            setStatus('Invalid or missing confirmation link.')
            return;
        }

      try{
       await axios.post('https://recipes-api-2b1h.onrender.com/confirm', {token})
       toast.success('Subscription confirmed!')
       setStatus('Subscription confirmed! You may close this page.')
      }catch(err){
     console.log('Error', err)
     toast.error(String(err))
     setStatus('Failed to confirm subscription')
    }
  }

  confirmSub()
}, [token])
  return (
    <>
      <div className='text-center, mt-6, bg-white-100, px-8 rounded-md'>
       {status}
      </div>
    </>
  )
}

export default Confirm
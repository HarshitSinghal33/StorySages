import React, { useState } from 'react'
import { IoEyeSharp } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";

export function InputField({ error, register,  type, ...props }) {
  const [isPasswordSee, setIsPasswordSee] = useState(false) //for change the icon of eye  

  // is type is password or text that we got from prop name 'type'
  const [inputType, setInputType] = useState(type)


  // for handle the change of type of input fields
  const handleEyeChange = () => {
    setIsPasswordSee(prev => {
      setInputType(prev ? 'password': 'text')
      return !prev
    })
  }

  return (
    <div className='relative w-full transition-all duration-300 ease-in my-6'>
      <input
        className='bg-black w-full px-2 py-2 rounded text-white text-base outline-none border resize-none placeholder-slate-200 focus:border-blue-500'
        {...props}
        {...register}
        type={type === 'password' ? inputType : type}
      />

      {type === 'password' &&
        <span onClick={() => handleEyeChange()} className='absolute right-3 top-3 cursor-pointer'>
          {isPasswordSee ? <IoIosEyeOff/> : <IoEyeSharp/>}
        </span>
      }
      
      {error && <small className='text-red-600'>{error.message}</small>}
    </div>
  )
}
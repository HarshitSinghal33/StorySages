import React from 'react'
export function Textarea({ register, error, ...props}) {
    return (
        <>
            <textarea {...props} {...register} className='bg-black resize-none text-white border focus:outline-none focus:border-blue-500 w-full py-2 px-3 rounded placeholder:text-slate-200'></textarea>
            {error && <small className='text-red-600 block'>{error.message}</small>}
        </>
    )
}
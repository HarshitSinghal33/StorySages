import React from 'react'
import ReactDOM from 'react-dom'

// Component
import Button from '../ui/Button'

export default function Modal({ open, onConfirm, onCancel, confirmButtonName, message }) {
  if (!open) return null
  return ReactDOM.createPortal(
    <div className='z-20 fixed top-0 bg-gray-600 bg-opacity-30 w-screen h-screen flex justify-center items-center'>
      <div className='text-center rounded-lg py-4 w-full max-w-[420px] shadow-modalLight bg-black '>
        <h2 className='font-semibold break-words'>{message}</h2>
        <div className='flex justify-evenly mt-3 mx-3 gap-3 *:w-full'>
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant={'danger'} onClick={onConfirm} className={'capitalize'}>{confirmButtonName}</Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}
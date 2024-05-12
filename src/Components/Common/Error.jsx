import React from 'react'

export default function Error({ message }) {
  return (
    <div className='flex justify-center items-center h-screen'>
      <h1>{message || 'An error occurred.'}</h1>
    </div>
  )
}

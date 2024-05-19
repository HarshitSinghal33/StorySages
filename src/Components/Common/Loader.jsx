import React from 'react'

export function Loader({ isCenter }) {
  return (
    <div className={`absolute left-1/2  transform -translate-x-1/2 ${isCenter && 'top-1/2 -translate-y-1/2'}`}>
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-cyan-600"></div>
    </div>
  )
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIos } from "react-icons/md";

export default function Header({ back }) {
  const navigate = useNavigate();
  return (
    <header className='flex items-center justify-center py-3 shadow-headerShadow font-sans'>
      {back && <span className='absolute left-3  cursor-pointer transition duration-300' onClick={() => navigate(-1)}>
        <MdArrowBackIos fontSize={33} />
      </span>}
      <h1>StorySage</h1>
    </header>
  )
}
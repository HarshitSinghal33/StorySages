import React from 'react'
import { Link } from 'react-router-dom'

// Redux
import { isLoading } from '../../Redux/slice/AuthSlice';
import { useSelector } from 'react-redux';

// Components
import Button from '../ui/Button';
import Googlesignup from './Googlesignup'

export default function FormContainer({ children, formName, submitBtnName, submit, otherLinkTextName, otherLink, isGoogleSignup }) {
  const isLoad = useSelector(isLoading)
  return (
    <section className='h-screen w-full flex justify-center items-center gap-x-4'>
      <div className='absolute max-w-[430px] w-full p-6 rounded-lg bg-black shadow-form'>
        <div className='text-2xl font-semibold text-center mb-6'>{formName}</div>

        <form onSubmit={submit}>
          {children}
          <Button type='submit' isLoading={isLoad} disabled={isLoad} buttonText={submitBtnName} className='h-12 w-full my-1'/>
        </form>

        <div className="text-center mt-3">
          <span>{otherLinkTextName} </span>
          <Link to={`/${otherLink}`} className="text-cyan-600">{otherLink}</Link>
        </div>

        {isGoogleSignup && (
          <>
            <div className="h-[1px] bg-gray-400 w-full my-6 flex justify-center items-center">
              <span className="bg-black px-3 font-bold">Or</span>
            </div>
            <Googlesignup formName={formName} />
          </>
        )}
      </div>
    </section>
  )
}
import React, { useEffect } from 'react'

// Redux
import { isLoading, isGoogleAuthLoading, uid } from '../../Redux/slice/UserAuthSlice';
import { useSelector } from 'react-redux';

// Components
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button';
import { GoogleAuth } from './GoogleAuth'

export function AuthFormContainer({ children, formName, submitBtnName, submit, otherLinkTextName, otherLink, isGoogleSignup }) {
  const navigate = useNavigate()
  const userUID = useSelector(uid);
  const isLoad = useSelector(isLoading);
  const isGoogleAuthLoad = useSelector(isGoogleAuthLoading);

  useEffect(() => {
    userUID && navigate('/')
  },[userUID])

  return (
    <section className='h-screen w-full flex justify-center items-center gap-x-4'>
      <div className='absolute max-w-[430px] w-full p-6 rounded-lg bg-black shadow-form'>
        <div className='text-2xl font-semibold text-center mb-6'>{formName}</div>

        <form onSubmit={submit}>
          {children}
          <Button type='submit' isDisabled={isGoogleAuthLoad} isLoading={isLoad} disabled={isLoad} buttonText={submitBtnName} className='h-12 w-full my-1' />
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
            <GoogleAuth formName={formName} />
          </>
        )}
      </div>
    </section>
  )
}
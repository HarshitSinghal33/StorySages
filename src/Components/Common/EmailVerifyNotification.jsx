import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../ui/Button';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../Firebase';
import { toast } from 'react-toastify';

export default function EmailVerifyNotification() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isEmailSentLoading, SetIsEmailSentLoading] = useState(false)

  const handleResendEmailVerfication = async () => {
    SetIsEmailSentLoading(true)
    try {
      await sendEmailVerification(auth.currentUser)
      toast.success('Email Send Successfuly')
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    } finally {
      setIsModalOpen(false)
    }
  }

  return (
    <Modal open={isModalOpen}>
      <div className='*:my-1 mb-3 px-3 py-1'>
        <h2>
          **Action Required:** Verify your Email Address!
        </h2>
        <p>
          To ensure your account security and access to all features, please verify your email address. Until you verify, functionalities like password reset, Google Signup and account recovery might be limited. Verifying your email takes just a moment!
        </p>
        <p>
          A verification email has been sent to your email address . Click the link in the email to complete verification.
        </p>
        <div>
          **Potential Risks of Not Verifying:**
          <ul>
            <li>Loss of access: You may not be able to recover your account if you forget your password or password signup will not work if you signup with gogle before verify.</li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col gap-y-3 px-3'>
        <Button buttonText={'Okay I will'} variant={'secondary'} onClick={() => setIsModalOpen(false)} />
        <Button buttonText={'Resend Email'} isLoading={isEmailSentLoading} onClick={handleResendEmailVerfication} />
      </div>
    </Modal>
  )
}
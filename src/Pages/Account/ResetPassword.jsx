import React from 'react'

// Form
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

// Redux
import { useDispatch } from 'react-redux';
import { changePasswordAsync } from '../../Redux/slice/AuthSlice';

// Utils
import { validateEmail } from '../../utils/formValidation';

// Components
import { toast } from 'react-toastify';
import FormContainer from '../../Components/auth/FormContainer';
import InputField from '../../Components/ui/InputField';

export default function ResetPassword() {
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    email: validateEmail(),
  })

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async ({ email } = data) => {
    try {
      await dispatch(changePasswordAsync({ email })).unwrap()
      toast.success('Email sent successfully.')
    } catch (errCode) {
      let errMessage;
      if (errCode === 'auth/invalid-email') {
        errMessage = 'Enter a valid email!'
      } else {
        errMessage = `Unexpected Error occurred!: ${errCode} please contact to developer`
      }
      setError('email', {
        type: 'manual',
        message: errMessage
      })
    }
  }

  return (
    <FormContainer
      submit={handleSubmit(onSubmit)}
      formName={'Change Password'}
      submitBtnName={'Send Mail'}
      otherLinkTextName={'Already have an account?'}
      otherLink={'login'}
    >
      <InputField
        placeholder={'Email'}
        register={register('email')}
        error={errors.email}
        type={'email'}
        name={'emailfield'}
      />
    </FormContainer>
  )
}
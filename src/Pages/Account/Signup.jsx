import React from 'react'
import { useNavigate } from 'react-router-dom';

// Form
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

// Redux
import { createAccountAsync } from '../../Redux/slice/AuthSlice';
import { useDispatch } from 'react-redux';
// Utils
import { validateEmail, validateName , validatePassword, recheckPassword } from '../../utils/formValidation';

// Components
import InputField from '../../Components/ui/InputField';
import FormContainer from '../../Components/auth/FormContainer';

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const schema = yup.object().shape({
    username: validateName(),
    email: validateEmail(),
    password: validatePassword(),
    confirmpassword: recheckPassword(),
  })

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async ( {username, email, password} = data) => {
    try {
      await dispatch(createAccountAsync({username,email,password})).unwrap();
      navigate('/')
    } catch (errCode) {
      let errMessage;
      if (errCode === 'auth/email-already-in-use') {
        errMessage = 'Email is Already in use.'
      } else if (errCode === 'auth/invalid-email') {
        errMessage = 'Enter a valid email!'
      } else {
        errMessage = `Unexpected Error occurred!: ${errCode} please contact to developer`
      }
      setError('email', {
        type:'manual',
        message: errMessage
      })
    }
  }

  return (
    <FormContainer
      formName={'Signup'}
      submit={handleSubmit(onSubmit)}
      submitBtnName={'Signup'}
      otherLinkTextName={"Already have an account?"}
      otherLink={'Login'}
      isGoogleSignup={true}
    >
      <InputField
        placeholder={'Name'}
        register={register('username')}
        error={errors.username}
        type={'text'}
        name={'namefield'}
      />
      <InputField
        placeholder={'Email'}
        register={register('email')}
        error={errors.email}
        type={'email'}
        name={'emailfield'}
      />
      <InputField
        placeholder={'Password'}
        register={register('password')}
        error={errors.password}
        type={'password'}
        name={'passwordfield'}
      />
      <InputField
        placeholder={'Confirm Password'}
        register={register('confirmpassword')}
        error={errors.confirmpassword}
        type={'password'}
        name={'confirmpasswordfield'}
      />
    </FormContainer>
  )
}

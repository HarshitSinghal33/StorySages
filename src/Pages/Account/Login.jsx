import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

// Form
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

// Redux
import { loginAsync } from '../../Redux/slice/UserAuthSlice';
import { useDispatch } from 'react-redux';

// Utils
import { validateEmail, validatePassword } from '../../utils/formValidation';

// Components
import { InputField } from '../../Components/ui/InputField';
import { AuthFormContainer } from '../../Components/Auth/AuthFormContainer';

export function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    email: validateEmail(),
    password: validatePassword(),
  })

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async ({ email, password } = data) => {
    try {
      await dispatch(loginAsync({ email, password })).unwrap()
      navigate('/')
      toast.success('Successfully Logged In');
    } catch (errCode) {
      const errMessage = errCode === 'auth/invalid-login-credentials'
        ? 'User not found! Please recheck your password and email'
        : 'An unexpected error occurred! Please contact to developer.';
      setError('email', {
        type: 'manual',
        message: errMessage,
      })
    }
  }

  return (
    <AuthFormContainer
      formName={'Login'}
      submit={handleSubmit(onSubmit)}
      submitBtnName={'Login'}
      otherLinkTextName={"Don't have an account?"}
      otherLink={'Signup'}
      isGoogleSignup={true}
    >
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
      <div className="text-center mb-3 underline">
        <Link to={'/resetpassword'}>Forgot password?</Link>
      </div>
    </AuthFormContainer>
  )
}
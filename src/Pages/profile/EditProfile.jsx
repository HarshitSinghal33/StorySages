import React, { useEffect } from 'react';

// Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Custom Hooks
import useFetchUserData from '../../hooks/fetch/useFetchUserData';
import useUpdateUserData from '../../hooks/update/useUpdateUserData';
import { useCheckFormChange } from '../../hooks/useCheckFormChange';

// Redux
import { userUID } from '../../Redux/slice/AuthSlice';
import { useSelector } from 'react-redux';

// UI Components
import InputField from '../../Components/ui/InputField';
import TextArea from '../../Components/ui/Textarea';
import Button from '../../Components/ui/Button';
import Loader from '../../Components/Common/Loader';
import Error from '../../Components/Common/Error';
import UserImageProfilesettle from '../../Components/profile/ImageProfile';
import Header from '../../Components/Common/Header';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditProfile() {
  const user = useSelector(userUID)
  const navigate = useNavigate()
  const { userData, userDataError, isUserDataLoading } = useFetchUserData({ userID: user });
  const { setUserData } = useUpdateUserData()
  const { isFormValuesChange, handleFormChange } = useCheckFormChange({ initialData: userData });

  const schema = Yup.object().shape({
    name: Yup.string().trim().required('Name is Required'),
    description: Yup.string().trim().required("description is Required"),
    profile: Yup.string()
  })

  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  useEffect(() => {
    if (userData) {
      setValue('name', userData.name);
      setValue('description', userData.description)
      setValue('profile', userData.profile)
    }
  }, [userData]);

  const formDataChange = watch()

  useEffect(() => {
    handleFormChange(formDataChange)
  }, [formDataChange]);

  const submit = async (data) =>{ 
   await setUserData(data, user)
   toast.info('Update Successful')
  //  navigate('/profile')
  }

  function renderContent() {
    if (isUserDataLoading) return <Loader isCenter={true} />
    if (userDataError) return <Error message={userDataError.message} />
    if (userData) return (
      <div className='flex justify-center w-full'>
        <form className='px-3 max-w-[750px] w-full' onSubmit={handleSubmit(submit)}>
          <UserImageProfilesettle
            currentURL={userData.profile}
            onSelectImage={(imageURL) => setValue('profile', imageURL)}
          />
          <InputField placeholder={'Name'} register={register('name')} />
          <TextArea register={register('description')} />
          <Button type={'submit'} buttonText={'Submit'} className='w-full mt-3' isDisabled={!isFormValuesChange} variant={isFormValuesChange ? 'primary' : 'secondary'} />
        </form>
      </div>
    )

  }

  return (
    <>
      <Header back={true} />
      {renderContent()}
    </>
  )
}
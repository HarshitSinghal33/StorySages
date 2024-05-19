import React, { useEffect } from 'react';

// Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Custom Hooks
import { useFetchUserData } from '../../Hooks/Fetches/useFetchUserData';
import { useUpdateUserData } from '../../Hooks/Updates/useUpdateUserData';
import { useCheckFormChange } from '../../Hooks/useCheckFormChange';

// Redux
import { uid } from '../../Redux/slice/UserAuthSlice';
import { useSelector } from 'react-redux';

// UI Components
import { InputField } from '../../Components/ui/InputField';
import { Textarea } from '../../Components/ui/Textarea';
import { Button } from '../../Components/ui/Button';
import { Loader } from '../../Components/Common/Loader';
import { Error } from '../../Components/Common/Error';
import { UpdateProfileImage } from '../../Components/profile/UpdateProfileImage';
import { Header } from '../../Components/Common/Header';

export function UpdateProfile() {
  const userUID = useSelector(uid)
  const { userData, userDataError, isUserDataLoading } = useFetchUserData({ userID: userUID });
  const { setUserData } = useUpdateUserData()
  const { isFormValuesChange, handleFormChange } = useCheckFormChange({ initialData: userData });

  const schema = Yup.object().shape({
    name: Yup.string().trim().required('Name is Required'),
    description: Yup.string().trim().required("description is Required"),
    profile: Yup.string()
  })
  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(schema),
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

  const submit = async (data) => {
    setUserData(data, userUID)
  }

  function renderContent() {
    if (isUserDataLoading) return <Loader isCenter={true} />
    if (userDataError) return <Error message={userDataError.message} />
    if (userData) return (
      <div className='flex justify-center w-full'>
        <form className='px-3 max-w-[750px] w-full' onSubmit={handleSubmit(submit)}>
          <UpdateProfileImage
            currentURL={userData.profile}
            onSelectImage={(imageURL) => setValue('profile', imageURL)}
          />
          <InputField placeholder={'Name'} register={register('name')} />
          <Textarea register={register('description')} />
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
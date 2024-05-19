import React from 'react';

// Custom Hooks
import { useFetchUserData } from '../../Hooks/Fetches/useFetchUserData';
import { useUpdateStory } from '../../Hooks/Updates/useUpdateStory';

// Redux
import { useSelector } from 'react-redux';
import { uid } from '../../Redux/slice/UserAuthSlice';

// UI Components
import { Navigator } from '../../Components/Common/Navigator';
import { Header } from '../../Components/Common/Header';
import { Loader } from '../../Components/Common/Loader';
import { Error } from '../../Components/Common/Error';
import { StoryForm } from '../../Components/Story/Form/StoryForm';

//firebase
import { serverTimestamp } from 'firebase/firestore';
import { useStoryForm } from '../../Hooks/useStoryForm';

export function CreateStory() {
  const userUID = useSelector(uid)
  const { addStory } = useUpdateStory();
  const { userData, userDataError, isUserDataLoading } = useFetchUserData({ userID: userUID });
  const { storyVisibility, handleStoryVisibility, handleEditorData, register, handleSubmit, errors } = useStoryForm()

  const submit = async (data) => {
    await addStory({
      ...data,
      author: userData.name,
      authorID: userData.id,
      authorProfile: userData.profile,
      createdOn: serverTimestamp(),
    })
  }

  function renderContent() {
    if (isUserDataLoading) return <Loader isCenter={true} />;
    if (userDataError) return <Error message={userDataError.message} />;
    if (userData) return (
      <StoryForm
        storyVisibility={storyVisibility}
        errors={errors}
        submit={submit}
        handleStoryVisibility={handleStoryVisibility}
        register={register}
        handleSubmit={handleSubmit}
        handleEditorData={handleEditorData}
      />
    )
  }

  return (
    <>
      <Header />
      {/* Lorem, ipsum dolor. 
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur incidunt, cumque amet earum consequuntur repellat tempore fuga odit, rem ipsa ullam nisi! Tenetur non ipsum quibusdam! Magnam sed perspiciatis, a vero totam maiores! 
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, deleniti ea? Commodi atque fuga iste. Voluptates unde, velit itaque tenetur blanditiis deleniti rem similique maiores veniam beatae consectetur voluptatibus delectus incidunt temporibus est rerum corporis ratione impedit animi provident, soluta, cumque iste culpa quisquam. Fuga architecto laudantium non reprehenderit necessitatibus odit, illum consequatur eveniet, iusto quae molestias voluptas quis. Doloribus aperiam optio eius dolores inventore libero vitae consequuntur. Exercitationem, dolorem perferendis. Est nemo aperiam aliquam magni quis molestiae ab voluptate fugit dignissimos animi ipsa commodi inventore nam nulla fugiat rem magnam officiis, quibusdam rerum. Harum alias quo mollitia at saepe ut enim illo deserunt? Cumque deleniti accusantium minima. Iusto corrupti facilis tempore, quaerat quibusdam repellendus iste obcaecati necessitatibus earum maiores explicabo sunt vel nisi eum unde, maxime delectus magnam, iure quis culpa? Vero, hic. Ab, velit quo! Omnis repudiandae laboriosam, minima magni dolor ratione dolorem veritatis enim qui ipsum numquam, nesciunt deleniti officiis illum unde ea corporis aut aperiam! Provident suscipit iusto, rerum error obcaecati ullam quidem quas incidunt commodi, reiciendis aspernatur excepturi laboriosam. Minus necessitatibus illo cupiditate perspiciatis ipsam, in assumenda dolor laboriosam voluptate, iste totam id delectus et accusamus! Repellat deleniti mollitia tempora vero sit veniam, maxime necessitatibus quisquam iure rem quod consequuntur, ullam animi saepe veritatis sint praesentium dignissimos quibusdam a illum porro nostrum tempore ipsum corporis. Neque error numquam aliquam veritatis. Ex debitis quas quos nobis excepturi necessitatibus nemo ab cupiditate aliquid nostrum modi neque hic fuga dolorem, voluptates omnis repudiandae voluptas provident perspiciatis! Eos iste at porro, in sint sit autem voluptatum ad repellendus tempora, dolorem fugiat ea sunt blanditiis earum dolor consectetur, dignissimos laborum animi corrupti ab suscipit esse. Hic officiis obcaecati vero perspiciatis mollitia placeat ullam nemo enim eligendi alias blanditiis est praesentium quam pariatur, error repellendus et ratione expedita dolorem inventore quibusdam sapiente nam? Nemo, architecto veritatis? Maiores exercitationem quidem numquam, a expedita, rerum magni sunt voluptatum, tempore at nihil eum aut? Pariatur, reiciendis? Odit consectetur tempore nihil mollitia! Tempore quibusdam deserunt ipsa esse! Voluptatibus? */}
      {renderContent()}
      <Navigator />
    </>
  )
}
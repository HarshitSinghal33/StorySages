import React, { useRef } from 'react';

// Import UI components
import { InputField } from '../../ui/InputField';
import { Textarea } from '../../ui/Textarea';
import { SetStoryVisibility } from './SetStoryVisibility';
import { Button } from '../../ui/Button';

// Quill
import Editor from '../../Editor';
import 'quill/dist/quill.snow.css';

export function StoryForm(props) {
    const quillRef = useRef();
    const { isUpdate, initialEditorData, isFormValuesChange, storyVisibility, handleStoryVisibility, register, handleSubmit, errors, handleEditorData, submit } = props
    
    return (
        <div className='flex justify-center'>
            <form className='px-3 w-full max-w-[1020px]' onSubmit={handleSubmit(submit)}>
                <InputField
                    placeholder='Story Name'
                    type='text'
                    register={register('title')}
                    error={errors.title}
                    name={'titleField'}
                />

                <Textarea
                    placeholder="Story Snap (description)"
                    rows={3}
                    register={register('description')}
                    error={errors.description}
                />

                <Editor
                    defaultValue={initialEditorData}
                    className='mt-3'
                    ref={quillRef}
                    onTextChange={(data) => handleEditorData(data)}
                />

                {errors.story && <small className='text-red-600'>{errors.story.message}</small>}

                <SetStoryVisibility
                    storyVisibility={storyVisibility}
                    onChange={(e) => handleStoryVisibility(e.target.value)}
                />

                <Button
                    type='submit'
                    buttonText={isUpdate ? "UPDATE" : "UPLOAD"}
                    className={`w-full ${isUpdate && 'mb-3'}`}
                    isDisabled={isUpdate ? !isFormValuesChange : false}
                    variant={!isUpdate ? 'primary' : isFormValuesChange ? 'primary': 'secondary'}
                />
            </form>
        </div>
    )
}
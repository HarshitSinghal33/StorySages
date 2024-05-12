import React, { useState } from 'react';
import { serverTimestamp } from 'firebase/firestore';

// Utils
import { validateDescription, validateTitle, validateStory } from '../../../utils/formValidation';

// Form
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import UI components
import InputField from '../../ui/InputField';
import Textarea from '../../ui/Textarea';
import SetStoryVisibility from './SetStoryVisibility';
import Button from '../../ui/Button';

// React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

export default function StoryForm({ initialData, isUpdate, submitFunc, userName, user }) {
    const [storyVisibility, isStoryVisibility] = useState(initialData?.visibility || 'public');

    const schema = Yup.object().shape({
        visibility: Yup.string(),
        title: validateTitle(),
        description: validateDescription(storyVisibility),
        story: validateStory(storyVisibility),
    })

    const { register, handleSubmit, control, watch, getValues, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData || {}
    })

    const handleVisibility = (e) => {
        isStoryVisibility(e.target.value)
        setValue('visibility', e.target.value)
    }

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
        ]
    };

    const formats = [
        'header', 'font',
        'bold', 'italic', 'underline',
        'list', 'align'
    ];

    const submit = (data) => {
        const storyData = isUpdate 
        ? { //for update
            ...initialData,
            ...data,
            lastUpdated: serverTimestamp(),
        } 
        : { // for create
            ...data,
            author: userName,
            userUID: user,
            createdDate: serverTimestamp(),
        }
        submitFunc(isUpdate ? { lastVisibility: initialData.visibility, story: storyData } : storyData);
    }

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

                <Controller
                    name="story"
                    control={control}
                    render={({ field }) => (
                        <ReactQuill
                            {...register('story')}
                            className="border-none outline-none focus:outline-none mt-6"
                            modules={modules}
                            formats={formats}
                            value={field.value}
                            onChange={(html) => {
                                field.onChange(html);
                            }}
                        />
                    )}
                />
                {errors.story && <small className='text-red-600'>{errors.story.message}</small>}

                <SetStoryVisibility storyVisibility={getValues('visibility')} onChange={handleVisibility} register={register('visibility')} />

                <Button buttonText={initialData ? "UPDATE" : "UPLOAD"} className={`w-full ${initialData && 'mb-3'}`} />
            </form>
        </div>
    )
}
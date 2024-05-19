import { useState } from "react";

//utils
import { validateDescription, validateTitle, validateStory } from "../utils/formValidation";

// Form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


export function useStoryForm() {
    const [storyVisibility, setStoryVisibility] = useState('public');

    const schema = Yup.object().shape({
        visibility: Yup.string(),
        title: validateTitle(),
        description: validateDescription(storyVisibility),
        story: validateStory(storyVisibility),
    })

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { visibility: 'public', story: [], title: undefined, description: undefined }
    })

    const handleStoryVisibility = (visibilityType) => {
        setStoryVisibility(visibilityType)
        setValue('visibility',visibilityType)
    }

    const handleEditorData = (data) => setValue('story',data)
    
    return { storyVisibility, handleStoryVisibility, handleEditorData, register, handleSubmit, watch, setValue, errors }
}
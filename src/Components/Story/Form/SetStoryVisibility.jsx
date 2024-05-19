import React from 'react'
const visibilityOptions = [
    {
        type: 'public',
        message: 'Everyone can read your story.'
    },
    {
        type: 'unlisted',
        message: 'Anyone with the video link can read your story.'
    },
    {
        type: 'private',
        message: 'Only you can read your story.'
    },
    {
        type: 'draft',
        message: 'Not shareable and readable. To save uncompleted story.'
    }
]

export function SetStoryVisibility({ register, storyVisibility, ...props }) {
    return (
        <fieldset className='mt-6 ml-3'>
            <legend>Visibility</legend>
            <small>Choose who can read your story.</small>
            {visibilityOptions.map(({ type, message }) => (
                <div className='flex gap-3 items-start my-4' key={type}>
                    <input
                        type="radio"
                        name='group'
                        id={type}
                        checked={storyVisibility === type}
                        value={type}
                        {...register}
                        {...props}
                        className='scale-150 mt-2 cursor-pointer'
                    />
                    <label htmlFor={type} className='cursor-pointer'>
                        <h3 className='capitalize'>{type}</h3>
                        <small>{message}</small>
                    </label>
                </div>
            ))}
        </fieldset>
    )
}

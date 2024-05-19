import React, { useState } from 'react'
const imagesURL = [
    'https://img.freepik.com/free-vector/cute-teddy-bear-waving-hand-cartoon-icon-illustration_138676-2714.jpg',
    'https://img.freepik.com/free-vector/cute-duck-winter-cartoon-vector-icon-illustration-animal-nature-icon-isolated-flat-vector_138676-11514.jpg',
    'https://img.freepik.com/free-vector/cute-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3671.jpg',
    'https://img.freepik.com/free-vector/cute-unicorn-holding-flower-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4089.jpg',
    'https://img.freepik.com/free-vector/cute-panda-with-bamboo_138676-3053.jpg',
    'https://img.freepik.com/free-vector/cute-cat-with-love-sign-hand-cartoon-illustration-animal-nature-concept-isolated-flat-cartoon-style_138676-3419.jpg'
]

export function UpdateProfileImage({ onSelectImage, currentURL }) {
    const [currentImg, setCurrentImg] = useState(currentURL || imagesURL[0]);
    const handleImageChange = (url) => {
        setCurrentImg(url);
        onSelectImage(url)
    }
    
    return (
        <div className='flex flex-col justify-center w-full items-center'>
            <img src={currentImg} alt="selected profile image" className='h-32 w-32 rounded-full my-6' />
            <h2 className='mb-3 font-semibold'>Select an icon</h2>
            <div className='flex flex-wrap gap-y-3 justify-center'>
                {imagesURL.map(url => <img key={url} className='ml-2 rounded-full shrink-0 h-[90px] w-[90px] cursor-pointer' src={url} alt="" onClick={() => handleImageChange(url)} />)}
            </div>
        </div>
    )
}
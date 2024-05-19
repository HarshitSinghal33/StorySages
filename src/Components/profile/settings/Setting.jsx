import React from 'react'

// Components
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LogOut } from './LogOut';
import { RequestPasswordChange } from './RequestPasswordChange';
import { IoIosArrowForward } from "react-icons/io";
import { FaRegWindowClose } from "react-icons/fa";

export function Setting({ handleSettingOpen }) {

    const Links = [
        { to: '/updateprofile', name: 'Update Profile' },
        { to: '/likedstories', name: 'Liked Stories' },
        { to: '/savedstories', name: 'Saved Stories' },
        { to: '/following', name: 'Following' },
        { to: '/aboutpolicy', name: 'About & Policy' }
    ];

    return (
        <motion.div
            className='*:flex *:items-center *:gap-1.5 *:cursor-pointer *:border-b-2 *:px-5 *:py-4 w-full z-20 fixed bottom-0 rounded-tl-xl rounded-tr-xl bg-black overflow-hidden text-lg font-semibold shadow-story'
            initial={{ opacity: 0, y: '105%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '105%' }}
            transition={{ duration: 0.5 }}
        >
            <header className='!block text-center text-2xl'>
                <span>Setting</span>
                <FaRegWindowClose className='absolute right-9 top-4 font-semibold' onClick={handleSettingOpen} fontSize={33} />
            </header>

            {Links.map((link, index) => (
                <Link key={index} to={link.to} >
                    <span>{link.name}</span>
                    <IoIosArrowForward fontSize={24} />
                </Link>
            ))}

            <RequestPasswordChange />

            <a href="https://we-learn-read.web.app/" target='_blank' className='block' >Siksharthi</a>

            <div className='justify-center'><LogOut /></div>

        </motion.div>
    )
}
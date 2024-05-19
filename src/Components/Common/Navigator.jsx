import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// Conponents
import { BsFillPersonFill } from 'react-icons/bs'
import { FaPlus, FaHome } from 'react-icons/fa'

export function Navigator() {
    const { pathname } = useLocation()
    const mainPages = ['/', '/createstory', '/profile'];

    const activePage = (page) => {
        if (pathname.toLowerCase() === page || (page === '/' && pathname.toLowerCase() === '/home')) return 'text-zinc-600 bg-white rounded'
    }

    return (
        <footer className='mt-24 flex justify-center z-10'>
            <div className='flex shadow-footerShadow w-1/3 max-w-72 min-w-48 justify-between fixed bottom-3 backdrop-blur-lg rounded-xl overflow-hidden items-center text-4xl *:py-3 *:px-3'>
                {mainPages.map(page => (
                    <Link key={page} to={`${page}`} className={`${activePage(page)}`}>
                        {page === '/' && <FaHome />}
                        {page === '/createstory' && <FaPlus />}
                        {page === '/profile' && <BsFillPersonFill />}
                    </Link>
                ))}
            </div>
        </footer>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'

// Components
import Navigator from '../Common/Navigator'
export default function LoginMessage() {
    return (
        <>
            <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div>Please <Link className='text-blue-600' to={'/login'}>Login</Link> to get access.</div>
            </h2>
            <Navigator />
        </>
    )
}
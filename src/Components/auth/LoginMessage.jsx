import React from 'react'

// Components
import { Link } from 'react-router-dom'
import { Header } from '../Common/Header'
import { Button } from '../ui/Button'

export function LoginMessage() {
    return (
        <>
            <Header back={true} />
            <div className="flex h-[84vh] justify-center items-center">
                <div className="text-center space-y-4">
                    <h2>Welcome!</h2>
                    <h2>
                        To unlock the full features, please <Link to="/login" className='text-blue-600'>Login</Link> to your account.
                    </h2>
                    <Button className='w-fit'>
                        <Link to='/login'>Login</Link>
                    </Button>
                </div>
            </div>
        </>
    )
}
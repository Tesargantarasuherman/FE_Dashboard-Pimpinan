import React, { useState } from 'react'
import MainPage from './MainPage'

function Main() {
    const [isLogin, setIsLogin] = useState(false)
    return (
        <div>
            {
                isLogin ? (
                    <>

                       <MainPage />
                    </>
                )
                    :
                    <>
                        <div className=''>
                            loading
                        </div>
                    </>
            }
        </div>
    )
}

export default Main
import React from 'react'

export default function ProfilePage(props) {
    
    

    return (
        <>
            <div className='text-center mt-5 pb-5'>
                <h1 className='display-4'>Profile</h1>
            </div>

            <div className='d-flex justify-content-center'>
                <div className='profile text-center'>
                    Name : <p>{localStorage.getItem("firstName")}</p>
                    
                    Last Name : <p>{localStorage.getItem("lastName")}</p>

                    Email : <p>{localStorage.getItem("email")}</p>
                </div>
            </div>
        </>
    )
}

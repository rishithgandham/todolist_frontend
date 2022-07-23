import React from 'react'
import { useParams } from 'react-router-dom';

import axios from 'axios';
import authInstance from '../../util/axios.util';

function EmailSentComponent(props) {

    let { email } = useParams();

    const resend = () => axios.post('/api/v1/tokenresource/resend', { email });

    return (
        <>
            <div className='text-center mt-5'>
                <h1 className='display-4'>Email Sent</h1>
                <h4>Please confirm your email using the message sent to <p style={{color: 'var(--primary-color)'}}>{email}</p> The link will expire in 15 minutes</h4>
            </div>
            <div class="d-flex justify-content-center">
               
                <button onClick={resend} class="btn btn-primary">Resend Email</button>
            </div>
        </>
    )
}


export default EmailSentComponent;

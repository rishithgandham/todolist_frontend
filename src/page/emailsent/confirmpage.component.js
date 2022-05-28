import React, {useState, useEffect} from 'react'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
export default function ConfirmPageComponent(props) {

    const [loading, setLoading] = useState(true);
    const [confirmed, setConfirmed] = useState(false);

    const {token} = useParams();
    
    useEffect(() => {
        setLoading(true)
        const request = async () => {
            const response = await axios.post('/api/v1/tokenresource/confirmtoken', {token})
                .then((response) => {
                    if (response.data.data.confirmed) {
                        setConfirmed(true)
                        setLoading(false)
                        localStorage.setItem('token', response.data.data.token)

                    }
                }).catch((error) => {
                    setLoading(false)
                    setConfirmed(false)
                })
        }
        request();

    }, [])


    return (
        <>  
            {loading ? <div className='text-center mt-5'><h1 className=''>Loading...</h1></div> : <div></div>}
            {confirmed && !loading ? <Navigate to='/home'/> : <div></div>}
            {!confirmed && !loading ? <Navigate to='/login'/> : <div></div>}
        </>
    )
}




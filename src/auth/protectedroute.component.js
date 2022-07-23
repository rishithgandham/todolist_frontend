import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import axios from 'axios';
import authInstance from '../util/axios.util';
import { logout } from './auth';

import { toast } from 'react-toastify';


const ProtectedRoute = ({ children, setNav }) => {
    let executeBlock = false;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem('token');
        // console.log(token)
        if (!token || token === 'undefined') {

            setIsAuthenticated(false);
            setLoading(false)
            executeBlock = true;
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');
            localStorage.removeItem('details');
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            window.location.href = '/#/login';
            toast.error('Your session has expired or you need to login again');
            return;
        }

        checkAuth(token).then(() => {

            userDetails().then(() => {
                setLoading(false);
                executeBlock = true;
            });

            return;
        });
    }, [])

    async function checkAuth(token) {
        await authInstance.post('/api/v5/isauthenticated', {
            jwt: token
        }).catch((error) => {
            console.log(error);
            setIsAuthenticated(false);
            setNav(false)
            logout();
        })
            .then((response) => {
                console.log(response.status)
                setNav(true)
                setIsAuthenticated(true);
                return response.data;
            })
        return isAuthenticated;
    }

    async function userDetails() {
        await authInstance.get('/api/v4/userdetails').then((response) => {
            localStorage.setItem('firstName', response.data.firstName);
            localStorage.setItem('lastName', response.data.lastName);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('details', [response.data.firstName, response.data.lastName, response.data.email]);
            setNav(false);
            setNav(true);
        });
        return isAuthenticated;
    }



    return (
        <>
            <div></div>
            {loading ?
                <div className='text-center mt-5'><h1 className=''>Loading...</h1></div> :
                executeBlock && !isAuthenticated ? <><div></div> <Navigate to="/login" /></> : children}

        </>

    )




}








export default ProtectedRoute;
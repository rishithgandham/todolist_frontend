import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom'


//css
import './css/index.css'
import 'react-toastify/dist/ReactToastify.css';


//component 

import NavbarComponent from './component/navbar/navbar.component'


//pages
import Landing from './page/landing/landing.component'
import Login from './page/login/login.component'
import ProtectedRoute from './auth/protectedroute.component';
import HomePage from './page/home/home.page';
import SignupComponent from './page/signup/signup.component';
import EmailSentComponent from './page/emailsent/emailsent.component';
import ConfirmPageComponent from './page/emailsent/confirmpage.component';

import {ToastContainer} from 'react-toastify';





console.log('react started')


const Router = () => {
    // for the navbarstate
    const [navState, setNavState] = useState(false);

    return (
        <>

            <HashRouter>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <NavbarComponent authState={navState} />
                <Routes>
                    <Route path='/' element={<Landing />}></Route>
                    <Route path='/login' element={<Login setNav={setNavState} />}></Route>
                    <Route path='/register' element={<SignupComponent setNav={setNavState} />}></Route>
                    <Route path='/emailsent/:email' element={<EmailSentComponent />}></Route>
                    <Route path='/home' element={<ProtectedRoute setNav={setNavState}><HomePage /></ProtectedRoute>}></Route>
                    <Route path='/confirm/:token' element={<ConfirmPageComponent />}></Route>
                </Routes>

            </HashRouter>
        </>
    )
}


ReactDOM.render(

    <>
        <Router />

    </>

    ,
    document.getElementById('root')
);



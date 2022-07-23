import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom'


//css
import './css/index.css'
import 'react-toastify/dist/ReactToastify.css';


//component 

import NavbarComponent from './component/navbar/navbar.component'


//pages
import Landing from './page/landing/landing.page'
import LoginPage from './page/login/login.page'
import HomePage from './page/home/home.page';
import SignUpPage from './page/signup/signup.page';
import EmailSentComponent from './page/emailsent/emailsent.page';
import ConfirmPageComponent from './page/emailsent/confirmpage.page';
import ViewListPage from './page/viewlist/viewlist.page';
import ViewlistsPage from './page/viewlists/viewlists.page';
import ProfilePage from './page/profile/profile.page';

import ProtectedRoute from './auth/protectedroute.component';

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
                    <Route path='/login' element={<LoginPage setNav={setNavState} />}></Route>
                    <Route path='/register' element={<SignUpPage setNav={setNavState} />}></Route>
                    <Route path='/emailsent/:email' element={<EmailSentComponent />}></Route>
                    <Route path='/confirm/:token' element={<ConfirmPageComponent />}></Route>
                    {/* paths requiring authentication */}
                    <Route path='/home' element={<ProtectedRoute setNav={setNavState}><HomePage /></ProtectedRoute>}></Route>
                    <Route path='/viewlists' element={<ProtectedRoute setNav={setNavState}><ViewlistsPage /></ProtectedRoute>}></Route>
                    <Route path='/viewlist' element={<ProtectedRoute setNav={setNavState}><ViewListPage /></ProtectedRoute>}></Route>
                    <Route path='/profile' element={<ProtectedRoute setNav={setNavState}><ProfilePage /></ProtectedRoute>}></Route>
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



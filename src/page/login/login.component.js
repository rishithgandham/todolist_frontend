


//css
import { Button, Container, Form } from 'react-bootstrap';

// import {ReactComponent as Login} from './login'

import {BiShow} from 'react-icons/bi'

import login from './login.svg'


//react
import React, { useState } from 'react';


import axios from 'axios';



const LoginComponent = ({ setNav }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [show, setShow] = useState('password');

    async function handleFormSubmit(event) {
        event.preventDefault();
        await axios.post('/api/v3/authresource/authenticate', {
            email,
            password
        }).catch(error => {
            console.log('failed authentication', error)
        }).then((response) => {
            localStorage.setItem('token', response.data.jwt);
            setNav(true)
            window.location.href = '/#/home'
            console.log('authenticated');
        })
    }






    return (
        <>
            <section class="vh-100">
                <div class="container py-5 h-100">
                    <div class="row d-flex align-items-center justify-content-center h-100">
                        <div class="col-md-8 col-lg-7 col-xl-6">
                            <img src={login} alt="login" className="img-fluid mb-3" />
                        </div>
                        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <p className='display-4 text-center'>Login</p>
                            <form>

                                <div class="form-outline mb-4">
                                    <input type="email" onChange={event => setEmail(event.target.value)} className="form-control form-control-lg" />
                                    <label class="form-label">Email address</label>
                                </div>


                                
                               
                                <div class="input-group ">
                                    <input type={show} onChange={(event) => setPassword(event.target.value)} className="form-control form-control-lg" />
                                    
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" onClick={() => setShow(show === 'password' ? 'text' : 'password')}><BiShow size={34}/></button>
                                    </div>
                                </div>
                                <label class="form-label">Password</label>


                                <div class="d-flex justify-content-around align-items-center mb-4">
                                    <a href="#!">Forgot password?</a>
                                </div>

                                <div class="d-flex justify-content-center align-items-center">
                                    <button type="submit" disabled={!(email && password)}onClick={handleFormSubmit}class="btn btn-primary btn-lg btn-block">Sign in</button>
                                </div>






                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )




}

export default LoginComponent;

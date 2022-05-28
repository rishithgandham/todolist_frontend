import React, { useState } from 'react'

import { BiShow } from 'react-icons/bi'

import signup from './signup.svg'


import authInstance from '../../util/axios.util';
import axios from 'axios';

const validateEmail = (email) => {
    return (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
}
function SignupComponent({setNav}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [show, setShow] = useState('password');
    const [vp, setVP] = useState(false);
    const [ve, setVE] = useState(false);



    async function handleFormSubmit(event) {
        event.preventDefault();
        await axios.post('/api/v1/register/', {
            firstName,
            lastName,
            password,
            email: email.toLowerCase()
        }).then((response) => {
            window.location.href = `/#/emailsent/${email}`
        }).catch((error) => {
            console.log('failed regtistration', error)
        });
    }

    return (
        <>
            <section class="vh-100">
                <div class="container py-5 h-100">
                    <div class="row d-flex align-items-center justify-content-center h-100">
                        <div class="col-md-8 col-lg-7 col-xl-6">
                            <img src={signup} alt="login" class="img-fluid mb-3" />
                        </div>
                        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <p className='display-4 text-center'>Register</p>
                            <form>

                                <div class="form-outline mb-4">
                                    <input type="email" onChange={event => { 
                                        setEmail(event.target.value.replace(/\s/g, '')); 
                                        setVE(validateEmail(event.target.value)) 
                                        }} 
                                        className="form-control form-control-lg" />
                                    <label class="form-label">Email address</label> <small class={ve ? 'text-primary' : 'text-danger'}>{ve ? <>Valid!</> : <>Invalid!</>}</small>
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="text" onChange={event => 
                                        setFirstName(event.target.value)
                                        } 
                                        className="form-control form-control-lg" />
                                    <label class="form-label">First Name</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="text" onChange={event => setLastName(event.target.value)} className="form-control form-control-lg" />
                                    <label class="form-label">Last Name</label>
                                </div>




                                <div class="input-group mb-3">
                                    <input
                                        value={password}
                                        type={show}
                                        onChange={(event) => {
                                            setPassword(event.target.value.replace(/\s/g, ''));
                                            setVP(event.target.value < 8 ? false : true)
                                        }}
                                        className="form-control form-control-lg" />

                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" onClick={() => setShow(show === 'password' ? 'text' : 'password')}><BiShow size={34} /></button>
                                    </div>




                                </div>
                                <label class="form-label">Password</label> <small class={password.length >=8 ? 'text-primary' : 'text-danger'}>{password.length >=8? <>Valid!</> : <>Invalid!</>}</small>













                                <div class="d-flex justify-content-center align-items-center">
                                    <button type="submit" onClick={handleFormSubmit} class="btn btn-primary btn-lg btn-block">Register</button>
                                </div>






                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignupComponent;

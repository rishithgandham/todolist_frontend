import React from 'react';
import { Container, Row } from 'react-bootstrap'

import list from './listsvg.svg'

import authInstance from '../../util/axios.util';


const Landing = () => {
    return (
        <>
            <Container className='mt-5 text-center'>
                <h1 className='text-center display-1 mb-5'>Todolist</h1>

                Consequat veniam veniam pariatur eu est commodo fugiat adipisicing. Laboris aliquip adipisicing quis duis nisi in ullamco enim nostrud est est sint culpa sunt. Proident minim sit culpa laborum sint mollit ea veniam minim.

                Deserunt dolore dolor ipsum in et eu est exercitation commodo. Quis sint quis elit culpa duis fugiat consectetur ullamco tempor magna. Nisi velit amet ea ut aliqua amet ullamco tempor. Esse consequat excepteur Lorem sit ad nulla anim sit reprehenderit cupidatat eiusmod. Sit proident irure quis est dolor in commodo tempor elit ut irure. Eiusmod esse velit eiusmod Lorem reprehenderit Lorem. Consequat dolor officia velit qui esse.

                Deserunt qui deserunt magna nulla velit Lorem do aliqua anim. Laboris nostrud ullamco exercitation ullamco. Ut dolore fugiat excepteur excepteur laboris duis sunt est aute. Officia minim duis aliquip cillum elit in ipsum cillum voluptate consectetur eiusmod elit reprehenderit.
                
                <img className='card-image-top' src={list} alt='list' />


            </Container>
            
        </>
    )
}

export default Landing;
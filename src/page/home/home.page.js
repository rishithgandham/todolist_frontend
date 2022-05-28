import React, {useEffect, useState} from 'react';
import authInstance from '../../util/axios.util';


function HomePage() {


    const [overdue, setOverdue] = useState([]);

    useEffect(() => {
        const request = async () => {
            let overduelists =  [];
            await authInstance.get('/api/v4/userdetails').then((response) => {
                localStorage.setItem('firstName', response.data.firstName);
                localStorage.setItem('lastName', response.data.lastName);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('details', [response.data.firstName, response.data.lastName, response.data.email]);
                
                
                for (let list of response.data.lists) if (Date.parse(list.dueDate) > Date.now()) overduelists.push(list);
                setOverdue(overduelists);
            })
            return overduelists;
        }
        request()
        
        
    }, [])


    return (
        <>
            {console.log(overdue)}
            <h1>Home Page</h1>
        </>
    )   
}


export default HomePage;
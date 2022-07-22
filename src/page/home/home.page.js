import React, { useEffect, useState } from 'react';
import authInstance from '../../util/axios.util';



import { Modal, Button } from 'react-bootstrap';

import check from './check.svg';


import EditList from '../../component/listmodals/editlist.component';
import DeleteList from '../../component/listmodals/deletelist.component';






function HomePage() {


    const [overdue, setOverdue] = useState([]);
    // const [id, setId] = useState(0);
    const [showEdit, setShowEdit] = useState(false);
    const [editList, setEditList] = useState([]);


    const [showDelete, setShowDelete] = useState(false);
    const [deleteList, setDeleteList] = useState([]);

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const request = async () => {
            let overduelists = [];
            await authInstance.get('/api/v4/userdetails').then((response) => {
                localStorage.setItem('firstName', response.data.firstName);
                localStorage.setItem('lastName', response.data.lastName);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('details', [response.data.firstName, response.data.lastName, response.data.email]);


                for (let list of response.data.lists) if (Date.parse(list.dueDate) < Date.now()) overduelists.push(list);
                setOverdue(overduelists);
            })
            return overduelists;
        }
        request()


    }, [refresh])




    return (
        <>

            <div className='text-center mt-5'><h1 className=''>Welcome {localStorage.getItem('firstName')}</h1></div>
            <div className='text-center mt-2 mb-5'><h3 className=''>You have {overdue.length} overdue list{overdue.length == 1 ? '' : 's'}</h3></div>


            <section class="vh-100">
                <div class="container py-5 h-50">
                    <div class="row d-flex align-items-center justify-content-center h-100">
                        <div class="col-md-8 col-lg-7 p-5 col-xl-6">
                            <img src={check} alt="check" className="img-fluid mb-3" />
                        </div>
                        <div class="col-md-7 col-lg-5 p-5 col-xl-5 offset-xl-1">

                            <div className=''>
                                <ul class="list-group">
                                    {overdue.map(list =>
                                        <li class="list-group-item list-group-item-action flex-column align-items-start" key={list.id}>
                                            <a onClick={() => window.location.href=`/#/viewlist?id=${list.id}`}>
                                                <div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">{list.name}</h5>
                                                    <small class="text-danger">{list.dueDate.slice(0, 10)}</small>
                                                </div>
                                                <p class="mb-1">{list.description}</p>
                                            </a>
                                            <div class="d-flex w-100 justify-content-center">
                                                <button type="button" class="btn btn-link text-danger" onClick={() => { setShowDelete(true); setDeleteList(list) }}>Delete</button>
                                                <button type="button" class="btn btn-link text-primary" onClick={() => { setShowEdit(true); setEditList(list) }}>Edit</button>
                                            </div>
                                        </li>

                                    )}
                                </ul>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

            <EditList showmodal={showEdit} setShow={setShowEdit} list={editList} forceUpdate={[refresh, setRefresh]} />
            <DeleteList showmodal={showDelete} setShow={setShowDelete} list={deleteList} forceUpdate={[refresh, setRefresh]} />



        </>
    )
}






export default HomePage;
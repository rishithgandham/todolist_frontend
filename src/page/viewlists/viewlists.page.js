import React, { useState, useEffect } from 'react'

import EditList from '../../component/listmodals/editlist.component';
import DeleteList from '../../component/listmodals/deletelist.component';

import authInstance from '../../util/axios.util';
import AddListComponent from '../../component/listmodals/addlist.component';



export default function ViewlistsPage(props) {


    const [refresh, setRefresh] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const [editList, setEditList] = useState([]);

    const [showDelete, setShowDelete] = useState(false);
    const [deleteList, setDeleteList] = useState([]);

    const [showAdd, setShowAdd] = useState(false);

    const [lists, setLists] = useState([]);

    useEffect(() => {
        const request = async () => {
            const response = await authInstance.get('api/v2/listresource/getlists')
                .then(response => {
                    setLists(response.data.lists);
                });
        }

        request();
    }, [refresh])


    return (
        <>
            <div className='container p-5'>
                <ul class="list-group">
                    {lists.map(list => (
                        <a  class="list-group-item list-group-item-action flex-column align-items-start" key={list.id}>
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
                        </a>
                    ))}

                    <a class="list-group-item list-group-item-dark list-group-item-action flex-column align-items-start" onClick={() => setShowAdd(true)} >


                        <div className="d-flex justify-content-center mt-1"> 
                            <h5 >Add List</h5>
                        </div>

                    
                    </a>






                </ul>
            </div>
            {/* {lists.map(list => {})} */}
            <EditList showmodal={showEdit} setShow={setShowEdit} list={editList} forceUpdate={[refresh, setRefresh]} />
            <DeleteList showmodal={showDelete} setShow={setShowDelete} list={deleteList} forceUpdate={[refresh, setRefresh]} />
            <AddListComponent showmodal={showAdd} setShow={setShowAdd} forceUpdate={[refresh, setRefresh]}></AddListComponent>
        </>
    )
}

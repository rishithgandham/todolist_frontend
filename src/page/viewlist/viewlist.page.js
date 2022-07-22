import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import AddTask from '../../component/taskmodals/addtask.component';
import authInstance from '../../util/axios.util';


export default function ViewListPage(props) {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('id')
    const [forceRefresh, setForceRefresh] = useState(false);

    const [details, setDetails] = useState({})
    const [list, setList] = useState([]);

    const [todo, setTodo] = useState([]);


    const [showEdit, setShowEdit] = useState(false);

    // const [showDelete, setShowDelete] = useState(false);

    const [showAdd, setShowAdd] = useState(false);



    useEffect(() => {
        authInstance.get(`/api/v2/listresource/getlist/${id}`)
            .then((response) => {
                let { name, description, dueDate, id, taskList } = response.data
                const details = { name, description, dueDate, id }
                setDetails(details);
                setList(taskList);
            })
    }, [forceRefresh])

    return (
        <>
            <div className='container mt-5'>
                <div className='d-flex justify-content-center'><p className='display-5'>{details.name && details.name}</p></div>
                <ul class="list-group">
                    {list.map((task) => (
                        <>
                            <li class="list-group-item list-group-item-action flex-column align-items-start" key={task.id}>

                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{task.name}</h5>

                                </div>
                                <p class="mb-1">{task.description}</p>

                                <div class="d-flex w-100 justify-content-center">
                                    {/* <button type="button" class="btn btn-link text-danger" onClick={() => { setShowDelete(true); setList(list) }}>Delete</button> */}
                                    <button type="button" class="btn btn-link text-primary" onClick={() => { setShowEdit(true); setList(list) }}>Edit</button>
                                </div>
                            </li>


                        </>
                    ))}
                </ul>

                <div className="d-flex justify-content-center">
                    <button className="add-button"onClick={() => setShowAdd(true)}>Add List</button>
                </div>
            </div>

            <AddTask showmodal={showAdd} setShow={setShowAdd} listId={details.id} forceUpdate={[forceRefresh, setForceRefresh]}/>
        </>
    )
}

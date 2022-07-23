import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import AddTask from '../../component/taskmodals/addtask.component';
import EditTask from '../../component/taskmodals/edittask.component';
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

    function deleteTodo(e, id) {
        e.preventDefault();
        authInstance.post(`/api/v2/taskresource/deletetodo`, {id: id})
            .then((response) => {
                setForceRefresh(!forceRefresh);
            }).catch((error) => {
                console.log(error);
            })
    }

    function toggleTodo(e, id) {
        e.preventDefault();
        
        authInstance.post(`/api/v2/taskresource/toggletodo/${id}/${details.id}`);
        window.location.reload();
    }

    return (
        <>
            <div className='container mt-5'>
                <div className='d-flex justify-content-center'><p className='display-5'>{details.name && details.name}</p></div>
                <ul class="list-group">
                    {list.map((task) => (
                        <>
                            <li class="list-group-item list-group-item-action flex-column align-items-start" key={task.id}>
                                <div class="row">
                                    <div class="col-md-2">

                                        <div class="row">
                                            <div class="col">
                                                <button type="button" class="btn btn-link text-success" onClick={() => { setTodo(task); setShowEdit(true); }}>Edit</button>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <button type="button" class="btn btn-link text-success" onClick={(e) => { deleteTodo(e, task.id) }}>Delete</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-md-8">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">{task.name}</h5>

                                        </div>
                                        <p class="mb-1">{task.description}</p>

                                        <div class="d-flex w-100 justify-content-center">
                                            {/* <button type="button" class="btn btn-link text-danger" onClick={() => { setShowDelete(true); setList(list) }}>Delete</button> */}


                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="d-flex align-items-center justify-content-center ">
                                            <input class="form-check-input" onChange={(e) => toggleTodo(e, task.id)} type="checkbox" checked={task.checked} id="flexCheckDefault"/>
                                        </div>
                                    </div>
                                </div>




                            </li>


                        </>
                    ))}
                </ul>

                <div className="d-flex justify-content-center">
                    <button className="add-button" onClick={() => setShowAdd(true)}>+</button>
                </div>
            </div>

            <AddTask showmodal={showAdd} setShow={setShowAdd} listId={details.id} forceUpdate={[forceRefresh, setForceRefresh]} />
            <EditTask showmodal={showEdit} setShow={setShowEdit} listId={details.id} task={todo} forceUpdate={[forceRefresh, setForceRefresh]} />
        </>
    )
}

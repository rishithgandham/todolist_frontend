import React from 'react'
import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import authInstance from '../../util/axios.util'


const EditTask = ({ setShow, forceUpdate, showmodal, listId, task }) => {

    const [name, setName] = useState(task.name)
    const [description, setDescription] = useState(task.description);

    function editTodo(e) {
        e.preventDefault()
        authInstance.post('/api/v2/taskresource/edittodo', {
            id: task.id,
            name,
            desc: description
        }).then((response) => {
            setShow(false);
            forceUpdate[1](!forceUpdate[0]);
        })
    }


    return (
        <>
            <Modal show={showmodal} onHide={() => setShow(false)} className='list-modal' animation={false}>
                <div class="p-5">
                    <p className='display-4 text-center'>Edit Task</p>
                    <form>


                        <div class="form-outline mb-4">
                            <input type="text" placeholder={task.name} onChange={event => { setName(event.target.value) }} className="form-control form-control-md" />
                            <label class="form-label" >Name</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="text" placeholder={task.description}onChange={event => setDescription(event.target.value)} className="form-control form-control-md" />
                            <label class="form-label">Description</label>
                        </div>


                        <div class="d-flex justify-content-center align-items-center">
                            <button type="submit" disabled={!(name && description)} onClick={editTodo}class="btn btn-primary btn-lg btn-block">Save</button>
                        </div>

                    </form>
                </div>

            </Modal>
        </>
    )
}

export default EditTask
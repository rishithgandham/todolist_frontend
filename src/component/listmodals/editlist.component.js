import React, {useState} from 'react';
import authInstance from '../../util/axios.util';
import {Modal} from 'react-bootstrap';

const EditList = ({ showmodal, setShow, list, forceUpdate }) => {

    const [name, setName] = useState(list.name);
    const [description, setDescription] = useState(list.description);
    const [dueDate, setDueDate] = useState(list.dueDate);

    




    function editList(e) {
        e.preventDefault();
        // console.log(name, description, dueDate);
        authInstance.post('/api/v2/listresource/editlist', {
            id: list.id,
            name: name,
            date: dueDate,
            description: description
        }).then(response => {
            
            setShow(false);
            forceUpdate[1](!forceUpdate[0]);
        });

    }


    return (
        <>
            
            <Modal show={showmodal} onHide={() => setShow(false)} className='list-modal' animation={false}>
                <div class="p-5">
                    <p className='display-4 text-center'>Edit List</p>
                    <form>


                        <div class="form-outline mb-4">
                            <input type="text" onChange={event => {setName(event.target.value)}} placeholder={list.name} className="form-control form-control-md" />
                            <label class="form-label" >Name</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="text" onChange={event => setDescription(event.target.value)} placeholder={list.description} className="form-control form-control-md" />
                            <label class="form-label">Description</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="date" onChange={event => setDueDate(event.target.value)}   className="form-control form-control-md" />
                            <label class="form-label">Due Date</label>
                        </div>


                        <div class="d-flex justify-content-center align-items-center">
                                    <button type="submit" disabled={!(name && description && dueDate)} onClick={editList}class="btn btn-primary btn-lg btn-block">Save</button>
                        </div>

                    </form>
                </div>


            </Modal>
        </>
    )
}


export default EditList;
import React, {useState} from "react";

import { Modal } from "react-bootstrap";
import authInstance from "../../util/axios.util";

const AddListComponent = ({showmodal, setShow, forceUpdate}) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [dueDate, setDueDate] = useState();


    function addList(e) {
       
        e.preventDefault();

        authInstance.post('/api/v2/listresource/createlist', {
            name, description, date: dueDate
        }).then((response) => {
            setShow(false)
            forceUpdate[1](!forceUpdate[0]);
        })

    }

    return (
        <>
            <Modal show={showmodal} onHide={() => setShow(false)} className='list-modal' animation={false}>
                <div class="p-5">
                    <p className='display-4 text-center'>Add List</p>
                    <form>


                        <div class="form-outline mb-4">
                            <input type="text" onChange={event => {setName(event.target.value)}} className="form-control form-control-md" />
                            <label class="form-label" >Name</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="text" onChange={event => setDescription(event.target.value)}  className="form-control form-control-md" />
                            <label class="form-label">Description</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="date" onChange={event => setDueDate(event.target.value)}   className="form-control form-control-md" />
                            <label class="form-label">Due Date</label>
                        </div>


                        <div class="d-flex justify-content-center align-items-center">
                                    <button type="submit" disabled={!(name && description && dueDate)} onClick={addList}class="btn btn-primary btn-lg btn-block">Save</button>
                        </div>

                    </form>
                </div>

            </Modal>
        
        </>

    )
}



export default AddListComponent;
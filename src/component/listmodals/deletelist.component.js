import React, {useState} from 'react';
import authInstance from '../../util/axios.util';
import {Modal} from 'react-bootstrap';


const DeleteList = ({ showmodal, setShow, list, forceUpdate }) => {


    const [valid, setValid] = useState(false);

    const deletelist = (e) => {
        e.preventDefault();
        authInstance.post('/api/v2/listresource/deletelist', {
            id: list.id
        }, {
            params: {
                id: list.id
            }
        }).then(response => {
            setShow(false);
            forceUpdate[1](!forceUpdate[0]);
        });
    }

    return (
        <Modal show={showmodal} onHide={() => setShow(false)} className='list-modal' animation={false}>
            <div class="p-5">
                <p className='display-4 text-center'>Delete List</p>
                <h5 className='text-center'>Are you sure you want to proceed in deleting this list?</h5>
                <p className='text-center text-secondary p-2'>Please type in  <h6 className='fw-bold text-dark'>{list.name && list.name.replace(/\s/g, '') }</h6> to continue</p>
                <div class="d-flex justify-content-center align-items-center">
                    
                    <input type="text" onChange={event => list.name && setValid(list.name.replace(/\s/g, '') == event.target.value)} className="form-control form-control-md" />
                    

                </div>
                <small class={valid ? 'text-primary' : 'text-danger'}>{valid? <>Valid!</> : <>Invalid!</>}</small>

                <div class="d-flex justify-content-center align-items-center">
                    <button type="submit" disabled={!valid} onClick={deletelist}class="btn btn-primary btn-lg btn-block">Delete</button>
                </div>
            </div>

                    
        </Modal>
    )

}


export default DeleteList;
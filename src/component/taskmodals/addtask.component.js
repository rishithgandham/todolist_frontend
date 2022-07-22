import React, {useState} from 'react';
import {Modal} from 'react-bootstrap'
import authInstance from '../../util/axios.util';

const AddTask = ({setShow, forceUpdate, showmodal, listId}) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState(''); 

  function addTodo(e) {
    e.preventDefault()
    authInstance.post('/api/v2/taskresource/createtodo', 
      { name, desc: description, listId}).then((response) => {
        setShow(false);
        forceUpdate[1](!forceUpdate[0]);
      })
  }

  return (
    <>
      <Modal show={showmodal} onHide={() => setShow(false)} className='list-modal' animation={false}>
        <div class="p-5">
                    <p className='display-4 text-center'>Add Task</p>
                    <form>


                        <div class="form-outline mb-4">
                            <input type="text" onChange={event => {setName(event.target.value)}} className="form-control form-control-md" />
                            <label class="form-label" >Name</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="text" onChange={event => setDescription(event.target.value)}  className="form-control form-control-md" />
                            <label class="form-label">Description</label>
                        </div>

            
                        <div class="d-flex justify-content-center align-items-center">
                                    <button type="submit" disabled={!(name && description)} onClick={addTodo}class="btn btn-primary btn-lg btn-block">Save</button>
                        </div>

                    </form>
                </div>

      </Modal>
    </>
  )
}

export default AddTask
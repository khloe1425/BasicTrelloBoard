import React, { useState } from 'react';

export default function Modal(props) {
    const [taskContent,setTaskContent] = useState("");
    return <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add New Task</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput2" className="form-label">Content</label>
                        <input type="text" className="form-control" id="exampleFormControlInput2"
                        value={taskContent}
                            onChange={(e) => {
                                setTaskContent(e.target.value)
                            }}
                        />
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success"
                        onClick={() => {
                            props.addNewTask(props.chooseColumnID ,props.initBoard,taskContent);
                            setTaskContent("")
                        }}
                    >Add</button>
                </div>
            </div>
        </div>
    </div>;
}

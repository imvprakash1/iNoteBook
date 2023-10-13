import NoteContext from "../context/notes/NoteContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";


function Notes(props) {
  const {showAlert}=props;
  const noteContext = useContext(NoteContext);
  const { notes, getNotes, editNote } = noteContext;
  const notesMounted = useRef(false);
  const modalRef = useRef(null);
  const modalCloseRef = useRef(null);
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  let navigate=useNavigate();
  useEffect(() => {
    // if (!notesMounted.current) {
    //   if(localStorage.getItem('token')){
    //     getNotes();
    //   }
    //   else{
    //     showAlert('Please login','warning');
    //     navigate('/login');
    //   }
    // }

    // return () => notesMounted.current = true;
    if(localStorage.getItem('token')){
          getNotes();
        }
        else{
          showAlert('Please login','warning');
          navigate('/login');
        }
  }, [])

  const updateNote = (currentNote) => {
    modalRef.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    modalCloseRef.current.click();
    showAlert('Note updated successfully','success');
  }
  return (
    <>
      <AddNote showAlert={showAlert}/>
      <button ref={modalRef} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:"none"}}>
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} autoComplete="on"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} autoComplete="on"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} autoComplete="on"/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={modalCloseRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
        {notes.length===0 && 'No Notes to display.'}
      </div>
        {notes && notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
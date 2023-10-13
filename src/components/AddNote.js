import NoteContext from "../context/notes/NoteContext";
import React,{ useContext, useState } from "react";

function AddNote(props) {
  const noteContext = useContext(NoteContext);
  const { addNote } = noteContext;
  const [note, setNote] = useState({title:"",description:"",tag:""})
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  const handleAdd=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
    props.showAlert('Note added successfully','success');
  }

  return (
    <div className="container">
      <h1>Add Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={3} required autoComplete="on"/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required autoComplete="on"/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} autoComplete="on"/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleAdd}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddNote;

import React, {useContext} from "react";
import NoteContext from "../context/notes/NoteContext";


function NoteItem(props) {
  const noteContext=useContext(NoteContext);
  const {deleteNote}=noteContext;
  const { note, updateNote, showAlert } = props;
  return (
    <>
      <div className="col-md-3 my-3">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);showAlert('Deleted successfully','success')}}></i>
              <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} ></i>
            </div>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {note.tag}
            </h6>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteItem;

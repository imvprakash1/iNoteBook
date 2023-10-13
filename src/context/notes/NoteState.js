import {useState} from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const host='http://localhost:5000/api/'
    const initialNotes=[]
      //Get All notes
      const getNotes=async()=>{
        const url=`${host}notes/fetchallnotes`
        const response=await fetch(url,{
            method:'GET',
            // mode:'no-cors',
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem('token')
            }
        })
        const json=await response.json();
        setNotes(json);
      }
      //Add note
      const addNote=async(title,description,tag)=>{
        const url=`${host}notes/addnote`
        const response=await fetch(url,{
            method:'POST',
            // mode:'no-cors',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        })
        const json=await response.json();
        setNotes(notes.concat(json));
      }
      //Delete note
      const deleteNote=async(id)=>{
        const url=`${host}notes/deletenote/${id}`
        const response=await fetch(url,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            }
            // body:JSON.stringify({title,description,tag})
        })
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }
      //Edit note
      const editNote=async(id,title,description,tag)=>{
        const url=`${host}notes/updatenote/${id}`
        const response=await fetch(url,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        })
        const newNotes=await JSON.parse(JSON.stringify(notes))
        newNotes.forEach((note)=>{
            if(note._id===id){
                if(title){note.title=title}
                if(description){note.description=description}
                if(tag){note.tag=tag}
            }
        })
        setNotes(newNotes);
      }
      const [notes, setNotes] = useState(initialNotes);

    return(
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
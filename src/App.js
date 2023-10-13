import "./App.css";
import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert,setAlert]=useState(null);
  
  const showAlert=(message,type)=>{
    setAlert({message,type})
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
      <Router>
          <Navbar />
          <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;

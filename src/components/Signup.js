import React,{useState} from "react";
import { useNavigate } from 'react-router-dom'

function Signup(props) {
    const [credentials, setCredentials] = useState({name:'',email:'',password:''})
    const navigate=useNavigate();
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:5000/api/auth/createuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        })
        const json=await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken)
            props.showAlert('Account created successfully','success')
            navigate('/');
        }
        else{
            props.showAlert('Please Enter valid details','danger')
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            value={credentials.name} minLength={3} required autoComplete="on"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email} minLength={5} required autoComplete="on"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password} minLength={5} required autoComplete="on"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;

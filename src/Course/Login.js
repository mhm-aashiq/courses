import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, isLoggedIn }) => {
const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3031/students') 
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = users.find(user => user.email === email && user.password === password);
    console.log("foundUser",foundUser.id)

    if (foundUser) {
        setIsLoggedIn(true);
        // Fetch enrollments for the logged-in user
        axios.get(`http://localhost:3031/enrollments/?studentId=${foundUser.id}`) // Adjust the URL to your API endpoint for enrollments
          .then(response => {
            setEnrollments(response.data);
            navigate('/Dashbord', { state: { userEmail: foundUser.email, enrollments: response.data } });
            console.log("repsnse",response);
          })
          .catch(error => {
            console.error('Error fetching enrollments:', error);
            navigate('/Dashbord', { state: { userEmail: foundUser.email, enrollments: [] } });
          });}
  };

  if (isLoggedIn) {
    navigate('/Dashbord');
    return null; // Render nothing if redirecting
  }

  return (
    <div className='mt-4'>
<form onSubmit={handleLogin}>
  <div className="form-group">
    <label >Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
    <small id="emailHelp" className="form-text text-muted mt-2">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group mt-3">
    <label>Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
     value={password}
     onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  <button type="submit" className="btn btn-sm btn-primary mt-4" >Login</button>
</form>
    </div>
  )
}

export default Login
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.css';

import Navbar from './Navbar';
import Dashbord from './Course/Dashbord';
import { Route, Routes } from 'react-router-dom';
import CourseList from './Course/CourseList';
import CourseDetails from './Course/CourseDetails';
import Login from './Course/Login';
import { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
  <div className='container'>
<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
<Routes>
    <Route
      path="/Dashbord"
      exact
      element={<Dashbord isLoggedIn={isLoggedIn} />}
    />
    {/* <Route path="/Dashbord" exact element={<Dashbord />} /> */}
    <Route path="/CourseList" exact element={<CourseList />} />
    <Route path="/CourseDetails/:id" exact element={<CourseDetails />} />
    <Route
      path="/login"
      exact
      element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
    />
   
</Routes>


  </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
  const { id } = useParams(); 
  const [courseDetails, setCourseDetails] = useState(null);
  console.log('d:',courseDetails)

  useEffect(() => {

    axios.get(`http://localhost:3031/courses/${id}`)
      .then(res => setCourseDetails(res.data))
      .catch(err => console.log(err));
  }, [id]);

  return (
   <div>
      {courseDetails ? (
        <div>
          <img src={courseDetails.thumbnail} alt="" />
          <h1>{courseDetails.name}</h1>
          <p >Instructor: {courseDetails.instructor}</p>
          <p >Description: {courseDetails.description}</p>
          <p >enrollmentStatus: {courseDetails.enrollmentStatus}</p>
          <p >duration: {courseDetails.duration}</p>
          <p >location: {courseDetails.location}</p>
          <p >prerequisites: {courseDetails.prerequisites}</p>
       
         
       
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default CourseDetails
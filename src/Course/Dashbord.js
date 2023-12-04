import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Dashbord = ({ isLoggedIn }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const JS = require('../images/JS.png');
  const RN = require('../images/RN.png');
  const ML = require('../images/ML.jpg');
  const Python = require('../images/Python.png');
  const React = require('../images/react.png');
  const Web = require('../images/web-development.png');

  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const enrollments = location.state?.enrollments;
  const [completedCourses, setCompletedCourses] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("enrollments",enrollments)
        if (enrollments && enrollments.length > 0) {
          const enrolledCoursesIds = enrollments.reduce((acc, enrollment) => {
            
            return acc.concat(enrollment.courseIds);
          }, []);

          // Make a GET request to fetch course details based on course IDs
          const response = await axios.get(`http://localhost:3031/courses`, {
            params: { courseIds: enrolledCoursesIds }, // Pass course IDs as query parameters
          });

          setCourses(response.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

 


    fetchCourses();
  }, [enrollments]);


   // Function to handle marking course as completed
   const handleCourseCompletion = (courseId) => {
    setCompletedCourses({
      ...completedCourses,
      [courseId]: !completedCourses[courseId],
    });
  };

  if (!isLoggedIn) {
    return <p>Please log in to view the dashboard.</p>;
  }

  return (
    <div className="container">
      <p>Welcome, {userEmail}!</p>

      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : (
          courses.map((course, index) => (
            <div className="col-lg-4 col-md-4 col-sm-4" key={index}>
              <div className="card mt-4" style={{ width: '18rem' }}>
              <img style={{ minHeight: '150px' }}
                src={course.name === "Introduction to React Native" ? RN :
                 course.name === "Advanced React Development" ? React:
                 course.name === "JavaScript Fundamentals" ? JS:
                 course.name === "Web Development Bootcamp" ? Web:
                 course.name === "Machine Learning Basics" ? ML:
                  Python}
                className="card-img-top"
                alt="..."
              />
                <div className="card-body">
                  <h5 className="card-title mt-2 mb-2">{course.name}</h5>
                  <p className="card-text">Instructor: {course.instructor}</p>
                  <p className="card-text">Duration: {course.duration}</p>
                   <label>
                    <input
                      type="checkbox"
                      checked={completedCourses[course.id]}
                      onChange={() => handleCourseCompletion(course.id)}
                    />
                    Mark as Completed
                  </label>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashbord;

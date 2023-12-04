import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';

const CourseList = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3031/courses')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {

    const filtered = data.filter(course =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };


  const chunkedData = chunkArray(filteredData, 3);
  return (
    <div className="container mt-4">

      <input
        className="form-control mb-3"
        type="search"
        placeholder="Search courses"
        aria-label="Search"
        value={searchQuery}
        onChange={handleSearch}
      />
      
      {chunkedData.map((row, rowIndex) => (
        <div key={rowIndex} className="row mb-3">
          {row.map((course, index) => (
            <div key={index} className="col-lg-4">
              <CourseCard
                name={course.name}
                instructor={course.instructor}
                description={course.description}
                id={course.id} 
              />

              
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CourseList;

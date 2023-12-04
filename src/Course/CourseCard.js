import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const CourseCard = ({name,instructor,description,id}) => {
    const image = require('../images/1.jpg')
    const navigate = useNavigate();

    const handleDetails = () => {
      
      navigate(`/CourseDetails/${id}`);
      console.log("test")
    };
   

  return (

    <div className="container pt-3">
       

    <div className="row">
        <div className= "col-lg-12">   
        
          <div className="card" style={{width: '18rem'}}>
            <img src={image} className="card-img-top" alt="..." />
          <div className="card-title mb-1">
              <h5 className="text-center">{name}</h5>
            </div>
            <div className="card-body mt-5">
              <p className="card-text text-left">Instructor: {instructor}</p>
              <p className="card-text text-justify">Description: {description}</p>
              <button className="btn btn-primary btn-sm" onClick={handleDetails}>Details</button>
            </div>
          </div>
        </div>
   
    </div>
</div>

  )
}

export default CourseCard
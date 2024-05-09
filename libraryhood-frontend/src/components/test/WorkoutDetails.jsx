import React from "react"; 
export default function WorkoutDetails(props) {
    return (
      <div className="student-details">
        <h4>{props.student.name}</h4>
        <p>{props.student.roll_no}</p>
        <p>{props.student.createdAt}</p>
      </div>
    );
  }  
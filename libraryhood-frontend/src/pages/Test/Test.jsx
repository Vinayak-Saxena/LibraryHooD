import React, { useEffect, useState } from "react";
import WorkoutDetails from "../../components/test/WorkoutDetails";

export default function Test() {
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/library");
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setStudents(json);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="home">
      <div className="students">
        {students &&
          students.map((student) => (
            <WorkoutDetails student={student} key={student._id} />
          ))}
      </div>
    </div>
  );
}

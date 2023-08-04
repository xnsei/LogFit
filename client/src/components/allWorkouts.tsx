import axios from "axios";
import React, { useEffect, useState } from "react";

const AllWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getWorkouts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/workouts");
      const data = await response.data;
      setWorkouts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    return workouts;
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <div>
      <h1>All Workouts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>{workout.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllWorkouts;

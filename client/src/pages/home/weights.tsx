import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chart from "./chart";
import SmallCard from "../../components/Card/small/smallCard";

const baseURL = "http://localhost:8000";

const socket = io(baseURL);

const Weights = () => {
  const [entry, setEntry] = useState("");
  const [weights, setWeights] = useState(Array());
  const [isLoading, setIsLoading] = useState(true);

  const getWeights = async () => {
    try {
      const response = await axios.get(baseURL + "/weights", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const data = await response.data;
      setWeights(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    return weights;
  };

  useEffect(() => {
    getWeights();
  }, []);

  useEffect(() => {
    socket.on("updateWeight", (data: any) => {
      getWeights();
    });
  }, [socket]);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.post(
        `${baseURL}/weights/${id}/delete`,
        null,
        { headers: { token: localStorage.getItem("token") } }
      );
      if (response.status === 200) {
        socket.emit("deleteWeight", {});
        console.log("event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const datadate: Date = new Date();
    const formattedDate = format(datadate, "yyyyMMdd");
    try {
      const response = await axios.post(
        `${baseURL}/weights/new`,
        {
          entry: entry,
          datadate: formattedDate,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        socket.emit("addWeight", {});
        console.log("event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMeow = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="entry"
          placeholder="Weight"
          onChange={(e) => setEntry(e.target.value)}
          required
        />
        <button type="submit">Add Weight</button>
      </form>
      <Chart data={weights} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        // <ul>
        //   {weights.map((weight) => (
        //     <li key={weight._id}>
        //       <div>{weight.entry}</div>
        //       <button onClick={() => handleDelete(weight._id)}>Delete</button>
        //     </li>
        //   ))}
        // </ul>
        // <SmallCard
        //   title="weights"
        //   onDelete={deleteMeow}
        //   subTitile="All weights"
        //   namesList={weights.map((weight) => ({
        //     _id: weight._id,
        //     url: `${baseURL}/weights/${weight._id}/delete`,
        //     data: {
        //       entry: weight.entry,
        //       date: weight.datadate,
        //     },
        //   }))}
        //   isWeights={true}
        // />
        <div></div>
      )}
    </div>
  );
};

export default Weights;

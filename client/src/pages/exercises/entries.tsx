import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { EntryProps } from "./entryProps";

const baseURL = "http://localhost:8000";

const socket = io(baseURL);

const Entries = (props: EntryProps) => {
  const [reps, setReps] = useState(Array());
  const [entry, setEntry] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getEntries = async () => {
    try {
      const response = await axios.get(
        baseURL + `/exercises/${props.exerciseId}/entries`
      );
      const data = await response.data;
      setReps(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    return entry;
  };

  useEffect(() => {
    getEntries();
  }, []);

  useEffect(() => {
    socket.on("updateEntry", (data: any) => {
      getEntries();
    });
  }, [socket]);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.post(
        `${baseURL}/exercises/${props.exerciseId}/entries/${id}/delete`
      );
      if (response.status === 200) {
        socket.emit("deleteEntry", {});
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
        `${baseURL}/exercises/${props.exerciseId}/entries/new`,
        {
          reps: entry,
          datadate: formattedDate,
        }
      );
      if (response.status === 200) {
        socket.emit("addEntry", {});
        console.log("event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="entry"
          placeholder="Reps"
          onChange={(e) => setEntry(e.target.value)}
          required
        />
        <button type="submit">Add Entry</button>
      </form>
      <h1>All Entries</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {reps.map((rep) => (
            <li key={rep._id}>
              <div>{rep.entry}</div>
              <button onClick={() => handleDelete(rep._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Entries;

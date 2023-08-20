import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { EntryProps, ExerciseEntryProps } from "./entryProps";
import Modal from "../../components/Modal/modal";
import "./entries.css";
import SmallCard from "../../components/Card/small/smallCard";

const baseURL = "http://localhost:8000";

const socket = io(baseURL);

const Entries = (props: EntryProps) => {
  const [reps, setReps] = useState(Array());
  const [entry, setEntry] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const getEntries = async () => {
    try {
      const response = await axios.get(
        baseURL + `/exercises/${props.exerciseId}/entries`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.data.slice(0, props.numberOfEntriesREquested);
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
        `${baseURL}/exercises/${props.exerciseId}/entries/${id}/delete`,
        null,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
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
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
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

  const entryForm = props.numberOfEntriesREquested > 1 && (
    <div>
      <button className="add-entry-button" onClick={openModal}>
        Add Entry
      </button>
      <Modal isOpen={showModal} onClose={closeModal}>
        <div className="form-box">
          <h2 className="form-heading">Add Repetitions</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="form-input"
              type="number"
              name="entry"
              placeholder="Reps"
              onChange={(e) => setEntry(e.target.value)}
              required
            />
            <button className="form-button" type="submit">
              Add Entry
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );

  return (
    <div>
      {entryForm}
      {props.numberOfEntriesREquested > 1 && <h3>All Entries</h3>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="entry-list">
          {reps.map((rep) => (
            <li key={rep._id}>
              <div className="entry-container">
                <div className="entry-repetitions">{rep.entry}</div>
                <div className="entry-datadate">{rep.datadate}</div>
              </div>
              {props.numberOfEntriesREquested > 1 && (
                <button onClick={() => handleDelete(rep._id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ExerciseEntries = (props: ExerciseEntryProps) => {
  const [entries, setEntries] = useState(Array());

  const getEntries = async () => {
    try {
      const response = await axios.get(
        baseURL + `/exercises/${props.exerciseId}/entries`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.data.slice(0, 3);
      setEntries(data);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
    return entries;
  };

  useEffect(() => {}, []);
  return (
    <div>
      <SmallCard
        title={props.exerciseName}
        onDelete={props.onDelete}
        subTitile={"Entries"}
        isWeights={false}
        namesList={entries.map((entry) => ({
          _id: entry._id,
          url: `${baseURL}/exercises/${props.exerciseId}/entries/${entry._id}/delete`,
          data: {
            entry: entry.entry,
          },
        }))}
      />
    </div>
  );
};

export { Entries, ExerciseEntries };

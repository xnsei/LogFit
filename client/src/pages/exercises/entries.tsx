import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ExerciseEntryProps } from "./entryProps";
import Modal from "../../components/Modal/modal";
import "./entries.scss";
import SmallCard from "../../components/Card/small/smallCard";
import BigCard from "../../components/Card/big/bigCard";

const baseURL = "https://logfit-backend.onrender.com";

const socket = io(baseURL);

const formatDate = (dateInyyyyMMdd: string) => {
  const month = dateInyyyyMMdd.substring(4, 6);
  const day = dateInyyyyMMdd.substring(6, 8);

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[parseInt(month) - 1];

  const formattedDate = `${monthName}, ${parseInt(day)}`;
  return formattedDate;
};

const BigCardExerciseEntries = (props: ExerciseEntryProps) => {
  const [entries, setEntries] = useState(Array());
  const [entry, setEntry] = useState("");
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
      const data = await response.data;
      const newData = data.sort((a: any, b: any) => {
        const dateA = parseInt(a.datadate);
        const dateB = parseInt(b.datadate);
        return dateA - dateB;
      });
      setEntries(newData);
    } catch (error) {
      console.log(error);
    }
    return entry;
  };

  useEffect(() => {
    getEntries();
  }, []);

  useEffect(() => {
    socket.on("updateEntry", (_data: any) => {
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

  const entryFormModal = (
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
            <button className="form-submit-button" type="submit">
              Add Entry
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );

  return (
    <div>
      <BigCard
        title={props.exerciseName}
        addEntryText={"Add Entry"}
        onDelete={props.onDelete}
        subTitile={"All Entries"}
        namesList={entries.map((entry) => ({
          _id: entry._id,
          onEntryDelete: () => handleDelete(entry._id),
          data: {
            entry: entry.entry,
            date: formatDate(entry.datadate),
          },
        }))}
        entryModal={entryFormModal}
      />
    </div>
  );
};

const ExerciseEntries = (props: ExerciseEntryProps) => {
  const [entries, setEntries] = useState(Array());
  const [entry, setEntry] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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

  const entryFormModal = (
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
            <button className="form-submit-button" type="submit">
              Add Entry
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );

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
      const data = await response.data;
      const newData = data
        .sort((a: any, b: any) => {
          const dateA = parseInt(a.datadate);
          const dateB = parseInt(b.datadate);
          return dateA - dateB;
        })
        .reverse()
        .slice(0, 3);
      setEntries(newData);
    } catch (error) {
      console.log(error);
    }
    return entries;
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <div>
      <SmallCard
        title={props.exerciseName}
        entryModal={entryFormModal}
        onDelete={props.onDelete}
        subTitile={"Entries"}
        isWeights={true}
        namesList={entries.map((entry) => ({
          _id: entry._id,
          url: `${baseURL}/exercises/${props.exerciseId}/entries/${entry._id}/delete`,
          data: {
            entry: entry.entry,
            date: formatDate(entry.datadate),
          },
        }))}
      />
    </div>
  );
};

export { BigCardExerciseEntries, ExerciseEntries };

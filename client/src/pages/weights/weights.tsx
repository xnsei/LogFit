import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chart from "../home/chart";
import "./weights.css";
import Modal from "../../components/Modal/modal";

const baseURL = "http://localhost:8000";

const socket = io(baseURL);

const Weights = () => {
  const [entry, setEntry] = useState("");
  const [weights, setWeights] = useState(Array());
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const getWeights = async () => {
    try {
      const response = await axios.get(baseURL + "/weights", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const data = await response.data;
      setWeights(data);
    } catch (error) {
      console.log(error);
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

  return (
    <div className="weights-container">
      <div className="weight-title-container">
        <h2 className="weights-title">Weights</h2>
        <button onClick={openModal}>Add Weight</button>
      </div>
      <Modal isOpen={showModal} onClose={closeModal}>
        <form className="weight-form-box" onSubmit={handleSubmit}>
          <h3 className="form-heading">Add Weight</h3>
          <input
            className="weight-form-input"
            type="number"
            name="entry"
            placeholder="Weight"
            onChange={(e) => setEntry(e.target.value)}
            required
          />
          <button className="weight-form-button" type="submit">
            Add Weight
          </button>
        </form>
      </Modal>
      <Chart data={weights} />
    </div>
  );
};

export default Weights;

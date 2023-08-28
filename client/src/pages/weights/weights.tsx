import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chart from "../home/chart";
import "./weights.scss";
import Modal from "../../components/Modal/modal";

const baseURL = "https://logfit-backend.onrender.com";

const socket = io(baseURL);

function extractNumberFromString(inputString: string): string {
  const numberMatch = inputString.match(/[-+]?(\d*[.])?\d+/);
  if (numberMatch) {
    const extractedNumber = numberMatch[0];
    return extractedNumber.toString();
  } else {
    return "";
  }
}

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
      const newData = data.sort((a: any, b: any) => {
        const dateA = parseInt(a.datadate);
        const dateB = parseInt(b.datadate);
        return dateA - dateB;
      });
      setWeights(newData);
    } catch (error) {
      console.log(error);
    }
    return weights;
  };

  useEffect(() => {
    getWeights();
  }, []);

  useEffect(() => {
    socket.on("updateWeight", (_data: any) => {
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
        <button className="add-weight-button" onClick={openModal}>
          Add Weight
        </button>
      </div>
      <Modal isOpen={showModal} onClose={closeModal}>
        <form className="weight-form-box" onSubmit={handleSubmit}>
          <h3 className="form-heading">Add Weight</h3>
          <input
            className="weight-form-input"
            type="string"
            name="entry"
            placeholder="Weight"
            onChange={(e) => setEntry(extractNumberFromString(e.target.value))}
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

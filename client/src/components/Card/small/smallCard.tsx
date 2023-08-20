import React from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { SmallCardProps } from "./SmallCardProps";
import "./smallCard.css";

const baseURL = "http://localhost:8000";

const socket = io(baseURL);

const SmallCard = (props: SmallCardProps) => {
  const handleDelete = async (url: string) => {
    try {
      const response = await axios.post(url, null, {
        headers: { token: localStorage.getItem("token") },
      });
      if (response.status === 200) {
        socket.emit("deleteWeight", {});
        console.log("event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="small-card-container">
      <div className="title-container">
        <h2>{props.title}</h2>
        <button className="delete-button" onClick={props.onDelete}>
          Delete
        </button>
      </div>
      <div className="sub-section">
        <h4>{props.subTitile}</h4>
        <ul className="entry-list">
          {props.namesList.slice(0, 3).map((weight) => (
            <li key={weight._id}>
              <div className="entry-container">
                {props.isWeights && <div>{weight.data.date}</div>}
                <div>{weight.data.entry}</div>
                <button onClick={() => handleDelete(weight.url)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SmallCard;

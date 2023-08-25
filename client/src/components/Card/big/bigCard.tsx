import React from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { BigCardProps } from "./BigCardProps";
import "./bigCard.css";

const baseURL = "http://localhost:8000";

const socket = io(baseURL);

const BigCard = (props: BigCardProps) => {
  const handleDelete = async (url: string) => {
    try {
      const response = await axios.post(url, null, {
        headers: { token: localStorage.getItem("token") },
      });
      if (response.status === 200) {
        socket.emit("deleteWeight", {});
        console.log("delete event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="big-card-container">
      <div className="title-container">
        <h2>{props.title}</h2>
        <div className="title-buttons">
          {props.entryModal}
          <button className="delete-button" onClick={props.onDelete}>
            Delete
          </button>
        </div>
      </div>
      <div className="sub-section">
        {props.namesList.length > 0 ? (
          <h4 className="subtitle">{props.subTitile}</h4>
        ) : (
          <p>No Entries for this Exercise</p>
        )}
        <ul className="entry-list">
          {props.namesList.slice(0, 3).map((entry) => (
            <li key={entry._id} className="entry-item-container">
              <div className="entry-item-data">
                <div>{entry.data.date}</div>
                <div>{entry.data.entry}</div>
              </div>
              <button onClick={entry.onEntryDelete}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BigCard;

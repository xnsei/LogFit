import { BigCardProps } from "./BigCardProps";
import "./bigCard.scss";

const BigCard = (props: BigCardProps) => {
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

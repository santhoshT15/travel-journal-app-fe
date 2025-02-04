import React from "react";
import { Link } from "react-router-dom";
import "../styles/crad.css";

function Card(props) {
  return (
    <div className="card">
      <div className="content">
        <img
          id="post-image"
          src={props.photos[0].secure_url}
          alt="no content"
        />
        <h4 className="title">{props.title}</h4>
        <h6>
          <span>Date : </span>
          {props.date.split("T")[0]}
        </h6>
        <p>{props.description}...</p>
        <Link to={`view/${props._id}`}>
          <button>Read More</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;

import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import useFetch from "../useFetch";
import { AuthContext } from "../authContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons/faCircleArrowLeft";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/view.css";

function View({ url }) {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { token } = useContext(AuthContext);
  const { data } = useFetch(`${url}/api/entries/${id}`, token);
  const [slideNumber, setSlideNumber] = useState(0);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/entries/${data._id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    let size = data.photos.length;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? size - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === size - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  return (
    <div className="view">
      <Navbar />
      <div className="postPageBG">
        <div className="upperContent">
          <h1>{data.title}</h1>
          <p>
            <FontAwesomeIcon className="icon" icon={faCalendar} />
            {data.location}
          </p>
        </div>
      </div>
      <div className="postContainer">
        <div className="leftContainer">
          {data.photos ? (
            <div className="images">
              <img
                src={data.photos[slideNumber]?.secure_url}
                height="300px"
                alt=""
              />
              {data.photos.length > 1 ? (
                <div className="arrows">
                  <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    className="arrow"
                    onClick={() => handleMove("l")}
                  />
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="arrow"
                    onClick={() => handleMove("r")}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            "no images"
          )}
        </div>
        <div className="rightContainer">
          <p>" {data.description} "</p>
          <button className="del_button" onClick={handleDelete}>
            Delete
          </button>
          <button onClick={() => navigate("/home")} className="del-button">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default View;

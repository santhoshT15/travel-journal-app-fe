import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/create.css";

function Create() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
  });

  const cloud_name = "ddp3n4pds";
  const api_key = "182137614267411";

  //set the usestate to the data user passed
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //post the usestate to database
  const handleClick = async (e) => {
    e.preventDefault();

    var newEntry;
    //console.log(info);
    if (files) {
      const list = await Promise.all(
        Object.values(files).map(async (files) => {
          const data = new FormData();
          data.append("file", files);
          const signatureRes = await axios.get(
            "https://travel-journal-log-be.onrender.com/get-signature"
          );

          data.append("api_key", api_key);
          data.append("timestamp", signatureRes.data.timestamp);
          data.append("signature", signatureRes.data.signature);
          const uploadRes = await axios.post(
            ` https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            data,
            { withcredentials: false }
          );
          // console.log(uploadRes.data)
          const image = {
            secure_url: uploadRes.data.secure_url,
            public_id: uploadRes.data.public_id,
          };
          return image;
        })
      );

      newEntry = {
        ...info,
        author: user,
        photos: list,
      };
      //console.log(newEntry);
    } else {
      newEntry = {
        ...info,
        author: user,
      };
    }

    try {
      const response = await axios.post(
        "https://travel-journal-log-be.onrender.com/api/entries/new",
        newEntry,
        {
          withCredentials: false,
        }
      );

      navigate(`/view/${response?.data?._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="create">
      <Navbar />
      <div className="createContainer">
        <div className="picsContainer">
          <div className="formInput">
            <h2>Upload Images (Max 3)</h2>
            <label htmlFor="file">
              <FontAwesomeIcon className="icon" icon={faPlusCircle} />
            </label>
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              style={{ display: "none" }}
            />
          </div>
          <div className="uploadedPictures">
            <div className="upload_pic">
              <img
                src={files[0] ? URL.createObjectURL(files[0]) : ""}
                alt=""
                height="80px"
              />
            </div>
            <div className="upload_pic">
              <img
                src={files[1] ? URL.createObjectURL(files[1]) : ""}
                alt=""
                height="80px"
              />
            </div>
            <div className="upload_pic">
              <img
                src={files[2] ? URL.createObjectURL(files[2]) : ""}
                alt=""
                height="80px"
              />
            </div>
          </div>
        </div>
        <div className="input">
          <label>Title</label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
          />
        </div>
        <div className="input">
          <label>Location</label>
          <input
            onChange={handleChange}
            type="text"
            name="location"
            id="location"
            placeholder="Enter Location"
          />
        </div>
        <div className="input">
          <label>What is the Date</label>
          <input
            type="date"
            name="date"
            placeholder="Choose Date"
            onChange={handleChange}
            id="date"
          />
        </div>
        <div className="input">
          <label>Write your thoughts...</label>
          <textarea
            name="entry"
            id="description"
            cols="150"
            rows="25"
            onChange={handleChange}
            autoFocus
          ></textarea>
        </div>
        <button className="createBtn" onClick={handleClick}>
          Create Entry
        </button>
      </div>
    </div>
  );
}

export default Create;

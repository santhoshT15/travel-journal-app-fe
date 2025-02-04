import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import "../styles/register.css";
//import { upload } from '@testing-library/user-event/dist/upload';

function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  //cloudinary upload
  const api_key = "182137614267411";
  const cloud_name = "ddp3n4pds";

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let profilePicture = {};

    if (file) {
      const data = new FormData();

      data.append("file", file);
      const signatureRes = await axios.get(
        "https://travel-journal-app-be.onrender.com/get-signature"
      );

      data.append("api_key", api_key);
      data.append("timestamp", signatureRes.data.timestamp);
      data.append("signature", signatureRes.data.signature);

      try {
        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: function (e) {
              //console.log(e.loaded/1000)
            },
          }
        );
        //console.log(uploadRes.data);
        profilePicture = {
          url: uploadRes.data.secure_url,
          public_id: uploadRes.data.public_id,
        };
      } catch (err) {
        console.log(err);
        return;
      }
    }
    try {
      const newUser = {
        ...info,
        profilePicture: profilePicture,
      };
      console.log(newUser);
      await axios.post(
        "https://travel-journal-app-be.onrender.com/api/users/register",
        newUser
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <Navbar />
      <div className="registerCard">
        <div className="center">
          <h1>Join Us</h1>
          <form>
            <div className="image">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                height="100px"
              />
              <div className="txt_field_img">
                <label htmlFor="file">
                  Image
                  <FontAwesomeIcon className="icon" icon={faPlusCircle} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="formInput">
              <div className="txt_field">
                <input
                  type="text"
                  placeholder="username"
                  name="userName"
                  onChange={handleChange}
                  id="userName"
                  required
                />
              </div>
              <div className="txt_field">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                  id="email"
                  required
                />
              </div>
              <div className="txt_field">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                  id="password"
                  required
                />
              </div>
            </div>
            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Register
              </button>
            </div>
            <div className="signup_link">
              <p>
                Already Registered?
                <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

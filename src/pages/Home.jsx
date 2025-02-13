import React, { useContext, useState } from "react";
import useFetch from "../useFetch";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/Card";
import { AuthContext } from "../authContext";
import "../styles/home.css";

function Home() {
  const [query, setQuery] = useState("");
  const { user, token } = useContext(AuthContext);
  const { data, loading } = useFetch(
    `https://travel-journal-log-be.onrender.com/api/entries/author/${user}`,
    token
  );
  const keys = ["title", "location", "date"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key] && item[key].toLowerCase().includes(query))
    );
  };

  return (
    <div>
      <Navbar />
      <div className="search">
        <div className="searchBar">
          <h2>Explore</h2>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search places or dates"
              onChange={(e) => setQuery(e.target.value)}
            />
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>
      <div className="searchPosts">
        {loading ? (
          <div
            className="p"
            style={{ color: "white", fontFamily: "'Kaushan Script, cursive" }}
          >
            Loading...
          </div>
        ) : (
          <>
            {search(data)?.map((item, i) => (
              <Card
                key={i}
                _id={item._id}
                photos={item.photos}
                title={item.title}
                date={item.date}
                location={item.location}
                text={item.text}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

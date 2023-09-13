import React, { useState, useEffect } from "react";
import logo from "../Images/logo.svg";
import searche from "../Images/search.svg";
import axios from "axios";
import menu from "../Images/menu.svg";
import { useImmerReducer } from "use-immer";
import imdb from "../Images/imdb.png";
import tomato from "../Images/fruit.png";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const reducerFunction = (draft, action) => {
  switch (action.type) {
    case "setUrl":
      draft.url = action.val;
      break;
    case "setSearch":
      draft.search = action.val;
      break;
    case "setSearchResult":
      draft.searchResult = action.val;
      break;
  }
};

const initialState = {
  search: "",
  url: "",
  searchResult: "",
};

const searchMovie = (searchQuery, setUrl) => {
  const baseUrl = "https://api.themoviedb.org/3";
  const apikey = "?api_key=05826967c84a2ac26f3ed4c72f50e983";
  const newUrl = `${baseUrl}/search/movie${apikey}&query=${searchQuery}`;
  setUrl(newUrl);
  return newUrl;
};

const Header = ({ searchResult }) => {
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [state, dispatch] = useImmerReducer(reducerFunction, initialState);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

 const handleOpen = () => {
  setOpen(true);
  setTimeout(() => {
    handleClose();
  }, 2000);
};


  useEffect(() => {
    if (search.trim() !== "") {
      searchMovie(search, setUrl, setSearch);
    }
  }, [search]);

  const handleSearchKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleOpen();
      e.preventDefault(); // Prevent the default form submission behavior
      const options = {
        method: "GET",
        url: searchMovie(search, setUrl),
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTgyNjk2N2M4NGEyYWMyNmYzZWQ0YzcyZjUwZTk4MyIsInN1YiI6IjYxMDkyZGY2YzYxM2NlMDAyODQ1YzllMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IJ1R7IJ5BWHdbkPYDAnuAqKLDKBsgOcTtxTTIhRj6fU",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          searchResult(response.data.results.splice(0, 10));
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <div className="header">
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <nav>
        <div className="imdblogo">
          <img src={logo} alt="logo" />
        </div>
        <div className="searchbar">
          <input
            className="searchinput"
            type="search"
            value={search}
            placeholder="What do you want to watch?"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => handleSearchKeyPress(e)}
          />
          <img src={searche} alt="search" />
        </div>
        <div className="menu">
          <img src={menu} alt="menu" />
        </div>
      </nav>
      <div className="content">
        <div className="content-left">
          <div className="ch">
            <h1>John Wick 3 : <br /> Parabellum</h1>
            <div className="rating">
              <div className="left">
                <img src={imdb} alt="imdb" />
                <p>Rating</p>
              </div>
              <div className="right">
                <img src={tomato} alt="tomato" />
                <p>90%</p>
              </div>
            </div>
            <h4>
              John Wick is on the run after killing a member of the
              international assassins' guild, and with a $14 million price tag
              on his head, he is the target of hit men and women everywhere.
            </h4>
          </div>
        </div>
        <div className="content-right"></div>
      </div>
    </div>
  );
};

export default Header;








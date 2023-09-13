import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Cards = ({ searchResponse }) => {
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://api.themoviedb.org/3";
  const apikey = "?api_key=05826967c84a2ac26f3ed4c72f50e983";
  const url = `${baseUrl}/movie/top_rated${apikey}&language=en-US&page=1`;

  const fetchMovies = () => {
    const options = {
      method: "GET",
      url,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTgyNjk2N2M4NGEyYWMyNmYzZWQ0YzcyZjUwZTk4MyIsInN1YiI6IjYxMDkyZGY2YzYxM2NlMDAyODQ1YzllMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IJ1R7IJ5BWHdbkPYDAnuAqKLDKBsgOcTtxTTIhRj6fU",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovies(response.data.results.slice(0, 10));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchResponse?.length === 0) {
      fetchMovies();
    }
    setMovies(searchResponse);
  }, [searchResponse]);

  return movies.length == 0 ? (
    <h1 className="notfound">No Movie is available for Display</h1>
  ) : (
    <div className="main">
      <div className="seemore">
      <h1>Featured Movies</h1>
      <p>see more</p>
      </div>
      <ul className="cards_container">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
};

export default Cards;

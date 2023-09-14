import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const [moviesDetails, setMoviesDetails] = useState([]);
  const parameters = useParams();
  const apikey = "?api_key=05826967c84a2ac26f3ed4c72f50e983";

  const fetchMoviesDetails = (movie_id) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movie_id} ${apikey}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTgyNjk2N2M4NGEyYWMyNmYzZWQ0YzcyZjUwZTk4MyIsInN1YiI6IjYxMDkyZGY2YzYxM2NlMDAyODQ1YzllMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IJ1R7IJ5BWHdbkPYDAnuAqKLDKBsgOcTtxTTIhRj6fU",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMoviesDetails(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMoviesDetails(parameters.id);
  }, [parameters.id]);

  return (
    <div className="details_container">
      <div key={moviesDetails.id} className="details-card">
        <img
          className="card_image"
          data-testid="movie-poster"
          src={"http://image.tmdb.org/t/p/w500/" + moviesDetails.poster_path}
          alt="movie-poster"
        />
        <div to={moviesDetails.id}>
          <h2>
            <strong>Title :</strong>
            <span data-testid="movie-title">{moviesDetails.title}</span>
          </h2>
          <p>
            <strong>Release date : </strong >
            <span data-testid="movie-release-date">{Date.parse(moviesDetails.release_date)}</span>
          </p>
          <p>
            <strong>Runtime : </strong>
            <span data-testid="movie-runtime">{moviesDetails.runtime}</span> 
          </p>
          <p>
            <strong>Overview : </strong >
            <span data-testid="movie-overview">{moviesDetails.overview}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;

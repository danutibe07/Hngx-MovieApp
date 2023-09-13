// import React from "react";
// import logoblack from "../Images/logoblack.svg";
// import home from "../Images/home.svg";
// import movie from "../Images/movie.svg";
// import tvshows from "../Images/tvshows.svg";

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <img src={logoblack} alt="logoblack" />
//       <div className="sideicons">
//         <div className="sideicon">
//           <img src={home} alt="" />
//           <p>Home</p>
//         </div>
//         <div className="sideicon moviebg" >
//           <img src={home} alt="" />
//           <p>Home</p>
//         </div>
//         <div className="sideicon">
//           <img src={home} alt="" />
//           <p>Home</p>
//         </div>
//         <div className="sideicon">
//           <img src={home} alt="" />
//           <p>Home</p>
//         </div>
//       </div>
//       <div className="ad">
//         <h3>Play movie quizes and earn free tickets </h3>
//         <p>50k people are playing now</p>
//         <p className="playbtn">Start playing</p>
//       </div>
//       <div className="sideicon">
//           <img src={home} alt="" />
//           <p>Home</p>
//         </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../../api/movie-api';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import { motion as m } from 'framer-motion';
import styles from './Movie.module.scss'; // Make sure to import your SCSS styles

const Sidebar = () => {
  const [movie, setMovie] = useState(null);
  const movieContext = useContext(MovieContext);
  const { imdb_id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${imdb_id}?api_key=${import.meta.env.VITE_DB_KEY}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [imdb_id]);

  if (!movieContext || !movieContext.movies) {
    return <Spinner />;
  }

  const movies = movieContext.movies;
  const randomOne = Math.floor(Math.random() * 10) + 10;
  const randomTwo = Math.floor(Math.random() * 10) + 10;
  const randomThree = Math.floor(Math.random() * 10) + 10;
  const imagePath = 'https://image.tmdb.org/t/p/original';
  const date = new Date(movie?.release_date);
  const utcDate = new Date(date);

  return (
    <section className={styles.movie_container}>
        <h1>jjjjj</h1>
    </section>
  );
};

export default Sidebar;

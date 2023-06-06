import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import '../Componets/Single.css'
const Single = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.tvmaze.com/shows/${movieId}`
        );
        const movieData = response.data;
        // Remove <p> tags from the summary
        movieData.summary = movieData.summary.replace(/<p>/g, "").replace(/<\/p>/g, "");
        setMovie(movieData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!movie) {
    return <div className="text-center">Movie not found.</div>;
  }

  return (
    <div className="container" id="main1">
      <div className="row">
        <div className="col-md-12 text-center" id="navbar">
          <h1 id="color-text">{movie.name}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <img
            src={movie.image?.medium}
            alt={movie.name}
            className="img-fluid"
            id="img1"
          />
        </div>
        <div className="col-md-8 mt-5" id="detail1">
          <h2>Summary</h2>
          <p>{movie.summary}</p>
          <h2>Genres</h2>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
          <h2>Language</h2>
          <p>{movie.language}</p>
          <h2>Official Site</h2>
          <p>
            <a href={movie.officialSite} target="_blank" rel="noreferrer">
              {movie.officialSite}
            </a>
          </p>
          <Link to="/" className="btn " id="back1">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Single;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../Componets/Home.css'

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("spiderman");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${searchQuery}`
        );
        const moviesData = response.data;
        setMovies(moviesData);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (searchQuery !== "") {
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    const input = event.target.value;
    setSearchQuery(input);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-center" id="navbar">
            <h1 id="color-text">MOVIE DETAIL APP</h1>
            <br />
            <form>
              <label id="search1">Search Movies</label>
              <br />
              <input
                type="text"
                id="search"
                placeholder="Write something"
                onChange={handleSearch}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row row-cols-lg-6 row-cols-1">
          {isLoading ? (
            <div className="col-md-12 text-center" id="loading">Loading...</div>
          ) : (
            movies.map((data) => (
              <div
                className="col-lg-6 col-md-10 col-sm-12"
                key={data.show.id}
                id="card"
              >
                <div className="movie-home" id="cards">
                  <img
                    src={data.show.image?.medium}
                    alt={data.show.name}
                    id="movie-img"
                  />
                  <h4>{data.show.name}</h4>
                  <Link to={`/movie/${data.show.id}`}>
                    <button type="button" id="btn">
                      VIEW ALL DETAIL
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

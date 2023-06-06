import React, { useState ,useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import '../Componets/Form.css'

const Form = ({ movieId, movieName }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { movieId: paramMovieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${paramMovieId}`);
        const movieData = response.data;
        // Remove <p> and <b> tags from the summary
        movieData.summary = movieData.summary.replace(/<p>/g, "").replace(/<\/p>/g, "");
        movieData.summary = movieData.summary.replace(/<b>/g, "").replace(/<\/b>/g, "");
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [paramMovieId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object to store user details
    const userDetails = {
      name: name,
      email: email,
      phone: phone,
      movieId: movieId,
      movieName: movieName,
    };

    // Store user details in local storage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Clear input fields
    setName("");
    setEmail("");
    setPhone("");

    // Display success message or perform any other action
    alert("User details stored successfully!");
  };

  return (
    <div className="container" id="main001">
    <div className="book-ticket">
      <h1>Book Ticket</h1>
    </div>
      <br />
      {movie && <h2>Movie name - {movie.name}</h2>}
      <form onSubmit={handleSubmit} id="form1">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <br/>
        <button type="submit" className="btn" id="bsubmit">
          Submit
        </button>
        <br />
        <br/>
        <Link to="/" className="btn" id="back1">
          Back to Home
        </Link>
      </form>
    </div>
  );
};

export default Form;

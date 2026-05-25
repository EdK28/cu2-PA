import React, { useState, useEffect } from "react";
/*
  INSTRUCTION:
  - import fetchGames, fetchGenres, fetchPlatforms, fetchYears, and API_URL from the utils/api.js file
*/
import { useCallback } from "react";
import { fetchGames, fetchGenres, fetchPlatforms, fetchYears } from "./utils/api";
import "./index.css";
import { API_URL } from "./utils/api";

function App() {
  /*
  INSTRUCTIONS:
  - use useState to store the data for the games, genres, platforms, and years
  - use useState to store the data for the genre, platform, year, search, and sort
  */
 const API_URL = "http://localhost:5123";
 const [ games, setGames ]         = useState([]);
 const [ genres, setGenres ]       = useState([]);
 const [ platforms, setPlatforms ] = useState([]);
 const [ years, setYears ]         = useState([]);

 const [ search, setSearch ]      = useState("");
 const [ genre, setGenre ]        = useState("");
 const [ type, setType ]          = useState("");
 const [ platform, setPlatform ]  = useState("");
 const [ year, setYear ]          = useState("");
 const [ sort, setSort ]          = useState("");

  /*
  INSTRUCTIONS:
  - use useEffect to fetch the data for the games using the fetchGames function
  - use useEffect to fetch the data for the genres using the fetchGenres function
  - use useEffect to fetch the data for the platforms using the fetchPlatforms function
  - use useEffect to fetch the data for the years using the fetchYears function
  */

useEffect(() => {
  fetchGenres().then(setGenres);
  fetchPlatforms().then(setPlatforms);
  fetchYears().then(setYears);
}, []);

useEffect(() => {
  const params = {};
  if (genre) params.genre = genre;
  if (platform) params.platform = platform;
  if (year) params.year = year;
  if (search) params.search = search;
  if (sort) params.sort = sort;

  fetchGames(params).then(setGames);
}, [genre, platform, year, search, sort]);

  return (
    <div className="app">
      <h1>Video Games</h1>
      {/*
      INSTRUCTIONS:
      - Add a search input for searching by title
      - Add a selector for filtering by genre
      - Add a selector for filtering by platform
      - Add a selector for filtering by year
      - Add a selector for sorting
      */}
  <div className="filters">
    <input
    type="text"
    placeholder="Search by title..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    />

    <select value={genre} onChange={(e) => setGenre(e.target.value)}>
      <option value="">All Genres</option>
      {genres.map((g) => <option key={g} value={g}>{g}</option>)}
    </select>

    <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
      <option value="">All Platforms</option>
      {platforms.map((p) => <option key={p} value={p}>{p}</option>)}
    </select>

    <select value={year} onChange={(e) => setYear(e.target.value)}>
      <option value="">All Years</option>
      {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
      ))}
    </select>

    <select value={sort} onChange={(e) => setSort(e.target.value)}>
      <option value="">Sort By</option>
      <option value="title">Title (A-Z)</option>
      <option value="year">Year</option>
    </select>
  </div>
      {/*
      INSTRUCTIONS:
      - Display the games in the following card format:
        - 3 columns in a row for desktop
        - 2 columns in a row for tablet
        - 1 column in a row for mobile
      - For each game, display the following information in the card:
        - Game image (use API_URL + game.image as the src)
        - Game genre
        - Game title
        - Game platform
        - Game year
      - If no games are found, display a message saying "No games found"
      */}
      <div className="card-container">
        {games.length > 0 ? games.map((game) => (
          <div className="card" key={game.title}>
            <div className="card-image"><img src={`${API_URL}${game.image}`} alt={game.name} /> </div>
            <div className="card-category">{game.genre}</div>
            <div className="card-title">{game.title}</div>
            <div className="card-difficulty">{game.platform}</div>
            <div className="card-price">{game.year}</div>
          </div>
        ))
      : <p>No games found.</p>  
      }
      </div>
    </div>
  );
}

export default App;

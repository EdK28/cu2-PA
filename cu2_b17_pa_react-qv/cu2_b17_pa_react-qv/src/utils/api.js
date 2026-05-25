import axios from "axios";

/*
  INSTRUCTIONS:
  - create and export a constant API_URL that contains the base URL for the API
  - create a function fetchGames that fetches the games from the API
  - create a function fetchGenres that fetches the genres from the API
  - create a function fetchPlatforms that fetches the platforms from the API
  - create a function fetchYears that fetches the unique years from the games data
*/

const API_URL = "http://localhost:5123";

export const fetchGames = async (params = {}) => {
  const response = await axios.get(`${API_URL}/games`, {params});
  return response.data;
};

export const fetchGenres = async () => {
  const response = await axios.get(`${API_URL}/genres`);
  return response.data;
};

export const fetchPlatforms = async () => {
  const response = await axios.get(`${API_URL}/platforms`);
  return response.data;
};

export const fetchYears = async () => {
  const response = await axios.get(`${API_URL}/games`);
  const years = [...new Set(response.data.map((game) => game.year))].sort((a, b) => b - a);
  return years;
}
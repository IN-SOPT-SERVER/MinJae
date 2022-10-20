const data = require("../database/data.json");

const getMovie = async (movieId: string) => {
  return data[movieId];
};
const getEpisode = async (movieId: string, episodeId: string) => {
  return data[movieId][episodeId];
};

export default { getMovie, getEpisode };

const data = require("../database/data.json");

const getMovie = async (movieId: string, episode: string) => {
  if (!episode) {
    return data[movieId];
  }
  return data[movieId][episode];
};

export default { getMovie };

import axios from 'axios';
import CONFIG from '../config/CONFIG';
/* eslint-disable no-use-before-define */

const apiMapper = {
  getMarvelComics,
};

export default apiMapper;

function getMarvelComics() {
  return new Promise((accept, reject) => {
    axios.get(CONFIG.api.marvel_comics_listing).then((response) => {
      accept(response.data.data);
    }).catch((error) => {
      reject(error.data);
    });
  });
}

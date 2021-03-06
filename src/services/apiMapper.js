import axios from 'axios';
import CONFIG from '../config/CONFIG';
/* eslint-disable no-use-before-define */

const apiMapper = {
  getMarvelComics,
  getMarvelComicId,
  getMarvelCharacters,
  getMarvelCharacterId,
};

export default apiMapper;

function getMarvelComics(key) {
  return new Promise((accept, reject) => {
    axios.get(CONFIG.api.marvel_comics_listing.replace(':keywords', key)).then((response) => {
      accept(response.data.data);
    }).catch((error) => {
      reject(error);
    });
  });
}

function getMarvelComicId(id) {
  return new Promise((accept, reject) => {
    axios.get(CONFIG.api.marvel_comic_single.replace(':idComic', id)).then((response) => {
      accept(response.data.data);
    }).catch((error) => {
      reject(error);
    });
  });
}

function getMarvelCharacters(key) {
  return new Promise((accept, reject) => {
    axios.get(CONFIG.api.marvel_characters_listing.replace(':keywords', key)).then((response) => {
      accept(response.data.data);
    }).catch((error) => {
      reject(error);
    });
  });
}

function getMarvelCharacterId(id) {
  return new Promise((accept, reject) => {
    axios.get(CONFIG.api.marvel_character_single.replace(':idCharacter', id)).then((response) => {
      accept(response.data.data);
    }).catch((error) => {
      reject(error);
    });
  });
}

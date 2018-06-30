/* eslint-disable */

const apikey = 'aaa33bbe5bd2a9a38e7f94d77174e2e0';

export default {
  "api": {
    "marvel_comics_listing": `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=:keywords&apikey=${apikey}`,
    "marvel_characters_listing": `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=:keywords&apikey=${apikey}`,
    "marvel_character_single": `https://gateway.marvel.com:443/v1/public/characters/:idCharacter?apikey=${apikey}`,
    "marvel_comic_single": `https://gateway.marvel.com:443/v1/public/comics/:idComic?apikey=${apikey}`,
  },
}

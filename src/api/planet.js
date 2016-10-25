import Vue from 'vue';

import { EventEmitter } from 'events';
import { Promise } from 'es6-promise';
import { ApiCache } from './api-cache.js';

const planetCache = new ApiCache();
const pictureCache = Object.create(null);
const planet = new EventEmitter();
const planetBaseUrl = 'planets/';
export default planet;

planet.fetch = id => {
  if (!id) {
    return Promise.resolve('');
  }
  return new Promise((resolve, reject) => {
    const planetToGet = `${planetBaseUrl}${id}/`;

    if (planetCache.get(planetToGet)) {
      resolve(planetCache.get(planetToGet));
    }
    Vue.http.get(planetToGet).then(response => {
      const planetData = response.data;
      planetCache.put(planetToGet, planetData);
      resolve(planetData);
    }, reject);
  });
};


planet.getPicture = searchWord => {
  if (!searchWord) {
    return Promise.resolve('');
  }
  return new Promise((resolve, reject) => {
    if (pictureCache[searchWord]) {
      resolve(pictureCache[searchWord]);
    }
    const param = {
      q: searchWord,
      q_type: 'jpg',
    };
    Vue.http.headers.common.Authorization = '';
    Vue.http.get(process.env.IMAGE_HOST, param, {
      headers: {
        Authorization: process.env.IMGUR_CLIENT_ID,
      },
    }).then(response => {
      let imgUrl = null;
      if (typeof response.data === 'undefined' || typeof response.data.data[0] === 'undefined') {
        imgUrl = null;
      } else if (typeof response.data.data[0].cover !== 'undefined') {
        imgUrl = 'http://i.imgur.com/'.concat(response.data.data[0].cover, 'm.jpg');
      } else if (typeof response.data.data[0].link !== 'undefined') {
        imgUrl = response.data.data[0].link.replace(/\.jpg$/, 'm.jpg');
      }
      resolve(imgUrl);
    }, reject);
  });
};

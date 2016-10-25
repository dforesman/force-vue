import Vue from 'vue';
import { EventEmitter } from 'events';
import { Promise } from 'es6-promise';
import { ApiCache } from './api-cache.js';

const personCache = new ApiCache();
const person = new EventEmitter();
const personBaseUrl = 'people/';
export default person;

person.fetch = id => {
  if (!id) {
    return Promise.resolve('');
  }
  return new Promise((resolve, reject) => {
    const personToGet = `${personBaseUrl}${id}/`;

    if (personCache.get(personToGet)) {
      resolve(personCache.get(personToGet));
    }
    Vue.http.get(personToGet).then(response => {
      const personData = response.data;
      personCache.put(personToGet, personData);
      resolve(personData);
    }, reject);
  });
};

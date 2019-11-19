import camelize from 'camelize';
import axios from 'axios';

import {
    PROFILE_TYPE_URL,
    ALLOY_URL,
    SURFACE_URL,
    COMPLEXITY_URL
} from '../constants/ApiConstants';

export const post = (url, data) => {

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch(url, options)
    .then(
      response => (response.ok
        ? response.json()
        : Promise.reject(response.text())
      ),
      error => Promise.reject(error))
    .then(
      json => ({ json: camelize(json) }),
      error => ({ error }))
    .catch(error => ({ error }));
}

export const form = (url, formData) => {
  let options = {
    method: 'POST',
    body: formData
  };
  return fetch(url, options)
    .then(
      response => (response.ok
        ? response.json()
        : Promise.reject(response.text())
      ),
      error => Promise.reject(error))
    .then(
      json => ({ json: camelize(json) }),
      error => ({ error }))
    .catch(error => ({ error }));
}

export const get = (url) => {
    axios.get(url)
        .then(res => {
            const data = res.data;
            return data;
        })
}

export const get_profile_types = () => {
    return get(PROFILE_TYPE_URL);
};

export const get_alloys = () => {
    return get(ALLOY_URL);
};

export const get_surfaces = () => {
    return get(SURFACE_URL);
};

export const get_complexities = () => {
    return get(COMPLEXITY_URL);
};
    
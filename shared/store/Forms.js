import axios from 'axios';
import config from '../../config';

const localApiUrl = config('localApiUrl');
const clientLocalApiUrl = config('clientLocalApiUrl');

// different api url dependant on if we're fetching on server or client
// makes "yarn run dev-remote" work with ngrok
const apiUrl = typeof window === 'undefined' ? localApiUrl : clientLocalApiUrl;

export default class Forms {
  static contactUs(data) {
    console.log('data', data);
    return axios.post(`${apiUrl}/forms/contact-us`, data);
  }
}

import './app.css';
import axios from 'axios';
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', async () => {
  await axios.get('/api/users');
  document.body.innerHTML = `<img src="${nyancat}"/>`;
});

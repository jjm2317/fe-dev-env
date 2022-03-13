import './app.css';
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
  console.log(23);
  document.body.innerHTML = `<img src="${nyancat}"/>`;
});

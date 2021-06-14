// module exports is required to be able to load from gulpfile.
// const api_url = () => {
//   if (process.env.STAGE != null) {
//     return process.env[`${process.env.STAGE.replace('-', '_').toUpperCase()}_API_URL`]
//   } else {
//     return process.env.API_URL || 'http://localhost:8000/v1';
//   }
// }
module.exports = {
  default: {
    environment: 'production',
    appTitle: 'MAAP Dashboard',
    appDescription: 'Explore the data using our new experimental dashboard.',
    twitterHandle: '@NASAEarthData',
    mbToken: 'pk.eyJ1IjoiY292aWQtbmFzYSIsImEiOiJja2F6eHBobTUwMzVzMzFueGJuczF6ZzdhIn0.8va1fkyaWgM57_gZ2rBMMg',
    api: process.env.API_URL || 'http://localhost:8000/v1',
    map: {
      center: [0, 0],
      zoom: 2,
      minZoom: 1,
      maxZoom: 20,
      styleUrl: 'mapbox://styles/covid-nasa/ckb01h6f10bn81iqg98ne0i2y'
    }
  }
};

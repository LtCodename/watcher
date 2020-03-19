import React from 'react';
import axios from 'axios';

function App() {

  async function getData() {
    try {
      //const { data } = await axios.get(`http://www.omdbapi.com/?t=goodfellas&y=1990&plot=full&apikey=36827e98`, {
      const { data } = await axios.get(`http://www.omdbapi.com/?s=fincher&apikey=36827e98`, {
      });

      console.log(data);
    } catch (e) {
    }
  }

  return (
    <div>
      <button type='button' onClick={getData}>Goodfellas</button>
    </div>
  );
}

export default App;

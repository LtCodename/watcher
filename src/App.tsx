/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fire from "./fire";
import { createGlobalStyle}  from "styled-components";
import {useDispatch, useStore} from "react-redux";
import DirectorsReducer from "./redux/DirectorsReducer";
import MoviesReducer from "./redux/MoviesReducer";

const OMDbApiKey: string = '36827e98';

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
  }
`;

function App() {
  const [directorsLoaded, setDirectorsLoaded] = useState(false);
  const [moviesLoaded, setMoviesLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = () => {
    fetchDirectors();
    fetchMovies();
  };

  const fetchDirectors = () => {
    fire.firestore().collection('directors').orderBy("name").onSnapshot((snapshot: any) => {
      dispatch({type: DirectorsReducer.actions.DIRECTORS_FETCH, snapshot: snapshot});
      setDirectorsLoaded(true);
    }, (error: { message: any; }) => {
      console.log(error.message);
    });
  };

  const fetchMovies = () => {
    fire.firestore().collection('movies').orderBy("year").onSnapshot((snapshot: any) => {
      dispatch({type: MoviesReducer.actions.MOVIES_FETCH, snapshot: snapshot});
      setMoviesLoaded(true);
    }, (error: { message: any; }) => {
      console.log(error.message);
    });
  };

  const store = useStore();
  const storeState = store.getState();
  const directors = storeState.directors;

  // async function getData() {
  //   try {
  //     const { data } = await axios.get(`http://www.omdbapi.com/?t=goodfellas&y=1990&plot=full&apikey=${OMDbApiKey}`, {
  //     });
  //
  //     console.log(data);
  //   } catch (e) {
  //   }
  // }

  console.log(directors);

  const content = (
      <>
        <span>Content</span>
        <GlobalStyles/>
      </>
  );

  const loader = (
      <>
        <span>Loading...</span>
      </>
  );

  return (
    <>
      {(directorsLoaded && moviesLoaded) ? content : loader}
      {/*<button type='button' onClick={getData}>Goodfellas</button>*/}
    </>
  );
}

export default App;

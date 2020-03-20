/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import fire from "./fire";
import { createGlobalStyle }  from "styled-components";
import { useDispatch } from "react-redux";
import DirectorsReducer from "./redux/DirectorsReducer";
import MoviesReducer from "./redux/MoviesReducer";
import Dashboard from "./components/Dashboard";
import Preloader from "./components/Preloader";

export const OMDbApiKey: string = '36827e98';

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 16px;
    background: #fff9de;
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

  const loader = (
      <Preloader/>
  );

  return (
      <>
        {(directorsLoaded && moviesLoaded) ? <Dashboard/> : loader}
        <GlobalStyles/>
      </>
  );
}

export default App;

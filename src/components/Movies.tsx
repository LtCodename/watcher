import React from 'react';
import { connect } from "react-redux";
import { Col } from "../Layout";
import Movie from "./Movie";

interface IMovie {
    director: string;
}

interface MyProps {
    directorId: string;
    movies: [];
}

interface MyState {
}

class Movies extends React.Component <MyProps, MyState>  {
    constructor(props: any) {
        super(props);

        this.state = {
            currentDirector: '',
            panelOpened: false
        };
    }

     render() {
         const moviesNode = this.props.movies.filter((movie:IMovie) => movie.director === this.props.directorId)
             .map((elem: any, index: any) => {
                 return (
                     <div key={index}>
                         <Movie
                             movieData={elem}/>
                     </div>
                 )
             });

         return (
             <Col>
                 {moviesNode}
             </Col>
         );
     }
}

const stateToProps = (state: any = {}) => {
    return {
        movies: state.movies,
    }
};

const MoviesConnected = connect(stateToProps, null)(Movies);

export default MoviesConnected;

import React from 'react';
import { connect } from "react-redux";
import { Col } from "../Layout";
import OscarMovie from "./OscarMovie";
import styled from "styled-components";

const MoviesCol = styled(Col)`
    background: transparent;
`;

interface IMovie {
    year: string;
    best: boolean;
}

interface MyProps {
    yearId: string;
    movies: [];
}

interface MyState {
}

class OscarMovies extends React.Component <MyProps, MyState>  {
    constructor(props: any) {
        super(props);

        this.state = {
            currentDirector: '',
            panelOpened: false
        };
    }

    render() {
        const moviesNode = this.props.movies.filter((movie:IMovie) => (movie.year === this.props.yearId && !movie.best))
            .map((elem: any, index: any) => {
                return (
                    <div key={index}>
                    <OscarMovie reduced={false}
                        movieData={elem}/>
                </div>
            )
            });

        return (
            <MoviesCol>
                {moviesNode}
            </MoviesCol>
        );
    }
}

const stateToProps = (state: any = {}) => {
    return {
        movies: state.oscarMovies,
    }
};

const OscarMoviesConnected = connect(stateToProps, null)(OscarMovies);

export default OscarMoviesConnected;

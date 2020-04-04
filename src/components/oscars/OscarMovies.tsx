import React from 'react';
import { connect } from "react-redux";
import { Col } from "../Layout";
import OscarMovie from "./OscarMovie";

interface IMovie {
    year: string;
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
        const moviesNode = this.props.movies.filter((movie:IMovie) => movie.year === this.props.yearId)
            .map((elem: any, index: any) => {
                return (
                    <div key={index}>
                    <OscarMovie
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
        movies: state.oscarMovies,
    }
};

const OscarMoviesConnected = connect(stateToProps, null)(OscarMovies);

export default OscarMoviesConnected;

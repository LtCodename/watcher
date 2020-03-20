import React from 'react';
import { useStore } from "react-redux";
import { Col } from "../Layout";
import Movie from "./Movie";

interface IMovies {
    directorId: string;
}

interface IMovie {
    director: string;
}

const Movies: React.FC<IMovies> = (
    { directorId },
) => {
    const store = useStore();
    const storeState = store.getState();
    const movies = storeState.movies;

    const moviesNode = movies.filter((movie:IMovie) => movie.director === directorId)
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
};

export default Movies;

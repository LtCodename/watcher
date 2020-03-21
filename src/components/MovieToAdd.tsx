import React, { useState } from 'react';
import styled from "styled-components";
import fire from "../fire";
import { Col } from "../Layout";

const MovieButton = styled.button`
    border: none;
    cursor: pointer;
    margin-bottom: 10px;
    padding: 5px;
    :focus, :hover {
		outline: none;
	}
`;

interface IProps {
    movieData: IMovieData,
    director: string
}

interface IMovieData {
    Title: string,
    Year: string
}

const MovieToAdd: React.FC<IProps> = (
    { movieData, director },
) => {
    const [process, setProcess] = useState('unset');

    const onMovieClick = () => {
        //console.log(movieData);
        setProcess('Progress...');
        fire.firestore().collection('movies').add({
            director: director,
            name: movieData['Title'],
            watched: false,
            year: movieData['Year']
        }).then(() => {
            setProcess('Added!');
        });
    };

    return (
        <MovieButton onClick={onMovieClick}>
            <Col>
                <span>{process !== 'unset' ? process : movieData['Title']}</span>
                <span>{movieData['Year']}</span>
            </Col>
        </MovieButton>
    );
};

export default MovieToAdd;

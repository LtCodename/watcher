/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import fire from "../../fire";
import { Col } from "../Layout";
import axios from "axios";
import { OMDbApiKey } from "../../App";
import { IMovieData } from "./Movie";
import { useStore } from "react-redux";

const MovieButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 5px;
    :not(:last-child) {
        margin-bottom: 10px;
     }
    :focus, :hover {
		outline: none;
	}
`;

const InfoSpan = styled.span`
    color: #517217;
    font-weight: 700;
`;

const MovieDetail = styled.span`
    min-height: 18px;
`;

interface IProps {
    movieData: IData,
    director?: string
}

interface IData {
    Title: string,
    Year: string
}

const MovieToAdd: React.FC<IProps> = (
    { movieData },
) => {
    const store = useStore();
    const storeState = store.getState();
    const directors = storeState.directors;
    const movies = storeState.movies;

    const initialDirector: any = '';
    const [process, setProcess] = useState('unset');
    const [directorInState, setDirectorInState] = useState(initialDirector);

    useEffect(() => {
        getAdditionalData();
    },[movieData]);

    const onMovieClick = () => {
        const directorFound = directors.find((elem: any) => elem.name === directorInState);

        if (!directorFound) {
            setProcess('Director Not Found');
            setTimeout(() => { setProcess('unset'); }, 3000);
            return;
        }

        const movieFound = movies.find((elem: any) => elem.name === movieData['Title']);

        if (movieFound) {
            setProcess('Movie Exists');
            setTimeout(() => { setProcess('unset'); }, 3000);
            return;
        }

        if (directorFound && !movieFound) {
            setProcess('Progress...');
            fire.firestore().collection('movies').add({
                director: directorFound.id,
                name: movieData['Title'],
                watched: false,
                year: parseInt(movieData['Year'])
            }).then(() => {
                setProcess('Added!');
            }).catch(error => {
                console.log(error.message);
            });
        }
    };

    const getAdditionalData = () => {
        getData().then((response:IMovieData) => {
            setDirectorInState(response.director);
            //console.log(response.director);
        }).catch((e) => {
            console.log(e);
        });
    };

    async function getData(): Promise<IMovieData> {
        let fromServer:IMovieData = {};
        try {
            const { data } = await axios.get(
                `//www.omdbapi.com/?t=${(movieData['Title']).toLowerCase()}&y=${movieData['Year']}&plot=full&apikey=${OMDbApiKey}`, {
                });
            fromServer = {
                director: data['Director'],
            };
        } catch (e) {
            throw new Error('Something went wrong!');
        }
        return fromServer;
    }

    return (
        <MovieButton onClick={onMovieClick}>
            <Col>
                <MovieDetail>{process !== 'unset' ? <InfoSpan>{process}</InfoSpan> : movieData['Title']}</MovieDetail>
                <MovieDetail>{movieData['Year']}</MovieDetail>
                <MovieDetail>{directorInState ? directorInState : 'Searching...'}</MovieDetail>
            </Col>
        </MovieButton>
    );
};

export default MovieToAdd;

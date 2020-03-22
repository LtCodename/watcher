/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import fire from "../fire";
import { Col } from "../Layout";
import axios from "axios";
import { OMDbApiKey } from "../App";
import { IMovieData } from "./Movie";
import { useDispatch, useStore } from "react-redux";
import SelectedDirectorReducer from "../redux/SelectedDirectorReducer";

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
    const selectedDirector = storeState.selectedDirector;
    const dispatch = useDispatch();

    const initialDirector: any = '';
    const [process, setProcess] = useState('unset');
    const [directorInState, setDirectorInState] = useState(initialDirector);

    useEffect(() => {
        getAdditionalData();
    },[movieData]);

    const onMovieClick = () => {
        if (!selectedDirector.length) {
            setProcess('Select Director');
            setTimeout(() => { setProcess('unset'); }, 3000);
            return;
        }
        setProcess('Progress...');
        fire.firestore().collection('movies').add({
            director: selectedDirector,
            name: movieData['Title'],
            watched: false,
            year: parseInt(movieData['Year'])
        }).then(() => {
            setProcess('Added!');
            dispatch({type: SelectedDirectorReducer.actions.DIRECTOR_SET, selectedDirector: ''});
        });
    };

    const getAdditionalData = () => {
        getData().then((response:IMovieData) => {
            setDirectorInState(response.director);
        }).catch((e) => {
            console.log(e);
        });
    };

    async function getData(): Promise<IMovieData> {
        let fromServer:IMovieData = {};
        try {
            const { data } = await axios.get(
                `http://www.omdbapi.com/?t=${(movieData['Title']).toLowerCase()}&y=${movieData['Year']}&plot=full&apikey=${OMDbApiKey}`, {
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
                <span>{process !== 'unset' ? <InfoSpan>{process}</InfoSpan> : movieData['Title']}</span>
                <span>{movieData['Year']}</span>
                <span>{directorInState}</span>
            </Col>
        </MovieButton>
    );
};

export default MovieToAdd;

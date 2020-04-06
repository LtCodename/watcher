/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Col } from "../Layout";
import axios from "axios";
import { OMDbApiKey } from "../../App";
import { IMovieData } from "../directors/Movie";
import MiniAddPanel from "./MiniAddPanel";

const MovieButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 5px;
    background: #fff9de;
    :not(:last-child) {
        margin-bottom: 10px;
     }
    :focus, :hover {
		outline: none;
	}
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

const OscarMovieToAdd: React.FC<IProps> = (
    { movieData },
) => {

    const initialDirector: any = '';
    const [directorInState, setDirectorInState] = useState(initialDirector);
    const [addMode, setAddMode] = useState(false);

    const onMovieClick = () => {
        setAddMode(true);
    };

    useEffect(() => {
        getAdditionalData();
    },[movieData]);

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

    const movie = (
        <MovieButton onClick={onMovieClick}>
            <Col>
                <MovieDetail>{movieData['Title']}</MovieDetail>
                <MovieDetail>{movieData['Year']}</MovieDetail>
                <MovieDetail>{directorInState ? directorInState : 'Searching...'}</MovieDetail>
            </Col>
        </MovieButton>
    );

    const addPanel = (
        <MiniAddPanel movieData={movieData}/>
    );

    return (
        <>
            {addMode ? addPanel : movie}
        </>
    );
};

export default OscarMovieToAdd;

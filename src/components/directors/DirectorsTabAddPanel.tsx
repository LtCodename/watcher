import React, { useState } from 'react';
import styled from "styled-components";
import { Col } from "../Layout";
import AdaptiveTextarea from "./AdaptiveTextarea";
import fire from "../../fire";
import axios from "axios";
import { OMDbApiKey } from "../../App";
import SearchResults from "./SearchResults";

const Wrapper = styled(Col)`
    background: #d63447;
    padding: 10px;
    width: 200px;
    @media (max-width: 414px) {
        width: 170px;
	}
`;

const DirectorColumn = styled(Col)`
    background: #d63447;
`;

const ActionButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 11px 13px;    
    font-weight: 800;
    color: #0079c4;
    font-size: 18px;
    margin-bottom: 10px;
    transition: all .2s;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    :hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    :focus, :hover {
		outline: none;
	}
`;

interface IResponse {
    Search: [];
}

const DirectorsTabAddPanel: React.FC = () => {
    const [addDirectorMode, setAddDirectorMode] = useState(false);
    const [addMovieMode, setAddMovieMode] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);

    const onAddDirector = () => {
        setAddDirectorMode(!addDirectorMode);
    };

    const onAddMovie = () => {
        setAddMovieMode(!addMovieMode);
    };

    const addMenu = (
        <>
            <ActionButton onClick={onAddDirector} type={'button'}>
                Add Director
            </ActionButton>
            <ActionButton onClick={onAddMovie}  type={'button'}>
                Add Movie
            </ActionButton>
        </>
    );

    let directorReference: any;
    let movieReference: any;

    const SubmitDirector = () => {
        if (directorReference.state.textData === '') {
            setAddDirectorMode(!addDirectorMode);
            return;
        } else {
            fire.firestore().collection('directors').add({
                name: directorReference.state.textData
            }).then(() => {
                setAddDirectorMode(!addDirectorMode);
            }).catch(error => {
                console.log(error.message);
            });
        }
    };

    const SearchMovie = () => {
        setFoundMovies([]);
        if (movieReference.state.textData === '') {
            setAddMovieMode(!addMovieMode);
            return;
        } else {
            search().then((response: IResponse) => {
                setFoundMovies(response['Search']);
                //console.log(response['Search']);
            });
        }
    };

    async function search(): Promise<IResponse> {
        let fromServer:IResponse;
        try {
            const { data } = await axios.get(
                `//www.omdbapi.com/?s=${(movieReference.state.textData).toLowerCase()}&type=movie&apikey=${OMDbApiKey}`, {
                });
            fromServer = data;
            //console.log(data);
        } catch (e) {
            throw new Error('Something went wrong!');
        }
        return fromServer;
    }

    const addDirector = (
        <DirectorColumn>
            <AdaptiveTextarea ref={c => (directorReference = c)}/>
            <ActionButton type={'button'} onClick={SubmitDirector}>Submit</ActionButton>
        </DirectorColumn>
    );

    const movies = (
        <SearchResults searchData={foundMovies}/>
    );

    const addMovie = (
        <DirectorColumn>
            <AdaptiveTextarea ref={c => (movieReference = c)}/>
            <ActionButton type={'button'} onClick={SearchMovie}>Search IMDB</ActionButton>
            {(foundMovies && foundMovies.length) ? movies : ''}
        </DirectorColumn>
    );

    return (
        <Wrapper>
            {(!addDirectorMode && !addMovieMode) ? addMenu : ''}
            {addDirectorMode ? addDirector : ''}
            {addMovieMode ? addMovie : ''}
        </Wrapper>
    );
};

export default DirectorsTabAddPanel;

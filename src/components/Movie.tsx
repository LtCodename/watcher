import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Col, Row } from "../Layout";
import axios from 'axios';
import { OMDbApiKey } from "../App";
import fire from "../fire";

const MovieWrapper = styled(Col)<{ watched: boolean }>`
    margin-right: 10px;
    margin-bottom: 10px;
    background: #15202b;
    width: 200px;
    align-items: center;
    text-align: center;
    background: ${props => (props.watched ? '#527318' : '#d63447')};
    transition: all .2s;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    :hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
`;

const MovieButton = styled.button<{ watched: boolean }>`
    border: none;
    width: 100%;
    height: 100%;
    padding: ${props => (props.watched ? '10px 10px 10px 10px' : '10px 10px 5px 10px')};
    background: ${props => (props.watched ? '#527318' : '#d63447')};
    font-weight: 800;
    font-size: 25px;
    color: #FFFFFF;
    cursor: pointer;
    outline: none;
    :focus, :hover {
		outline: none;
	}
`;

const Name = styled.span<{ opened: boolean }>`
    background: inherit;
    color: #fff9de;
    font-weight: 800;
    font-size: 25px;
    margin-bottom: ${props => (props.opened ? '10px' : '0')};
`;

const InformationColumn = styled(Col)`
    background: inherit;
    color: inherit;
`;

const Information = styled(Col)<{ opened: boolean }>`
    display: ${props => (props.opened ? 'flex' : 'none')};
    padding: 5px;
    background: #FFFFFF;
    color: inherit;
    text-align: left;
`;

const Info = styled.span`
    background: #FFFFFF;
`;

const InfoTitle = styled.span`
    background: #FFFFFF;
    color: #14202a;
    font-size: 15px;
    font-weight: 600;
`;

const InfoBody = styled.span`
    background: #FFFFFF;
    color: #14202a;
    font-size: 15px;
    font-weight: 300;
`;

const IconButton = styled.button<{ watched: boolean }>`
    cursor: pointer;
    width: fit-content;
    background: #d63447;
    outline: none;
    border: none;
    margin: 0 2.5px 5px 2.5px;
    display: ${props => (props.watched ? 'none' : 'block')};
    :focus, :hover {
        outline: none;
    }
`;

const SVG = styled.svg`
    fill: #fff9de;
    height: 20px;
    background: #d63447;
`;

const ConfirmRow = styled(Row)`
    background: #d63447;
`;

interface IMovie {
    movieData: any;
}

export interface IMovieData {
    year?: string;
    awards?: string;
    director?: string;
    metascore?: string;
    imdbRating?: string;
}

interface IFirebaseMovie {
    year: number;
    watched: boolean;
    director: string;
    name: string;
    id: string;
}

const Movie: React.FC<IMovie> = (
    { movieData },
) => {
    const fullDataInitialState: IMovieData = {};
    const movieDataInitialState: IFirebaseMovie = {
        year: 999,
        watched: false,
        director: '',
        name: '',
        id: ''
    };

    const [opened, setOpened] = useState(false);
    const [fullData, setFullData] = useState(fullDataInitialState);
    const [movieDataInState, setMovieDataInState] = useState(movieDataInitialState);
    const [confirmMode, setComfirmMode] = useState(false);

    useEffect(() => {
        setMovieDataInState(movieData);
    },[movieData]);

    const onMovie = () => {
        getData().then((response:IMovieData) => {
            setFullData(response);
            setOpened(!opened);
        }).catch((e) => {
            console.log(e);
        });
    };

    async function getData(): Promise<IMovieData> {
        let fromServer:IMovieData = {};
        try {
            const { data } = await axios.get(
                `http://www.omdbapi.com/?t=${(movieDataInState.name).toLowerCase()}&y=${movieDataInState.year}&plot=full&apikey=${OMDbApiKey}`, {
            });
            fromServer = {
                year: data['Year'],
                awards: data['Awards'],
                metascore: data['Metascore'],
                imdbRating: data['imdbRating']
            };
        } catch (e) {
            throw new Error('Something went wrong!');
        }
        return fromServer;
    }

    const onConfirmWatched = () => {
        let newMovieData = movieDataInState;
        newMovieData.watched = true;
        fire.firestore().collection('movies').doc(movieDataInState.id).update({
            ...newMovieData
        }).then(() => {
            console.log("Data updated successfully!");
            setMovieDataInState(newMovieData);
        }).catch(error => {
            console.log(error.message);
        });
    };

    const onWatched = () => {
        setComfirmMode(true);
    };

    const onAbort = () => {
        setComfirmMode(false);
    };

    const watchedButton = (
        <IconButton watched={movieDataInState.watched} onClick={onWatched}>
            <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-square"
                 role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"/>
            </SVG>
        </IconButton>
    );

    const confirmPanel = (
        <ConfirmRow>
            <IconButton watched={movieDataInState.watched} onClick={onConfirmWatched}>
                <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-square"
                     role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"/>
                </SVG>
            </IconButton>
            <IconButton watched={movieDataInState.watched} onClick={onAbort}>
                <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban"
                     role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <path d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"/>
                </SVG>
            </IconButton>
        </ConfirmRow>
    );

    return (
        <MovieWrapper watched={movieDataInState.watched}>
            <MovieButton
                watched={movieDataInState.watched}
                type={'button'}
                onClick={onMovie}>
                <InformationColumn>
                    <Name opened={opened}>{movieDataInState.name}</Name>
                    <Information
                        opened={opened}>
                        <Info>
                            <InfoTitle>Year: </InfoTitle>
                            <InfoBody>{fullData.year}</InfoBody>
                        </Info>
                        <Info>
                            <InfoTitle>Awards: </InfoTitle>
                            <InfoBody>{fullData.awards}</InfoBody>
                        </Info>
                        <Info>
                            <InfoTitle>Metascore: </InfoTitle>
                            <InfoBody>{fullData.metascore}</InfoBody>
                        </Info>
                        <Info>
                            <InfoTitle>IMDB Rating: </InfoTitle>
                            <InfoBody>{fullData.imdbRating}</InfoBody>
                        </Info>
                    </Information>
                </InformationColumn>
            </MovieButton>
            {confirmMode ? confirmPanel : watchedButton}
        </MovieWrapper>
    );
};

export default Movie;

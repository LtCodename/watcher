import React, { useState } from 'react';
import styled from "styled-components";
import { Col } from "../Layout";
import axios from 'axios';
import { OMDbApiKey } from "../App";

const MovieWrapper = styled.div`
    margin-right: 10px;
    margin-bottom: 10px;
    background: #15202b;
    width: 200px;
    text-align: center;
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
    padding: 10px;
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

const InfoBody= styled.span`
    background: #FFFFFF;
    color: #14202a;
    font-size: 15px;
    font-weight: 300;
`;

interface IMovie {
    movieData: any;
}

interface IMovieData {
    year?: string;
    awards?: string;
    metascore?: string;
    imdbRating?: string;
}

const Movie: React.FC<IMovie> = (
    { movieData },
) => {
    const initialState: IMovieData = {};

    const [opened, setOpened] = useState(false);
    const [fullData, setFullData] = useState(initialState);

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
                `http://www.omdbapi.com/?t=${(movieData.name).toLowerCase()}&y=${movieData.year}&plot=full&apikey=${OMDbApiKey}`, {
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

    return (
        <MovieWrapper>
            <MovieButton
                watched={movieData.watched}
                type={'button'}
                onClick={onMovie}>
                <InformationColumn>
                    <Name opened={opened}>{movieData.name}</Name>
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
        </MovieWrapper>
    );
};

export default Movie;
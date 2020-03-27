import React, { useState } from 'react';
import styled from "styled-components";
import { Col, Row } from "../Layout";
import fire from "../../fire";
import { useStore } from "react-redux";

const bg = '#de7119';
const textColor = '#512b58';

const MovieWrapper = styled(Col)`
    margin: 0 5px;
    margin-bottom: 10px;
    width: 200px;
    align-items: center;
    text-align: center;
    background: ${bg};
    justify-content: space-between;
    min-height: 81px;
    transition: all .2s;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    :hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    @media (max-width: 414px) {
        width: 187px;
	}
`;

const MovieButton = styled.button`
    border: none;
    width: 100%;
    height: 100%;
    padding: 5px 5px 5px 5px;
    background: ${bg};
    font-weight: 800;
    font-size: 20px;
    color: #FFFFFF;
    cursor: pointer;
    outline: none;
    :focus, :hover {
		outline: none;
	}
`;

const SystemRow = styled(Row)`
    background: ${bg};
    align-items: center;
    display: flex;
    padding-bottom: 2px;
`;

const Name = styled.span`
    background: ${bg};
    color: #fff9de;
    font-weight: 800;
    font-size: 20px;
    margin-bottom: 5px;
`;

const InformationColumn = styled(Col)`
    background: ${bg};
    color: inherit;
`;

const Information = styled(Col)`
    display: flex;
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
    color: ${textColor};
    font-size: 15px;
    font-weight: 600;
`;

const InfoBody = styled.span`
    background: #FFFFFF;
    color: ${textColor};
    font-size: 15px;
    font-weight: 300;
`;

const IconButton = styled.button`
    cursor: pointer;
    width: fit-content;
    background: ${bg};
    outline: none;
    border: none;
    margin-right: 5px;
    display: block;
    :focus, :hover {
        outline: none;
    }
`;

const WatchIcon = styled.svg`
    fill: #fff9de;
    height: 20px;
    background: ${bg};
`;

const ConfirmRow = styled(Row)`
    background: ${bg};
`;

interface IMovie {
    movieData: any;
}

const FilmingMovie: React.FC<IMovie> = (
    { movieData },
) => {
    const store = useStore();
    const storeState = store.getState();
    const directors = storeState.directors;

    const [opened, setOpened] = useState(false);
    const [confirmMode, setConfirmMode] = useState(false);

    const onMovie = () => {
        setOpened(!opened);
    };

    const onConfirmWatched = () => {
        fire.firestore().collection('movies').add({
            name: movieData.name,
            year: parseInt(movieData.year),
            director: movieData.director
        }).then(() => {
            fire.firestore().collection("filming").doc(movieData.id).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }).catch(error => {
            console.log(error.message);
        });
    };

    const onWatched = () => {
        setConfirmMode(true);
    };

    const onAbort = () => {
        setConfirmMode(false);
    };

    const watchedButton = (
        <IconButton onClick={onWatched}>
            <WatchIcon aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-square"
                       role="img"
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"/>
            </WatchIcon>
        </IconButton>
    );

    const confirmPanel = (
        <ConfirmRow>
            <IconButton onClick={onConfirmWatched}>
                <WatchIcon aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-square"
                           role="img"
                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"/>
                </WatchIcon>
            </IconButton>
            <IconButton onClick={onAbort}>
                <WatchIcon aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban"
                           role="img" xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 512 512">
                    <path d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"/>
                </WatchIcon>
            </IconButton>
        </ConfirmRow>
    );

    return (
        <MovieWrapper>
            <MovieButton
                type={'button'}
                onClick={onMovie}>
                <InformationColumn>
                    <Name>{movieData.name}</Name>
                    <Information>
                        <Info>
                            <InfoTitle>Director: </InfoTitle>
                            <InfoBody>
                                {directors.find((elem: any) => elem.id === movieData.director).name}
                            </InfoBody>
                        </Info>
                        <Info>
                            <InfoTitle>Year: </InfoTitle>
                            <InfoBody>{movieData.year}</InfoBody>
                        </Info>
                    </Information>
                </InformationColumn>
            </MovieButton>
            <SystemRow>
                {confirmMode ? confirmPanel : watchedButton}
            </SystemRow>
        </MovieWrapper>
    );
};

export default FilmingMovie;

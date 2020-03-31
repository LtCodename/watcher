import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Col, Row } from "../Layout";
import axios from 'axios';
import { OMDbApiKey } from "../../App";
import fire from "../../fire";
import MonthsBlueprint from "../../blueprints/MonthsBlueprint";

const MovieWrapper = styled(Col)<{ watched: boolean, bookmarked: boolean }>`
    margin: 5px 0 0 0;
    background: #15202b;
    border: ${props => ((!props.watched && props.bookmarked) ? '10px solid #84142d' : '0px solid #84142d')};
    align-items: center;
    text-align: center;
    background: ${props => (props.watched ? '#527318' : '#d63447')};
    transition: all .2s;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    :hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    @media (max-width: 414px) {
        font-size: 20px;
        width: 160px;
	}
`;

const MovieButton = styled.button<{ watched: boolean }>`
    border: none;
    width: 100%;
    height: 100%;
    padding: 5px 5px 5px 5px;
    background: ${props => (props.watched ? '#527318' : '#d63447')};
    font-weight: 800;
    font-size: 20px;
    color: #FFFFFF;
    cursor: pointer;
    outline: none;
    :focus, :hover {
		outline: none;
	}
`;

const BookmarkButton = styled.button<{ watched: boolean }>`
    border: none;
    cursor: pointer;
    outline: none;
    top: 0;
    right: 0;
    background: ${props => (props.watched ? '#527318' : '#d63447')};
    :focus, :hover {
		outline: none;
	}
`;

const EditButton = styled.button<{ watched: boolean }>`
    border: none;
    cursor: pointer;
    outline: none;
    margin-left: 5px;
    top: 0;
    right: 0;
    background: ${props => (props.watched ? '#527318' : '#d63447')};
    :focus, :hover {
		outline: none;
	}
`;

const BookmarkIcon = styled.svg<{ watched: boolean }>`
    fill: #fff9de;
    height: 20px;
    background: ${props => (props.watched ? '#527318' : '#d63447')};
`;

const SystemRow = styled(Row)<{ watched: boolean }>`
    background: ${props => (props.watched ? '#527318' : '#d63447')};
    align-items: center;
    display: ${props => (props.watched ? 'none' : 'flex')};
    padding-bottom: 2px;
`;

const Name = styled.span<{ opened: boolean }>`
    background: inherit;
    color: #fff9de;
    font-weight: 800;
    font-size: 20px;
    margin-bottom: ${props => (props.opened ? '10px' : '0')};
`;

const InformationColumn = styled(Col)`
    background: inherit;
    color: inherit;
`;

const EditColumn = styled(Col)`
    background: inherit;
    color: inherit;
    margin: 10px 0px 2px;
    align-items: center;
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
    margin-right: 5px;
    display: ${props => (props.watched ? 'none' : 'block')};
    :focus, :hover {
        outline: none;
    }
`;

const WatchIcon = styled.svg`
    fill: #fff9de;
    height: 20px;
    background: #d63447;
`;

const ConfirmRow = styled(Row)`
    background: #d63447;
`;

const InputRow = styled(Row)`
    align-items: center;
    margin-bottom: 5px;
    justify-content: space-between;
`;

const Select = styled.select`
    width: 165px;
    border: none;
    :focus, :hover {
		outline: none;
	}
`;

const Textarea = styled.textarea`
    resize: none;
    border: none;
    outline: none;
    width: 165px;
    padding: 5px;
    ::-webkit-input-placeholder {
        color: #512b58;
    }
`;

const SubmitButton = styled.button`
    cursor: pointer;
    width: fit-content;
    outline: none;
    background: inherit;
    border: none;
    margin-top: 6px;
    :focus, :hover {
        outline: none;
    }
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
    name: string;
    year: number;
    releaseYear: number;
    month: number;
    priority: boolean;
    id: string
    watched: boolean;
}

const TheatreMovie: React.FC<IMovie> = (
    { movieData },
) => {
    const fullDataInitialState: IMovieData = {};
    const movieDataInitialState: IFirebaseMovie = {
        year: 999,
        month: 999,
        releaseYear: 999,
        watched: false,
        priority: false,
        name: '',
        id: ''
    };

    const [opened, setOpened] = useState(false);
    const [fullData, setFullData] = useState(fullDataInitialState);
    const [movieDataInState, setMovieDataInState] = useState(movieDataInitialState);
    const [confirmMode, setConfirmMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    //const [newMovieData, setNewMovieData] = useState(movieDataInitialState);

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
                `//www.omdbapi.com/?t=${(movieDataInState.name).toLowerCase()}&y=${movieDataInState.releaseYear}&plot=full&apikey=${OMDbApiKey}`, {
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
        fire.firestore().collection('theaters').doc(movieDataInState.id).update({
            ...newMovieData
        }).then(() => {
            console.log("Data updated successfully!");
            setMovieDataInState(newMovieData);
        }).catch(error => {
            console.log(error.message);
        });
    };

    const toggleBookmark = () => {
        let newMovieData: IFirebaseMovie = movieDataInState;
        newMovieData.priority = !movieDataInState.priority;
        fire.firestore().collection('theaters').doc(movieDataInState.id).update({
            ...newMovieData
        }).then(() => {
            console.log("Data updated successfully!");
            setMovieDataInState(newMovieData);
        }).catch(error => {
            console.log(error.message);
        });
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const onWatched = () => {
        setConfirmMode(true);
    };

    const onAbort = () => {
        setConfirmMode(false);
    };

    const watchedButton = (
        <IconButton watched={movieDataInState.watched} onClick={onWatched}>
            <WatchIcon aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-square"
                       role="img"
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"/>
            </WatchIcon>
        </IconButton>
    );

    const confirmPanel = (
        <ConfirmRow>
            <IconButton watched={movieDataInState.watched} onClick={onConfirmWatched}>
                <WatchIcon aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-square"
                           role="img"
                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"/>
                </WatchIcon>
            </IconButton>
            <IconButton watched={movieDataInState.watched} onClick={onAbort}>
                <WatchIcon aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban"
                           role="img" xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 512 512">
                    <path d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"/>
                </WatchIcon>
            </IconButton>
        </ConfirmRow>
    );

    const addToBookmark = (
        <BookmarkIcon watched={movieDataInState.watched} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-square"
                      role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512">
            <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"/>
        </BookmarkIcon>
    );

    const removeFromBookmark = (
        <BookmarkIcon watched={movieDataInState.watched} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus-square"
                      role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512">
            <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z"/>
        </BookmarkIcon>
    );

    const editIcon = (
        <BookmarkIcon watched={movieDataInState.watched} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-square"
             role="img" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512">
            <path d="M400 480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zM238.1 177.9L102.4 313.6l-6.3 57.1c-.8 7.6 5.6 14.1 13.3 13.3l57.1-6.3L302.2 242c2.3-2.3 2.3-6.1 0-8.5L246.7 178c-2.5-2.4-6.3-2.4-8.6-.1zM345 165.1L314.9 135c-9.4-9.4-24.6-9.4-33.9 0l-23.1 23.1c-2.3 2.3-2.3 6.1 0 8.5l55.5 55.5c2.3 2.3 6.1 2.3 8.5 0L345 199c9.3-9.3 9.3-24.5 0-33.9z"/>
        </BookmarkIcon>
    );

    const allData = (
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

    );

    const submitNewData = () => {
        setEditMode(!editMode);
        fire.firestore().collection('theaters').doc(movieDataInState.id).update({
            ...movieDataInState,
        }).then(() => {
            console.log("Data updated successfully!");
        }).catch(error => {
            console.log(error.message);
        });
    };

    const inputValuesChange = (event: { target: { id: any; value: any; }; }) => {
        if (event.target.id !== 'name') {
            setMovieDataInState({
                ...movieDataInState,
                [event.target.id]: parseInt(event.target.value)
            });
        } else {
            setMovieDataInState({
                ...movieDataInState,
                [event.target.id]: event.target.value
            });
        }
    };

    const monthOptions = [{name: "Not selected", value: undefined}, ...MonthsBlueprint].map((dir: any, index) => {
        return (
            <option key={index} value={dir.db}>{dir.name}</option>
        );
    });

    const monthSelect = (
        <Select
            value={movieDataInState['month']}
            id={'month'}
            onChange={inputValuesChange}>
            {monthOptions}
        </Select>
    );

    const editModeData = (
        <EditColumn>
            <InputRow>
                <Textarea
                    placeholder=''
                    rows={1}
                    id={'name'}
                    value={movieDataInState['name']}
                    onChange={inputValuesChange}
                    required>
                </Textarea>
            </InputRow>
            <InputRow>
                <Textarea
                    placeholder=''
                    rows={1}
                    id={'year'}
                    value={movieDataInState['year']}
                    onChange={inputValuesChange}
                    required>
                </Textarea>
            </InputRow>
            {monthSelect}
            <SubmitButton onClick={submitNewData}>
                <BookmarkIcon watched={movieDataInState.watched} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-double"
                     role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <path d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"/>
                </BookmarkIcon>
            </SubmitButton>
        </EditColumn>
    );

    return (
        <MovieWrapper watched={movieDataInState.watched} bookmarked={movieDataInState.priority}>

            {editMode ? editModeData : allData}
            <SystemRow watched={movieDataInState.watched}>
                {confirmMode ? confirmPanel : watchedButton}
                <BookmarkButton watched={movieDataInState.watched} onClick={toggleBookmark}>
                    {movieDataInState.priority ? removeFromBookmark : addToBookmark}
                </BookmarkButton>
                <EditButton watched={movieDataInState.watched} onClick={toggleEditMode}>
                    {editIcon}
                </EditButton>
            </SystemRow>
        </MovieWrapper>
    );
};

export default TheatreMovie;

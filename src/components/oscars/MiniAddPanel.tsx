import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Col, Row } from "../Layout";
import { useStore } from "react-redux";
import fire from '../../fire';

const Wrapper = styled(Col)`
    background: #fff9de;
    margin-bottom: 10px;
    padding: 10px;
    align-items: center;
`;

const InputRow = styled(Row)`
    margin-bottom: 5px;
    justify-content: space-between;
    width: -webkit-fill-available;
`;

const Name = styled.span`
    font-weight: 800;
    font-size: 17px;
    color: #512b58;
    margin-bottom: 5px;
`;

const Message = styled.span`
    font-weight: 500;
    font-size: 15px;
    color: #512b58;
`;

const Label = styled.label`
    font-weight: 500;
    font-size: 17px;
    color: #512b58;
    margin-right: 10px;
`;

const Select = styled.select`
    :focus, :hover {
		outline: none;
	}
`;

const SubmitButton = styled.button`
    font-weight: 800;
    font-size: 17px;
    color: #512b58;
    outline: none;
    cursor: pointer;
    border: 3px solid #512b58;
    width: fit-content;
    padding: 2px 4px;
    background: #fff9de;
    margin-bottom: 5px;
    margin-top: 5px;
`;

interface IData {
    movieData: any
}

interface IMovie {
    best: string,
    watched: string,
    name: string,
    year: string
}

const MiniAddPanel: React.FC<IData> = (
    { movieData },
) => {
    const initialState: IMovie = {
        best: 'No',
        watched: 'No',
        name: movieData['Title'],
        year: '',
    };

    const [movieInformation, setMovieInformation] = useState(initialState);
    const [process, setProcess] = useState('Ready To Submit');

    const store = useStore();
    const storeState = store.getState();
    const years = storeState.oscarYears;
    const movies = storeState.oscarMovies;

    useEffect(() => {
        setMovieInformation({
            ...movieInformation,
            year: years.find((elem: any) => (elem.name === movieData['Year'])).id
        })
    },[movieData]);

    const inputValuesChange = (event: { target: { id: any; value: any; }; }) => {
        setMovieInformation({
            ...movieInformation,
            [event.target.id]: event.target.value
        });
    };

    const yearOptions = [{name: "Not selected", value: undefined}, ...years].sort((a:any, b: any) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }).map((year, index) => {
        return (
            <option key={index} value={year.id}>{year.name}</option>
        );
    });

    const yearSelect = (
        <Select
            value={movieInformation.year}
            id={'year'}
            onChange={inputValuesChange}>
            {yearOptions}
        </Select>
    );

    const yearRow = (
        <InputRow>
            <Label htmlFor={'year'}>Year</Label>
            {yearSelect}
        </InputRow>
    );

    const options = [{name: 'No', value: 'No'}, {name: 'Yes', value: 'Yes'}].map((option: any, index: number) => {
        return (
            <option key={index} value={option.value}>{option.name}</option>
        );
    });

    const watchedSelect = (
        <Select
            value={movieInformation.watched}
            id={'watched'}
            onChange={inputValuesChange}>
            {options}
        </Select>
    );

    const watchedRow = (
        <InputRow>
            <Label htmlFor={'watched'}>Watched</Label>
            {watchedSelect}
        </InputRow>
    );

    const bestSelect = (
        <Select
            value={movieInformation.best}
            id={'best'}
            onChange={inputValuesChange}>
            {options}
        </Select>
    );

    const bestRow = (
        <InputRow>
            <Label htmlFor={'best'}>Best Picture</Label>
            {bestSelect}
        </InputRow>
    );

    const onSubmit = () => {
        const movieFound = movies.find((elem: any) => elem.name === movieInformation.name);

        if (movieFound) {
            setProcess('Movie Exists');
            setTimeout(() => { setProcess('Ready To Submit'); }, 3000);
            return;
        }

        if (!movieInformation.year.length) {
            setProcess('Select Year');
            setTimeout(() => { setProcess('Ready To Submit'); }, 3000);
            return;
        }

        setProcess('Progress...');

        let watched: boolean = false;
        let best: boolean = false;
        if (movieInformation.watched === 'Yes') {
            watched = true;
        }
        if (movieInformation.best === 'Yes') {
            best = true;
        }

        const serverData = {
            ...movieInformation,
            best,
            watched
        };

        fire.firestore().collection('oscarMovies').add({
            ...serverData
        }).then(() => {
            setProcess('Added!');
        }).catch(error => {
            console.log(error.message);
        });
    };

    const submitButton = (
        <SubmitButton onClick={onSubmit}>
            Submit
        </SubmitButton>
    );

    const message = (
        <Message>{process}</Message>
    );

    return (
        <Wrapper>
            <Name>{movieInformation.name}</Name>
            {bestRow}
            {watchedRow}
            {yearRow}
            {submitButton}
            {message}
        </Wrapper>
    );
};

export default MiniAddPanel;

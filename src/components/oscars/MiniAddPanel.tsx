import React, { useState } from 'react';
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
    best: boolean,
    watched: boolean,
    name: string,
    year: string
}

const MiniAddPanel: React.FC<IData> = (
    { movieData },
) => {
    const initialState: IMovie = {
        best: false,
        watched: false,
        name: movieData['Title'],
        year: '',
    };

    const [movieInformation, setMovieInformation] = useState(initialState);
    const [process, setProcess] = useState('Ready To Submit');

    const store = useStore();
    const storeState = store.getState();
    const years = storeState.oscarYears;
    const movies = storeState.oscarMovies;

    const inputValuesChange = (event: { target: { id: any; value: any; }; }) => {
        if (event.target.id === 'year') {
            setMovieInformation({
                ...movieInformation,
                [event.target.id]: event.target.value
            });
        } else {
            let value: boolean;

            value = event.target.value === 'Yes';

            setMovieInformation({
                ...movieInformation,
                [event.target.id]: value
            });
        }
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
            value={movieData['year']}
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
            value={movieData['watched']}
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
            value={movieData['best']}
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

        fire.firestore().collection('oscarMovies').add({
            ...movieInformation
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

import React, {useState} from 'react';
import styled from "styled-components";
import { Col, Row } from '../Layout';
import FilmingBlueprint from "../blueprints/FilmingBlueprint";
import { useStore } from "react-redux";
import fire from "../fire";

const bg = '#512b58';

interface IMovie {
    director: string;
    year: string;
    name: string;
}

export interface IData {
    name: string;
    db: 'director' | 'year' | 'name';
}

const MainCol = styled(Col)`
    padding: 10px;
    background: ${bg};
`;

const SecondaryCol = styled(Col)`
    padding: 10px;
`;

const InputRow = styled(Row)`
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;
`;

const Label = styled.label`
    font-weight: 800;
    font-size: 17px;
    color: #512b58;
    margin-right: 10px;
`;

const SubmitButton = styled.button`
    font-weight: 800;
    font-size: 17px;
    color: #512b58;
    outline: none;
    cursor: pointer;
    border: 3px solid #512b58;
    width: fit-content;
    padding: 2px 4px
`;

const Textarea = styled.textarea`
    resize: none;
    border-bottom: 3px solid #512b58;
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    width: 200px;
    ::-webkit-input-placeholder {
        color: #512b58;
    }
`;

const ButtonRow = styled(Row)`
    justify-content: center;
`;

const Select = styled.select`
    :focus, :hover {
		outline: none;
	}
`;

const FilmingAddPanel: React.FC = () => {
    const initialState: IMovie = {
        director: '',
        year: '',
        name: ''
    };

    const [movieData, setMovieData] = useState(initialState);

    const store = useStore();
    const storeState = store.getState();
    const directors = storeState.directors;

    const inputValuesChange = (event: { target: { id: any; value: any; }; }) => {
        setMovieData({
            ...movieData,
            [event.target.id]: event.target.value
        });
    };

    const properties = FilmingBlueprint.map((elem: IData, index) => {
        return (
            <InputRow key={index}>
                <Label htmlFor={elem.db}>{elem.name}</Label>
                <Textarea
                    placeholder=''
                    rows={1}
                    id={elem.db}
                    value={movieData[elem.db]}
                    onChange={inputValuesChange}
                    required>
                </Textarea>
            </InputRow>
        )
    });

    const directorsOptions = [{name: "Not selected", value: undefined}, ...directors].map((dir, index) => {
        return (
            <option key={index} value={dir.id}>{dir.name}</option>
        );
    });

    const onSubmit = () => {
        if (!movieData.name.length || !movieData.year.length || !movieData.director.length) {
            return;
        }

        fire.firestore().collection('filming').add({
            name: movieData.name,
            year: parseInt(movieData.year),
            director: movieData.director
        }).then(() => {
            setMovieData(initialState);
        });
    };

    const submitButton = (
        <SubmitButton
            onClick={onSubmit}
            type={'button'}>
            Submit
        </SubmitButton>
    );

    const directorSelect = (
        <Select
            value={movieData['director']}
            id={'director'}
            onChange={inputValuesChange}>
            {directorsOptions}
        </Select>
    );

    const selectWrapper = (
        <InputRow>
            <Label htmlFor={'director'}>Director</Label>
            {directorSelect}
        </InputRow>
    );

    return (
        <MainCol>
            <SecondaryCol>
                {properties}
                {selectWrapper}
                <ButtonRow>
                    {submitButton}
                </ButtonRow>
            </SecondaryCol>
        </MainCol>
    );
};

export default FilmingAddPanel;

import React, {useState} from 'react';
import styled from "styled-components";
import { Col, Row } from '../Layout';
import MonthsBlueprint from "../../blueprints/MonthsBlueprint";
import fire from "../../fire";

const bg = '#512b58';

interface IMovie {
    year: string;
    releaseYear: string;
    name: string;
    month: string;
    watched: boolean;
    priority: boolean;
}

const MainCol = styled(Col)`
    padding: 10px;
    background: ${bg};
`;

const SecondaryCol = styled(Col)`
    padding: 10px;
    background: #fff9de;
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

const Textarea = styled.textarea`
    resize: none;
    border-bottom: 3px solid #512b58;
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    background: #fff9de;
    width: 200px;
    ::-webkit-input-placeholder {
        color: #512b58;
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
    padding: 2px 4px
`;

const ButtonRow = styled(Row)`
    justify-content: center;
`;

const Select = styled.select`
    :focus, :hover {
		outline: none;
	}
`;

const TheatersAddPanel: React.FC = () => {
    const initialState: IMovie = {
        month: '',
        year: '',
        releaseYear: '',
        name: '',
        watched: false,
        priority: false
    };

    const [movieData, setMovieData] = useState(initialState);

    const inputValuesChange = (event: { target: { id: any; value: any; }; }) => {
        setMovieData({
            ...movieData,
            [event.target.id]: event.target.value
        });
    };

    const properties = (
        <Col>
            <InputRow>
                <Label htmlFor={'name'}>{'Name'}</Label>
                <Textarea
                    placeholder=''
                    rows={1}
                    id={'name'}
                    value={movieData['name']}
                    onChange={inputValuesChange}
                    required>
                </Textarea>
            </InputRow>
            <InputRow>
                <Label htmlFor={'year'}>{'Watched'}</Label>
                <Textarea
                    placeholder=''
                    rows={1}
                    id={'year'}
                    value={movieData['year']}
                    onChange={inputValuesChange}
                    required>
                </Textarea>
            </InputRow>
            <InputRow>
                <Label htmlFor={'releaseYear'}>{'Release'}</Label>
                <Textarea
                    placeholder=''
                    rows={1}
                    id={'releaseYear'}
                    value={movieData['releaseYear']}
                    onChange={inputValuesChange}
                    required>
                </Textarea>
            </InputRow>
        </Col>
    );

    const onSubmit = () => {
        if (!movieData.name.length || !movieData.year.length || !movieData.month) {
            return;
        }

        fire.firestore().collection('theaters').add({
            name: movieData.name,
            year: parseInt(movieData.year),
            month: parseInt(movieData.month),
        }).then(() => {
            setMovieData(initialState);
        }).catch(error => {
            console.log(error.message);
        });
    };

    const submitButton = (
        <SubmitButton
            onClick={onSubmit}
            type={'button'}>
            Submit
        </SubmitButton>
    );

    const monthOptions = [{name: "Not selected", value: undefined}, ...MonthsBlueprint].map((dir: any, index) => {
        return (
            <option key={index} value={dir.db}>{dir.name}</option>
        );
    });

    const monthSelect = (
        <Select
            value={movieData['month']}
            id={'month'}
            onChange={inputValuesChange}>
            {monthOptions}
        </Select>
    );

    const monthSelectWrapper = (
        <InputRow>
            <Label htmlFor={'month'}>Month</Label>
            {monthSelect}
        </InputRow>
    );

    return (
        <MainCol>
            <SecondaryCol>
                {properties}
                {monthSelectWrapper}
                <ButtonRow>
                    {submitButton}
                </ButtonRow>
            </SecondaryCol>
        </MainCol>
    );
};

export default TheatersAddPanel;

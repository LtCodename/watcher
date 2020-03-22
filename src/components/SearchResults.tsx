import React, { useState } from 'react';
import styled from "styled-components";
import { Col } from "../Layout";
import MovieToAdd from "./MovieToAdd";
import { useDispatch, useStore } from "react-redux";
import SelectedDirectorReducer from "../redux/SelectedDirectorReducer";

const Select = styled.select`
    margin-bottom: 10px;
`;

const MoviesColumn = styled(Col)`
    background: #d63447;
`;

interface ISearch {
    searchData: any
}

const SearchResults: React.FC<ISearch> = (
    { searchData },
) => {
    const store = useStore();
    const storeState = store.getState();
    const directors = storeState.directors;
    const [directorId, setDirectorId] = useState('');
    const dispatch = useDispatch();

    const results = searchData.map((elem: any, index: any) => {
        return (
            <MovieToAdd key={index} movieData={elem}/>
        )
    });

    const selectValuesChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDirectorId(event.target.value);
        dispatch({type: SelectedDirectorReducer.actions.DIRECTOR_SET, selectedDirector: event.target.value});
    };

    const directorsOptions = [{name: "Not selected", value: null}, ...directors].map((director, index) => {
        return (
            <option key={index} value={director.id}>{director.name}</option>
        );
    });

    return (
        <MoviesColumn>
            <Select
                onChange={selectValuesChange}
                value={directorId}>
                {directorsOptions}
            </Select>
            {results}
        </MoviesColumn>
    );
};

export default SearchResults;

import React from 'react';
import styled from "styled-components";
import { Col } from "../Layout";
import MovieToAdd from "./MovieToAdd";

const MoviesColumn = styled(Col)`
    background: #d63447;
`;

interface ISearch {
    searchData: any,
    director: string
}

const SearchResults: React.FC<ISearch> = (
    { searchData, director },
) => {

    const results = searchData.map((elem: any, index: any) => {
        return (
            <MovieToAdd key={index} movieData={elem} director={director}/>
        )
    });

    return (
        <MoviesColumn>
            {results}
        </MoviesColumn>
    );
};

export default SearchResults;

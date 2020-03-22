import React from 'react';
import styled from "styled-components";
import { Col } from "../Layout";
import MovieToAdd from "./MovieToAdd";

const MoviesColumn = styled(Col)`
    background: #d63447;
`;

interface ISearch {
    searchData: any
}

const SearchResults: React.FC<ISearch> = (
    { searchData },
) => {
    const results = searchData.map((elem: any, index: any) => {
        return (
            <MovieToAdd key={index} movieData={elem}/>
        )
    });

    return (
        <MoviesColumn>
            {results}
        </MoviesColumn>
    );
};

export default SearchResults;

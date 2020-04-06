import React from 'react';
import styled from "styled-components";
import { Col } from "../Layout";
import OscarMovieToAdd from "./OscarMovieToAdd";

const MoviesColumn = styled(Col)`
    background: #d63447;
`;

interface ISearch {
    searchData: any
}

const OscarSearchResults: React.FC<ISearch> = (
    { searchData },
) => {
    const results = searchData.map((elem: any, index: any) => {
        return (
            <OscarMovieToAdd key={index} movieData={elem}/>
        )
    });

    return (
        <MoviesColumn>
            {results}
        </MoviesColumn>
    );
};

export default OscarSearchResults;

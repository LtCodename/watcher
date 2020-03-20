import React from 'react';
import styled from "styled-components";
import { Col } from "../Layout";

const DirectorWrapper = styled(Col)`
    padding: 20px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    color: #FFFFFF;
    background: #15202b;
    font-weight: 800;
    font-size: 25px;
    width: 200px;
    height: 100px;
    transition: all .2s;
    justify-content: center;
`;

interface IDirector {
    directorName: string;
}

const Director: React.FC<IDirector> = (
    { directorName },
) => {

    return (
        <DirectorWrapper>
            {directorName}
        </DirectorWrapper>
    );
};

export default Director;

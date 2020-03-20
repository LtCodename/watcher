import React, { useState } from 'react';
import { useStore } from "react-redux";
import styled from "styled-components";
import { Col, Row } from "../Layout";
import Director from "./Director";
import Movies from "./Movies";
import SystemPanel from "./SystemPanel";

const DashboardWrapper = styled(Col)`
    padding: 10px;
`;

const DirectorsRow = styled(Row)`
    flex-wrap: wrap;
`;

const DirectorButton = styled.button`
    border: none;
    cursor: pointer;
    :focus, :hover {
		outline: none;
	}
`;

const DirectorAndMovies = styled(Col)`
    align-items: center;
`;

const MainRow = styled(Row)`
    justify-content: space-between;
`;

const MoviesWrapper = styled(Row)<{ stateDirector: string, director: string }>`
    color: #FFFFFF;
    display: ${props => (props.director === props.stateDirector ? 'block' : 'none')};
`;

function Dashboard() {
    const store = useStore();
    const storeState = store.getState();
    const directors = storeState.directors;

    const [currentDirector, setCurrentDirector] = useState('');

    const onDirector = (name: string) => {
        if (name === currentDirector)
        {
            setCurrentDirector('');
        } else {
            setCurrentDirector(name);
        }
    };

    const directorsNode = directors.map((elem: any, index: any) => {
        return (
            <DirectorAndMovies key={index}>
                <DirectorButton
                    type={'button'}
                    onClick={() => onDirector(elem.name)}>
                    <Director directorData={elem}/>
                </DirectorButton>
                <MoviesWrapper
                    director={elem.name}
                    stateDirector={currentDirector}>
                    <Movies directorId={elem.id}/>
                </MoviesWrapper>
            </DirectorAndMovies>
        )
    });

    return (
        <MainRow>
            <DashboardWrapper>
                <DirectorsRow>
                    {directorsNode}
                </DirectorsRow>
            </DashboardWrapper>
            <SystemPanel>System</SystemPanel>
            {/*<AddDirectorSection></AddDirectorSection>*/}
            {/*<AddMovieSection></AddMovieSection>*/}
            {/*<LoginSection></LoginSection>*/}
        </MainRow>
    );
}

export default Dashboard;

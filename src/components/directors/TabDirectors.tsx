import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { Col, Row } from "../Layout";
import Director from "./Director";
import Movies from "./Movies";
import SystemPanel from "../SystemPanel";
import AddPanel from "./AddPanel";

const MainRow = styled.div`
    justify-content: space-between;
    min-height: 100vh;
    display: flex;
    flex-flow: row;
    @media (max-width: 414px) {
        flex-flow: column;
	}
`;

const DashboardWrapper = styled(Col)`
    padding: 10px 5px;
`;

const DirectorsRow = styled(Row)`
    flex-wrap: wrap;
    @media (max-width: 414px) {
        justify-content: center;
	}
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

const MoviesWrapper = styled(Row)<{ stateDirector: string, director: string }>`
    color: #FFFFFF;
    display: ${props => (props.director === props.stateDirector ? 'block' : 'none')};
`;

interface MyProps {
    directors: [];
    addPanelState?: boolean;
}

interface MyState {
    currentDirector: string;
    panelOpened: boolean;
}

class TabDirectors extends React.Component <MyProps, MyState>  {
    constructor(props: any) {
        super(props);

        this.state = {
            currentDirector: '',
            panelOpened: false
        };
    }

    onDirector = (name: string) => {
        if (name === this.state.currentDirector)
        {
            this.setState({
                currentDirector: ''
            });
        } else {
            this.setState({
                currentDirector: name
            });
        }
    };

    render() {
        const directorsNode = this.props.directors.map((elem: any, index: any) => {
            return (
                <DirectorAndMovies key={index}>
                    <DirectorButton
                        type={'button'}
                        onClick={() => this.onDirector(elem.name)}>
                        <Director directorData={elem} movies={[]}/>
                    </DirectorButton>
                    <MoviesWrapper
                        director={elem.name}
                        stateDirector={this.state.currentDirector}>
                        <Movies directorId={elem.id} movies={[]}/>
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
                <Row>
                    {this.props.addPanelState ? <AddPanel/> : ''}
                    <SystemPanel/>
                </Row>
            </MainRow>
        );
    }
}

const stateToProps = (state: any = {}) => {
    return {
        addPanelState: state.addPanelState,
        directors: state.directors,
    }
};

const TabDirectorsConnected = connect(stateToProps, null)(TabDirectors);

export default TabDirectorsConnected;

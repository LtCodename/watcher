import React from 'react';
import styled from "styled-components";
import { Col } from '../Layout';
import SystemPanel from "../SystemPanel";
import { connect } from "react-redux";

const MainRow = styled.div`
    justify-content: space-between;
    min-height: 100vh;
    display: flex;
    flex-flow: row;
    @media (max-width: 414px) {
        flex-flow: column;
	}
`;

const Sign = styled.span`
    font-weight: 800;
    font-size: 17px;
    color: #512b58;
`;

const TempCol = styled(Col)`
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

interface MyProps {
    oscars: [];
}

interface MyState {
}

class TabOscars extends React.Component <MyProps, MyState>  {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <MainRow>
                <TempCol>
                    <Sign>Under Construction</Sign>
                </TempCol>
                <SystemPanel/>
            </MainRow>
        );
    }
}

const stateToProps = (state: any = {}) => {
    return {
        oscars: state.theaters,
    }
};

const TabOscarsConnected = connect(stateToProps, null)(TabOscars);

export default TabOscarsConnected;

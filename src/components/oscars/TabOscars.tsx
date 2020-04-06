import React from 'react';
import styled from "styled-components";
import { Col, Row } from '../Layout';
import SystemPanel from "../SystemPanel";
import { connect } from "react-redux";
import Year from "./Year";
import OscarsTabAddPanel from "./OscarsTabAddPanel";

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

const YearsRow = styled(Row)`
    flex-wrap: wrap;
    @media (max-width: 414px) {
        justify-content: center;
	}
`;

const AllMoviesColumn = styled(Col)`
    align-items: center;
`;

const YearContainer = styled.div`
`;

interface MyProps {
    years: [];
    movies: [];
    panelState: boolean;
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
        const yearsNode = this.props.years.sort((a:any, b: any) => {
            if (a.name < b.name) {
                return 1;
            }
            if (a.name > b.name) {
                return -1;
            }
            return 0;
        }).map((elem: any, index: any) => {
            return (
                <AllMoviesColumn key={index}>
                    <YearContainer>
                        <Year yearData={elem} movies={[]}/>
                    </YearContainer>
                </AllMoviesColumn>
            )
        });

        return (
            <MainRow>
                <DashboardWrapper>
                    <YearsRow>
                        {yearsNode}
                    </YearsRow>
                </DashboardWrapper>
                <Row>
                    {this.props.panelState ? <OscarsTabAddPanel/> : ''}
                    <SystemPanel/>
                </Row>
            </MainRow>
        );
    }
}

const stateToProps = (state: any = {}) => {
    return {
        years: state.oscarYears,
        movies: state.oscarMovies,
        panelState: state.oscarsAddPanelState
    }
};

const TabOscarsConnected = connect(stateToProps, null)(TabOscars);

export default TabOscarsConnected;

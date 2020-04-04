import React from 'react';
import styled from "styled-components";
import { Col, Row } from '../Layout';
import SystemPanel from "../SystemPanel";
import { connect } from "react-redux";
import Year from "./Year";
import OscarMovies from "./OscarMovies";

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

const YearButton = styled.button`
    border: none;
    cursor: pointer;
    :focus, :hover {
		outline: none;
	}
`;

const MoviesWrapper = styled(Row)<{ stateYear: string, year: string }>`
    color: #FFFFFF;
    display: ${props => (props.year === props.stateYear ? 'block' : 'none')};
`;

interface MyProps {
    years: [];
    movies: [];
}

interface MyState {
    currentYear: string;
}

class TabOscars extends React.Component <MyProps, MyState>  {
    constructor(props: any) {
        super(props);

        this.state = {
            currentYear: '',
        };
    }

    onYear = (name: string) => {
        if (name === this.state.currentYear)
        {
            this.setState({
                currentYear: ''
            });
        } else {
            this.setState({
                currentYear: name
            });
        }
    };

    render() {
        const yearsNode = this.props.years.map((elem: any, index: any) => {
            return (
                <AllMoviesColumn key={index}>
                    <YearButton
                        type={'button'}
                        onClick={() => this.onYear(elem.name)}>
                        <Year yearData={elem} movies={[]}/>
                    </YearButton>
                    <MoviesWrapper
                        year={elem.name}
                        stateYear={this.state.currentYear}>
                        <OscarMovies yearId={elem.id} movies={[]}/>
                    </MoviesWrapper>
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
                    {/*{this.props.oscarsAddPanelState ? <DirectorsTabAddPanel/> : ''}*/}
                    <SystemPanel/>
                </Row>
            </MainRow>
        );
    }
}

const stateToProps = (state: any = {}) => {
    return {
        years: state.oscarYears,
        movies: state.oscarMovies
    }
};

const TabOscarsConnected = connect(stateToProps, null)(TabOscars);

export default TabOscarsConnected;

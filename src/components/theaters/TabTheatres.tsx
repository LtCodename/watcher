import React from 'react';
import styled from "styled-components";
import { Row, Col } from '../Layout';
import SystemPanel from "../SystemPanel";
import MonthsBlueprint from "../../blueprints/MonthsBlueprint";
import Month from "./Month";
import {connect} from "react-redux";
import TheatersAddPanel from "./TheatersAddPanel";

const MainRow = styled.div`
    justify-content: space-between;
    min-height: 100vh;
    display: flex;
    flex-flow: row;
    @media (max-width: 414px) {
        flex-flow: column;
	}
`;

const TheatersCol = styled(Col)`
    padding: 10px;
    align-items: center;
`;

const Months = styled(Row)`
    flex-wrap: wrap;
`;

const MonthName = styled.span`
    padding: 5px;
    margin-bottom: 5px;
    color: #FFFFFF;
    background: #3b6978;
    font-size: 20px;
    font-weight: 900;
`;

interface MyProps {
    theaters: [];
}

interface MyState {
}

class TabTheatres extends React.Component <MyProps, MyState>  {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    render() {
        const months = (
            MonthsBlueprint.map((elem: any, index: number) => {
                return (
                    <Month key={index} month={elem.db} name={elem.name}/>
                )
            })
        );

        return (
            <MainRow>
                <TheatersAddPanel/>
                <TheatersCol>
                    <MonthName>2020</MonthName>
                    <Months>
                        {months}
                    </Months>
                </TheatersCol>
                <SystemPanel/>
            </MainRow>
        );
    }
}

const stateToProps = (state: any = {}) => {
    return {
        theaters: state.theaters,
    }
};

const TabTheatresConnected = connect(stateToProps, null)(TabTheatres);

export default TabTheatresConnected;

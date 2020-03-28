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

const Year = styled(Col)`
    margin-bottom: 10px;
`;

const Months = styled(Row)`
    flex-wrap: wrap;
`;

const MonthName = styled.span`
    padding: 5px;
    margin-bottom: 5px;
    color: #FFFFFF;
    background: #de7119;
    font-size: 20px;
    font-weight: 900;
    width: -webkit-fill-available;
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
        const months2019 = (
            MonthsBlueprint.map((elem: any, index: number) => {
                return (
                    <Month key={index} year={2019} month={elem.db} name={elem.name}/>
                )
            })
        );

        const months2020 = (
            MonthsBlueprint.map((elem: any, index: number) => {
                return (
                    <Month key={index} year={2020} month={elem.db} name={elem.name}/>
                )
            })
        );

        const months2021 = (
            MonthsBlueprint.map((elem: any, index: number) => {
                return (
                    <Month key={index} year={2021} month={elem.db} name={elem.name}/>
                )
            })
        );

        return (
            <MainRow>
                <TheatersAddPanel/>
                <TheatersCol>
                    <Year>
                        <MonthName>2019</MonthName>
                        <Months>
                            {months2019}
                        </Months>
                    </Year>
                   <Year>
                       <MonthName>2020</MonthName>
                       <Months>
                           {months2020}
                       </Months>
                   </Year>
                    <Year>
                        <MonthName>2021</MonthName>
                        <Months>
                            {months2021}
                        </Months>
                    </Year>
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

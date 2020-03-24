import React from 'react';
import styled from "styled-components";
import {Col, Row} from '../Layout';
import { NavLink } from "react-router-dom";

const TabLink = styled(NavLink)`
    color: #fff9de;
    background: #512b58;
    font-weight: 800;
    font-size: 30px;
    text-decoration: none;
    margin: 0 5px;
    padding: 70px;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    :hover {
        text-decoration: none;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
`;

const DashboardRow = styled(Row)`
    justify-content: center;
`;

const DashboardCol = styled(Col)`
    height: 100vh;
    justify-content: center;
`;

const Dashboard: React.FC = () => {

    return (
        <DashboardCol>
            <DashboardRow>
                <TabLink to={'/directors'}>Directors</TabLink>
                <TabLink to={'/filming'}>Filming</TabLink>
                <TabLink to={'/theatres'}>In Theatres</TabLink>
            </DashboardRow>
        </DashboardCol>
    );
};

export default Dashboard;

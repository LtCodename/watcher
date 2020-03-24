import React from 'react';
import styled from "styled-components";
import {Col, Row} from '../Layout';
import {NavLink} from "react-router-dom";

/*const MovieButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 5px;
    :not(:last-child) {
        margin-bottom: 10px;
     }
    :focus, :hover {
		outline: none;
	}
`;*/

const Dashboard: React.FC = () => {

    return (
        <Col>
            <Row>
                <NavLink to={'/directors'}>Directors</NavLink>
                <NavLink to={'/filming'}>Filming</NavLink>
                <NavLink to={'/releases'}>Directors</NavLink>
            </Row>
        </Col>
    );
};

export default Dashboard;

import React from 'react';
import styled from "styled-components";
import { Row } from '../Layout';
import SystemPanel from "../SystemPanel";

const MainRow = styled(Row)`
    justify-content: space-between;
    min-height: 100vh;
`;

const TabTheatres: React.FC = () => {
    return (
        <MainRow>
            <Row>
                <span>In progress</span>
            </Row>
            <SystemPanel/>
        </MainRow>
    );
};

export default TabTheatres;

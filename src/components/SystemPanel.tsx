import React from 'react';
import styled from "styled-components";
import {Col, Row} from "../Layout";

const Wrapper = styled(Col)`
    background: #517217;
    padding: 10px;
    height: 100vh;
`;

const ActionButton = styled.button`
    border: none;
    cursor: pointer;
    order: none;
    cursor: pointer;
    padding: 11px 13px;
    border-radius: 50%;
    margin-bottom: 10px;
    :focus, :hover {
		outline: none;
	}
`;

const SVG = styled.svg`
    height: 30px;
    fill: #0079c5;
`;

const IconContainer = styled(Row)`
    align-items: center;
`;

const SystemPanel: React.FC = () => {

    return (
        <Wrapper>
            <ActionButton>
                <IconContainer>
                    <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
                         role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                    </SVG>
                </IconContainer>
            </ActionButton>
            <ActionButton>
                <IconContainer>
                    <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus"
                         role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                    </SVG>
                </IconContainer>
            </ActionButton>
        </Wrapper>
    );
};

export default SystemPanel;

import React from 'react';
import styled from "styled-components";
import { Col } from "../Layout";

const Wrapper = styled(Col)`
    background: #d63447;
    padding: 10px;
    height: 100vh;
`;

const ActionButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 11px 13px;    
    font-weight: 800;
    color: #0079c4;
    font-size: 18px;
    margin-bottom: 10px;
    transition: all .2s;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    :hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    :focus, :hover {
		outline: none;
	}
`;

const AddPanel: React.FC = () => {
    return (
        <Wrapper>
            <ActionButton>
                Add Director
            </ActionButton>
            <ActionButton>
                Add Movie
            </ActionButton>
        </Wrapper>
    );
};

export default AddPanel;

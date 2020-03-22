import React, {useState} from 'react';
import styled from "styled-components";
import { Col, Row } from "../Layout";
import { useDispatch } from "react-redux";
import AddPanelReducer from "../redux/AddPanelReducer";

const Wrapper = styled(Col)`
    background: #517217;
    padding: 10px;
    height: 100vh;
    overflow: auto;
`;

const ActionButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 11px 13px;
    border-radius: 50%;
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

const SVG = styled.svg`
    height: 30px;
    fill: #0079c5;
`;

const IconContainer = styled(Row)`
    align-items: center;
`;

const SystemPanel: React.FC = () => {
    const [panelState, setPanelState] = useState(false);

    const togglePanel = () => {
        dispatch({type: AddPanelReducer.actions.PANEL_CHANGE, newState: !panelState});
        setPanelState(!panelState);
    };

    const dispatch = useDispatch();

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
            <ActionButton onClick={togglePanel}>
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

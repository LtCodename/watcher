import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Col, Row } from "../Layout";
import { useDispatch } from "react-redux";
import AddPanelReducer from "../redux/AddPanelReducer";
import { NavLink, withRouter } from "react-router-dom";

const Wrapper = styled(Col)`
    background: #517217;
    padding: 10px;
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

const HomeButton = styled(NavLink)`
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    :hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
`;

const SystemPanel: React.FC = ({...otherProps}) => {
    const [panelState, setPanelState] = useState(false);
    const [directorsPanel, setDirectorsPanel] = useState(false);

    useEffect(() => {
        // @ts-ignore
        if (otherProps.location.pathname === '/directors') {
            setDirectorsPanel(true);
        }

    },[otherProps]);

    const togglePanel = () => {
        dispatch({type: AddPanelReducer.actions.PANEL_CHANGE, newState: !panelState});
        setPanelState(!panelState);
    };

    const dispatch = useDispatch();

    const addButton = (
        <ActionButton onClick={togglePanel}>
            <IconContainer>
                <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus"
                     role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                </SVG>
            </IconContainer>
        </ActionButton>
    );

    return (
        <Wrapper>
            <HomeButton to={"/dashboard"}>
                <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home"
                     role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 576 512">
                    <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"/>
                </SVG>
            </HomeButton>
            <ActionButton>
                <IconContainer>
                    <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
                         role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                    </SVG>
                </IconContainer>
            </ActionButton>
            {directorsPanel ? addButton : ''}
        </Wrapper>
    );
};

export default withRouter(SystemPanel);

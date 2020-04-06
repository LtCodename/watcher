import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Row } from "./Layout";
import { useDispatch } from "react-redux";
import AddPanelReducer from "../redux/AddPanelReducer";
import { NavLink, withRouter } from "react-router-dom";
import OscarsAddPanelReducer from "../redux/OscarsAddPanelReducer";

const Wrapper = styled.div`
    background: #517217;
    padding: 10px;
    display: flex;
    flex-flow: column;
    @media (max-width: 414px) {
        flex-flow: row;
        width: 100%;
        justify-content: space-evenly;
        align-items: center;
	}
`;

const ActionButton = styled.button`
    border: none;
    margin-bottom: 10px;
    background: transparent;
    cursor: pointer;
    :focus, :hover {
		outline: none;
	}
`;

const SVG = styled.svg`
    height: 30px;
    fill: #fff9de;
    background: transparent;
    transition: all .2s;
    :hover {
        fill: #de7119;
    }
`;

const IconContainer = styled(Row)`
    justify-content: center;
    background: transparent;
`;

const Link = styled(NavLink)`
    margin-bottom: 10px;
    background: transparent;
    @media (max-width: 414px) {
        margin-bottom: 0;
	}
`;

const SystemPanel: React.FC = ({...otherProps}) => {
    const [panelState, setPanelState] = useState(false);
    const [directorsPanel, setDirectorsPanel] = useState(false);

    const [oscarsPanelState, setOscarsPanelState] = useState(false);
    const [oscarsPanel, setOscarsPanel] = useState(false);

    useEffect(() => {
        // @ts-ignore
        if (otherProps.location.pathname === '/directors') {
            setDirectorsPanel(true);
        }
        // @ts-ignore
        if (otherProps.location.pathname === '/oscars') {
            setOscarsPanel(true);
        }

    },[otherProps]);

    const toggleDirectorsPanel = () => {
        dispatch({type: AddPanelReducer.actions.PANEL_CHANGE, newState: !panelState});
        setPanelState(!panelState);
    };

    const toggleOscarsPanel = () => {
        dispatch({type: OscarsAddPanelReducer.actions.OSCARS_PANEL_CHANGE, newState: !oscarsPanelState});
        setOscarsPanelState(!oscarsPanelState);
    };

    const dispatch = useDispatch();

    const addButton = (
        <ActionButton onClick={toggleDirectorsPanel}>
            <IconContainer>
                <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus"
                     role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                </SVG>
            </IconContainer>
        </ActionButton>
    );

    const oscarsAddButton = (
        <ActionButton onClick={toggleOscarsPanel}>
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
            <Link to={"/directors"}>
                <IconContainer>
                    <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
                         role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                    </SVG>
                </IconContainer>
            </Link>
            <Link to={"/filming"}>
                <IconContainer>
                    <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video"
                         role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 576 512">
                        <path d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"/>
                    </SVG>
                </IconContainer>
            </Link>
            <Link to={"/theatres"}>
                <IconContainer>
                    <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ticket-alt"
                         role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 576 512">
                        <path d="M128 160h320v192H128V160zm400 96c0 26.51 21.49 48 48 48v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c26.51 0 48-21.49 48-48s-21.49-48-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v96c-26.51 0-48 21.49-48 48zm-48-104c0-13.255-10.745-24-24-24H120c-13.255 0-24 10.745-24 24v208c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V152z"/>
                    </SVG>
                </IconContainer>
            </Link>
            <Link to={"/oscars"}>
                <IconContainer>
                    <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                         className="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 576 512">
                        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
                    </SVG>
                </IconContainer>
            </Link>
            <Link to={"/login"}>
                <IconContainer>
                    <SVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key"
                         role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512">
                        <path d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"/>
                    </SVG>
                </IconContainer>
            </Link>
            {directorsPanel ? addButton : ''}
            {oscarsPanel ? oscarsAddButton : ''}
        </Wrapper>
    );
};

export default withRouter(SystemPanel);

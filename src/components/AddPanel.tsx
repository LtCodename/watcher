import React, {useState} from 'react';
import styled from "styled-components";
import { Col } from "../Layout";
import AdaptiveTextarea from "./AdaptiveTextarea";
import fire from "../fire";

const Wrapper = styled(Col)`
    background: #d63447;
    padding: 10px;
    height: 100vh;
    width: 200px;
`;

const DirectorColumn = styled(Col)`
    background: #d63447;
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
    const [addDirectorMode, setAddDirectorMode] = useState(false);

    const onAddDirector = () => {
        setAddDirectorMode(!addDirectorMode);
    };

    const addMenu = (
        <>
            <ActionButton onClick={onAddDirector} type={'button'}>
                Add Director
            </ActionButton>
            <ActionButton type={'button'}>
                Add Movie
            </ActionButton>
        </>
    );

    let directorReference: any;

    const SubmitDirector = () => {
        if (directorReference.state.directorName === '') {
            setAddDirectorMode(!addDirectorMode);
            return;
        } else {
            fire.firestore().collection('directors').add({
                name: directorReference.state.directorName
            }).then(() => {
                setAddDirectorMode(!addDirectorMode);
            });
        }
    };

    const addDirector = (
        <DirectorColumn>
            <AdaptiveTextarea ref={c => (directorReference = c)}/>
            <ActionButton type={'button'} onClick={SubmitDirector}>Submit</ActionButton>
        </DirectorColumn>
    );

    return (
        <Wrapper>
            {addDirectorMode ? addDirector : addMenu}
        </Wrapper>
    );
};

export default AddPanel;

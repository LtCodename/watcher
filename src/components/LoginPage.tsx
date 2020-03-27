import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import styled from "styled-components";
import fire from "../fire";
import { useDispatch, useStore } from "react-redux";
import { Col } from "./Layout";
import UserReducer from "../redux/UserReducer";
import SystemPanel from "./SystemPanel";

const MainRow = styled.div`
    justify-content: space-between;
    min-height: 100vh;
    display: flex;
    flex-flow: row;
    @media (max-width: 414px) {
        flex-flow: column;
	}
`;

const MainCol = styled(Col)`
    padding: 10px;
    width: 100%;
    align-items: center;
`;

const InputWrapper = styled(Col)`
    min-width: 250px;
`;

const Label = styled.label`
    text-align: center;
    color: #512b58;
    font-weight: 700;
    margin-bottom: 5px;
`;

const Input = styled.input`
    border-bottom: 3px solid #512b58;
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    ::-webkit-input-placeholder {
        color: #512b58;
    }
    margin-bottom: 10px;
`;

const AuthPanel = styled(Col)`
    align-items: center;
`;

const Button = styled.button`
    font-weight: 800;
    font-size: 17px;
    color: #512b58;
    outline: none;
    cursor: pointer;
    border: 3px solid #512b58;
    width: fit-content;
    padding: 2px 4px
`;

/*const AdminInput = styled.input`
`;

const AdminCol = styled(Col)`
    align-items: center;
`;*/

const LoginPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userData, setUserData] = useState('');
    //const [adminEmail, setAdminEmail] = useState('');

    const store = useStore();
    const storeState = store.getState();
    const user = storeState.user;

    const dispatch = useDispatch();

    useEffect(() => {
        setUserData(user);
    }, [user]);

    const inputValuesChange = (event: { target: { id: string; value: React.SetStateAction<string>; }; }) => {
        if (event.target.id === 'loginEmail') {
            setUserEmail(event.target.value);
        }
        if (event.target.id === 'loginPassword') {
            setUserPassword(event.target.value);
        }
    };

    const onLogin = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (userEmail === '' || userPassword === '') {
            return;
        }

        fire.auth().signInWithEmailAndPassword(userEmail, userPassword).then(credential => {
            setUserEmail('');
            setUserPassword('');
            setUserData('user');
        }).catch(error => {
            console.log(error.message);
        });
    };

    const onLogout = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        fire.auth().signOut().then(() => {
            setUserData('');
            dispatch({type: UserReducer.actions.USER_CLEAR});
        }).catch(error => {
            console.log(error.message);
        });
    };

    const logoutButton = (
        <Button onClick={onLogout}>Logout</Button>
    );

    const authPanel = (
        <AuthPanel>
            <InputWrapper>
                <Label htmlFor="loginEmail">Email Address</Label>
                <Input
                    className="form-control"
                    autoComplete="username email"
                    placeholder="Enter email"
                    type="email"
                    id="loginEmail"
                    value={userEmail}
                    onChange={inputValuesChange} required/>
            </InputWrapper>
            <InputWrapper>
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                    className="form-control"
                    autoComplete="current-password"
                    placeholder="Enter password"
                    type="password"
                    id="loginPassword"
                    value={userPassword}
                    onChange={inputValuesChange} required/>
            </InputWrapper>
            <Button onClick={onLogin}>Login</Button>
        </AuthPanel>
    );

    /*const adminValueChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setAdminEmail(event.target.value);
    };

    const onMakeAdmin = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const addAdminRole = fire.functions().httpsCallable('addAdminRole');
        addAdminRole({ email: adminEmail }).then(result => {
            console.log(result);
        })
    };

    const makeAdmin = (
        <form onSubmit={onMakeAdmin}>
            <AdminCol>
                <AdminInput
                    className="form-control"
                    autoComplete="username email"
                    placeholder="Enter email"
                    type="email"
                    value={adminEmail}
                    onChange={adminValueChange} required/>
                <button>Make Admin</button>
            </AdminCol>
        </form>
    );*/

    return (
        <MainRow>
            <MainCol>
                {/*{makeAdmin}*/}
                {userData.length === 0 ? authPanel : ""}
                {userData.length === 0 ? "" : logoutButton}
            </MainCol>
            <SystemPanel/>
        </MainRow>
    )
};

export default withRouter(LoginPage);

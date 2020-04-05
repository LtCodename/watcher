import React from 'react';
import styled from "styled-components";
import { Col } from "../Layout";
import { connect } from "react-redux";

const DirectorWrapper = styled(Col)`
    padding: 10px;
    margin: 0 5px;
    margin-bottom: 10px;
    color: #fff9de;;
    background: #0079c5;
    font-weight: 800;
    font-size: 25px;
    width: 200px;
    min-height: 125px;
    transition: all .2s;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    :hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    @media (max-width: 414px) {
        padding: 5px;
        font-size: 20px;
        width: 160px;
	}
`;

const Percent = styled.span`
    color: #fff9de;
    font-size: 25px;
    font-weight: 900;
    width: fit-content;
    padding: 5px;
    margin-top: 5px;
    @media (max-width: 414px) {
        font-size: 20px;
	}
`;

interface MyProps {
    directorData: any;
    movies: any;
}

interface MyState {
}

class Director extends React.Component <MyProps, MyState>  {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    render () {
        const moviesByDirector = this.props.movies.filter((elem:any) => {
            return elem.director === this.props.directorData.id;
        });
        const watched = moviesByDirector.filter((elem:any) => elem.watched);
        const percentage = ((watched.length * 100) / moviesByDirector.length) || 0;
        const percentageRounded = Number(Math.round(percentage));

        return (
            <DirectorWrapper>
                {this.props.directorData.name}
                <Percent>{`${percentageRounded}%`}</Percent>
            </DirectorWrapper>
        );
    }
}

const stateToProps = (state: any = {}) => {
    return {
        movies: state.movies,
    }
};

const DirectorConnected = connect(stateToProps, null)(Director);

export default DirectorConnected;

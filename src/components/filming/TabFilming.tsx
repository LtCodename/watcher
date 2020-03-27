import React from 'react';
import styled from "styled-components";
import { Col, Row } from '../Layout';
import SystemPanel from "../SystemPanel";
import FilmingAddPanel from "./FilmingAddPanel";
import { connect } from "react-redux";
import FilmingMovie from "./FilmingMovie";

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
`;

const Films = styled(Row)`
    flex-wrap: wrap;
`;

interface IMovie {
    director: string;
    year: number;
    name: string;
}

interface MyProps {
    filming: []
}

interface MyState {
}

class Filming extends React.Component <MyProps, MyState>  {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    render () {
        const moviesNode = this.props.filming.map((elem: IMovie, index: any) => {
                return (
                    <div key={index}>
                        <FilmingMovie
                            movieData={elem}/>
                    </div>
                )
            });

        return (
            <MainRow>
                <FilmingAddPanel/>
                <MainCol>
                    <Films>
                        {moviesNode}
                    </Films>
                </MainCol>
                <SystemPanel/>
            </MainRow>
        );
    }
}

const stateToProps = (state: any = {}) => {
    return {
        filming: state.filming,
    }
};

const FilmingConnected = connect(stateToProps, null)(Filming);

export default FilmingConnected;

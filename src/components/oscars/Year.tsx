import React from 'react';
import styled from "styled-components";
import { Col, Row } from "../Layout";
import { connect } from "react-redux";
import OscarMovie from "./OscarMovie";
import OscarMovies from "./OscarMovies";

const YearWrapper = styled(Col)`
    margin-right: 10px;
    padding: 10px;
    font-weight: 800;
    font-size: 25px;
    background: rgba(81, 43, 88, 0.5);
    transition: all .2s;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    margin-bottom: 10px;
    @media (max-width: 414px) {
        padding: 5px;
        font-size: 20px;
        width: 160px;
	}
`;

const UpperPart = styled(Col)`
    transition: all .2s;
    background: transparent;
    width: 200px;
`;

const NomineesButton = styled.button<{ percentage: number }>`
    color: #FFFFFF;
    background: ${props => (props.percentage === 100 ? '#527318' : '#d63447')};
    font-size: 20px;
    width: 100%;
    font-weight: 800;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin-top: 5px;
    color: #fff9de;
    :focus, :hover {
		outline: none;
	}
    @media (max-width: 414px) {
        font-size: 20px;
	}
`;

const MoviesWrapper = styled(Row)<{ opened: boolean }>`
    color: #FFFFFF;
    display: ${props => (props.opened ? 'block' : 'none')};
    background: transparent;
`;

const YearName = styled.span`
    color: #fff9de;
    background: #de7119;
    font-size: 20px;
    width: 100%;
    text-align: center;
    padding: 5px;
    margin-bottom: 5px;
`;

interface MyProps {
    yearData: any;
    movies: any;
}

interface MyState {
    opened: boolean;
}

class Year extends React.Component <MyProps, MyState>  {
    constructor(props: any) {
        super(props);

        this.state = {
            opened: false,
        };
    }

    onNominees = () => {
        if (this.state.opened)
        {
            this.setState({
                opened: false
            });
        } else {
            this.setState({
                opened: true
            });
        }
    };

    render () {
        const moviesByYear = this.props.movies.filter((elem:any) => {
            return (elem.year === this.props.yearData.id);
        });

        const nominees = moviesByYear.filter((elem:any) => {
            return (!elem.best);
        });

        const bestPicture = moviesByYear.find((elem:any) => {
            return (elem.best);
        });

        const watched = nominees.filter((elem:any) => elem.watched);
        const percentage = ((watched.length * 100) / nominees.length) || 0;
        const percentageRounded = Number(Math.round(percentage));

        const bestMovie = (
            <OscarMovie reduced={true} movieData={bestPicture}/>
        );

        const nomineesNode = (
            <OscarMovies yearId={this.props.yearData.id} movies={[]}/>
        );

        return (
            <YearWrapper>
                <UpperPart>
                    <YearName>{this.props.yearData.name}</YearName>
                    {moviesByYear.length ? bestMovie : ''}
                    <NomineesButton
                        percentage={percentageRounded}
                        type={'button'}
                        onClick={this.onNominees}>
                        {`${percentageRounded}%`}
                    </NomineesButton>
                </UpperPart>
                <MoviesWrapper
                    opened={this.state.opened}>
                    {moviesByYear.length ? nomineesNode : ''}
                </MoviesWrapper>
            </YearWrapper>
        );
    }
}

const stateToProps = (state: any = {}) => {
    return {
        movies: state.oscarMovies,
    }
};

const YearConnected = connect(stateToProps, null)(Year);

export default YearConnected;

import React from 'react';
import styled from "styled-components";
import { useStore } from "react-redux";
import { Col } from "../Layout";
import TheatreMovie from "./TheatreMovie";

const MonthItem = styled(Col)`
    text-align: center;
    margin: 0 5px 5px 0;
    width: 200px;
    @media (max-width: 414px) {
        width: auto;
        min-width: 160px;
	}
`;

const MonthName = styled.span`
    color: #FFFFFF;
    background: #3b6978;
    font-size: 20px;
    font-weight: 600;
    padding: 5px;
`;

interface IMonth {
    month: number;
    year: number;
    name: string;
}

const Month: React.FC<IMonth> = (
    { month, name, year },
) => {
    const store = useStore();
    const storeState = store.getState();
    const theaters = storeState.theaters;

    const movies = (
        theaters.filter((elem: any) => (elem.month === month && elem.year === year)).map((movie: any, index: number) => {
            return (
                <TheatreMovie key={index} movieData={movie}/>
            )
        })
    );

    return (
        <MonthItem>
            <MonthName>{name}</MonthName>
            {movies}
        </MonthItem>
    );
};

export default Month;

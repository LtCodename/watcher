import React, { Component } from "react";
import autosize from "autosize";
import styled from "styled-components";

const Textarea = styled.textarea`
    font-size: 20px;
    font-weight: 500;
    font-size: 20px;
    font-weight: 500;
    border: none;
    background: #d63447;
    width: 100%;
    resize: none;
    outline: none;
    color: #fff9de;
    font-weight: 600;
    margin-bottom: 10px;
    ::-webkit-input-placeholder {
      color: #fff9de;
    }
`;

type TweetState = {
    textData: ''
}

export class AdaptiveTextarea extends Component<{}, TweetState> {
    private textarea: any;

    componentWillMount() {
        this.setState({
            textData: ''
        });
    }

    componentDidMount() {
        this.textarea.focus();
        autosize(this.textarea);
    }

    inputValuesChange = (event: { target: { value: any; }; }) => {
        this.setState({
            textData: event.target.value
        });
    };

    render() {
        return (
            <Textarea
                ref={c => (this.textarea = c)}
                placeholder={'Enter Name'}
                value={this.state.textData}
                onChange={this.inputValuesChange}
                required>
            </Textarea>
        );
    }
}

export default AdaptiveTextarea;

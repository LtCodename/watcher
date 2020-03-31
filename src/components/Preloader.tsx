import React from 'react';
import styled, {keyframes} from "styled-components";

const LoaderWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    position: relative;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
    border: 16px solid #512b58;/* Bigger Part */
    border-top: 16px solid #de7119;/* Smaller part */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: ${spin} 2s linear infinite;
`;

const PreloaderContent = styled.div`
    height: 100vh;
    background-color: #000000;
`;

const Preloader = () => {
    const preloader = (
        <LoaderWrapper>
            <Loader/>
        </LoaderWrapper>
    );

    return (
        <div>
            <PreloaderContent >
                {preloader}
            </PreloaderContent>
        </div>
    );
};

export default Preloader;

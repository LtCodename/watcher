import styled from 'styled-components';

const get = (key: any) => (obj: any) => obj[key];

interface IFlowProps {
    align?: 'center'
        | 'start'
        | 'end'
        | 'stretch'
        | 'safe'
        | 'unsafe';
    justify?:
        'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | 'stretch'
        | 'safe'
        | 'unsafe';
    grow?: number;
    shrink?: number;
}

const FlowComponent = styled.div<IFlowProps>`
  display: flex;
  align-items: ${get('align')};
  justify-content: ${get('justify')};
  flex-grow: ${get('grow')};
  flex-shrink: ${get('shrink')};
`;

export const Row = styled(FlowComponent)`
  flex-flow: row;
`;

export const Col = styled(FlowComponent)`
  flex-flow: column;
`;

import React from 'react'
import styled from 'styled-components';

type OwnPropsType = {
    refresh: Function
}

const Wrap = styled.div`
    margin-top: 30%;
    text-align: center;
    color: ${props => props.theme.mode === "dark" ? '#fff' : '#474B59'};
    font-size: 24px;
    
  
    
    & svg{
       color: #0078D4;
       font-size: 100px; 
       margin-top: 10px;
    }
`

export const NetworkError: React.FC<OwnPropsType> = ({refresh}) =>
    (<Wrap>
        <div>
            Something wrong.
        </div>
        <div>
            Click to try again
        </div>
        <div>
            <i className="fas fa-sad-tear"></i>
        </div>
    </Wrap>)
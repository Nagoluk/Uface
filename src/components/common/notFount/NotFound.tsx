import React from 'react';
import { FrownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Wrap = styled.div`
    text-align: center;
    padding-top: 50px;
    color: #2B5278;
    
    & svg {
        font-size: 7em;
    }
    
    & p {
        margin-top: 10px;
    }
`

export const NotFound = () => {
    return (
        <Wrap>
            <FrownOutlined />
            <p>Not found any user</p>
        </Wrap>
    );
};



import React from 'react'
import styled from 'styled-components';
import {SyncOutlined} from '@ant-design/icons';
import {Button} from 'antd';

type OwnPropsType = {
    refresh: Function
}

const Wrap = styled.div`
    margin-top: 30%;
    text-align: center;
    color: ${props => props.theme.mode === 'dark' ? '#fff' : '#000'};
    font-size: 16px;
    
    & svg{
       color: #2B5278;
       font-size: 40px; 
       margin: 10px 0px;
    }
`

export const NetworkError: React.FC<OwnPropsType> = ({refresh}) =>
    (<Wrap>
        <div>
            <SyncOutlined />
        </div>
        <p>Cannot load page</p>

        <Button size={'large'} onClick={() => refresh()}>Refresh</Button>
    </Wrap>)
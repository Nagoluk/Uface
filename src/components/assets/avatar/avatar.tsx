import React from 'react';
import styled from 'styled-components';
import AvatarImg from '../../../img/Profile/avatar.png';

type avatarTypes = {
    link: string | null,
    size: number,
}

const AvatarStyled = styled.div<avatarTypes>`
    border-radius: 50%;
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    background: url('${props => props.link ? props.link : AvatarImg}');
    background-size: cover;
    display: inline-block;
    margin: 0px 10px;
    border: ${props => (props.theme.mode === 'dark' ? '1px solid #2B2B2B' : '1px solid lightgray;')};
`

export const Avatar: React.FC<avatarTypes> = ({link, size}) => (<AvatarStyled link={link} size={size}/>)
import React from 'react';
import UsersStlyes from './Users.module.css';
import AvatarImg from '../../img/Profile/avatar.png';
import AvatarBlack from '../../img/Profile/avatarBlack.png';
import {NavLink} from 'react-router-dom';
import {UserItemStyled} from '../../styles/theme';
import {Avatar} from '../assets/avatar/avatar';

import {UserT} from '../../interfaces/users-interfaces';
import {useSelector} from 'react-redux';
import {getIsBlackSelector} from '../../redux-state/selectors/app-selectors';


type PropsType = {
    index: number,
    user: UserT,
    followProcess: Array<number>,
    unfollowThunkCreator: (userID: number) => void,
    followThunkCreator: (userID: number) => void,
    t: (key: string) => string
}

let User: React.FC<PropsType> = props => {
    const isBlack = useSelector(getIsBlackSelector)

    return (<UserItemStyled className={UsersStlyes.item} key={props.index.toString()}>
        <div className={UsersStlyes.header}>
            <Avatar size={100} link={(props.user.photos.small !== null) ? props.user.photos.small : (isBlack ? AvatarBlack: AvatarImg)}/>
        </div>

        <div className={UsersStlyes.content}>
            <div className={UsersStlyes.name}>
                <NavLink to={'/profile/' + props.user.id}><h2>{props.user.name}</h2></NavLink>
            </div>

            <div className={UsersStlyes.status}>{props.user.status || 'no status'}</div>
        </div>

        <div className={UsersStlyes.buttons}>
            {props.user.followed ?
                <button disabled={props.followProcess.some(item => item === props.user.id)}
                        className={'unfollow'}
                        onClick={() => {
                            props.unfollowThunkCreator(props.user.id)
                        }}>{props.t('users.unfollow')}</button> :
                <button disabled={props.followProcess.some(item => item === props.user.id)}
                        onClick={() => {
                            props.followThunkCreator(props.user.id)
                        }}>{props.t('users.follow')}</button>
            }
        </div>
    </UserItemStyled>)
}


export default User;
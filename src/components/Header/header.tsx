import React from 'react';
import headermod from './header.module.css';
import {NavLink} from 'react-router-dom';
import SearchContainer from './Search/SearchContainer';
import {SwitchButton} from '../Nav/adaptiveNav';
import Nav from '../Nav/nav';
import {Avatar} from '../assets/avatar/avatar';
import {VerticalAlign} from '../../styles/vertical.align';
import {HeaderStyle} from '../../styles/theme';

import {useDispatch, useSelector} from 'react-redux';
import {
    getIsLoginedSelector,
    getLoginSelector,
    getMyProfileSelector
} from '../../redux-state/selectors/login-selectors';
import {getIsBlackSelector} from '../../redux-state/selectors/app-selectors';
import {getNewMessagesCountSelector} from '../../redux-state/selectors/notification-selector';
import {logout} from '../../redux-state/loginReducer';
import {actionsApp} from '../../redux-state/appReducer';
import {useTranslation} from 'react-i18next';


//todo: fdsf

const Header: React.FC = () => {
    const login = useSelector(getLoginSelector)
    const black = useSelector(getIsBlackSelector)
    const isLogined = useSelector(getIsLoginedSelector)
    const profile = useSelector(getMyProfileSelector)
    const newMessageCount = useSelector(getNewMessagesCountSelector)

    //Dispatch hooks

    const dispatch = useDispatch()

    return (<header className={headermod.Header}>
        <HeaderStyle>
            <div className={headermod.headerWrap}>
                <div className={headermod.leftside}>
                    <NavLink to="/"><h1><i className="fas fa-dragon"></i>Uface</h1></NavLink>
                    <div style={{'marginTop': '5px'}}>
                        {black && <SwitchButton onClick={() => dispatch(actionsApp.ChangeThemeAC())}>
                            <i className="far fa-moon"></i>
                        </SwitchButton>}

                        {!black && <SwitchButton onClick={() => dispatch(actionsApp.ChangeThemeAC())}>
                            <i className="fas fa-sun"></i>
                        </SwitchButton>}
                    </div>

                    <Nav/>
                </div>

                <div className={headermod.rightside}>

                    <div className={headermod.note + ' ' + headermod.hide}>
                        <i className="fas fa-bell"></i>
                    </div>

                    <h3>{isLogined ?
                        <VerticalAlign>{login}<Avatar link={profile ? profile.photos.small : null}
                                                      size={30}/></VerticalAlign> :
                        <NavLink exact={true} to="/login">Please sign in</NavLink>}</h3>

                    {isLogined && <div className={headermod.note + ' ' + headermod.logout} onClick={() => {
                        dispatch(logout());
                    }}>
                        <i className="fas fa-power-off" title={'logout'}></i>
                    </div>}
                </div>
            </div>
        </HeaderStyle>
    </header>);
}

export default Header;
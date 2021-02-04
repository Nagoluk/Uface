import React, {useEffect} from 'react';
import 'antd/dist/antd.css'
import './App.css';
import UsersContainer from './components/Users/UsersContainer';
import {Redirect, Route, Switch} from 'react-router-dom';

import Login from './components/Login/Login';
import {useDispatch, useSelector} from 'react-redux';
import {initializeApp} from './redux-state/appReducer';
import Preloader from './components/assets/preloader/Preloader';
import NotFound from './components/404/notFound';
import {getNewMessageCountThunkCreator} from './redux-state/notificationReducer';
import Search from './components/Header/Search/SearchContainer';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import {AdaptiveMenu} from './components/Nav/adaptiveNav';
//import Dialogs from "./components/Dialogs";
import {NetworkError} from './components/common/NetworkError/NetworkError';
import Header from './components/Header/header';

import Setting from './components/Setting/setting';
import {getInitializedSelector, getIsBlackSelector} from './redux-state/selectors/app-selectors';
import Profile from './components/Profile/profile';


type themeType = {
    theme: {
        mode: string
    }
}

const GlobalStyle = createGlobalStyle<themeType>`
  body {
    background: ${props => (props.theme.mode === 'dark' ? '#3C3F41' : '#E7EBF0')};
  }
`

const App = () => {
    const dispatch = useDispatch()
    const initialized = useSelector(getInitializedSelector)
    const isBlackTheme = useSelector(getIsBlackSelector)

    useEffect(() => {
        dispatch(initializeApp())
        dispatch(getNewMessageCountThunkCreator())
    }, [])


    if (!initialized) {
        return <Preloader/>
    }

    return (
        <ThemeProvider theme={{mode: isBlackTheme ? 'dark' : 'light'}}>
            <div className="render">
                <GlobalStyle/>
                <Header/>

                <div className="main-wrap">
                    <AdaptiveMenu/>

                    <main>
                        <React.Suspense fallback={<Preloader/>}>
                            <Switch>
                                <Route path="/dialogs/:userID?"
                                       render={() => <NetworkError refresh={() => alert('work')}/>}/>
                                <Route path="/setting" render={() => <Setting/>}/>
                                <Route path="/profile/:userID?" render={() => <Profile/>}/>
                                <Route path="/friends" render={() => <UsersContainer/>}/>
                                <Route path="/login" render={() => <Login/>}/>
                                <Route path="/search" render={() => <Search/>}/>
                                <Redirect exact from="/" to="/profile"/>
                                <Route render={() => <NotFound/>}/>
                            </Switch>
                        </React.Suspense>
                    </main>
                </div>
            </div>
        </ThemeProvider>);
}
export default App
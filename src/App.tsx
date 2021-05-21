import React, {useEffect} from 'react';


import {Redirect, Route, Switch} from 'react-router-dom';

import Login from './components/Login/Login';
import {useDispatch, useSelector} from 'react-redux';
import {initializeApp} from './redux-state/appReducer';
import Preloader from './components/assets/preloader/Preloader';
import NotFound from './components/404/notFound';
import {getNewMessageCountThunkCreator} from './redux-state/notificationReducer';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import {AdaptiveMenu} from './components/Nav/adaptiveNav';
//import Dialogs from "./components/Dialogs";

import Header from './components/Header/header';

import Setting from './components/Setting/setting';
import {getInitializedSelector, getIsBlackSelector} from './redux-state/selectors/app-selectors';
import Profile from './components/Profile/profile';
import Users from './components/Users/Users';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {resources} from './localization';
import DialogContainer from './components/Dialogs/Dialog/DialogContainer';



i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: resources,
        lng: "eng",
        fallbackLng: "eng",

        interpolation: {
            escapeValue: false
        }
    });




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
                <AdaptiveMenu/>

                <React.Suspense fallback={<Preloader/>}>
                    <Switch>
                        <Route path="/login" exact render={() => <Login/>}/>
                        <div className="main-wrap">
                            <main>
                                <Route path="/dialogs/:userID?"
                                       render={() => <DialogContainer/>}/>
                                <Route path="/setting" render={() => <Setting/>}/>
                                <Route path="/profile/:userID?" render={() => <Profile/>}/>
                                <Route path="/friends" render={() => <Users/>}/>
                                <Redirect exact from="/" to="/profile"/>
                                {/*<Route render={() => <NotFound/>}/>*/}
                            </main>
                        </div>
                    </Switch>
                </React.Suspense>
            </div>
        </ThemeProvider>);
}
export default App
import React from 'react';
import './App.css';
import UsersContainer from './components/Users/UsersContainer';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';

import ProfileContainer from './components/Profile/profileContainer';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {loginThunkCreator, logout} from './redux-state/loginReducer';
import {actionsApp, initializeApp} from './redux-state/appReducer';
import Preloader from './components/assets/preloader/Preloader';
import NotFound from './components/404/notFound';
import {compose} from 'redux';
import {getNewMessageCountThunkCreator} from './redux-state/notificationReducer';
import Search from './components/Header/Search/SearchContainer';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import {AdaptiveMenu} from './components/Nav/adaptiveNav';
//import Dialogs from "./components/Dialogs";
import {NetworkError} from './components/common/NetworkError/NetworkError';
import Header from './components/Header/header';

//const SettingContainer = React.lazy(() => import('./components/Setting/settingContainer'));


const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => (props.theme.mode === 'dark' ? '#3C3F41' : '#E7EBF0')};
  }
`

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
        this.props.getNewMessageCountThunkCreator()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <ThemeProvider theme={{mode: this.props.isBlackTheme ? 'dark' : 'light'}}>
                <div className="render">
                    <GlobalStyle/>
                    <Header/>

                    <div className="main-wrap">
                        <AdaptiveMenu black={this.props.isBlackTheme}
                                      ChangeThemeAC={this.props.ChangeThemeAC}
                                      isLogined={this.props.isLogined}
                                      logout={this.props.logout} newMessageCount={this.props.newMessageCount}/>

                        <main>
                            <React.Suspense fallback={<Preloader/>}>
                                <Switch>
                                    <Route path="/dialogs/:userID?"
                                           render={() => <NetworkError refresh={() => alert('work')}/>}/>
                                    {/*<Route path="/setting" render={() => <SettingContainer/>}/>*/}
                                    <Route path="/profile/:userID?" render={() => <ProfileContainer/>}/>
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
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    isBlackTheme: state.app.blackTheme,
    isLogined: state.LoginReducer.isLogined,
    newMessageCount: state.notification.newMessageCount
});

export default compose(connect(mapStateToProps, {
        loginThunkCreator,
        initializeApp,
        getNewMessageCountThunkCreator,
        logout, ...actionsApp
    }),
    withRouter)(App)



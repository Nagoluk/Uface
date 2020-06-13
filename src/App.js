import React from 'react';
import './App.css';
import UsersContainer from "./components/Users/UsersContainer";
import Nav from "./components/Nav/nav";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/headerContainer";
import ProfileContainer from "./components/Profile/profileContainer";
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {loginThunkCreator} from "./Redux/loginReducer";
import {initializeApp} from "./Redux/appReducer";
import Preloader from './components/assets/preloader/Preloader';
import NotFound from "./components/404/notFound";
import {compose} from "redux";
import DialogContainer from "./components/Dialogs/Dialog/DialogContainer";
import {getNewMessageCountThunkCreator} from "./Redux/notificationReducer";
import Search from "./components/Header/Search/SearchContainer";
import styled, {createGlobalStyle} from "styled-components";
const DialogsListContainer = React.lazy(()=> import("./components/Dialogs/DialogList/DialogsListContainer"));
const SettingContainer = React.lazy(() => import("./components/Setting/settingContainer"));


const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => (props.black ? '#3C3F41' : '#E7EBF0')};
    transition: background .2s ease-in;
 
  }
`

class App extends React.Component {
    componentDidMount() {
       this.props.initializeApp()
        this.props.getNewMessageCountThunkCreator()
    }

    render() {

        if(!this.props.initialized){
            return <Preloader/>
        }

        return (
            <div className="render">
                <GlobalStyle black={this.props.isBlackTheme}/>
                <HeaderContainer black={this.props.isBlackTheme} />

                <div className="main-wrap">
                    <Nav black={this.props.isBlackTheme}/>

                    <main>
                        <React.Suspense fallback={<Preloader/>}>
                            <Switch>
                                <Route exact path="/dialogs/:userID" render={() => <DialogContainer black={this.props.isBlackTheme}/>}/>
                                <Route path="/dialogs/" render={() => <DialogsListContainer black={this.props.isBlackTheme}/>}/>
                                <Route path="/setting" render={() => <SettingContainer black={this.props.isBlackTheme}/>}/>
                                <Route path="/profile/:userID?" render={() => <ProfileContainer black={this.props.isBlackTheme}/>}/>
                                <Route path="/friends" render={() => <UsersContainer black={this.props.isBlackTheme}/>}/>
                                <Route path="/login" render={() => <Login black={this.props.isBlackTheme} black={this.props.isBlackTheme}/>}/>
                                <Route path="/search" render={() => <Search black={this.props.isBlackTheme}/>}/>
                                <Redirect exact from="/" to="/profile"/>
                                <Route render={()=> <NotFound/>}/>
                            </Switch>
                        </React.Suspense>
                    </main>
                </div>
            </div>);
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    isBlackTheme: state.app.blackTheme
});

export default compose(
                    connect(mapStateToProps, {loginThunkCreator, initializeApp, getNewMessageCountThunkCreator}),
                    withRouter)(App)



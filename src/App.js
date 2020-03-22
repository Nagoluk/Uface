import React from 'react';
import './App.css';
import UsersContainer from "./components/Users/UsersContainer";
import Nav from "./components/Nav/nav";
import Footer from "./components/Footer/footer";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/headerContainer";
import ProfileContainer from "./components/Profile/profileContainer";
import SettingContainer from "./components/Setting/setting";
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {loginThunkCreator} from "./Redux/loginReducer";
import {initializeApp} from "./Redux/appReducer";
import Preloader from './components/assets/preloader/Preloader';
import NotFound from "./components/404/notFound";
import {compose} from "redux";
const DialogsContainer = React.lazy(()=> import("./components/Dialogs/DialogsContainer"));

class App extends React.Component {
    componentDidMount() {
       this.props.initializeApp()
    }

    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }

        return (
            <div className="render">
                <HeaderContainer/>

                <div className="main-wrap">
                    <Nav/>

                    <main>
                        <React.Suspense fallback={"Hello"}>
                            <Switch>
                                <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                                <Route path="/profile/:userID?" render={() => <ProfileContainer/>}/>
                                <Route path="/friends" render={() => <UsersContainer/>}/>
                                <Route path="/setting" render={() => <SettingContainer/>}/>
                                <Route path="/login" render={() => <Login/>}/>
                                <Redirect exact from="/" to="/profile"/>
                                <Route render={()=> <NotFound/>}/>
                            </Switch>
                        </React.Suspense>
                    </main>
                </div>

                <Footer/>
            </div>);
    }
}

const mapStateToProps = (state) => ({initialized: state.app.initialized});

export default compose(
                    connect(mapStateToProps, {loginThunkCreator, initializeApp}),
                    withRouter)(App)



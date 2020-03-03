import React from 'react';
import './App.css';
import UsersContainer from "./components/Users/UsersContainer"
import Nav from "./components/Nav/nav";
import Footer from "./components/Footer/footer";
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/headerContainer";
import ProfileContainer from "./components/Profile/profileContainer";
import SettingContainer from "./components/Setting/setting";
import Login from './components/Login/Login';




const App = (props) => {

    return (
            <div className="render">
                <HeaderContainer/>

                <div className="main-wrap">

                        <Nav/>
                        <main>
                            <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                            <Route path="/profile/:userID?" render={() => <ProfileContainer/>}/>
                            <Route path="/friends" render={() => <UsersContainer/>}/>
                            <Route path="/setting" render={() => <SettingContainer />}/>
                            <Route path="/login" render={()=><Login/>}/>
                        </main>

                </div>

                <Footer/>
            </div>);
}


export default App;

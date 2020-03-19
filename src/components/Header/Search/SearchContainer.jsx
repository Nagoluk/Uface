import React from 'react';
import headermod from "../header.module.css";
import Search from "./Search";
import {connect} from "react-redux";
import {searchingThunkCreator} from "../../../Redux/usersReducer";
import {getProfileThunkCreator} from "../../../Redux/profileReducer";

class HeaderContainer extends React.Component{
    render() {
        return (<Search
            results={this.props.results}
            searchingThunkCreator={this.props.searchingThunkCreator}
        />)
    }
}

let mapStateToProps = state => {
    return {
        results: state.UsersReducer.foundedUsers
    }
}

export default connect(mapStateToProps, {searchingThunkCreator, getProfileThunkCreator})(HeaderContainer);
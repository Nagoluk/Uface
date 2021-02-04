import React from 'react';
import Search from "./Search";
import {connect} from "react-redux";
import {searchingThunkCreator} from "../../../redux-state/usersReducer";
import {getProfileThunkCreator} from "../../../redux-state/profileReducer";
import { UserT } from '../../../interfaces/users-interfaces';
import {AppStateType} from '../../../redux-state/stateRedux';


export type ownPropsSearch = {
    results: UserT[],
    searchingThunkCreator: (name: string) => void
}
class HeaderContainer extends React.Component<ownPropsSearch>{
    render() {
        return (<Search
            results={this.props.results}
            searchingThunkCreator={this.props.searchingThunkCreator}
        />)
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        results: state.UsersReducer.foundedUsers
    }
}

export default connect(mapStateToProps, {searchingThunkCreator, getProfileThunkCreator})(HeaderContainer);
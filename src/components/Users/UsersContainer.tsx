import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Users from "./Users";
import {
    followThunkCreator, unfollowThunkCreator,setUsersThunkCreator,
    UsersActions,
} from "../../redux-state/usersReducer";

import Preloader from "../assets/preloader/Preloader";
import {
    getUsersSuperSelector,
    getPageSizeSelector,
    getTototalUsersCountSelector,
    getCurrentPageSelector,
    getIsFetchingSelector,
    getFollowProccesSelector, getPagePagitator
} from "../../redux-state/selectors/usersSelectors";
import {AppStateType} from "../../redux-state/stateRedux";
import {UserT} from "../../interfaces/users-interfaces";

type MapStateToPropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    pagePagitator: number,
    users: Array<UserT>,
    followProcess: Array<number>,

}

type MapDispatchToPropsType = {
    setUsersThunkCreator: (currentPage: number, pageSize: number) => void,
    followThunkCreator: (userID: number) => void,
    unfollowThunkCreator: (userID: number) => void,


    setCurrentPagePagitator: (a: number) => void,
    toggleFollowProcessing: (a: number, b: boolean) => void,

    setUsers: (list: Array<UserT>) => void,
    setTotalCount: (a: number) => void,
    setCurrentPage: (a: number) => void



}

type OwnToPropsType = {
    black: boolean
}


type StateTypes = {
    screenWidth: number,
}

type PropsTypes = MapDispatchToPropsType & MapStateToPropsType & OwnToPropsType;

class userAPIcomponent extends React.Component<PropsTypes, StateTypes> {
    constructor(props: PropsTypes) {
        super(props);
        // Не вызывайте здесь this.setState()!
        this.state = { screenWidth: window.innerWidth };

    }


    componentDidMount() {
        document.title = "Users";
        window.addEventListener(`resize`, (event: any) => {

            if(event.currentTarget.innerWidth <= 635 && this.state.screenWidth >= 635){
                this.setState({screenWidth: event.currentTarget.innerWidth});
            }

            if(event.currentTarget.innerWidth > 635 && this.state.screenWidth < 635){
                this.setState({screenWidth: event.currentTarget.innerWidth});
            }

        }, false);
        this.props.setUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', ()=> {})
    }

    onPageChange = (p: number) => {
        this.props.setUsersThunkCreator(p, this.props.pageSize);
    }

    render() {

        return <>
            {this.props.isFetching ?  <Preloader/> :
            <Users currentPage={this.props.currentPage}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   onPageChange={this.onPageChange}
                   users={this.props.users}
                   followThunkCreator={this.props.followThunkCreator}
                   unfollowThunkCreator={this.props.unfollowThunkCreator}
                   followProcess = {this.props.followProcess}
                   toggleFollowProcessing = {this.props.toggleFollowProcessing}
                   setCurrentPagePagitator = {this.props.setCurrentPagePagitator}
                   pagePagitator = {this.props.pagePagitator}
                   windowsWidth={this.state.screenWidth}
                   black={this.props.black}
                   />}
                </>
    }
}


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTototalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followProcess: getFollowProccesSelector(state),
        pagePagitator: getPagePagitator(state)
    }
}

let {setUsers, setCurrentPage,
    setTotalCount, ToggleFetching, toggleFollowProcessing, setCurrentPagePagitator} = UsersActions

let Dispatch = {
    followThunkCreator, unfollowThunkCreator, setUsers, setCurrentPage,
    setTotalCount,ToggleFetching, toggleFollowProcessing,
    setUsersThunkCreator, setCurrentPagePagitator
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnToPropsType, AppStateType>(mapStateToProps, Dispatch))(userAPIcomponent);
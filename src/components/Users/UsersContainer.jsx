import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Users from "./Users";
import {
    followThunkCreator,
    setCurrentPage,
    setTotalCount,
    setUsers,
    ToggleFetching,
    unfollowThunkCreator,
    toggleFollowProcessing,
    setUsersThunkCreator, setCurrentPagePagitator
} from "../../Redux/usersReducer";

import LoginHoc from "../../hoc/loginHoc";
import Preloader from "../assets/preloader/Preloader";
import {
    getUsersSuperSelector,
    getPageSizeSelector,
    getTototalUsersCountSelector,
    getCurrentPageSelector,
    getIsFetchingSelector,
    getFollowProccesSelector,
    getIsLoginedSelector, getPagePagitator
} from "../../Redux/usersSelectors";


class userAPIcomponent extends React.Component {
    componentDidMount() {
        this.props.setUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChange = (p) => {
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
                   followProcces = {this.props.followProcces}
                   toggleFollowProcessing = {this.props.toggleFollowProcessing}
                   setCurrentPagePagitator = {this.props.setCurrentPagePagitator}
                   pagePagitator = {this.props.pagePagitator}
                   />}
                </>
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.UsersReducer.users,
//         pageSize: state.UsersReducer.pageSize,
//         totalUsersCount: state.UsersReducer.totalUsersCount,
//         currentPage: state.UsersReducer.currentPage,
//         isFetching: state.UsersReducer.isFetching,
//         followProcces: state.UsersReducer.followProcces,
//         isLogined: state.LoginReducer.isLogined,
//     }
// }


let mapStateToProps = (state) => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTototalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followProcces: getFollowProccesSelector(state),
        isLogined: getIsLoginedSelector(state),
        pagePagitator: getPagePagitator(state)
    }
}



let Dispatch = {
    followThunkCreator, unfollowThunkCreator, setUsers, setCurrentPage, 
    setTotalCount,ToggleFetching, toggleFollowProcessing,
    setUsersThunkCreator, setCurrentPagePagitator
}

export default compose(
    connect(mapStateToProps, Dispatch),
    LoginHoc)(userAPIcomponent);
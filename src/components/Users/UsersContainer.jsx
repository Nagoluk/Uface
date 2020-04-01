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
    setUsersThunkCreator, setCurrentPagePagitator,
} from "../../Redux/usersReducer";

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
        this.screenWidth = window.innerWidth;
        document.title = "Users";
        window.addEventListener(`resize`, event => {

            if(event.currentTarget.innerWidth <= 635 && this.screenWidth >= 635){
                this.screenWidth = event.currentTarget.innerWidth;
                this.forceUpdate()

            }

            if(event.currentTarget.innerWidth > 635 && this.screenWidth < 635){
                this.screenWidth = event.currentTarget.innerWidth;
                this.forceUpdate();
            }

        }, false);
        this.props.setUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', ()=> {})
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
                   windowsWidth={this.screenWidth}
                   setPageSize={this.props.setPageSize}
                   />}
                </>
    }
}


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
    connect(mapStateToProps, Dispatch))(userAPIcomponent);
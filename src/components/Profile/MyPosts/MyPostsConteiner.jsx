

import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addNewPostAC} from "../../../Redux/profileReducer";


let mapStateToProps = (state) => {
    return {
        ProfilePage: state.ProfilePage,
        Lang: state.SetLang

    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         addSymbols: (text)=>{

//            dispatch(newSymbolAC(text));
//         },
//         addNewPost: ()=>{
//                 //dispatch(createActionPost());
//         }
//     }
// }


let MyPostsContainer = connect(mapStateToProps, {addNewPostAC})(MyPosts);

export default MyPostsContainer;
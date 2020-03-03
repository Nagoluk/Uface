

import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {newSymbolAC} from "../../../Redux/profileReducer";


let mapStateToProps = (state) => {
    console.log(state);
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


let MyPostsContainer = connect(mapStateToProps, {newSymbolAC})(MyPosts);

export default MyPostsContainer;
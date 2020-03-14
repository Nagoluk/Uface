import React from "react";
import MyPost from "./MyPosts.module.css";
import Post from "./post/post";
import { Field, reduxForm } from "redux-form";
import {required, maxSymbols} from "../../../utils/validators/validators";
import {Input} from "../../common/formControls/FormControls";


const maxSymbol30 = maxSymbols(30);


const PostInputForm = props => {
    return (<form className={MyPost.newpost} onSubmit={props.handleSubmit}>
                <Field 
                id="post" 
                type="text"
                placeholder={"Що у вас нового"} 
                component={Input} 
                name={"newPostText"} 
                validate={[required, maxSymbol30]}/>


                <div className="createnewpost">
                    <button className={MyPost.button} disabled={true}><i className="fas fa-photo-video"></i></button>
                    <button className={MyPost.button} disabled={true}><i className="fas fa-headphones-alt"></i></button>
                    <button className={MyPost.button + " " + MyPost.send}> <i className="fas fa-paper-plane"></i></button>
                </div>
            </form>)
}

let ReduxFormPostInput = reduxForm({
    form: "posts",
})(PostInputForm)


const MyPosts = (props) => {
   

    let addNewPost = (data)=> {
        props.addNewPostAC(data.newPostText)
    }

    let PostsElements = props.ProfilePage.PostsData.map((currentValue, index) => <Post key={index.toString()}message={currentValue.content} likes={currentValue.likes} rep={currentValue.rep} comm={currentValue.comm} dataSend={currentValue.dataSend}/>)
    return (
        <div className={MyPost.myposts}>
            <div className="postwrap">
                <div>
                    <ReduxFormPostInput onSubmit={addNewPost}/>
                </div>

                <div className="news">

                    {PostsElements}

                </div>
            </div>

        </div>
    );
}



export default MyPosts;
import React, {useState} from "react";
import MyPost from "./MyPosts.module.css";
import Post from "./post/post";
import TextareaAutosize from 'react-textarea-autosize';
import styled from "styled-components";

const ProfileItemStyled = styled.div`
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
    color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    border: ${props => (props.black ? "1px solid #2B2B2B" : "1px solid lightgray;")};
    transition: all .2s ease-in;
    
    & textarea {
        background:  ${props => (props.black ? '#3C3F41' : '#fff')};
        color:  ${props => (props.black ? '#fff' : '#000')};
        margin-bottom: 10px;
        transition: all .2s ease-in;
    }
`




const MyPosts = (props) => {

    let [value, changeVal] = useState("");
    let [isDisabled, changeDisabled] = useState(true);
    let [symbols, setSymbols] = useState(0);

    let addNewPost = (data)=> {
        if(value !== ""){
            changeVal("");
            changeDisabled(true);
            props.addNewPostAC(value)
            setSymbols(0)
        }
    }

    let postHandler = (e) => {
        changeVal(e.target.value);
        setSymbols(e.target.value.length)

        if(e.target.value !== "") {
            changeDisabled(false)
        }else {
            changeDisabled(true)
        }
    }

    let PostsElements = props.ProfilePage.PostsData.map((currentValue, index) => <Post key={index.toString()}
                                                                                       message={currentValue.content} 
                                                                                       likes={currentValue.likes} 
                                                                                       rep={currentValue.rep} 
                                                                                       comm={currentValue.comm}
                                                                                       dataSend={currentValue.dataSend}
                                                                                       name={props.ProfilePage.profile.fullName}
                                                                                       photos={props.ProfilePage.profile.photos}
                                                                                       black={props.black}
                                                                                    />).reverse()
    return (
        <div className={MyPost.myposts}>
            <div className="postwrap">
                <ProfileItemStyled className={MyPost.newpost} black={props.black}>
                    <TextareaAutosize value={value} onChange={postHandler} placeholder={"Create new post!"} autoComplete={"off"} wrap={"hard"}/>
                    <div className={MyPost.createnewpost}>
                        <span>Symbols: {symbols}</span>
                        <div >
                            <button className={MyPost.button} disabled={true}><i className="fas fa-photo-video"></i></button>
                            <button className={MyPost.button} disabled={true}><i className="fas fa-headphones-alt"></i></button>
                            <button className={MyPost.button + " " + MyPost.send} disabled={isDisabled} onClick={addNewPost} > <i className="fas fa-paper-plane"></i>Send</button>
                        </div>
                    </div>

                    
                </ProfileItemStyled>

                <div className="news">

                    {PostsElements}

                </div>
            </div>

        </div>
    );
}



export default MyPosts;
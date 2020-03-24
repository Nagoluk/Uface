import React, {useState} from "react";
import MyPost from "./MyPosts.module.css";
import Post from "./post/post";
import TextareaAutosize from 'react-textarea-autosize';



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
                                                                                       dataSend={currentValue.dataSend}/>).reverse()
    return (
        <div className={MyPost.myposts}>
            <div className="postwrap">
                <div className={MyPost.newpost }>
                    <TextareaAutosize value={value} onChange={postHandler} placeholder={"Create new post!"} autoComplete={"off"} wrap={"hard"}/>
                    <div className={MyPost.createnewpost}>
                        <span>Symbols: {symbols}</span>
                        <div >
                            <button className={MyPost.button} disabled={true}><i className="fas fa-photo-video"></i></button>
                            <button className={MyPost.button} disabled={true}><i className="fas fa-headphones-alt"></i></button>
                            <button className={MyPost.button + " " + MyPost.send} disabled={isDisabled} onClick={addNewPost} > <i className="fas fa-paper-plane"></i>Send</button>
                        </div>
                    </div>

                    
                </div>

                <div className="news">

                    {PostsElements}

                </div>
            </div>

        </div>
    );
}



export default MyPosts;
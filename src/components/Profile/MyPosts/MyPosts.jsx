import React from 'react';
import MyPost from "./MyPosts.module.css";
import Post from "./post/post"



const MyPosts = (props) => {

    console.log("Post", props);


    let newPost = React.createRef();

    let addNewPost = ()=> {
        props.addNewPost(newPost.current.value)
    }

    let addSymbol = () =>{

  
        props.newSymbolAC(newPost.current.value);
    }



    let PostsElements = props.ProfilePage.PostsData.map(currentValue => <Post message={currentValue.content} likes={currentValue.likes} rep={currentValue.rep} comm={currentValue.comm} dataSend={currentValue.dataSend}/>)
    return (
        <div className={MyPost.myposts}>
            <div className="postwrap">
                <div className={MyPost.newpost}>
                    <input id="post" type="text" placeholder={(props.Lang.eng) ? "What is the news?" : "Що у вас нового"} ref={newPost} value={props.ProfilePage.NewPostText} onChange={addSymbol}/>


                    <div className="createnewpost">
                        <button className={MyPost.button}><i className="fas fa-photo-video"></i></button>
                        <button className={MyPost.button}><i className="fas fa-headphones-alt"></i></button>
                        <button className={MyPost.button + " " + MyPost.send} onClick={addNewPost}><i className="fas fa-paper-plane"></i></button>
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
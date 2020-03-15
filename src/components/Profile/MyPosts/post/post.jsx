import React from 'react';
import post from "./post.module.css";
import Avatar from "./../../../../img/Profile/avatar.png";


const Post = (props) => {

    return (
        <div className={post.item}>
            <div className={post.postHeder}>
                <img
                    src={Avatar}
                  alt="avatar"/>
                    <div>
                        <h2>Letopisec</h2>
                        <div className={post.date}>{props.dataSend}</div>
                    </div>

                <div className={post.postSetting}>
                    <i className="fas fa-ellipsis-h"></i>
                    {/*<i className="fas fa-sliders-h"></i>*/}
                </div>
            </div>
            <div className={post.content}>
                {props.message}
            </div>


            <div className={post.activity}>
                <div className={post.likes}><i className="far fa-thumbs-up"></i> {props.likes}</div>
                <div className="shares"><i className="fas fa-retweet"></i> {props.rep}</div>
                <div className="comments"><i className="far fa-comments"></i> {props.comm}</div>
            </div>
        </div>

    );
}

export default Post;
import React from 'react';
import post from "./post.module.css";
import Avatar from "./../../../../img/Profile/avatar.png";
import styled from "styled-components";



const PostItemWrap = styled.header`
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
    color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    border: ${props => (props.black ? "1px solid #2B2B2B" : "1px solid lightgray;")};
    transition: all .2s ease-in;
`




const Post = (props) => {

    return (
        <PostItemWrap className={post.item} black={props.black}>
            <div className={post.postHeder}>
                <img src={props.photos.small || props.photos.large || Avatar } alt="avatar"/>

                <div>
                    <h2>{props.name}</h2>
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
        </PostItemWrap>

    );
}

export default Post;
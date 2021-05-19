import React from 'react';
import post from './post.module.css';
import Avatar from './../../../../img/Profile/avatar.png';
import {PostsItemStyled} from '../../../../styles/theme';
import {photosT, PostDataType} from '../../../../interfaces/profile-interfaces';
import {RetweetOutlined, MessageOutlined, LikeOutlined} from '@ant-design/icons';

type ownProps = {
    name: string,
    photos: photosT
}

const Post: React.FC<PostDataType & ownProps> = (props) => {

    return (
        <PostsItemStyled className={post.item}>
            <div className={post.postHeder}>
                <img src={props.photos.small || props.photos.large || Avatar} alt="avatar"/>

                <div>
                    <h2>{props.name}</h2>
                    <div className={post.date}>{props.dataSend}</div>
                </div>

                <div className={post.postSetting}>
                    <i className="fas fa-ellipsis-h"></i>
                    {/*<i className="fas fa-sliders-h"></i>*/}
                </div>
            </div>
            <div className={post.content + ' Content'}>
                {props.content}
            </div>

            <div className={post.activity}>
                <div className={post.likes}><LikeOutlined /> {props.likes}</div>
                <div className="shares"><RetweetOutlined /> {props.rep}</div>
                <div className="comments"><MessageOutlined /> {props.comm}</div>
            </div>
        </PostsItemStyled>

    );
}

export default Post;
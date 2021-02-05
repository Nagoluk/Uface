import React, {useState} from 'react';
import MyPost from './MyPosts.module.css';
import Post from './post/post';
// @ts-ignore
import TextareaAutosize from 'react-textarea-autosize';
import {PostsItemStyled} from '../../../styles/theme';
import {useDispatch, useSelector} from 'react-redux';
import {
    getMyPostsSelector,
} from '../../../redux-state/selectors/profile-selector';
import {actionsProfile} from '../../../redux-state/profileReducer';
import {ProfileType} from '../../../interfaces/profile-interfaces';
import {useTranslation} from 'react-i18next';

type ownProps = {
    profile: ProfileType
}
const MyPosts: React.FC<ownProps> = ({profile}) => {

    const [value, changeVal] = useState('');
    const [isDisabled, changeDisabled] = useState(true);
    const [symbols, setSymbols] = useState(0);

    const dispatch = useDispatch()
    const PostsData = useSelector(getMyPostsSelector)
    const { t } = useTranslation();

    let addNewPost = () => {
        if (value !== '') {
            changeVal('');
            changeDisabled(true);
            dispatch(actionsProfile.addNewPostAC(value))
            setSymbols(0)
        }
    }

    let postHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeVal(e.target.value);
        setSymbols(e.target.value.length)

        if (e.target.value !== '') {
            changeDisabled(false)
        } else {
            changeDisabled(true)
        }
    }

    let PostsElements = PostsData.map((currentValue, index) =>
        (<Post key={index.toString()} {...currentValue} name={profile.fullName} photos={profile.photos}
    />)).reverse()
    return (
        <div className={MyPost.myposts}>
            <div className="postwrap">
                <PostsItemStyled className={MyPost.newpost}>
                    <TextareaAutosize value={value} onChange={postHandler} placeholder={t('profile.create-post')}
                                      autoComplete={'off'} wrap={'hard'}/>
                    <div className={MyPost.createnewpost}>
                        <span>{t('profile.symbols')}: {symbols}</span>
                        <div>
                            <button className={MyPost.button + ' ' + MyPost.send} disabled={isDisabled}
                                    onClick={addNewPost}>
                                <i className="fab fa-telegram"></i></button>
                        </div>
                    </div>
                </PostsItemStyled>

                <div className="news">
                    {PostsElements}
                </div>
            </div>

        </div>
    );
}


export default MyPosts;
import React, { FormEvent} from 'react';
import galleryStyle from './gallery.module.css';
import p from '../../Profile/profile.module.css';

type ownProps = {
    setShowGallery: (payload: boolean) => void
    uploadPhoto: (payload: any) => void
    amI: boolean
    img: string
}
const Gellery: React.FC<ownProps> = props => {
    let clickOnWrap = (event: any) => {
        if(event.target.id !== null) {
            if (event.target.id !== '') props.setShowGallery(false)
        }
    }

    return (<div className={galleryStyle.Wrap}>
        <div className={galleryStyle.ContentWrapper} onClick={clickOnWrap} id={'wrap'}>
            <div className={galleryStyle.Content}>
                <div className={galleryStyle.Header}>
                    <p onClick={() => props.setShowGallery(false)}><i className="fas fa-times"></i>Close</p>

                    {props.amI && <div>
                        <label htmlFor="avatar">
                            <i className="fas fa-upload"></i>
                            <input type="file" id="avatar" onInput={props.uploadPhoto} style={{display: 'none'}}/>
                        </label>
                    </div>}
                </div>
                <img src={props.img} alt="gallery"/>
            </div>
        </div>
    </div>)
}

export default Gellery;

import React from 'react';
import Set from './setting.module.css';
import UpdateProfile from "./UpdateProfile/UpdateProfile";




const Setting = (props) => {
    return (<div className={Set.wrap}>
                <div className={Set.item}>
                    <UpdateProfile profile={props.profile} putUserData={props.putUserDataThunkCreator} isUpload={props.isUploadProfile}/>
                </div>

                {/* <div className={Set.item}>
                    <UpdateContacts profile={props.profile} putUserData={props.putUserDataThunkCreator}/>
                </div> */}
            </div>)
}

export default Setting;






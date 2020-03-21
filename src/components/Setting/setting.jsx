import React from 'react';
import Set from './setting.module.css';
import {connect} from "react-redux";
import {setEng, setUa} from "../../Redux/settingReducer";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import UpdateContacts from "./UpdateProfile/Contacts";
import {putUserDataThunkCreator} from "../../Redux/profileReducer";


const Setting = (props) => {
    return (<div className={Set.wrap}>
                {/*<div className={Set.item}>*/}
                {/*    <h2>{(props.state.eng) ? "language" : "Мова"}</h2>*/}
                {/*    <div>*/}
                {/*        <input type="radio"  id="ua" name="lang" checked={props.state.ua} value="ua" disabled/>*/}
                {/*        <label htmlFor="ua" >UA</label>*/}
                {/*    </div>*/}
                {/*    <div>*/}

                {/*        <input type="radio"  id="eng" name="lang"  checked={props.state.eng} value="eng" disabled/>*/}
                {/*        <label htmlFor="eng" >ENG</label>*/}
                {/*    </div>*/}
                {/*</div>*/}



                <div className={Set.item}>
                    <UpdateProfile profile={props.profile} putUserData={props.putUserDataThunkCreator}/>
                </div>

                <div className={Set.item}>
                    <UpdateContacts profile={props.profile} putUserData={props.putUserDataThunkCreator}/>
                </div>


        </div>)
}


let mapStateToProps = (state) => {
    return {
        state: state.SetLang,
        profile: state.ProfilePage.profile
    }

}

let mapDispatchToProps = (dispatch) => {
    return {
        setUa: ()=>{
            dispatch(setUa())
        },
        setEng: ()=>{
            dispatch(setEng())
        },
    }

}


let SettingContainer = connect(mapStateToProps, {putUserDataThunkCreator})(Setting)


export default SettingContainer
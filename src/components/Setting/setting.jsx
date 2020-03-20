import React from 'react';
import Set from './setting.module.css';
import {connect} from "react-redux";
import {setEng, setUa} from "../../Redux/settingReducer";
import UpdateProfile from "./UpdateProfile/UpdateProfile";


const Setting = (props) => {
    return (<div className={Set.wrap}>
                <div className={Set.item}>
                    <h2><i className="fas fa-language"></i>{(props.state.eng) ? "language" : "Мова"}</h2>
                    <div>
                        <input type="radio"  id="ua" name="lang" checked={props.state.ua} value="ua" disabled/>
                        <label htmlFor="ua" >UA</label>
                    </div>
                    <div>

                        <input type="radio"  id="eng" name="lang"  checked={props.state.eng} value="eng" disabled/>
                        <label htmlFor="eng" >ENG</label>
                    </div>
                </div>

                <div className={Set.item}>
                    <h2><i className="fas fa-envelope"></i>{props.state.eng ? "Get our mail" : "Отримувати наші листи"}</h2>
                    <div>
                        <input type="radio" id="ua" name="mail"/>
                        <label htmlFor="ua">Yes</label>

                    </div>
                    <div>

                        <input type="radio" id="eng" name="mail" checked/>
                        <label htmlFor="eng">No</label>
                    </div>
                </div>

                <div className={Set.item}>
                    <UpdateProfile/>
                </div>


        </div>)
}


let mapStateToProps = (state) => {
    return {
        state: state.SetLang,
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


let SettingContainer = connect(mapStateToProps, mapDispatchToProps)(Setting)


export default SettingContainer
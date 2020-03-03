import React from 'react';
import Set from './setting.module.css';
import {connect} from "react-redux";
import swal from 'sweetalert';
import {setEng, setUa} from "../../Redux/settingReducer";


const Setting = (props) => {


    let ua = React.createRef();
    let eng = React.createRef();
    console.log(props);

    let changeLang = () => {


        swal("Do you want change lang?", {
            buttons: {
                cancel: "No",
                catch: {
                    text: "Yes",
                    value: "catch",
                },
                defeat: false,
            },
        })
            .then((value) => {
                switch (value) {
                    case "catch":
                        swal({title:"Done", icon:"success"});
                        if(ua.current.checked){
                            props.setEng();
                        }

                        if(eng.current.checked){
                            props.setUa();
                        }
                        break;

                    default:
                        swal({title:"Ops", icon:"warning"});
                }
            });



            //= window.confirm(`Are you sure?`);

        }



    return (<div className={Set.wrap}>
        <div className={Set.item}>
            <h2>{(props.state.eng) ? "language" : "Мова"}</h2>
            <div>
                <input type="radio"  id="ua" name="lang" ref={ua} checked={props.state.ua} value="ua" disabled/>
                <label htmlFor="ua" onClick={changeLang}>UA</label>
            </div>
            <div>

                <input type="radio"  id="eng" name="lang" ref={eng} checked={props.state.eng} value="eng" disabled/>
                <label htmlFor="eng" onClick={changeLang}>ENG</label>
            </div>
        </div>

        <div className={Set.item}>
            <h2> {props.state.eng ? "Get our mail" : "Отримувати наші листи"}</h2>
            <div>
                <input type="radio" id="ua" name="mail"/>
                <label htmlFor="ua">Yes</label>

            </div>
            <div>

                <input type="radio" id="eng" name="mail" checked/>
                <label htmlFor="eng">No</label>
            </div>
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
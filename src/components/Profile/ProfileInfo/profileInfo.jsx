import React from "react"
import p from "../profile.module.css";


const ProfileInfo = (props) => {

        return (
            <div className={p.profileWrap}>
                <img className={p.photowrap} src="https://www.worldtravelguide.net/wp-content/uploads/2017/03/shu-Ukraine-Kiev-MonumentIndependence_1088907020-1440x823-EDITORIAL.jpg" alt=""/>
                <div className={p.information}>


                    <div >
                        <img src={props.profile.photos.large} className={p.avatar} alt="Avatar"/>
                    </div>

                    <div className={p.info}>
                        <h2>{props.profile.fullName}</h2>
                        <ul>
                            <li><span className={p.infoItem}>{(props.lang.eng) ? "Status:" : "Статус"} </span>{props.profile.aboutMe}</li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                </div>

            </div>
        );


}

export default ProfileInfo;
import React from "react";
import preloader from "../../../img/Preloader/preloader.gif"


let Preloader = props => {
    return(<div className="preloader"> 
             <div><img src={preloader} alt="preloader"/></div>
           </div>)
}

export default Preloader
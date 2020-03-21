import React from "react";
import NotF from "../../img/Preloader/notFound.gif"


let NotFound = () => {
    return (<div style={{textAlign: "center", marginTop: "40px"}}>
                <img src={NotF} alt="Not found"/>
                <h2>404 Not Found</h2>
            </div>)
}

export default NotFound;
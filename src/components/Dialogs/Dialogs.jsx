import React from 'react';
import {Route} from "react-router-dom";
import DialogWithPerson from "./DialogWithUser/DialogWithUser";
import DialogList from "./DialogList/DialogList";





const Dialogs = (props) => {
    
   


    return (<div>
            <Route path="/dialogs/0" render={ ()=> <DialogList mess={props.messageData} />}/>
            <Route path="/dialogs/1" render={()=> <DialogWithPerson mess={props.messageData} dispatch={props.dispatch}/>}/>
        </div>

    );
};

export default Dialogs;
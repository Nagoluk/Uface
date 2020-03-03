import React from 'react';
import {Route} from "react-router-dom";
import DialogWithPerson from "./DialogWithUser/DialogWithUser";
import DialogList from "./DialogList/DialogList";





const Dialogs = (props) => {
    debugger;


    return (<div>
            <Route path="/dialogs/0" render={ ()=> <DialogList state={props.state} />}/>
            <Route path="/dialogs/1" render={()=> <DialogWithPerson state={props.state} dispatch={props.dispatch}/>}/>
        </div>

    );
};

export default Dialogs;
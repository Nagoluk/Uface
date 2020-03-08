import React from "react";
import styles from "./status.module.css";


class Status extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        if(this.props.id === 6108){
            this.setState({
                editMode: true,
            })
         }
    }

    deactivateEditMode = () => {
        if(this.props.id === 6108){
            this.setState({
                editMode: false,
            })

            this.props.updateStatusThunkCreator(this.state.status)
         }
    }

    onStatusChange = (e) => {
     
        this.setState({status: e.currentTarget.value})
    }

    render(){
        return <>{ !this.state.editMode ?
                  <span>
                      <span onDoubleClick={this.activateEditMode}>{this.props.status || "Double click to write status"}</span>
                  </span>
                    :
                  <span >
                      <input onChange={this.onStatusChange} autoFocus={true} className={styles.Input} onBlur={this.deactivateEditMode} type="text" value={this.state.status} maxLength={300}/>
                      <div className={styles.EditMode}>Edit mode</div>
                  </span>}
               </>
    }
}

export default Status;
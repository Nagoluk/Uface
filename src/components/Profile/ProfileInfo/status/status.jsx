import React from "react";
import styles from "./status.module.css";


class Status extends React.Component {

    state = {
        editMode: false,
    }

    toggleEditMode = () => {
        // console.log(this);

        // debugger;
        
        this.setState({
            editMode: !this.state.editMode,
        })
    }

    render(){
        return <>{ !this.state.editMode ?
                  <span>
                      <span onDoubleClick={this.toggleEditMode}>{this.props.status || "Double click to write status"}</span>
                  </span>
                    :
                  <span >
                      <input autoFocus={true} className={styles.Input} onBlur={this.toggleEditMode} type="text" value={this.props.status} maxLength={300}/>
                      <div className={styles.EditMode}>Edit mode</div>
                  </span>}
               </>
    }
}

export default Status;
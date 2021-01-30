import React, {useState, useEffect} from 'react';
import styles from './status.module.css';


const StatusHook = props => {

    const [edit, setEdit] = useState(false);
    const [status, setStatus] = useState(props.status);


    useEffect(() => {
        setStatus(props.status)
    }, [props.status])


    let activateEditMode = () => {
        if (props.amI) {
            setEdit(true)
        }
    }

    let deactivateEditMode = () => {
        if (props.amI) {
            setEdit(false)
            props.updateStatusThunkCreator(status)
        }
    }


    let onStatusChange = (e) => {

        setStatus(e.currentTarget.value)
    }


    return <>{!edit ?
        <span>
                      <span onDoubleClick={activateEditMode}>{props.status || 'Status'}</span>
                  </span>
        :
        <span>
                      <input onChange={onStatusChange}
                             autoFocus={true}
                             className={styles.Input}
                             onBlur={deactivateEditMode}
                             type="text"
                             value={status}
                             maxLength={300}/>

                      <div className={styles.EditMode}>Edit mode</div>
                  </span>}
    </>
}

export default StatusHook;
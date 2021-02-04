import React, {useState, useEffect} from 'react';
import styles from './status.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {updateStatusThunkCreator} from '../../../../redux-state/profileReducer';
import {getStatusSelector} from '../../../../redux-state/selectors/profile-selector';


const StatusHook: React.FC<{ amI: boolean }> = (props) => {
    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false);

    const userStatus = useSelector(getStatusSelector)
    const [status, setStatus] = useState(userStatus);

    useEffect(() => {
        setStatus(userStatus)
    }, [userStatus])


    let activateEditMode = () => {
        if (props.amI) {
            setEdit(true)
        }
    }

    let deactivateEditMode = () => {
        if (props.amI) {
            setEdit(false)
            if(status!== null) dispatch(updateStatusThunkCreator(status))
        }
    }


    let onStatusChange = (e: any) => {
        setStatus(e.currentTarget.value)
    }


    return <>{!edit ?
        <span>
                      <span onDoubleClick={activateEditMode}>{status || 'Status'}</span>
                  </span>
        :
        <span>
                      <input onChange={onStatusChange}
                             autoFocus={true}
                             className={styles.Input}
                             onBlur={deactivateEditMode}
                             type="text"
                             value={status as string}
                             maxLength={300}/>

                      <div className={styles.EditMode}>Edit mode</div>
                  </span>}
    </>
}

export default StatusHook;
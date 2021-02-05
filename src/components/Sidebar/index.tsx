import React, {useEffect, useState} from 'react';
import Styles from './sidebar.module.css'
import Card from 'antd/lib/card';

const SideBar = () => {
    const [followed, setFollowed] = useState([])

    useEffect(() => {

    }, [])

    return (<div className={Styles.wrap}>
                <Card title="Followed" extra={<a href="#">Go to</a>} className={Styles.item}>
                    {JSON.stringify(followed)}
                </Card>

                <Card title="Followers" extra={<a href="#">Go to</a>} className={Styles.item}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>)
}

export default SideBar
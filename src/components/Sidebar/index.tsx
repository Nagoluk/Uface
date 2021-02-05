import React, {useEffect, useState} from 'react';
import Styles from './sidebar.module.css'
import Card from 'antd/lib/card';
import {useTranslation} from 'react-i18next';

const SideBar = () => {
    const [followed, setFollowed] = useState([])

    const { t } = useTranslation();
    useEffect(() => {

    }, [])

    return (<div className={Styles.wrap}>
                <Card title={t('sidebar.followed')} extra={<a href="#">{t('sidebar.goto')}</a>} className={Styles.item}>
                    {JSON.stringify(followed)}
                </Card>

                <Card title={t('sidebar.followers')} extra={<a href="#">{t('sidebar.goto')}</a>} className={Styles.item}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>)
}

export default SideBar
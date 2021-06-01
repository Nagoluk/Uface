import React, {useEffect} from 'react';
import UsersStlyes from '../../Users/Users.module.css';
import {PagitatorItemStyled} from '../../../styles/theme';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {IFilters} from '../../../interfaces/common-interfaces';


type PagitatorTypes = {
    totalUsersCount: number,
    pagePagitator: number,
    pageSize: number,
    windowsWidth: number,
    currentPage: number,
    setCurrentPagePagitator: (count: number) => void,
    onPageChange: (a: number) => void,
    filters: IFilters
}

export const Pagitator: React.FC<PagitatorTypes> = ({
                                                        totalUsersCount,
                                                        pagePagitator,
                                                        pageSize,
                                                        currentPage,
                                                        setCurrentPagePagitator,
                                                        onPageChange,
                                                        windowsWidth,
                                                        filters
                                                    }) => {
    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];
    let portion;

    if (windowsWidth <= 720) {
        portion = 6;
    } else {
        portion = 9;
    }

    let count = pagePagitator;

    let left = count * portion + 1;
    let right = left + portion - 1;


    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    let leftShift = () => {
        setCurrentPagePagitator(--count)
    }

    let rightShift = () => {
        setCurrentPagePagitator(++count)
    }

    useEffect(() => {
        setCurrentPagePagitator(0)
    }, [filters])

    pages = pages.filter(item => item >= left && item <= right)

    return (<PagitatorItemStyled className={UsersStlyes.settingPanel}>
        <button className={UsersStlyes.navs + ' navs'} disabled={left <= 1} onClick={leftShift}>
            <LeftOutlined />
        </button>

        {pages.map((p, index) => {
            return <button onClick={() => {
                onPageChange(p)
            }} className={(currentPage === p && UsersStlyes.active).toString()}
                           key={index.toString()}>{p}</button>
        })}

        <button className={UsersStlyes.navs + ' navs'} onClick={rightShift} disabled={right >= pageCount}>
            <RightOutlined />
        </button>
    </PagitatorItemStyled>)
}
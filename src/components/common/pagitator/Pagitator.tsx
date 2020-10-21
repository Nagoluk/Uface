import React from 'react';
import UsersStlyes from "../../Users/Users.module.css";
import styled from "styled-components";

const PagitatorStlyed = styled.div<any>`
            background:  ${props => (props.black ? '#2B2B2B' : '#ffffff')};
            border: 1px solid ${props => (props.black ? '#3C3F41' : 'lightgray')};
            transition: background .2s ease-in;
            `

type PagitatorTypes = {
    totalUsersCount: number,
    pagePagitator: number,
    pageSize: number,
    windowsWidth: number,
    currentPage: number,
    black: boolean,


    setCurrentPagePagitator: (count: number) => void,
    onPageChange: (a: number) => void,
}

export const Pagitator: React.FC<PagitatorTypes> = ({
                                               totalUsersCount,
                                               pagePagitator,
                                               pageSize,
                                               currentPage,
                                               setCurrentPagePagitator,
                                               onPageChange,
                                               windowsWidth,
                                                black,
                                           }) => {
    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];
    let portion;

    if (windowsWidth <= 635) {
        portion = 6;
    } else {
        portion = 10;
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

    pages = pages.filter(item => item >= left && item <= right)

    return (<PagitatorStlyed className={UsersStlyes.settingPanel} black={black}>
                <button className={UsersStlyes.navs} disabled={left <= 1} onClick={leftShift}>
                    <i className="fas fa-chevron-left"></i>
                </button>

                {pages.map((p, index) => {
                    return <button onClick={() => {
                        onPageChange(p)
                    }} className={(currentPage === p && UsersStlyes.active).toString()}
                                   key={index.toString()}>{p}</button>
                })}

                <button className={UsersStlyes.navs} onClick={rightShift} disabled={right >= pageCount}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </PagitatorStlyed>)
}
import React, {useState} from 'react';
import headermod from "../header.module.css";
import Avatar from "../../../img/Profile/avatar.png";
import {NavLink} from "react-router-dom";
import {SearchContainerStyle, UniversalThemeComponent} from "../../../styles/theme";
import {UserT} from '../../../interfaces/users-interfaces';
import {ownPropsSearch} from './SearchContainer';

const Search: React.FC<ownPropsSearch> = props => {
    const [searchMode, setSearchMode] = useState(false);
    const [text, setText] = useState("")

    let searching = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchMode(true)
        setText(e.currentTarget.value)
        props.searchingThunkCreator(e.currentTarget.value)
    }

    let stopSearching = () => {
        setText("")
    }

    let hideResults = () => {
        setSearchMode(false)
    }


    return (
        <SearchContainerStyle className={headermod.input} >
            <input type="text" placeholder={"Search here"} className={headermod.Search} onChange={searching}
                   onBlur={stopSearching} value={text}/>


            {searchMode && <UniversalThemeComponent className={headermod.Results}>
                {!props.results.length && "No results"}
                {props.results.map((item, key) => <Item
                    {...item} key={key.toString()}
                    hideResults={hideResults}/>)}


            </UniversalThemeComponent>}

            {searchMode && <button onClick={hideResults}><i className="far fa-times-circle"></i></button>}
            {!searchMode && <button ><i className="fas fa-search"></i></button>}

        </SearchContainerStyle>)
}

type ItemOwnProps = {
    hideResults: () => void
}
const Item: React.FC<UserT & ItemOwnProps> = props => {
    let showProfile = () => {
        props.hideResults()
    }

    return (<NavLink to={"/profile/" + props.id} onClick={showProfile}>
                <div className={headermod.Item}>
                    <img src={props.photos.small || Avatar} alt="avatar"/>
                    <div>
                        <h3>{props.name}</h3>
                        <p>{props.status || "No status"}</p>
                    </div>
                </div>
            </NavLink>)
}

export default Search;
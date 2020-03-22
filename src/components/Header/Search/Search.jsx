import React, {useState} from 'react';
import headermod from "../header.module.css";
import Avatar from "../../../img/Profile/avatar.png";
import {NavLink} from "react-router-dom";


const Search = props => {
    const [searchMode, setSearchMode] = useState(false);
    const [text, setText] = useState("")

    let searching = (e) => {
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
        <div className={headermod.input}>
            <input type="text" placeholder={"Search here"} className={headermod.Search} onChange={searching}
                   onBlur={stopSearching} value={text}/>


            {searchMode && <div className={headermod.Results}>
                {!props.results.length && "No results"}
                {props.results.map((item, key) => <Item
                    item={item} key={key.toString()}
                    hideResults={hideResults}/>)}


            </div>}

            {searchMode && <button onClick={hideResults}><i className="far fa-times-circle"></i></button>}
            {!searchMode && <button ><i className="fas fa-search"></i></button>}

        </div>)
}

const Item = props => {
    let showProfile = () => {
        props.hideResults()
    }

    return (<NavLink to={"/profile/" + props.item.id} onClick={showProfile}>
                <div className={headermod.Item}>
                    <img src={props.item.photos.small || Avatar} alt="avatar"/>
                    <div>
                        <h3>{props.item.name}</h3>
                        <p>{props.item.status || "No status"}</p>
                    </div>
                </div>
            </NavLink>)
}

export default Search;
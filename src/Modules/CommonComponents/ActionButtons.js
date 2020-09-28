import React from 'react';
import { IconContext } from "react-icons";
import { FaSearchengin, FaRegEdit } from "react-icons/fa"; //https://react-icons.netlify.com/#/icons/io
import { MdDeleteForever } from "react-icons/md";

export default ({ id, url, history, handleDelete, searchUrl = "#", isSearch = true, editRow = undefined, setType = () => false }) => {
    return (
        <>
            {isSearch &&
                <IconContext.Provider value={{ color: "green", size: "2em", className: "search-account" }}>
                    <FaSearchengin onClick={() => {
                        editRow({ id });
                        history.push(searchUrl);
                    }} />
                </IconContext.Provider>
            }
            {url &&
            <IconContext.Provider value={{ color: "blue", size: "2em", className: "edit-account" }}>
                <FaRegEdit onClick={() => {
                    editRow({ id });
                    history.push(url);
                    setType()
                }} />
            </IconContext.Provider>
            }            
            {handleDelete &&
                <IconContext.Provider value={{ color: "red", size: "2.1em", className: "delete-account" }}>
                    <MdDeleteForever onClick={() => handleDelete(id)} />
                </IconContext.Provider>}
        </>
    );
};
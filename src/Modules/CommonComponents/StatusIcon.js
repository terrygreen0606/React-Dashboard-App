import React from 'react';
import { IconContext } from "react-icons";
import { IoMdCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

export default ({ status }) => {
    return status ? <IconContext.Provider value={{ color: "green", size: "2em", className: "search-account" }}>
        <div>
            <IoMdCheckmarkCircle />
        </div>
    </IconContext.Provider> :
        <IconContext.Provider value={{ color: "red", size: "2em", className: "search-account" }}>
            <div>
                <IoIosCloseCircle />
            </div>
        </IconContext.Provider>
};
import React from 'react';
import { IconContext } from "react-icons";
import { IoIosAddCircle } from "react-icons/io";
import { IoAddCircle } from "../../../utilities/constants";

export default ({ icon, color = "green", size = "2em", className = "" }) => {
    const getIcon = () => {
        switch (icon) {
            case IoAddCircle:
                return <IoIosAddCircle />
        }
    };

    return <IconContext.Provider value={{ color, size, className }}>
        <div>
            {getIcon()}
        </div>
    </IconContext.Provider>
};
import React from 'react';
import { Button } from 'reactstrap';
import { IconContext } from "react-icons";
import { TiArrowBackOutline } from "react-icons/ti";

export default ({ history, text = '', backUrl = '' }) => {
    return <IconContext.Provider value={{ color: "white", size: "1.5em", className: "back-button" }}>
        <Button onClick={() => backUrl ? history.push(backUrl):history.goBack()} color="secondary" size="sm" active><TiArrowBackOutline /> Back</Button>
        <strong> {text}</strong>
    </IconContext.Provider>
};
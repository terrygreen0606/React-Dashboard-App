import React, { useState } from 'react'
import { Tooltip } from 'reactstrap';

export default function CreateTooltips(id, desc) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <i id={id + '_icon'} className="fa fa-info-circle" style={{'color':'blue'}}></i>
      <Tooltip placement={'top'} isOpen={isOpen} target={id + '_icon'} toggle={toggle}>
        {desc}
      </Tooltip>
    </React.Fragment>
  )
}

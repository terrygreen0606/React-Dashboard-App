import React, { Component } from 'react';
import { AppSwitch } from '@coreui/react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  Fade,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText, Form,
  FormGroup, Label,
} from 'reactstrap';

class FaIcon extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            isOpened: true,
        };
        
    }

  render() {
      return this.state.isOpened ? (
        <i class="fa fa-plus" style={{ float: "right" }}></i>
      ) : (
        <i class="fa fa-minus" style={{ float: "right" }}></i>
      )
      /*if (this.state.isOpened){
          return (
            <i class="fa fa-plus" style={{ float: "right" }}></i>
          )
      } else {
          return(
            <i class="fa fa-minus" style={{ float: "right" }}></i>
          )
      }*/
    
  }
}

export default FaIcon;

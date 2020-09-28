import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class showError extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: true
        };
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
        this.props.onClickFun();
    }
    
    render() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
                <ModalHeader toggle={this.toggle}>Errors</ModalHeader>
                <ModalBody>
                    <strong>
                    {
                        this.props.errorMsgs.map((msg,i)=>{
                            return <li key={i} style={{'color':'red', 'listStyleType': 'number'}}>{( msg.s_ErrorDescription !== undefined ) ? msg.s_ErrorDescription : msg}</li>
                        })
                    }
                    </strong>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}


export default showError;
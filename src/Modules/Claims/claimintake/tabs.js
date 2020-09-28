import React, {Component}  from "react";
import {Col,Row, Nav, NavItem, NavLink,TabContent, TabPane} from 'reactstrap';

import ClaimViewTab from './tabsComponent/ClaimViewTab';
import PaymentTab from './tabsComponent/PaymentTab';
import AttachmentTab from './tabsComponent/AttachmentTab';
import AssoPartyTab from './tabsComponent/AssoPartyTab';
import AddInfoTab from './tabsComponent/AddInfoTab';
import RoofSketchTab from './tabsComponent/RoofSketchTab';
import AssignWorkTab from './tabsComponent/AssignWorkTab';
import ClaimLogTab from './tabsComponent/ClaimLogTab';

class tabs extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: new Array(17).fill(false),
            activeTab: new Array(1).fill('claimView'),
        };
    }
    toggle(i) {
        const newArray = this.state.dropdownOpen.map((element, index) => {
            return (index === i ? !element : false);
        });
        this.setState({
            dropdownOpen: newArray,
        });
    }
    toggletab(tabPane, tab) {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab: newArray,
        });
    }

    render(){
        return(
        <>
            <Row>
                <Col  xs="12" sm="12" lg="12" className="d-flex justify-content-between flex-column claimview-tabs ">
                    <Nav tabs className="pb-3">
                        <NavItem>
                            <NavLink className="btn"
                                    active={this.state.activeTab[0] === 'claimView'}
                                    onClick={() => { this.toggletab(0, 'claimView'); }}
                            >
                                Claim view
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="btn"
                                    active={this.state.activeTab[0] === 'payment'}
                                    onClick={() => { this.toggletab(0, 'payment'); }}
                            >
                                Payments
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="btn"  active={this.state.activeTab[0] === 'attachment'}
                                    onClick={() => { this.toggletab(0, 'attachment'); }}
                            >
                                Attachments
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="btn"  active={this.state.activeTab[0] === 'assoParty'}
                                    onClick={() => { this.toggletab(0, 'assoParty'); }}
                            >
                                Asso. Party
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="btn"  active={this.state.activeTab[0] === 'addInfo'}
                                    onClick={() => { this.toggletab(0, 'addInfo'); }}
                            >
                                Add. Info
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="btn"  active={this.state.activeTab[0] === 'roofSketch'}
                                    onClick={() => { this.toggletab(0, 'roofSketch'); }}
                            >
                                Roof Sketch
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="btn"  active={this.state.activeTab[0] === 'assignWork'}
                                    onClick={() => { this.toggletab(0, 'assignWork'); }}
                            >
                                Assign Work
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="btn"  active={this.state.activeTab[0] === 'claimLog'}
                                    onClick={() => { this.toggletab(0, 'claimLog'); }}
                            >
                                Complaint LOG
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab[0]} className="border-0">
                        <TabPane tabId="claimView">
                            <ClaimViewTab />
                        </TabPane>
                        <TabPane tabId="payment">
                            <PaymentTab />   
                        </TabPane>
                        <TabPane tabId="attachment">
                            <AttachmentTab />   
                        </TabPane>
                        <TabPane tabId="assoParty">
                            <AssoPartyTab />   
                        </TabPane>
                        <TabPane tabId="addInfo">
                            <AddInfoTab />   
                        </TabPane>
                        <TabPane tabId="roofSketch">
                            <RoofSketchTab />   
                        </TabPane>
                        <TabPane tabId="assignWork">
                            <AssignWorkTab />   
                        </TabPane>
                        <TabPane tabId="claimLog">
                            <ClaimLogTab />   
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        </>
        )
    }

}


export default tabs;




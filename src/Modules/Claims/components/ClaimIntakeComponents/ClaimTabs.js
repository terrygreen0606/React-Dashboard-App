import React, {Component}  from "react";
import {Col,Row, Nav, NavItem, NavLink,TabContent, TabPane} from 'reactstrap';

import ClaimViewTab from './TabsComponent/ClaimViewTab';
import PaymentTab from './TabsComponent/PaymentTab';
import AttachmentTab from './TabsComponent/AttachmentTab';
import AssoPartyTab from './TabsComponent/AssoPartyTab';
import AddInfoTab from './TabsComponent/AddInfoTab';
import RoofSketchTab from './TabsComponent/RoofSketchTab';
import AssignWorkTab from './TabsComponent/AssignWorkTab';
import ClaimLogTab from './TabsComponent/ClaimLogTab';
import { toastAction } from '../../../../store/actions/toast-actions';

class ClaimTabs extends Component {

    constructor(props) {
        super(props);
        this.policyId = props.policyId;
        this.policyDetails = props.policyDetails;
        this.claimDetailsForEdit = props.claimDetailsForEdit;
        this.claimId = props.claimId || null;
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
        if(this.claimId){
            const newArray = this.state.activeTab.slice()
            newArray[tabPane] = tab
            this.setState({
                activeTab: newArray,
            });
        } else {
            toastAction(false, "Please create a claim first!");
        }
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
                            <ClaimViewTab activeTab={this.state.activeTab[0]} policyId={this.policyId} claimId={this.claimId} />
                        </TabPane>
                        {this.claimId && (<><TabPane tabId="payment">
                            <PaymentTab activeTab={this.state.activeTab[0]} policyId={this.policyId} claimId={this.claimId} policyDetails={this.policyDetails} claimDetailsForEdit={this.claimDetailsForEdit}/>   
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
                        </TabPane></>)}
                    </TabContent>
                </Col>
            </Row>
        </>
        )
    }

}

export default ClaimTabs;
import React, { Component } from 'react';
import {
    Col, Nav, NavItem, NavLink, Row, Card,
    CardBody,
    CardHeader, TabContent, TabPane
} from 'reactstrap';
import Helmet from 'react-helmet';
import BatchList from './BatchList';
import NewBatch from './NewBatch';

class BatchTransEntry extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: new Array(2).fill('1'),
            batchMasterPK: '',
        };
        this.initactiveTab = this.state.activeTab;
        this.newBatch = null;
    }

    componentWillMount() {
        this.toggle(0, '1');
    }

    toggle(tabPane, tab) {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.newBatch = tab
        this.setState({
            activeTab: newArray,
        }, () => {
            if (tab == 1) {
                this.state.batchMasterPK = '';
            }
        });
    }

    NBtoggleFun = () => {
        this.toggle(0, '1');
    }

    batchListActionLink = (rowData, action) => {
        this.setState({ batchMasterPK: rowData.n_PABatchMaster_PK });
        if (action == 'EDIT') {
            this.toggle(0, '2');
        }
    }

    tabPane() {
        return (
            <React.Fragment>
                <TabPane tabId="1">
                    {this.newBatch == '1' ? <BatchList batchListActionLink={this.batchListActionLink} NBtoggleFun={this.NBtoggleFun} /> : null}
                </TabPane>
                <TabPane tabId="2">
                    {this.newBatch == '2' ? <NewBatch selectedBatchMaster={this.state.batchMasterPK} NBtoggleFun={this.NBtoggleFun} /> : null}
                </TabPane>
            </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Avatar Insurance - Batch Transaction Entry</title>
                </Helmet>
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" md="12" className="mb-4">
                            <Card className="card-accent-primary">
                                <CardHeader>
                                    <strong>Accounting</strong>
                                </CardHeader>
                                <CardBody>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                active={this.state.activeTab[0] === '1'}
                                                onClick={() => { this.toggle(0, '1'); }}
                                            >
                                                Batch List
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                active={this.state.activeTab[0] === '2'}
                                                onClick={() => { this.toggle(0, '2'); }}
                                            >
                                                New Batch
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={this.state.activeTab[0]}>
                                        {this.tabPane()}
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default BatchTransEntry;

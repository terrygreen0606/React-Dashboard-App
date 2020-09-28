import React, {Component} from "react";
import {policyService} from "../../../../services/policyService";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  Form,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import {connect} from "react-redux";
import {updateQuoteParam} from "../../../../store/actions/policy";
import Modal from "reactstrap/es/Modal";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {NavLink} from "react-router-dom";

class PriorLossList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.savePriorData = this.savePriorData.bind(this);

    this.table = [];
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    };

    this.state = {
      data: {},
      policyData: {},
      quoteParams: {},
      collapse: true,
      fadeIn: true,
      timeout: 300,
      modal: false,
      prioirData: {}
    };
  }


  // just an example
  nameFormat(cell, row) {
    const id = `/users/${row.id}`
    return (
      <NavLink strict to={id}> {cell} </NavLink>
    );
  };

  async componentDidMount() {
    this.setState({data: this.props.data});
    this.setState({policyData: this.props.policyData.data});
    this.setState({quoteParams: this.props.quoteParams});
    this.setState({sessionData: this.props.sessionData.data});
    const apiService = new policyService();
    const prioirData = await apiService.getPriorLossGridData();
    this.setState({prioirData: prioirData.data});
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  async savePriorData() {
    const apiService = new policyService();
    const params = this.state.quoteParams.TbPorisklosshistorie;
    let response = await apiService.priorLossInfoSave(params);
    if (response.status === 200) {
      response = response.data;
    } else {
      alert('An error occurred.');
    }
  }

  render() {
    let showViewLink = 'No', showEditLink = 'Yes', actioLink_DisplyStatus = '', lossTypeOptions = [],
      policyData = this.state.policyData, sessionData = this.state.sessionData;
    if (policyData) {
      if (policyData.source && policyData.source === 'policymanagement') {
        actioLink_DisplyStatus = 'style="display:none;"';
        showViewLink = 'Yes';
        showEditLink = 'No';
      } else {
        if (sessionData) {
          if ((sessionData.BinderDate) || (sessionData.BinderDate === '0000-00-00 00:00:00')) {
            actioLink_DisplyStatus = '';
            showViewLink = 'No';
          } else {
            actioLink_DisplyStatus = 'style="display:none;"';
            showViewLink = 'Yes';
          }
        }
      }
      const dropdownData = policyData.dropdownData;
      if (dropdownData) {
        for (let item of dropdownData.LOSSHISTYPE) {
          lossTypeOptions.push(
            <option key={item.s_AppCodeName} value={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>
          )
        }
      }
    }

    return (
      <Card>
        <CardHeader>
          LIST ALL LOSSES IN THE LAST 5 YEARS FOR ALL MEMBERS OF THE HOUSEHOLD AT ANY LOCATION:
          <div className="card-header-actions">
            {/*eslint-disable-next-line*/}
            <a className="card-header-action btn btn-minimize btn-primary text-white"
               onClick={this.toggleModal}>Add Row</a>
            <a className="card-header-action btn btn-minimize" data-target="#collapseExample"
               onClick={this.toggle}><i className="icon-arrow-up"></i></a>
            {/*eslint-disable-next-line*/}
            <a className="card-header-action btn btn-close" onClick={this.toggleFade}>
              <i className="icon-close"></i>
            </a>
          </div>
        </CardHeader>
        <Collapse isOpen={this.state.collapse} id="collapseExample">
          <CardBody>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Has Prior Losses Info</ModalHeader>
              <ModalBody>
                <Form action="" method="post" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="d_LossDate">Date:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="d_LossDate"
                             onChange={(e) => this.props.updateQuoteParam('TbPorisklosshistorie', 'd_LossDate', e.target.value)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="s_LossType">Loss Type :</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" id="s_LossType"
                             onChange={(e) => this.props.updateQuoteParam('TbPorisklosshistorie', 's_LossType', e.target.value)}>
                        <option value={""}>--Select--</option>
                        {lossTypeOptions}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="s_LossDescription">Loss Description :</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="s_LossDescription"
                             onChange={(e) => this.props.updateQuoteParam('TbPorisklosshistorie', 's_LossDescription', e.target.value)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="s_LossCatNo">CAT NO:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="s_LossCatNo"
                             onChange={(e) => this.props.updateQuoteParam('TbPorisklosshistorie', 's_LossCatNo', e.target.value)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="n_LossAmount">Amount:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="n_LossAmount"
                             onChange={(e) => this.props.updateQuoteParam('TbPorisklosshistorie', 'n_LossAmount', e.target.value)}/>
                    </Col>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.savePriorData}>Add</Button>
                <Button color="secondary" onClick={this.toggleModal}>Exit</Button>
              </ModalFooter>
            </Modal>
            <Row>
              <Col md="12">
                <BootstrapTable data={this.table} version="4" striped hover pagination search options={this.options}>
                  <TableHeaderColumn dataField="loss_date" dataSort dataFormat={this.nameFormat}>LOSS
                    DATE</TableHeaderColumn>
                  <TableHeaderColumn isKey dataField="loss_type">LOSS TYPE</TableHeaderColumn>
                  <TableHeaderColumn dataField="loss_desc" dataSort>LOSS DESC</TableHeaderColumn>
                  <TableHeaderColumn dataField="loss_catino" dataSort>LOSS CATINO</TableHeaderColumn>
                  <TableHeaderColumn dataField="loss_amt" dataSort>LOSS AMT</TableHeaderColumn>
                  <TableHeaderColumn dataField="action" dataSort>ACTION</TableHeaderColumn>
                </BootstrapTable>
              </Col>
            </Row>
          </CardBody>
        </Collapse>
      </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {policyData, quoteParams, sessionData} = state.Policy;
  return {policyData, quoteParams, sessionData}
};
const mapDispatchToProps = {updateQuoteParam};
export default connect(mapStateToProps, mapDispatchToProps
)(PriorLossList);

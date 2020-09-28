import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Label, InputGroup, Input, Row, Col, Button, InputGroupAddon, InputGroupText } from 'reactstrap';
import { policyService } from "../../../../services/policyService";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { formatMoney } from '../../../../services/commanServices';

class Coverage extends Component {
  constructor(props) {
    super(props)
    this.apiService = new policyService();
    this.formatCurrency = this.formatCurrency.bind(this);
    this.getPremiumBasic = this.getPremiumBasic.bind(this);
    this.getPremiumOpt = this.getPremiumOpt.bind(this);
    this.editCvg = this.editCvg.bind(this);
    this.state = {
      disabled: true,
      BasicCovragesArray: [],
      OptionalCovragesArray: [],
      isLoading: false,
      activeTabBasic: new Array(10).fill('0'),
      activeTabOpt: new Array(10).fill('0'),
      cancelTabBasic: new Array(10).fill('0'),
      cancelTabOpt: new Array(10).fill('0'),
      InsuredValue: 0,
      action:'',
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      BasicCovragesArray: props.BasicCovragesArray,
      OptionalCovragesArray: props.OptionalCovragesArray,
    });
  }

  toggleBasic(tabPane, tab) {
    const newArray = this.state.activeTabBasic.slice();
    const cArray = this.state.cancelTabBasic.slice();
    newArray[tabPane] = tab
    cArray[tabPane] = '0'
    this.setState({
      activeTabBasic: newArray,
      cancelTabBasic: cArray,
    });
  }

  toggleOpt(tabPane, tab) {
    const newArray = this.state.activeTabOpt.slice();
    const cArray = this.state.cancelTabOpt.slice();
    newArray[tabPane] = tab
    cArray[tabPane] = '0'
    this.setState({
      activeTabOpt: newArray,
      cancelTabOpt: cArray,
    });
  }

  cancelBasic(tabPane, tab) {
    const newArray = this.state.cancelTabBasic.slice();
    const cArray = this.state.activeTabBasic.slice();
    newArray[tabPane] = tab
    cArray[tabPane] = '0'
    this.setState({
      cancelTabBasic: newArray,
      activeTabBasic: cArray,
    });
  }

  cancelOpt(tabPane, tab) {
    const newArray = this.state.cancelTabOpt.slice()
    const cArray = this.state.activeTabOpt.slice();
    newArray[tabPane] = tab
    cArray[tabPane] = '0'
    this.setState({
      cancelTabOpt: newArray,
      activeTabOpt: cArray,
    });
  }

  inputChangedHandler(e, data, key) {
    const cvgSection = data.s_CoverageSection;
    const { BasicCovragesArray, OptionalCovragesArray } = this.state;
    const value = e.target.value;
    let type = data.s_LimitCodeType;
    this.setState({
      action: 'change'
    });
    if (cvgSection == 'BASIC') {
      BasicCovragesArray[key]['n_InsuredValue'] = value;
      if (type == 'DROPDOWN') {
        BasicCovragesArray[key]['n_PRLimitFK'] = value;
      }
      this.setState({ BasicCovragesArray });
    } else {
      OptionalCovragesArray[key]['n_InsuredValue'] = value;
      if (type == 'DROPDOWN') {
        OptionalCovragesArray[key]['n_PRLimitFK'] = value;
      }
      this.setState({ OptionalCovragesArray });
    }
  }

  InputClick(e) {
    if(this.state.action != 'change'){
      this.setState({
        action: 'click'
      });
    }
  }

  formatCurrency(cell, row, enumObject, rowIndex) {
    let value = cell;
    let data = formatMoney(cell);
    let type = row.s_LimitCodeType;
    let dropdown = row.dropDown;
    let disabled = false;
    if (row.n_InsuredValue == 0 && row.s_CoverageCode != 'HOMCVGA' && row.s_CoverageCode != 'HOMCVGB' && row.s_CoverageCode != 'HOMCVGC' && row.s_CoverageCode != 'HOMCVGD' && row.s_CoverageCode != 'HOMCVGE' && row.s_CoverageCode != 'HOMCVGF' && row.s_CoverageCode != 'HOBLDORDLAW' && row.s_CoverageCode != 'HOMOLDCVG' || row.n_InsuredValue == null) {
      value = 0;
      disabled = true;
    } else if (row.s_CoverageCode == 'HOMCVGG') {
      disabled = true;
    } else {
      disabled = false;
    }
    let show = this.state.activeTabBasic[rowIndex];
    let showCancel = this.state.cancelTabBasic[rowIndex];
    if (row.s_CoverageSection == 'OPTIONAL') {
      show = this.state.activeTabOpt[rowIndex];
      showCancel = this.state.cancelTabOpt[rowIndex];
    }
    if (this.props.isEdit) {
      data = <InputGroup>
        <Input type="text" className="input-create" name={row.s_CoverageName} id={row.s_CoverageName} value={value} onClick={(event) => this.InputClick(event)} onChange={(event) => this.inputChangedHandler(event, row, rowIndex)} onBlur={(event) => this.editCvg(event, row, rowIndex)} disabled={disabled} />
        <InputGroupAddon addonType="append" hidden={show === '0'}>
          <InputGroupText className="input-group-text-success">
            <i className="fa fa-check" ></i>
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon addonType="append" hidden={showCancel === '0'}>
          <InputGroupText className="input-group-text-cancel">
            <i className="fa fa-times" ></i>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      //data = <Input type="text" className="form-control-success" name={row.s_CoverageName} id={row.s_CoverageName} value={value} onChange={(event) => this.inputChangedHandler(event,row,rowIndex)} onBlur={(event) => this.editCvg(event,row,rowIndex)} disabled={disabled}/>
      if (type == 'DROPDOWN') {
        data =
          <InputGroup>
            <Input type="select" className="input-create" id={row.s_CoverageName} name={row.s_CoverageName} value={row.n_PRLimitFK} onClick={(event) => this.InputClick(event)} onChange={(event) => this.inputChangedHandler(event, row, rowIndex)} onBlur={(event) => this.editCvg(event, row, rowIndex)} disabled={disabled}>
              <option key='' value=''>---Select---</option>
              {dropdown != null ? dropdown.map((product) => {
                return (<option key={product.n_PCLimitId_PK}
                  value={product.n_PCLimitId_PK}>{(product.s_LimitScreenName)}
                </option>);
              }) : ''
              }
            </Input>
            <InputGroupAddon addonType="append" hidden={show === '0'}>
              <InputGroupText className="input-group-text-success">
                <i className="fa fa fa-check" ></i>
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon addonType="append" hidden={showCancel === '0'}>
              <InputGroupText className="input-group-text-cancel">
                <i className="fa fa-times" ></i>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
      }

    }
    return data;
  }

  getPremiumBasic(cell, row) {
    if (row.n_AnnualGrossPremium != 0) {
      return formatMoney(row.n_AnnualGrossPremium);
    } else if (row.s_CoverageCode == 'HOMCVGF') {
      return formatMoney(row.n_AnnualGrossPremium);
    } else {
      return 'Included';
    }
  }

  getPremiumOpt(cell, row) {
    if (row.n_AnnualGrossPremium != 0) {
      return formatMoney(row.n_AnnualGrossPremium);
    } else {
      return 'Included';
    }
  }

  async editCvg(e, data, key) {
    const cvgSection = data.s_CoverageSection;
    const value = e.target.value;
    const { BasicCovragesArray, OptionalCovragesArray ,action} = this.state;  
    if (action == 'change') {
      this.setState({
        isLoading: true
      });
      if (cvgSection == 'BASIC') {
        let params = BasicCovragesArray[key];
        let Status = await this.apiService.editCvg(params);
        this.setState({
          isLoading: false
        });
        this.toggleBasic(key, '1');
      } else {
        let params = OptionalCovragesArray[key];
        let Status = await this.apiService.editCvg(params);
        this.setState({
          isLoading: false
        });
        this.toggleOpt(key, '1');
      }
    }
    this.setState({
      action: ''
    });
  }

  setAction(cell, row, enumObject, rowIndex) {
    let link = '';
    if (this.props.isEdit) {
      link = <Button active color="danger" aria-pressed="true" onClick={(event) => this.cancelAction(event, row, rowIndex)}><i className="fa fa-undo"></i>&nbsp;Cancel</Button>;
    }
    return link;
  }

  async cancelAction(e, row, key) {
    this.setState({
      isLoading: true
    });
    const value = e.target.value;
    const cvgSection = row.s_CoverageSection;
    const { BasicCovragesArray, OptionalCovragesArray } = this.state;
    if (cvgSection == 'BASIC') {
      let params = BasicCovragesArray[key];
      let Status = await this.apiService.cancelCvg(params);
      this.setState({
        isLoading: false
      });
      this.cancelBasic(key, '1');
    } else {
      let params = OptionalCovragesArray[key];
      let Status = await this.apiService.cancelCvg(params);
      this.setState({
        isLoading: false
      });
      this.cancelOpt(key, '1');
    }
  }

  render() {
    const options = {
      page: 1,
      sizePerPageList: [
        { text: '10', value: 10 },
        { text: '20', value: 20 },
        { text: '25', value: 25 },
        { text: '30', value: 30 },
        { text: '50', value: 50 }
      ],
      sizePerPage: 10,
      pageStartIndex: 1,
    };
    let disabled = this.state.disabled;
    if (this.props.isEdit) {
      disabled = false;
    }
    const { BasicCovragesArray, OptionalCovragesArray, isLoading } = this.state;
    return (
      <LoadingOverlay>
        <Loader loading={isLoading} />
        <div className="height-300 overflow-y-auto overflow-x-hidden zero-radius">
          <Row className="mb-3">
            <Col md="6">
              <InputGroup>
                <Label for='ddDeductNonHurricane'>Non Hurricane Deductible&nbsp;</Label>
                <Input type='select' id='ddDeductNonHurricane' size='sm' name='ddDeductNonHurricane' disabled={disabled}>
                  <option>$1000 Deductible</option>
                  <option selected>$2500 Deductible</option>
                  <option>$500 Deductible</option>
                </Input>
              </InputGroup>
            </Col>
            <Col md="6">
              <InputGroup>
                <Label for='ddDeductHurricane'>Hurricane Deductible&nbsp;</Label>
                <Input type='select' id='ddDeductHurricane' size='sm' name='ddDeductHurricane' disabled={disabled}>
                  <option selected>2% Ded</option>
                  <option>5% Ded</option>
                  <option>10% Ded</option>
                  <option>$500 Deductible</option>
                </Input>
              </InputGroup>
            </Col>
          </Row>
          <BootstrapTable data={BasicCovragesArray} striped hover options={options}>
            <TableHeaderColumn isKey dataField="s_CoverageName" dataSort>BASIC COVERAGE</TableHeaderColumn>
            <TableHeaderColumn dataField="n_InsuredValue" dataFormat={this.formatCurrency} dataSort>LIMIT</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.getPremiumBasic} dataSort>PREMIUM</TableHeaderColumn>
            <TableHeaderColumn dataField="Action" dataFormat={this.setAction.bind(this)} dataSort>ACTION</TableHeaderColumn>
          </BootstrapTable>
          <BootstrapTable data={OptionalCovragesArray} striped hover options={options}>
            <TableHeaderColumn isKey dataField="s_CoverageName" dataSort>OPTIONAL COVERAGE</TableHeaderColumn>
            <TableHeaderColumn dataField="n_InsuredValue" dataFormat={this.formatCurrency} dataSort>LIMIT</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.getPremiumOpt} dataSort>PREMIUM</TableHeaderColumn>
            <TableHeaderColumn dataField="Action" dataFormat={this.setAction.bind(this)} dataSort>ACTION</TableHeaderColumn>
          </BootstrapTable>
          <BootstrapTable data={this.props.CovrageDiscountArray} striped hover options={options}>
            <TableHeaderColumn isKey dataField="s_ScreenName" dataSort>DISCOUNT/SURCHANGE NAME</TableHeaderColumn>
            <TableHeaderColumn dataField="DiscEffectiveFrom" dataSort>EFFECTIVE FROM</TableHeaderColumn>
            <TableHeaderColumn dataField="DiscEffectiveTo" dataSort>EFFECTIVE TO</TableHeaderColumn>
            <TableHeaderColumn dataField="Action" dataSort>ACTION</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </LoadingOverlay>
    )
  }
}

const mapStateToProps = (state) => ({
  CoverageData: state.Policy.policyData.CoverageData
});

export default connect(mapStateToProps)(Coverage);
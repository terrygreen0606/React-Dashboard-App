import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, Button, Input,ButtonDropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'reactstrap';
import { connect } from 'react-redux';
import * as QuoteEntryService from '../../../../services/quoteEntryService';
class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.openRateSheet = this.openRateSheet.bind(this);
    this.state = {
      dropdownOpen: new Array(1).fill(false),
      ProductName: '',
      MaxPoTransactionPK : ''
    };
  }

  async componentDidMount() {
    this.setState({
      MaxPoTransactionPK: this.props.MaxPoTransactionPK,
    });
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  openRateSheet(){
    if (this.state.MaxPoTransactionPK != '') {
      this.props.dispatch(QuoteEntryService.printRateSheet(this.state.MaxPoTransactionPK))
        .then((res) => {
          if (res.status == 'Y') {
            window.open(res.docUrl);
          }
        });
    }
  }

  componentWillReceiveProps(props) {
    if (props.HeaderPolicyData.length > 0) {
    this.setState({
    ProductName : props.HeaderPolicyData[0].s_ProductName,
    });
  }
  }

  render() {
    const { openNewTrans,setToEdit,handleSubmit} = this.props;
    const{ProductName} = this.state;
    return (
      <>
          <div className="mt-1"> 
          <strong><span className="badge badge-success"><h5><i className="fa fa-home"></i>&nbsp;&nbsp;<b>{ProductName}</b></h5></span></strong>
          {/*this.props.showSave ? <Button outline size="sm" color="primary" className="font-weight-bold" onClick={handleSubmit}>Save</Button> : ''*/}
          {this.props.showSave ? <ButtonDropdown size="sm" className="pull-right mr-1 font-weight-bold" isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
          <Button id="caret" size="sm" color="success" className="font-weight-bold" onClick={handleSubmit}>&nbsp;&nbsp;&nbsp;&nbsp;Save&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                  <DropdownToggle caret color="success" />
                  <DropdownMenu>
                    <DropdownItem className="font-weight-bold" onClick={handleSubmit}>Save and Rate</DropdownItem>
                    <DropdownItem className="font-weight-bold" onClick={handleSubmit}>Save and Issue</DropdownItem>
                  </DropdownMenu>
          </ButtonDropdown> : ''
          }
          {this.props.showSetToEdit ? <Button type="button" size="sm" color="success" className="pull-right mr-1 font-weight-bold" onClick={setToEdit}><i className="fa fa-pencil"></i>&nbsp;&nbsp;Set To Edit</Button> : ''}
          {this.props.showNewTrans ? <Button type="button" size="sm" color="success" className="pull-right mr-1 font-weight-bold" onClick={openNewTrans}><i className="fa fa-plus"></i>&nbsp;&nbsp;New transaction</Button> : ''}
          <Button type="button" size="sm" color="success" name="RateSheet" className="pull-right mr-1 font-weight-bold" onClick={this.openRateSheet}><i className="fa fa-check"></i>&nbsp;&nbsp; Rate Sheet</Button>
          <Button type="button" size="sm" color="success" className="pull-right mr-1 font-weight-bold"><i className="fa fa-check"></i>&nbsp;&nbsp;Rt. History</Button>
          <Button type="button" size="sm" color="success" className="pull-right mr-1 font-weight-bold"><i className="fa fa-check"></i>&nbsp;&nbsp;FHCF Rate Sheet</Button>
        </div> 
        
      </>
    );
  }
}
const mapStateToProps = (state) => ({
    HeaderPolicyData: state.Policy.HeaderPolicyData,
  });

export default connect(mapStateToProps)(Header);

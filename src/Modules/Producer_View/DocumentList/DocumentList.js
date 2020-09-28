import React, { Component } from 'react';
import { connect } from 'react-redux'
import ProducerService from '../../../services/Producer';

import {
  Button,
  Card,
  CardBody,
} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class DocumentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaving: false,

    }
    this.options = {
      sortIndicator: true,
      // hideSizePerPage: true,
      sizePerPageTemp: 10,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }

  deleteDocument = (n_doctrack_PK) => {

    const {agencyId} = this.props;
    var url = `${this.api}/${agencyId}/deleteDocument/${n_doctrack_PK}`;
    this.setState({isSaving:true});
    this.props.deleteDocumentRequest(url)
      .then(() => {
        this.setState({ isSaving: false});
      })
      .catch((err) => {
        this.setState({ isSaving: false });
      });
  }

  groupNameFormatter = (cell, row, enumObject, rowIndex) => {
    const {groupName} = this.props;
    const result = groupName.find( ({ n_docgroupname_PK }) => n_docgroupname_PK == row.n_docgroupId_FK );
    return (
      <div>
        {result.s_docgroupname}
      </div>
    )
  }

  fileTypeFormatter = (cell, row) => {
    const {fileName_arr} = this.props;
    const result = fileName_arr.find( ({ n_docgroupfilename_PK }) => n_docgroupfilename_PK == row.n_docfileId_FK );
    return (
      <div>
        {result.s_docgroupfilename}
      </div>
    )
  }

  actionFormatter = (cell, row, enumObject, rowIndex) => {
    return (
      <Button
        size="sm"
        color="danger"
        className="btn-pill"
        onClick={() => this.deleteDocument(row.n_doctrack_PK)}
      >
        <i className="fa fa-times-circle-o fa-lg pt-1"></i>
      </Button>
    )
  }

  render() {
    const {
      document_arr,
    } = this.props;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            {document_arr  &&
            <BootstrapTable data={document_arr} version="4" striped hover pagination search tabIndexCell >
              <TableHeaderColumn width="15%" dataField="s_docgroupname" dataFormat={this.groupNameFormatter} dataSort >GROUP NAME</TableHeaderColumn>
              <TableHeaderColumn dataField="s_docgroupfilename" dataFormat={this.fileTypeFormatter} >FILE TYPE</TableHeaderColumn>
              <TableHeaderColumn isKey dataField="s_UserFileName">FILE NAME</TableHeaderColumn>{/*s_FileName*/}
              <TableHeaderColumn dataField="n_FileSize">FILE SIZE</TableHeaderColumn>
              <TableHeaderColumn dataField="" dataFormat={this.actionFormatter}>ACTION</TableHeaderColumn>
            </BootstrapTable>
            }
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  document_arr: state.Producer.docData_arr.docAFT_list,
  groupName: state.Producer.docData_arr.groupDown,
  fileName_arr: state.Producer.docData_arr.fileName_list
})
const mapDispatchToProps = dispatch => ({
  deleteDocumentRequest: (url) => dispatch(ProducerService.deleteDocumentRequest(url))//Origin
});
export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);

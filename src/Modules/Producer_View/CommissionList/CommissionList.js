import React, { Component } from 'react';
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Table, 
  Pagination, 
  PaginationItem, 
  PaginationLink 
} from 'reactstrap';

class DocumentList extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={{ size: 4, order: 1, offset: 8 }} className="float-right">
            <InputGroup>
              <Input type="text" id="input1-group2" name="input1-group2" placeholder="Username" />
              <InputGroupAddon addonType="append">
                <Button type="button" color="primary"><i className="fa fa-search"></i></Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>  
        <Table hover bordered striped responsive size="sm">
          <thead>
          <tr>
            <th>GROUP NAME</th>
            <th>FILE TYPE</th>
            <th>FILE NAME</th>
            <th>FILE SIZE</th>
            <th>ACTION</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>Samppa Nori</td>
              <td>2012/01/01</td>
              <td>Member</td>
              <td>12.98kb</td>
              <td>
                <Button bsSize="sm" color="danger" className="btn-pill">
                  <i className="icon-close icons d-block pt-1"></i>
                </Button>
              </td>
            </tr>
            <tr>
              <td>Estavan Lykos</td>
              <td>2012/02/01</td>
              <td>Staff</td>
              <td>12.98kb</td>
              <td>
                <Button bsSize="sm" color="danger" className="btn-pill">
                  <i className="icon-close icons d-block pt-1"></i>
                </Button>
              </td>
            </tr>
            <tr>
              <td>Chetan Mohamed</td>
              <td>2012/02/01</td>                  
              <td>Admin</td>
              <td>12.98kb</td>
              <td>
                <Button bsSize="sm" color="danger" className="btn-pill">
                  <i className="icon-close icons d-block pt-1"></i>
                </Button>
              </td>
            </tr>
            <tr>
              <td>Derick Maximinus</td>
              <td>2012/03/01</td>
              <td>Member</td>
              <td>12.98kb</td>
              <td>
                <Button bsSize="sm" color="danger" className="btn-pill">
                  <i className="icon-close icons d-block pt-1"></i>
                </Button>
              </td>
            </tr>
            <tr>
              <td>Friderik Dávid</td>
              <td>2012/01/21</td>
              <td>Staff</td>
              <td>12.98kb</td>
              <td>
                <Button bsSize="sm" color="danger" className="btn-pill">
                  <i className="icon-close icons d-block pt-1"></i>
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Pagination>
          <PaginationItem>
            <PaginationLink previous tag="button"></PaginationLink>
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink tag="button">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink tag="button">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink tag="button">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink tag="button">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next tag="button"></PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default DocumentList;

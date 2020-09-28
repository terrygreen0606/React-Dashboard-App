import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Collapse, FormGroup, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {updateQuoteParam} from "../../../../store/actions/policy";
import {policyCommonService, policyService} from "../../../../services/policyService";

class BasicCoverage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.coverageChange = this.coverageChange.bind(this);
    this.apiService = new policyService();
    this.commonService = new policyCommonService();
    this.state = {
      data: {},
      policyData: {},
      quoteParams: {},
      sessionData: {},
      collapse: true,
      fadeIn: true,
      timeout: 300,
      getCoverageLimitPK: {},
      s_PRLimitCode: ""
    };
  }

  componentDidMount() {
    if (this.state.sessionData['insert_id_person']) {
      this.apiService.getCoverageLimit({type: 'PPDECRLMT'})
        .then(data => {
          this.setState({getCoverageLimitPK: data.data})
        })
        .catch(e => console.log(e))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
    this.setState({policyData: nextProps.policyData.data});
    this.setState({sessionData: nextProps.sessionData});
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });
  }

  coverageChange(event, Basici) {
    this.commonService.ChangeLimitOfCoverage(event, 'txt_basicCVGSelectedValue_' + Basici);
    this.props.updateQuoteParam('txt_basicCVGSelectedValue_' + Basici, null, event.target.value);
  }


  render() {
    let Basici = 1, piesep = "", value = "", disabled, elements = [],
      sessionData = this.state.sessionData, policyData = this.state.policyData,
      productSelected = this.state.policyData.ProductSelected,
      insert_id_person = sessionData.data ? sessionData.data['insert_id_person'] : '';
    let occupytype;
    try{
      occupytype =policyData.dropdownData.OCCUPYTYPE;
    }catch (e) {
      occupytype = [{}];
    }
    if (policyData.all_basic_Coverage) {
      for (let item of policyData.all_basic_Coverage) {
        let javascriptFunction, n_PRLimitFK = '', valueObj = {}, valueKeySelected;
        if (item['s_LimitCodeType'] === "NOEDIT") {
          if (sessionData['AccessRights']) {
            if (sessionData['AccessRights']['LevelName'] == 'EMPLOYEE') disabled = 'disabled';
            else disabled = 'false'
          }
          //this is the hard code next time we need to generate from database
          if (item['s_ScreenName'] === "C-Personal Property") {
            if (productSelected == '1' || productSelected == '7' || productSelected == '9' || productSelected == '13') {
              for (let i = 0; i <= 75; i++) {
                valueObj[i] = i + '%';
              }
              valueKeySelected = '50';
            } else if (productSelected == '3' || productSelected == '5') {
              [25, 30, 35, 40, 45, 50].forEach((item) => {
                valueObj[item] = item + '%';
              });
              valueKeySelected = '40';
            } else if (productSelected == '4') {
              [50].forEach((item) => {
                valueObj[item] = item + '%';
              });
              valueKeySelected = '50';
            } else if (productSelected == '6') {
              [10, 20, 30, 40, 50].forEach((item) => {
                valueObj[item] = item + '%';
              });
              valueKeySelected = '50';
            }
          } else {
            if (productSelected == '1' || productSelected == '7' || productSelected == '9' || productSelected == '13') {
              if (item['s_CoverageCode'] == 'HOMCVGB') {
                for (let i = 0; i < 16; i++) {
                  if (i !== 0 && i !== 1 && i < 10) {
                    valueObj['0' + i] = `0${i}%`;
                  } else {
                    valueObj[i] = `${i}%`;
                  }
                }
                valueKeySelected = '02';
              } else {
                valueObj[10] = '10%';
                valueObj[20] = '20%';
                valueKeySelected = 10;
              }
            } else if (productSelected == '2' && productSelected == '8') {
              valueObj[20] = '20%';
              valueKeySelected = '20';
            } else if (productSelected == 3 || productSelected == 4 || productSelected == 5 || productSelected == 6) {
              valueObj[10] = '10%';
              valueKeySelected = '10';
            }
          }
        }
        if (item['s_LimitCodeType'] === "NUMBER" && (productSelected == 1 || productSelected == 2 ||
          productSelected == 5 || productSelected == 6 || productSelected == 9 || productSelected == 13)) {
          javascriptFunction = "onblur=\"CalculatePercentage('" + (sessionData['data'] ? sessionData['data']['AccessRights']['LevelName'] : '') + "');\""
        }
        this.apiService.checkLimit({n_PCCoverageID_PK: item['n_PCCoverageID_PK']})
          .then(data => {
            data = data.data;
            if (data > 0) {
              if ((productSelected == 4 || productSelected == 6) && item['s_CoverageCode'] == 'HOMCVGD') {
                item['s_ScreenName'] = 'Fair Rental Value';
              }
              if (!insert_id_person && (productSelected == 1 || productSelected == 7 || productSelected == 9 ||
                productSelected == 2 || productSelected == 13)) {
                if (item['s_CoverageCode'] === 'HOMCVGE') {
                  n_PRLimitFK = 2;
                } else if (item['s_CoverageCode'] === 'HOMCVGF') {
                  n_PRLimitFK = 50;
                } else if (item['s_CoverageCode'] === 'HOMCVGG') {
                  n_PRLimitFK = 16;
                }
              }
            }
          });
        let options = [];
        for (let item in valueObj) {
          options.push(<option key={item + '_' + Basici} value={item}>{valueObj[item]}</option>)
        }
        elements.push(
          <FormGroup key={item.n_PCCoverageID_PK}>
            <Label style={{display:'block'}}>{item.s_ScreenName}</Label>
            {item.s_LimitCodeType !== 'DROPDOWN' && Object.keys(valueObj).length > 0 &&
            <Input id={"txt_basicCVGSelectedValue_" + Basici} style={{width:'50%',display:'inline-block'}} type="select" key={item.n_PCCoverageID_PK + Basici}
                   onChange={(e) => this.coverageChange(e, Basici)} defaultValue={valueKeySelected}>
              {options}
            </Input>
            }
            {(item.s_LimitCodeType !== 'DROPDOWN' && Object.keys(valueObj).length === 0) ? (
              <Input id={"txt_basicCVG_" + Basici} type="text" key={'txt_basicCVG_' + Basici}
                     onChange={(e) => this.props.updateQuoteParam('txt_basicCVG_' + Basici, null, e.target.value)}
                     readOnly={disabled} onKeyPress={(e) => this.commonService.MyNumeric(e)}/>) :
              (
                <Input name={"dd_basicCVG_"+Basici} id={"dd_basicCVG_"+Basici} style={{width:'50%',display:'inline-block'}}>
                  <option value="">--Select--</option>
                </Input>
              )
            }
          </FormGroup>
        );
        Basici++;
      }
    }
    // }
    return (
      <Card>
        <CardHeader>
          Basic Coverage's
          <div className="card-header-actions">
            {/*eslint-disable-next-line*/}
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
            <Row>
              <Col xs="12" md="4">
                {elements}
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label htmlFor="OCCUPYTYPE">Occupancy Type</Label>
                  <Input id="OCCUPYTYPE" type="select">
                    <option value="">--Select--</option>
                    {
                      occupytype.map(item=>{
                        return (<option value={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>)
                      })
                    }
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
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
)(BasicCoverage);

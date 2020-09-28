import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Card, CardHeader, CardBody, Input, Label, Button } from 'reactstrap';
import { policyService } from "../../../../services/policyService";

class PropertyInfo extends Component {
  constructor(props) {
    super(props);
    this.apiService = new policyService();
    this.state = {
      TbPoriskadditionalinfo : {},
      Personaddress_Location : {},
      RenovationDataRVELECTRIC : {},
      RenovationDataRVHEAT :{},
      RenovationDataRVHWHEAT :{},
      RenovationDataRVPLUMB :{},
      RenovationDataRVROOF :{},
      SeasonalResidence : '',
      TbPolicy :{},
      postalCode_insured : '',
      productPK : '',
      purchaseDate : '',
      CONSTRTYPE : [],
      ROOFTYPE:[],
      ROOFSUBTYPE : [],
      PROTECTIONCLS : [],
      HOBCEGCODE : [],
      OCCUPYTYPE : [],
      WINDPOOLELIGIBILITY : [],
      PRIORINSURANCE : [],
      STRUCTYPE:[],
      HOFIREALARM:[],
      HOBURGALARM:[],
      SPRINKLER:[],
      HOSTORMSHUT:[],
      HOGATEDCOMM:[],
      HOROOFCOVER:[],
      HOROOFDECKATT:[],
      HOROOFWALLCONN:[],
      PLROOFSHAPE:[],
      HOWINDOWPROTECT:[],
      HOWATERRESIST:[],
      RENOVTYPE:[],
    };
  }

  async componentWillReceiveProps(props) {
    this.setState({
      TbPoriskadditionalinfo : props.PropertyData.TbPoriskadditionalinfo,
      Personaddress_Location : props.PropertyData.Personaddress_Location,
      RenovationDataRVELECTRIC : props.PropertyData.RenovationDataRVELECTRIC,
      RenovationDataRVHEAT : props.PropertyData.RenovationDataRVHEAT,
      RenovationDataRVHWHEAT : props.PropertyData.RenovationDataRVHWHEAT,
      RenovationDataRVPLUMB : props.PropertyData.RenovationDataRVPLUMB,
      RenovationDataRVROOF : props.PropertyData.RenovationDataRVROOF,
      SeasonalResidence : props.PropertyData.SeasonalResidence,
      TbPolicy : props.PropertyData.TbPolicy,
      postalCode_insured : props.PropertyData.postalCode_insured,
      productPK : props.PropertyData.productPK,
      purchaseDate : props.PropertyData.purchaseDate,
    });
    if(props.isEdit){
      let list = "CONSTRTYPE,ROOFTYPE,ROOFSUBTYPE,PROTECTIONCLS,HOBCEGCODE,OCCUPYTYPE,WINDPOOLELIGIBILITY,PRIORINSURANCE,STRUCTYPE,HOFIREALARM,HOBURGALARM,SPRINKLER,HOSTORMSHUT,HOGATEDCOMM,HOROOFCOVER,HOROOFDECKATT,HOROOFWALLCONN,PLROOFSHAPE,HOWINDOWPROTECT,HOWATERRESIST,RENOVTYPE";
      const param = {
        list
      }
      let DropDownData = await this.apiService.getAppDD(param);
      this.setState({
        CONSTRTYPE : DropDownData.data.CONSTRTYPE,
        ROOFTYPE : DropDownData.data.ROOFTYPE,
        ROOFSUBTYPE : DropDownData.data.ROOFSUBTYPE,
        PROTECTIONCLS : DropDownData.data.PROTECTIONCLS,
        HOBCEGCODE : DropDownData.data.HOBCEGCODE,
        OCCUPYTYPE : DropDownData.data.OCCUPYTYPE,
        WINDPOOLELIGIBILITY : DropDownData.data.WINDPOOLELIGIBILITY,
        PRIORINSURANCE : DropDownData.data.PRIORINSURANCE,
        STRUCTYPE:DropDownData.data.STRUCTYPE,
        HOFIREALARM:DropDownData.data.HOFIREALARM,
        HOBURGALARM:DropDownData.data.HOBURGALARM,
        SPRINKLER:DropDownData.data.SPRINKLER,
        HOSTORMSHUT:DropDownData.data.HOSTORMSHUT,
        HOGATEDCOMM:DropDownData.data.HOGATEDCOMM,
        HOROOFCOVER:DropDownData.data.HOROOFCOVER,
        HOROOFDECKATT:DropDownData.data.HOROOFDECKATT,
        HOROOFWALLCONN:DropDownData.data.HOROOFWALLCONN,
        PLROOFSHAPE:DropDownData.data.PLROOFSHAPE,
        HOWINDOWPROTECT:DropDownData.data.HOWINDOWPROTECT,
        HOWATERRESIST:DropDownData.data.HOWATERRESIST,
        RENOVTYPE:DropDownData.data.RENOVTYPE,
      });
    }
  }

  inputChangedHandler(e,key){
    const value = e.target.value;
    let which = e.target.type;
    let item = 's_RenovationTypeCode';
    if(which == 'text'){
      item  = 's_RenovationYear';
    }
    let data = {};
    const { TbPoriskadditionalinfo,RenovationDataRVELECTRIC,RenovationDataRVHEAT,RenovationDataRVHWHEAT,RenovationDataRVPLUMB,RenovationDataRVROOF } = this.state;
    var arr = ["RVELECTRICC","RVELECTRICY","RVHEATC","RVHEATY","RVHWHEATC","RVHWHEATY","RVPLUMBC","RVPLUMBY","RVROOFC","RVROOFY"];
    if(arr.indexOf(key) > -1){
      if(arr.indexOf(key) == 0 || arr.indexOf(key) == 1){
        RenovationDataRVELECTRIC[item] = value;
        this.setState({ RenovationDataRVELECTRIC });
        data = RenovationDataRVELECTRIC;
      }else if(arr.indexOf(key) == 2 || arr.indexOf(key) == 3){
        RenovationDataRVHEAT[item] = value;
        this.setState({ RenovationDataRVHEAT });
        data = RenovationDataRVHEAT;
      }else if(arr.indexOf(key) == 4 || arr.indexOf(key) == 5){
        RenovationDataRVHWHEAT[item] = value;
        this.setState({ RenovationDataRVHWHEAT });
        data = RenovationDataRVHWHEAT;
      }else if(arr.indexOf(key) == 6 || arr.indexOf(key) == 7){
        RenovationDataRVPLUMB[item] = value;
        this.setState({ RenovationDataRVPLUMB });
        data = RenovationDataRVPLUMB;
      }else if(arr.indexOf(key) == 8 || arr.indexOf(key) == 9){
        RenovationDataRVROOF[item] = value;
        this.setState({ RenovationDataRVROOF });
        data = RenovationDataRVROOF;
      }
      this.props.inputChangedHandlerRR(key,data,'TbPoriskrenovationtypes');
    }else{
      TbPoriskadditionalinfo[key] = value;
      this.setState({ TbPoriskadditionalinfo });
      this.props.inputChangedHandler(e,key,'TbPoriskadditionalinfo');
    }
  }

  createInput(id,value){
    //let value = feild.id;
    let data = value;
    if(this.props.isEdit){
     data = <Input type="text" name={id} id={id} value={value} onChange={(event) => this.inputChangedHandler(event, id)}/>
    }
    return data;
  }

  createSelect(id,value,Name){
    let data = value;
    if(this.props.isEdit){
      data = <Input type="select" id={id} name={id} value={value} onChange={(event) => this.inputChangedHandler(event, id)}>
            <option key='' value=''>---Select---</option>
            {Name.map((product) => {
              return (<option key={product.s_AppCodeName}
                value={product.s_AppCodeName}>{(product.s_AppCodeNameForDisplay)}
              </option>);
            })}
      </Input>
    }
    return data;
  }

  render() {
    const { TbPoriskadditionalinfo,purchaseDate,RenovationDataRVELECTRIC,RenovationDataRVHEAT,RenovationDataRVHWHEAT,RenovationDataRVPLUMB,RenovationDataRVROOF,
      CONSTRTYPE,ROOFTYPE,ROOFSUBTYPE,PROTECTIONCLS,HOBCEGCODE,OCCUPYTYPE,STRUCTYPE,WINDPOOLELIGIBILITY,PRIORINSURANCE,
      HOFIREALARM,HOBURGALARM,SPRINKLER,HOSTORMSHUT,HOGATEDCOMM,HOROOFCOVER,HOROOFDECKATT,HOROOFWALLCONN,PLROOFSHAPE,HOWINDOWPROTECT,HOWATERRESIST,RENOVTYPE} = this.state;
    const { BasicProperty, ProtectionDevices, WindMitigationModifiers, RenovationDetails } = this.props.propertyInfo;
    return (
      <div className="height-300 overflow-y-auto overflow-x-hidden">
        <Table >
          <tbody>
            <tr >
              <td className="width-property"><b>Year Built : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('n_YearBuilt',TbPoriskadditionalinfo.n_YearBuilt)}</td>
              <td className="width-property"><b>No. of Stroies : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('n_NoOfStories',TbPoriskadditionalinfo.n_NoOfStories)}</td>
              <td className="width-property"><b>No. Of Families : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('n_NoOfFamilies',TbPoriskadditionalinfo.n_NoOfFamilies)}</td>
              <td className="width-property"><b>No. of Residents : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('n_NoOfResidents',TbPoriskadditionalinfo.n_NoOfResidents)}</td>
            </tr>
            <tr >
              <td className="width-property"><b>Construction Type : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_ConstrTypeCode',TbPoriskadditionalinfo.s_ConstrTypeCode,CONSTRTYPE)}</td>
              <td className="width-property"><b>Replacement Value : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('n_ReplacementCost',TbPoriskadditionalinfo.n_ReplacementCost)}</td>
              <td className="width-property"><b>Structure Type : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_StructureTypeCode',TbPoriskadditionalinfo.s_StructureTypeCode,STRUCTYPE)}</td>
              <td className="width-property"><b>Terrain : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('s_terrainexposurecode',TbPoriskadditionalinfo.s_terrainexposurecode)}</td>
              
            </tr>
            <tr >
              <td className="width-property"><b>PPC : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_ProtectionClass',TbPoriskadditionalinfo.s_ProtectionClass,PROTECTIONCLS)}</td>
              <td className="width-property"><b>Valuation ID : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('','')}</td>
              <td className="width-property"><b>BCEG : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_BCEGCode',TbPoriskadditionalinfo.s_BCEGCode,HOBCEGCODE)}</td>
              <td className="width-property"><b>Police code : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('s_PoliceCode',TbPoriskadditionalinfo.s_PoliceCode)}</td>
              
            </tr>
            <tr >
              <td className="width-property"><b>Roof Type : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_RoofTypeCode',TbPoriskadditionalinfo.s_RoofTypeCode,ROOFTYPE)}</td>
              <td className="width-property"><b>Roof Sub Type : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_RoofCondition',TbPoriskadditionalinfo.s_RoofCondition,ROOFSUBTYPE)}</td>
              <td className="width-property"><b>Occupancy Type : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_OccupancyTypeCode',TbPoriskadditionalinfo.s_OccupancyTypeCode,OCCUPYTYPE)}</td>
              <td className="width-property"><b>Area Sft : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('n_HomeSqft',TbPoriskadditionalinfo.n_HomeSqft)}</td>
            </tr>
            <tr>  
              <td className="width-property"><b>Fire Code : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('s_FireCode',TbPoriskadditionalinfo.s_FireCode)}</td>
              <td className="width-property"><b>Distance From Fire Hydrant : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('n_DistanceHydrant',TbPoriskadditionalinfo.n_DistanceHydrant)}</td>
              <td className="width-property"><b>Distance From Fire Station : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('n_DistanceFireStation',TbPoriskadditionalinfo.n_DistanceFireStation)}</td>
              <td className="width-property"><b>Wind Pool  Eligibility : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_WindPoolCode',TbPoriskadditionalinfo.s_WindPoolCode,WINDPOOLELIGIBILITY)}</td>
            </tr>
            <tr>
              <td className="width-property"><b>Swimming Pool : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_SwimPoolTypeCode',TbPoriskadditionalinfo.s_SwimPoolTypeCode,PRIORINSURANCE)}</td>
              <td className="width-property"><b>Usage : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('s_UsageTypeCode',TbPoriskadditionalinfo.s_UsageTypeCode)}</td>
              <td className="width-property"><b>Prior Insurance : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_PriorPolicyCarrier',TbPoriskadditionalinfo.s_PriorPolicyCarrier,PRIORINSURANCE)}</td>
              <td className="width-property"><b>Purchase Date : </b>{TbPoriskadditionalinfo == null ? '' : this.createInput('','')}</td>
            </tr>
          </tbody>
        </Table>
        <Card className="mb-2 no-border">
          <CardHeader className="headingOne">
            Protection Devices
          </CardHeader>
          <CardBody className="p-0">
            <Table responsive>
              <tbody>
                <tr >
                  <td className="width-property"><b>Fire Alarm : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_FireAlarmCode',TbPoriskadditionalinfo.s_FireAlarmCode,HOFIREALARM)}</td>
                  <td className="width-property"><b>Burglar Alarm : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_BurglarAlarmCode',TbPoriskadditionalinfo.s_BurglarAlarmCode,HOBURGALARM)}</td>
                  <td className="width-property"><b>Spinkler : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_SprinklerCode',TbPoriskadditionalinfo.s_SprinklerCode,SPRINKLER)}</td>
                  <td className="width-property"><b>Storm Shutter : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_StormShutterCode',TbPoriskadditionalinfo.s_StormShutterCode,HOSTORMSHUT)}</td>
                  <td className="width-property"><b>Gated Community : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_GatedCommunityCode',TbPoriskadditionalinfo.s_GatedCommunityCode,HOGATEDCOMM)}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Card className="mb-2 no-border">
          <CardHeader className="headingOne">
            Wind Mitigation Modifiers
            <Button color="primary" size="sm" className="float-right">Print Wind Mitigation Report</Button>
          </CardHeader>
          <CardBody className="p-0">
            <Table responsive>
              <tbody>
                <tr >
                  <td className="width-property"><b>Roof Cover : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_roofcovercode',TbPoriskadditionalinfo.s_roofcovercode,HOROOFCOVER)}</td>
                  <td className="width-property"><b>Roof Deck Attachment : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_roofdeckattachcode',TbPoriskadditionalinfo.s_roofdeckattachcode,HOROOFDECKATT)}</td>                  
                  <td className="width-property"><b>Roof Wall Connection : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_roof_wallconnectcode',TbPoriskadditionalinfo.s_roof_wallconnectcode,HOROOFWALLCONN)}</td>
                </tr>
                <tr >
                  <td className="width-property"><b>Roof Shape : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_RoofShapeCode',TbPoriskadditionalinfo.s_RoofShapeCode,PLROOFSHAPE)}</td>                  
                  <td className="width-property"><b>Opening Protection : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_windowprotectcode',TbPoriskadditionalinfo.s_windowprotectcode,HOWINDOWPROTECT)}</td>                  
                  <td className="width-property"><b>Secondary Water Resistance : </b>{TbPoriskadditionalinfo == null ? '' : this.createSelect('s_secwaterresistcode',TbPoriskadditionalinfo.s_secwaterresistcode,HOWATERRESIST)}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Card className="mb-2 no-border">
          <CardHeader className="headingOne">
            Renovation Details
          </CardHeader>
          <CardBody className="p-0">
            <Table responsive>
              <tbody>
                <tr >
                  <td className="font-weight-bold">Electrical</td>
                  <tr><td style={{width:"40%"}}>{RenovationDataRVELECTRIC == null ? this.createSelect('RVELECTRICC','',RENOVTYPE): this.createSelect('RVELECTRICC',RenovationDataRVELECTRIC.s_RenovationTypeCode,RENOVTYPE)}</td><td style={{textAlign: "center",verticalAlign:"middle",width:"20%"}}>-</td><td style={{width:"40%"}}>{RenovationDataRVELECTRIC == null ? this.createInput('RVELECTRICY',''): this.createInput('RVELECTRICY',RenovationDataRVELECTRIC.s_RenovationYear)}</td><td></td></tr>
                  <td className="font-weight-bold">Heating</td>
                  <tr><td style={{width:"40%"}}>{RenovationDataRVHEAT == null ? this.createSelect('RVHEATC','',RENOVTYPE): this.createSelect('RVHEATC',RenovationDataRVHEAT.s_RenovationTypeCode,RENOVTYPE)}</td><td style={{textAlign: "center",verticalAlign:"middle",width:"20%"}}>-</td><td style={{width:"40%"}}>{RenovationDataRVHEAT == null ? this.createInput('RVHEATY',''): this.createInput('RVHEATY',RenovationDataRVHEAT.s_RenovationYear)}</td><td></td></tr>
                </tr>
                <tr >
                  <td className="font-weight-bold">Hotwater Heat</td>
                  <tr><td style={{width:"40%"}}>{RenovationDataRVHWHEAT == null ? this.createSelect('RVHWHEATC','',RENOVTYPE): this.createSelect('RVHWHEATC',RenovationDataRVHWHEAT.s_RenovationTypeCode,RENOVTYPE)}</td><td style={{textAlign: "center",verticalAlign:"middle",width:"20%"}}>-</td><td style={{width:"40%"}}>{RenovationDataRVHWHEAT == null ? this.createInput('RVHWHEATY',''): this.createInput('RVHWHEATY',RenovationDataRVHWHEAT.s_RenovationYear)}</td><td></td></tr>
                  <td className="font-weight-bold">Plumbing</td>                  
                  <tr><td style={{width:"40%"}}>{RenovationDataRVPLUMB == null ? this.createSelect('RVPLUMBC','',RENOVTYPE): this.createSelect('RVPLUMBC',RenovationDataRVPLUMB.s_RenovationTypeCode,RENOVTYPE)}</td><td style={{textAlign: "center",verticalAlign:"middle",width:"20%"}}>-</td><td style={{width:"40%"}}>{RenovationDataRVPLUMB == null ? this.createInput('RVPLUMBY',''): this.createInput('RVPLUMBY',RenovationDataRVPLUMB.s_RenovationYear)}</td><td></td></tr>
                </tr>
                <tr >
                  <td className="font-weight-bold">Roofing</td>
                  <tr><td style={{width:"40%"}}>{RenovationDataRVROOF == null ? this.createSelect('RVROOFC','',RENOVTYPE): this.createSelect('RVROOFC',RenovationDataRVROOF.s_RenovationTypeCode,RENOVTYPE)}</td><td style={{textAlign: "center",verticalAlign:"middle",width:"20%"}}>-</td><td style={{width:"40%"}}>{RenovationDataRVROOF == null ? this.createInput('RVROOFY',''): this.createInput('RVROOFY',RenovationDataRVROOF.s_RenovationYear)}</td><td></td></tr>
                  <td></td><td></td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
        {/*<Card className="mb-2 no-border">
          <CardHeader className="headingOne">
            Other Detached Structure Analysis
          </CardHeader>
          <CardBody className="p-0">
            <Table responsive>
              <tbody>
                <tr className="odd">
                  <td><Label for="select_17_521">Other Structure</Label></td>
                  <td>
                    <Input type="select" id="select_17_521" name="data[select_17_521]" size="sm">
                      <option value="">--Select--</option>
                      <option value="Yes" selected="selected">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </td>
                </tr>
                <tr className="even">
                  <td><Label for="text_17_522">Fence Amount</Label></td>
                  <td><Input type="text" id="text_17_522" name="text_17_522" size="sm" value="3000.00" /></td>
                </tr>
                <tr className="odd">
                  <td><Label for="text_17_523">Shed Amount</Label></td>
                  <td><Input type="text" id="text_17_523" name="text_17_523" size="sm" value="0.00" /></td>
                </tr>
                <tr className="even">
                  <td><Label for="text_17_524">Detach Garage Amount</Label></td>
                  <td><Input type="text" id="text_17_524" name="text_17_524" size="sm" value="0.00" /></td>
                </tr>
                <tr className="odd">
                  <td><Label for="text_17_525">Other Amount</Label></td>
                  <td><Input type="text" id="text_17_525" name="text_17_525" size="sm" value="0.00" /></td>
                </tr>
                <tr className="even">
                  <td><Label for="text_17_526">Total Amount</Label></td>
                  <td><Input type="text" id="text_17_526" name="text_17_525" size="sm" value="3000.00" disabled /></td>
                </tr>
                <tr className="odd">
                  <td></td>
                  <td><Button color="primary" size="sm">Update Other Structure</Button></td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
        */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  propertyInfo: state.Policy.policyData.PropertyInfo
})
export default connect(mapStateToProps)(PropertyInfo);

import {
  GET_POLICY_BASE_DATA, GET_POLICY_FILTERED_DATA,
  GET_SESSION_DATA,
  SET_POLICY_BASE_DATA, SET_POLICY_FILTERED_DATA,
  SET_SESSION_DATA,
  UPDATE_QUOTE_PARAM,
  SET_POLICY_DATA,
  SET_PARAM_FOR_ISSUED_SCR,
  SET_POL_HEAD_DATA,
  SET_MAX_TRANS_DATA
} from '../action-types';

const initialState = {
  policyData: {
    BasicInfo: {
      PolicyNo: 'VH30020414/3',
      HolderName: 'ANALIA CABRAL & RICHARD M PULIDO QUINTAS',
      Address: '915 BASILICA LN KISSIMMEE, POLK, FL, 34759',
      TermStartDate: '05-31-2019',
      TermEndDate: '05-31-2020',
      TransactionEffDate: '05-31-2019',
      TransactionExpDate: '05-31-2020',
      TransactionType: 'Renewal - Ann. Ren',
      LastUpdatedBy: 'Jair Robles',
      Premium: 656,
      PremiumChange: 656,
      TotalPremium: 683,
      BillTo: 'MORTAGE',
      PaymentPlan: 'Full Pay',
      EquityDay: '05-31-2020',
      ServRep: 'Patricia McKenzie',
      U_writer: 'Patricia McKenzie',
      ProductName: 'HO3 Diamond',
    },
    CoverageData: {
      Basic: [
        {
          BasicCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        },
        {
          BasicCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        },
        {
          BasicCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        },
        {
          BasicCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        },
        {
          BasicCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        },
        {
          BasicCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        }
      ],
      Optional: [
        {
          OptionalCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        },
        {
          OptionalCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        },
        {
          OptionalCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        },
        {
          OptionalCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        },
        {
          OptionalCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        },
        {
          OptionalCoverage: 'A-Dwelling',
          Limit: 275000,
          Premium: 'Included'
        }
      ],
      Discount: [
        {
          DiscountName: '$2500 Deductible',
          EffectiveFrom: '01-24-2020',
          EffectiveTo: '01-24-2020'
        },
        {
          DiscountName: '$2500 Deductible',
          EffectiveFrom: '01-24-2020',
          EffectiveTo: '01-24-2020'
        },
        {
          DiscountName: '$2500 Deductible',
          EffectiveFrom: '01-24-2020',
          EffectiveTo: '01-24-2020'
        },
        {
          DiscountName: '$2500 Deductible',
          EffectiveFrom: '01-24-2020',
          EffectiveTo: '01-24-2020'
        },
        {
          DiscountName: '$2500 Deductible',
          EffectiveFrom: '01-24-2020',
          EffectiveTo: '01-24-2020'
        }
      ]
    },
    PropertyInfo: {
      BasicProperty: {
        year_built: 1982,
        no_of_stories: 1,
        no_of_families: 1,
        no_of_residents: 1,
        construction_type: 'Masonry',
        replacement_value: '$275,000.00',
        structure_type: 'Dwelling',
        terrain: 'TERRAINB',
        ppc: 3,
        valuation_id: '',
        bceg: 99,
        police_code: '',
        roof_type: 'Composition',
        fire_code: '',
        roof_sub_type: 'Architectural',
        distance_from_fire_station: 5,
        distance_from_fire_hydrant: 1000,
        occupancy_type: 'Owner',
        area_sft: 1987,
        wind_pool_eligibiliy: '',
        swimming_pool: 'Yes',
        usage:	'Primary',
        prior_insureance:	'Yes',
        purchase_date:	'1982-12 (YYYY-MM)'
      },
      ProtectionDevices: {
        fire_alarm: 'Central',
        burglar_alarm: 'Central',
        sprinkler: '',
        storm_shutter: '',
        gated_community: 'No'
      },
      WindMitigationModifiers: {
        roof_cover: 'FBC Equivalent',
        roof_deck_attachment: 'Level C',
        roof_wall_connection: 'Clips',
        roof_shape: 'Gable',
        opening_protection: 'None',
        secondary_water_resistance: 'None - No Secondary Water Resistance'
      },
      RenovationDetails: {
        electrical: '-',
        heating: 'Full  - 2013',
        hotwater_heat: 'Full  - 2017',
        plumbing: 'Patrial  - 2017',
        roofing: 'Full  - 2005'
      }
    },
    AdditionalInfo: {
      ClaimInfomation: {
        TotalClaim: 0,
        TotalPayment: 0
      },
      PriorInsuranceInformation: {
        PriorCarrierName: 'Citizens Property',
        PriorPolicyNo: '02742315',
        PriorExpDate: '01-24-2020'
      },
      MortgageesInformation: [
        {
          Type: '',
          ClientId: '',
          MortgageesName: '',
          MortgageesAddress: '',
          Loan: '',
        }
      ],
      HouseHoldMembers: [
        {
          Relation: '',
          Type: '',
          First: '',
          Last: '',
        }
      ],
      AdditionalInterest: [
        {
          Interest: '',
          InterestName: '',
        }
      ],
      ListAllLoos5Year: [
        {
          LossDate: '',
          LossType: '',
          LossCard: '',
          LossCatNo: '',
          LossAmt: '',
        }
      ]
    },
    Billing: {
      Account: [
        {
          AccountingDate: '09-25-2019',
          TransType: 'Invoice Renewal',
          TransRef: 'INV00394869',
          UserId: 'Anamaria Jaramillo',
          Unallocated: 5069.00,
          Debit: 5069.00,
          Credit: 0,
          Balance: 5069.00,
          SystemDate: '09-25-2019 09:51:01',
          Details: [
            {
              TransSubType: 'Ann. Renewal',
              TransRef: 'HO32016063161',
              EffDate: '06-02-2019',
              Debit: 4069.00,
              Credit: 0,
              RunningBal: 4069.00
            },
            {
              TransSubType: 'Ann. Renewal',
              TransRef: 'HO32016063161',
              EffDate: '06-02-2019',
              Debit: 4069.00,
              Credit: 0,
              RunningBal: 4069.00
            },
            {
              TransSubType: 'Ann. Renewal',
              TransRef: 'HO32016063161',
              EffDate: '06-02-2019',
              Debit: 4069.00,
              Credit: 0,
              RunningBal: 4069.00
            },
            {
              TransSubType: 'Ann. Renewal',
              TransRef: 'HO32016063161',
              EffDate: '06-02-2019',
              Debit: 4069.00,
              Credit: 0,
              RunningBal: 4069.00
            },
            {
              TransSubType: 'Ann. Renewal',
              TransRef: 'HO32016063161',
              EffDate: '06-02-2019',
              Debit: 4069.00,
              Credit: 0,
              RunningBal: 4069.00
            }
          ]
        }
      ],
      Receivable: [
        {
          AccountingDate: '09-25-2019',
          TransType: 'New Business',
          TransSubType: 'Agent Business',
          TransRef: 'HO32016063161',
          EffDate: '06-02-2019',
          Debit: 5069.00,
          Credit: 0,
          RunningBal: 4069.00
        }
      ],
      Invoice: [
        {
          InvoiceDate: '09-25-2019',
          InvoiceNo: 'INV00394869',
          Status: 'Done',
          Premium: 5069.00,
          OtherCharges: 0,
          DueAmt: 5069.00,
          PrevBal: 0.00,
          PmtsAdjust: 0.00,
          InvoiceAmt: 5069.00,
          DueDate: '09-25-2019 09:51:01',
          Details: [
            {
              TransDate: '06-02-2019',
              PolicyNo: 'HO32016063161',
              TransType: 'New Business',
              TransAmnt: 4069.00,
              BilledAmt: 4069.00,
            }
          ],
          FeeDetails: [
            {
              ChargName: 'EMPAT Fee',
              AmountPercent: 'DISCSIGN2B',
              Value: 2.00,
              ChargesAmt: 2.00,
            },
            {
              ChargName: 'MGA Fee',
              AmountPercent: 'DISCSIGN2B',
              Value: 25.00,
              ChargesAmt: 25.00,
            }
          ]
        }
      ],
      SubLedger: [
        {
          AccountingDate: '09-25-2019',
          TransType: 'New Business',
          TransRef: 'HO32016063161',
          Debit: 5069.00,
          Credit: 0,
          SubLedger: 'Accounts Receivable - HO3 EPIC HO3 Diamond',
          SystemDate: '12-18-2019'
        }
      ]
    }
  },
  searchParams: {},
  quoteParams: {
    GetProductDD: 13,
    AgencyDropDown: 6564,
    AgentDropDown: 6565,
    BinderDate: '',
    FinalPremium: '',
    Policy_No_Header_SimpleSolve: '',
    InceptionDate_SimspleSolve: '00-00-0000',
    Citizen_Total_Premium: '',
    TransactionPK: '1344188',
    n_StateId_FKName: 'PA',
    n_CountyId_FKName: 'CHESTER',
    Propertyzone: '',
    Policy_No_Header: 'EPC2020000007',
    n_CityId_FKName: 'WEST CHESTER',
    n_CityId_FKName1: 'WEST CHESTER',
    n_StateId_FKName1: 'PA',
    n_CountyId_FKName1: 'CHESTER',
    val_id: '',
    valuation_LastInsertedId: '',
    n_CityId_FKName2: 'WEST CHESTER',
    n_StateId_FKName2: 'PA',
    n_CountyId_FKName2: 'CHESTER',
    txt_basicCVG_1: '25,0000.00',
    chkfildbasic_1: 'NUMBER',
    txt_basicCVGSelectedValue_2: '02',
    txt_basicCVG_2: '500.00',
    chkfildbasic_2: 'NOEDIT',
    txt_basicCVGSelectedValue_3: 50,
    txt_basicCVG_3: '12,500.00',
    chkfildbasic_3: 'NOEDIT',
    txt_basicCVGSelectedValue_4: 10,
    txt_basicCVG_4: '2,500.00',
    chkfildbasic_4: 'NOEDIT',
    dd_basicCVG_5: 2,
    chkfildbasic_5: 'DROPDOWN',
    dd_basicCVG_6: '50',
    chkfildbasic_6: 'DROPDOWN',
    chkEndorse_23: '23',
    chkfild_23: 'NOEDIT',
    chkEndorse_10: '10',
    chkfild_10: 'NOEDIT',
    chkEndorse_22: '22',
    txtCvgLimitAmt_22: '1000',
    chkfild_22: 'SUPPFORM',
    chkEndorse_11: '11',
    ddCvgLimitAmt_11: '35',
    chkfild_11: 'DROPDOWN',
    chkEndorse_12: '12',
    ddCvgLimitAmt_12: '3',
    chkfild_12: 'DROPDOWN',
    chkEndorse_20: '20',
    ddCvgLimitAmt_20: '114',
    chkfild_20: 'DROPDOWN',
    chkEndorse_95: '95',
    chkEndorse_96: '96',
    ddCvgLimitAmt_96: '8',
    chkfild_96: 'DROPDOWN',
    chkEndorse_100: '100',
    chkfild_100: 'NOEDIT',
    chkEndorse_101: '101',
    ddCvgLimitAmt_101: '104',
    chkfild_101: 'DROPDOWN',
    chkEndorse_102: '102',
    chkfild_102: 'NOEDIT',
    chkEndorse_103: '103',
    chkfild_103: 'NOEDIT',
    chkEndorse_39: '39',
    chkfild_39: 'NOEDIT',
    chkEndorse_104: '104',
    chkfild_104: 'NOEDIT',
    ddDeductNonHurricane: 'DED1000',
    ddDeductHurricane: 'HURRA02P',
    listalllossesRadio: 'Yes',
    TableRowIncrementNo_PriorLoss: '0',
    PriorLoss_Table_length: '5',
    radio_12984303: 'Yes',
    radio_12984362: 'Yes',
    hdnService: 'txt_basicCVG_1|txt_basicCVG_2~2.00|txt_basicCVG_3~50.00|txt_basicCVG_4~10.00',
    hdnService_BasciCVG: '1|2|3|4|5|6',
    hdnService_EndovCVG: '23|10|22|11|12|20|95|96|100|101|102|103|39|104',
    hdnService_EndovCVGJavascriptCheck: '23~NOEDIT|10~NOEDIT|22~SUPPFORM|11~DROPDOWN|12~DROPDOWN|20~DROPDOWN|95~DROPDOWN|' +
      '96~DROPDOWN|100~NOEDIT|101~DROPDOWN|102~NOEDIT|103~NOEDIT|39~NOEDIT|104~NOEDIT',
    deletedSelectedCvg: '',
    TabClick: '',
    ZipError: '',
    FormName: 'QuoteForm',
    WindcoverageExclusionCheck: 'DONOT',
    PersPropExclusionCheck: '',
    SinkHoleExclusionCheck: '',
    PersPropReplCostCheck: 'DISCOUNT',
    mode: '',
    ProductPK: '13',
    SimpleSolveTerm_Sequence: '',
    fireCertificateDocUploadfileSelectFile: '',
    burglarCertificateDocUploadfileSelectFile: '',
    windMitCertificateDocUploadfileSelectFile: '',
    YearBuiltCertificateDocUploadfileSelectFile: '',
    dobCertificateDocUploadfileSelectFile: '',
    TableRowIncrementNo_Mortgagees: '0',
    TableRowIncrementNo_Addl_Interest: '0',
    Addl_Interest_Table_length: '5',
    PersonInfoId_mortgagee: '',
    PersonAddressInfoId_mortgagee: '',
    n_PORiskMortgagee_Pk: '',
    data: {
      HOBURGALARM: 'CENTRAL',
      HOGATEDCOMM: 'YES',
      SPRINKLER: 'CLASSA',
      HOROOFCOVER: 'FBC',
      HOROOFDECKATT: 'LEVELB',
      HOROOFWALLCONN: 'TOENAIL',
      PLROOFSHAPE: 'GABLE',
      HOWINDOWPROTECT: 'HURRICANE',
      s_secwaterresistcode: 'FOAMADHESIVE',
      HOFIREALARM: 'CENTRAL',
      OCCUPYTYPE: 'OWNER',
      PROTECTIONCLS: 2,
      HOBCEGCODE: 7,
      yearbuilt: 2015,
      STRUCTYPE: 'CO-OP',
      CONSTRTYPE: 'MASONARY',
      ROOFTYPE: 'TILE',
      ROOFSUBTYPE: '',
      s_UsageTypeCode: 'SEASONAL6MO',
      TableRowIncrementNo_Household: '0',
      HouseHold_Table_length: '5',
      n_CityId_FKName_Household: '',
      n_StateId_FKName_Household: '',
      n_CountyId_FKName_Household: '',
      PersonInfoId_Household: '',
      PersonAddressInfoId_Household: '',
      n_POApplicant_Household: '',
      n_PersonRoleId_PK: '',
      TbPotermmaster: {
        d_TermStartDate: '02-11-2020',
        d_TermEndDate: '02-11-2021',
        n_TermMaster_PK: 1169229,
      },
      TbPotransaction: {
        n_potransaction_PK: 1344188
      },
      TbPoappsmaster: {
        s_UWAppStatusTypeCode: 'UWOPEN',
        n_POAppsMaster_PK: 1016747,
        n_PORiskMaster_PK: 1034933,
        n_AmountIncludedApp: '0.00'
      },
      TbPoriskmaster: {
        n_PORiskMaster_PK: 1034932
      },
      TbPolicy: {
        n_PolicyNoId_PK: 1017013,
        d_InsuredLivingDate: '2020-02',

      },
      TbPorisklosshistorie: {
        d_LossDate: '',
        s_LossType: '',
        s_LossDescription: '',
        s_LossCatNo: '',
        n_LossAmount: '',
      },
      TbHurricane: {},
      TbPersoninfo: {
        s_FirstName: 'VITALY',
        s_MiddleName: '',
        s_LastOrganizationName: 'KROIVETS',
        s_FullLegalName: 'VITALY  KROIVETS',
        d_BirthDate: '10-16-1985',
        s_OccupationDesc: 'engineer',
        s_IsMailAddDiff: 'No',
        s_IsNewPurchase: 'Yes',
        s_EntityType: 'PERSON',
        s_PersonStatusCode: 'Active',
        n_PersonInfoId_PK: '1109114'
      },
      Tb: {
        s_FirstName: '',
        s_MiddleName: '',
        s_LastOrganizationName: '',
      },
      TbPersonaddress: {
        s_HouseNo: 201392,
        s_StreetName: '303 DEAN ST',
        s_PostalCode: 19382,
        n_CityId_FK: 57793,
        n_StateId_FK: 38,
        n_CountryId_FK: 1,
        n_CountyId_FK: 504,
        s_IsDefaultAddress: 'Y',
        n_PersonAddressesId_PK: '2244871',
      },
      TbPhoneinfo: {
        s_PhoneNumber: '(653) 821-2322',
        n_PhoneInfoId_PK: '3',
      },
      TbPhoneinfo_fax: {
        n_PhoneInfoId_PK: ''
      },
      TbEmailinfo: {
        s_EmailAddress: 'VITALY.KROIVETS@OUTLOOK.COM',
        d_CreatedDate: '2020-02-10 01:41:42',
        n_CreatedUser: 1,
        n_EmailInfoId_PK: 23
      },
      TbPersonaddressMail: {
        s_HouseNo: 30391,
        s_HouseDirection1: 'NW',
        s_StreetName: '303 DEAN ST',
        s_HouseType: 'LN',
        s_PostalCode: 19382,
        n_CityId_FK: 57793,
        n_StateId_FK: 38,
        n_CountryId_FK: 1,
        s_HouseDirection2: 'S',
        n_CountyId_FK: '504',
        n_PersonAddressesId_PK: '2244872',
        n_Zipcodes_FK: '67888'
      },
      TbPoriskadditionalinfo: {
        n_ReplacementCost: '',
        n_NoOfResidents: 2,
        n_NoOfStories: 3,
        n_HomeSqft: 2029,
        n_NoOfFamilies: '',
        s_DistanceFromWater: '',
        n_DistanceFireStation: 20,
        n_DistanceHydrant: 42,
        s_SurfaceRoughness: '',
        s_Smoker: 'Yes',
        s_terrainexposurecode: 'HVHZ',
        s_FBCwindspeedcode: 'FBC120',
        s_roofcovercode: 'FBC',
        s_roofdeckattachcode: 'LEVELB',
        s_roof_wallconnectcode: 'TOENAIL',
        s_RoofShapeCode: 'GABLE',
        s_windowprotectcode: 'HURRICANE',
        s_secwaterresistcode: 'FOAMADHESIVE',
        s_WBDRcode: '',
        s_roofdeckcode: 'OTHER',
        s_WatercraftHPEngine: '',
        s_WatercraftLength: '',
        n_PORiskAdditionalInfo_PK: 1637523,
      },
      TbPersonaddressPrior: {
        s_HouseNo: 202912,
        s_HouseDirection1: 'NW',
        s_StreetName: '303 DEAN ST',
        s_HouseType: 'BND',
        s_PostalCode: 19382,
        n_CityId_FK: 57793,
        n_StateId_FK: 38,
        n_CountryId_FK: 1,
        s_HouseDirection2: 'NE',
        n_CountyId_FK: 504,
        n_PersonAddressesId_PK: 2244873,
        n_Zipcodes_FK: 67888
      },
      TbAccountmaster: {
        n_AgencyAddlInfoId_PK: '1024437',
        s_BillToType: 'POLHOLDER',
        s_PayPlanCode: 'FULLPAY',
      },
      TbPopriorcoveragedetail: {
        s_PriorCarrierName: '',
        s_PriorPolicyNo: '',
        d_PolicyExpirationDate: '',
        n_POPriorCoverage_PK: '',
        n_PolicyMaster_FK: '1017013',
        n_CreatedTransaction_FK: '1344188',
      },
      TbPoriskrenovationtype: [
        {
          s_RenovationTypeCode: '',
          s_RenovationYear: '',
          n_PoRiskAdditionalInfo_Fk: '1637523',
          n_PoRiskRenovation_PK: '',
          d_CreatedDate: '2020-02-10 01:41:42',
          n_CreatedUser: '1',
        }, {
          s_RenovationTypeCode: '',
          s_RenovationYear: '',
          n_PoRiskAdditionalInfo_Fk: '1637523',
          n_PoRiskRenovation_PK: '',
          d_CreatedDate: '2020-02-10 01:41:42',
          n_CreatedUser: '1',
        },
        {
          s_RenovationTypeCode: '',
          s_RenovationYear: '',
          n_PoRiskAdditionalInfo_Fk: '1637523',
          n_PoRiskRenovation_PK: '',
          d_CreatedDate: '2020-02-10 01:41:42',
          n_CreatedUser: '1',
        },
        {
          s_RenovationTypeCode: '',
          s_RenovationYear: '',
          n_PoRiskAdditionalInfo_Fk: '1637523',
          n_PoRiskRenovation_PK: '',
          d_CreatedDate: '2020-02-10 01:41:42',
          n_CreatedUser: '1',
        },
        {
          s_RenovationTypeCode: '',
          s_RenovationYear: '',
          n_PoRiskAdditionalInfo_Fk: '1637523',
          n_PoRiskRenovation_PK: '',
          d_CreatedDate: '2020-02-10 01:41:42',
          n_CreatedUser: '1',
        },
      ],
      TbPoappsapplicant: {
        s_POApplicantTypeCode: '',
        s_PersonRoleType: ''
      },
      TbPersonaddress_Household: {
        s_HouseNo: '',
        s_HouseDirection1: '',
        s_StreetName: '',
        s_HouseType: '',
        s_HouseDirection2: '',
        n_CityId_FK: '49',
        n_StateId_FK: '',
        n_CountryId_FK_Household: '',
        s_PostalCode: '',
        n_CountyId_FK: '',
      },
      TbPersoninfo_mortgagee: 's_LastOrganizationName',
      TbPoriskmortgagee: {
        s_PoMortgageeTypeCode: '',
        s_LoanNumber: '',
      },
      TbPoappsotherpartie: {
        s_PartyInterestCode: ''
      },
      TbPersoninfo_Addl_Interest: {
        s_FirstName: '',
        s_MiddleName: '',
        s_LastOrganizationName: '',
      },
      TbPersonaddress_Addl_Interest: {
        s_HouseNo: '',
        s_HouseDirection1: '',
        s_StreetName: '',
        s_HouseType: '',
        s_HouseDirection2: '',
        n_CityId_FK: '',
        n_StateId_FK: '49',
        n_CountryId_FK: '',
        s_PostalCode: '',
        n_CountyId_FK: '',
      },
      DROPDOWN_12984311: '',
    },
    n_CityId_FKName_Addl_Interest: '',
    n_StateId_FKName_Addl_Interest: '',
    n_CountyId_FKName_Addl_Interest: '',
    PersonInfoId_Addl_Interest: '',
    PersonAddressInfoId_Addl_Interest: '',
    n_POAppOtherParties_Addl_Interest: '',
    n_PoRiskLossHistory_PK: '',
    whichFileMissingUpload: '',
    FileDocumentType: '',
    WhichButton: 'Ratesubmit',
    userLevel: 'EMPLOYEE',
    text_12984306: '',
    text_12984307: '',
    text_12984308: '',
    text_12984309: '',
    text_12984310: '',
    text_12984312: '',
    text_12984313: '',
    text_12984315: '',
    text_12984316: '',
    text_12984317: '',
    text_12984318: '',
    text_12984320: '',
    text_12984321: '',
    text_12984322: '',
    text_12984323: '',
    text_12984324: '',
    text_12984325: '',
    text_12984326: '',
    text_12984327: '',
    text_12984363: '',
    text_12984364: '',
    text_12984328: '',
    text_12984329: '',
    text_12984365: '',
    text_12984366: '',
    text_12984367: '',
    text_12984368: '',
    text_12984330: '',
    text_12984331: '',
    text_12984332: '',
    text_12984333: '',
    text_12984334: '',
    text_12984335: '',
    text_12984336: '',
    text_12984337: '',
    text_12984338: '',
    text_12984339: '',
    text_12984340: '',
    text_12984341: '',
    text_12984342: '',
    text_12984343: '',
    text_12984344: '',
    text_12984345: '',
    text_12984346: '',
    text_12984347: '',
    text_12984348: '',
    text_12984349: '',
    text_12984350: '',
    text_12984351: '',
    text_12984352: '',
    text_12984354: '',
    text_12984355: '',
    text_12984356: '',
    text_12984357: '',
    text_12984358: '',
    text_12984359: '',
    text_12984360: '',
    text_12984361: '',
  },
  filteredCount: 0,
  sessionData: {},
  filteredPolicyData: [],
  n_POPolicyMasterFK:'',
  policy_No:'',
  TermMasterPK:'',
  n_potransaction_PK:'',
  HeaderPolicyData:[],
  HeaderTermData:[],
  HeaderPremData:[],
  HeaderData:{},
  MaxTransactionEffDate:'',
  MaxTranTypeScreenName:'',
  MaxTransCreatedBy :'',
  MaxTransDate : '',
  HeaderSerRepData : [],
  HeaderBillToData : [],
  HeaderClaimData:[],
  HeaderAddrData:[]
};

/*const setParamForIssuedScr = (state, payload) => {
  const stateObj = Object.assign({}, state, {
    ClientPk : payload,
    showMortTab : false,
  });
  return stateObj;
}*/

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_POLICY_BASE_DATA: {

      return {
        policyData: state.policyData
      };
    }
    case SET_POLICY_BASE_DATA: {

      const policyData = action.content;
      return Object.assign({}, state, {
        //loading : false,
        policyData
      });
    }
    case GET_SESSION_DATA: {

      return {
        sessionData: state.sessionData
      };
    }
    case SET_SESSION_DATA: {

      const sessionData = action.content;
      return Object.assign({}, state, {
        //loading : false,
        sessionData
      });
    }
    case UPDATE_QUOTE_PARAM: {

      const {parentKey, childKey, value} = action.payload;

      if (childKey) {
        state.quoteParams[parentKey][childKey] = value;
      } else {
        state.quoteParams[parentKey] = value;
      }

      const quoteParams = state.quoteParams;
      return {...state, quoteParams};
    }

    case GET_POLICY_FILTERED_DATA: {
      const {filteredPolicyData, totalCount} = state;
      return {
        filteredPolicyData, totalCount
      }
    }
    case SET_POLICY_FILTERED_DATA: {
      const {ResultSate: filteredPolicyData, TotalCount: filteredCount} = action.content;
      return Object.assign({}, state, {
        filteredPolicyData,
        filteredCount,
      });
    }
    case SET_POLICY_DATA: {
      return {
        ...state,
        policyData: action.content
      }
    }
    case SET_PARAM_FOR_ISSUED_SCR:{
      const {n_POPolicyMasterFK: n_POPolicyMasterFK, policy_No: policy_No,TermMasterPK:TermMasterPK,n_potransaction_PK:n_potransaction_PK} = action.payload;
      return Object.assign({}, state, {
        n_POPolicyMasterFK,
        policy_No,
        TermMasterPK,
        n_potransaction_PK,
      });
    }
    case SET_POL_HEAD_DATA:{
      const {HeaderData} = action.content;
      const {policydetails:HeaderPolicyData} = action.content;
      const {termdata:HeaderTermData} = action.content;
      const {poprimiumtransdata:HeaderPremData} = action.content;
      const {serRepData:HeaderSerRepData} = action.content;
      const {billToData:HeaderBillToData} = action.content;
      const {claimData:HeaderClaimData} = action.content;
      const {insuredData:HeaderAddrData} = action.content;
      return Object.assign({}, state, {
        HeaderPolicyData,
        HeaderTermData,
        HeaderPremData,
        HeaderData,
        HeaderClaimData,
        HeaderSerRepData,
        HeaderBillToData,
        HeaderAddrData
      });
    }
    case SET_MAX_TRANS_DATA:{
      const {MaxTransactionEffDate: MaxTransactionEffDate, MaxTranTypeScreenName: MaxTranTypeScreenName,MaxTransCreatedBy:MaxTransCreatedBy,MaxTransDate:MaxTransDate} = action.payload;
      return Object.assign({}, state, {
        MaxTransactionEffDate,
        MaxTranTypeScreenName,
        MaxTransCreatedBy,
        MaxTransDate,
      });
    }
    default:
      return state;
  }
}


import React, { useState } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";

import { DashboardService } from "../../../services/dashboard/dashboardService";
import { toastAction } from "../../../store/actions/toast-actions";
import { identify } from "../../../utilities/dashboard";

const DataTablePagination = ({ data, identifier }) => {
  const apiService = new DashboardService();

  // Loading Template
  const loading = (
    <div className="animated fadeIn">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );

  // Identified Headers
  const identified = identify(identifier);
  const fields = identified.fields;
  const paginationUrl = identified.url;

  // States
  const [fetching, setFetching] = useState(false);
  const [tableData, setTableData] = useState(data.data);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(data.total);

  // Funcs
  const fetchPaginated = async (page) => {
    setFetching(true);
    try {
      const response = await apiService.fetchPaginated(paginationUrl, page);

      setTableData(response.tableData.data);
      setPage(response.tableData.current_page);
      setTotal(response.tableData.total);
      setFetching(false);
    } catch (error) {
      toastAction(false, error.message);
    }
  };

  // Table Options
  const options = {
    sortIndicator: true,
    hideSizePerPage: true,
    paginationSize: 3,
    hidePageListOnlyOnePage: true,
    alwaysShowAllBtns: false,
    withFirstAndLast: false,
    onPageChange: fetchPaginated,
    page,
  };

  const dataFormat = (cell, row, field) => {
    const standard = <>{cell}</>;

    switch (field) {
      case "white_glove_service":
        const icon = cell ? "fa-check" : "fa-close";
        return (
          <i
            className={"fa " + icon}
            style={{ fontSize: 24 + "px", color: "#4dbd74" }}
          ></i>
        );
      default:
        return standard;
    }
  };

  const colClass = (objKey) => {
    if (["last_documented", "lastDocumented"].includes(objKey))
      return "bg-danger";
    else if (
      ["last_called_on", "lastCalledAgency", "lastCalledOc"].includes(objKey)
    )
      return "bg-primary";
    else if (objKey === "successAreas") return "bg-success";
    else if (objKey === "improveAreas") return "bg-warning";
    else return "";
  };

  return fetching ? (
    loading
  ) : (
    <BootstrapTable
      data={tableData}
      version="4"
      hover
      pagination
      options={options}
      fetchInfo={{ dataTotalSize: total }}
      remote
    >
      {Object.keys(fields).map((objKey, i) => (
        <TableHeaderColumn
          key={i}
          dataAlign={
            ["description", "claimType"].includes(objKey) ? "left" : "center"
          }
          headerAlign="center"
          isKey={i === 0 ? true : false}
          dataField={objKey}
          dataFormat={dataFormat}
          formatExtraData={objKey}
          columnClassName={() => colClass(objKey)}
        >
          {fields[objKey]}
        </TableHeaderColumn>
      ))}
    </BootstrapTable>
  );
};

export default DataTablePagination;

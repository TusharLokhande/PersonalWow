import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicGrid from "../../../Components/DynamicGrid/DynamicGrid";
import Heading from "../../../Components/Heading/Heading";
import { APICall } from "../../../Helpers/API/APICalls";
import { getEngagementMasterGridData } from "../../../Helpers/API/APIEndPoints";
const EngagementMaster = () => {
  let navigate = useNavigate();
  const [engagementMasterData, setEngagementMasterData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [start, setStart] = useState(0);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(0);

  const getEngagementMasterData = async () => {
    let requestParams = {
      start: start,
      pageSize: pageSize,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      searchText: searchText,
    };
    const { data } = await APICall(
      getEngagementMasterGridData,
      "POST",
      requestParams
    );
    setEngagementMasterData(data.engagementMasterData);
    setCount(data.count);
  };

  useEffect(() => {
    getEngagementMasterData();
  }, [start, sortColumn, sortDirection, searchText, count]);

  const gridColumns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
      },
    },
    {
      name: "engagement",
      label: "Engagement",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "povalue",
      label: "PO Value",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "pomonths",
      label: "PO Months",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "billing",
      label: "Billing",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "poresourcesPerMonth",
      label: "PO Resources Per Month",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "budgetResoucesPerMonth",
      label: "Budget Resouces Per Month",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "pomanDaysPerMonth",
      label: "PO Mandays Per Month",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "budgetMandaysPerMonth",
      label: "Budget Mandays Per Month",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "engagementStatus",
      label: "Engagement Status",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "invoiceValue",
      label: "Invoice Value",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "balanceValue",
      label: "Balance Value",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "spentMandates",
      label: "spent Mandays",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "balanceMandays",
      label: "Balance Mandays",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "spentMandates",
      label: "spent Mandays",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "actualCost",
      label: "Actual Cost",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "pocompletionDate",
      label: "PO Completion Date",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta) => {
          if (value) {
            return moment(value).format(moment.HTML5_FMT.DATE);
          } else {
            return "";
          }
        },
      },
    },
    {
      name: "plannedCompletionDate",
      label: "Planned Completion Date",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta) => {
          if (value) {
            return moment(value).format(moment.HTML5_FMT.DATE);
          } else {
            return "";
          }
        },
      },
    },
    {
      name: "actualCompletionDate",
      label: "Actual Completion Date",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta) => {
          if (value) {
            return moment(value).format(moment.HTML5_FMT.DATE);
          } else {
            return "";
          }
        },
      },
    },
    {
      name: "isActive",
      label: "Active",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          if (value) {
            return <i className="fas fa-check"></i>;
          } else {
            return <i className="fas fa-times"></i>;
          }
        },
      },
    },
    {
      name: "",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          let id = tableMeta.tableData[tableMeta.rowIndex].id;
          return (
            <>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("edit", { state: id });
                }}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </a>
            </>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    count: count,
    rowsPerPage: pageSize,
    serverSide: true,
    rowsPerPageOptions: [],
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    search: true,
    onChangeRowsPerPage: (num) => {
      //   setLimit(num);
      //   setNxtPgInfo("");
      //   setPrevPgInfo("");
      //   setIsPrevOrNext("");
    },
    onSearchChange: (searchText) => {
      if (searchText !== null) {
        setSearchText(searchText);
      } else {
        setSearchText("");
      }
    },
    onColumnSortChange: async (sortColumn, sortDirection) => {
      if (sortDirection === "asc") {
        await setSortColumn(sortColumn);
        await setSortDirection(sortDirection);
      }
      if (sortDirection === "desc") {
        await setSortColumn(sortColumn);
        await setSortDirection(sortDirection);
      }
    },
    onChangePage: async (page) => {
      setStart(page * pageSize);
    },
  };

  return (
    <>
      <Heading title={"Engagement Master"} />
      <div className="px-3 pt-3 d-flex justify-content-end">
        <button onClick={() => navigate("edit")} className="btn btn-primary">
          + Create
        </button>
      </div>
      <DynamicGrid
        options={options}
        data={engagementMasterData}
        columns={gridColumns}
      />
    </>
  );
};
export default EngagementMaster;

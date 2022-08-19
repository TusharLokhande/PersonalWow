import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicGrid from "../../../Components/DynamicGrid/DynamicGrid";
import Heading from "../../../Components/Heading/Heading";
import { APICall } from "../../../Helpers/API/APICalls";
import { getLeaveRequestMasterGridData } from "../../../Helpers/API/APIEndPoints";
import moment from "moment";

const LeaveRequestMaster = () => {
  let navigate = useNavigate();
  const [LeaveRequestMasterData, setLeaveRequestMasterData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [start, setStart] = useState(0);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(0);

  const workday_count = (start, end) => {
    var first = start.clone().endOf("week"); // end of first week
    var last = end.clone().startOf("week"); // start of last week
    var days = (last.diff(first, "days") * 5) / 7; // this will always multiply of 7
    var wfirst = first.day() - start.day(); // check first week
    if (start.day() == 0) --wfirst; // -1 if start with sunday
    var wlast = end.day() - last.day(); // check last week
    if (end.day() == 6) --wlast; // -1 if end with saturday
    return wfirst + Math.floor(days) + wlast; // get the total
  };

  const getLeaveRequestMasterData = async () => {
    let requestParams = {
      start: start,
      pageSize: pageSize,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      searchText: searchText,
    };
    const { data } = await APICall(
      getLeaveRequestMasterGridData,
      "POST",
      requestParams
    );
    // data.forEach((ele: any) => {
    //   let FromDate = moment(ele.fromDate);
    //   let ToDate = moment(ele.toDate);
    //   let leaveDays: any;
    //   leaveDays = workday_count(FromDate, ToDate);
    //   ele.leaveDays = leaveDays;
    // })
    setLeaveRequestMasterData(data);
  };

  useEffect(() => {
    getLeaveRequestMasterData();
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
      name: "approverName",
      label: "Approver",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "requesterName",
      label: "Requestor",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "leavesReson",
      label: "Reason",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "leaveDays",
      label: "Leave Days",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: "remark",
      label: "Remark",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    // {
    //   name: "isActive",
    //   label: "Active",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (value, tableMeta) => {
    //       if (value) {
    //         return <i className="fas fa-check"></i>;
    //       } else {
    //         return <i className="fas fa-times"></i>;
    //       }
    //     },
    //   },
    // },
    // {
    //   name: "",
    //   label: "Action",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (value, tableMeta) => {
    //       let id = tableMeta.tableData[tableMeta.rowIndex].id;
    //       return (
    //         <>
    //           <a
    //             onClick={(e) => {
    //               e.preventDefault();
    //               navigate("edit", { state: id });
    //             }}>
    //             <i className="fa fa-pencil" aria-hidden="true"></i>
    //           </a>
    //         </>
    //       );
    //     },
    //   },
    // },
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
      <Heading title={"Request Leave /Report Absence"} />
      {/* <div className="px-3 pt-3 d-flex justify-content-end">
        <button onClick={() => navigate("edit")} className="btn btn-primary">
          + Create
        </button>
      </div> */}
      <DynamicGrid
        options={options}
        data={LeaveRequestMasterData}
        columns={gridColumns}
      />
    </>
  );
};
export default LeaveRequestMaster;

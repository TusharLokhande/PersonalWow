import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicGrid from "../../../Components/DynamicGrid/DynamicGrid";
import Heading from "../../../Components/Heading/Heading";
import { APICall } from "../../../Helpers/API/APICalls";
import { getMilestoneDataUrl } from "../../../Helpers/API/APIEndPoints";
import "./MilestoneMaster.css";

const MilestoneMaster = () => {
  let navigate = useNavigate();

  const [milestoneData, setMilestoneData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [start, setStart] = useState(0);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(0);

  const gridColumns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
      },
    },
    {
      name: "mileStones",
      label: "Milestone",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },

    {
      name: "amount",
      label: "Amount",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },

    {
      name: "plannedDate",
      label: "Planned Date",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },

    {
      name: "revisedDate",
      label: "Revised Date",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },

    {
      name: "completedDate",
      label: "Completed Date",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },

    {
      name: "invoicedDate",
      label: "Invoiced Date",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
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
  useEffect(() => {
    (async () => {
      let requestParams = {
        start: start,
        pageSize: pageSize,
        sortColumn: sortColumn,
        sortDirection: sortDirection,
        searchText: searchText,
      };

      const { data } = await APICall(
        getMilestoneDataUrl,
        "POST",
        requestParams
      );
      setMilestoneData(data.milestoneData);

      if (data.milestoneData != null || data.milestoneData != undefined) {
        await data.milestoneData.map(async (mileStone) => {
          mileStone.plannedDate = await moment(mileStone.plannedDate).format(
            "DD/MM/YYYY"
          );
          mileStone.revisedDate = await moment(mileStone.revisedDate).format(
            "DD/MM/YYYY"
          );
          mileStone.completedDate = await moment(
            mileStone.completedDate
          ).format("DD/MM/YYYY");
          mileStone.invoicedDate = await moment(mileStone.invoicedDate).format(
            "DD/MM/YYYY"
          );
        });
      }
      setCount(data.count);
    })();
  }, [start, sortColumn, sortDirection, searchText]);

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
      <Heading title={"Milestone Master"} />
      <div className="px-3 pt-3 d-flex justify-content-end">
        <button onClick={() => navigate("edit")} className="btn btn-primary">
          + Create
        </button>
      </div>
      <DynamicGrid
        options={options}
        data={milestoneData}
        columns={gridColumns}
      />
    </>
  );
};

export default MilestoneMaster;

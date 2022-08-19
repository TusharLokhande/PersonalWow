import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./CalendarUI.css";
import "react-calendar/dist/Calendar.css";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaPowerOff,
} from "react-icons/fa";

import { data } from "./tempCalendarData.json";
import Heading from "../Heading/Heading";
import { APICall } from "../../Helpers/API/APICalls";
import { getCalendarData } from "../../Helpers/API/APIEndPoints";
import { getContext } from "../../Helpers/Context/Context";
import moment from "moment";
const CalendarUI = () => {
  const [value, onChange] = useState(new Date());
  const [showDesc, setShowDesc] = useState("");
  const [apiData, setApiData] = useState(null);

  const { EmployeeId } = getContext();
  const getData = async () => {
    const obj = {
      employeeId: 7 || Number(EmployeeId),
      date: moment().format(moment.HTML5_FMT.DATE),
    };
    const { data } = await APICall(getCalendarData, "POST", obj);

    // const res = await fetch("http://localhost:8000/data");
    // const data = await res.json();
    //await data.days.map((ele) => (ele.date = new Date(ele.date)));

    // let res = JSON.parse(JSON.stringify(data));
    await data.map((ele) => (ele.date = new Date(ele.date)));
    setApiData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const tileContent = ({ activeStartDate, date, view }) => {
    let tempApiData = [...apiData];

    if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
      return (
        <p>
          <FaHourglassHalf color="orange" />
        </p>
      );
    }

    // if (date.getDay() === 0 || date.getDay() === 6) {
    //   return <p>yolo</p>;
    // }

    if (
      view === "month" &&
      // activeStartDate.getMonth() === tempApiData[0].date.getMonth() &&
      // date.getMonth() === tempApiData[0].date.getMonth() &&
      tempApiData.find((ele) => ele.date.getDate() === date.getDate())
    ) {
      let status = tempApiData.find(
        (ele) => ele.date.getDate() === date.getDate()
      ).status;
      switch (status) {
        case "full":
          return (
            <p>
              <FaCheckCircle color="green" />
            </p>
          );

        case "half":
          return (
            <p>
              <FaCheckCircle color="yellow" />
            </p>
          );

        // case "pending":
        //   return (
        //     <p>
        //       <FaHourglassHalf color="orange" />
        //     </p>
        //   );
        case "leave":
          return (
            <p>
              <FaPowerOff color="grey" />
            </p>
          );
        case "notfilled":
          return (
            <p>
              <FaTimesCircle color="red" />
            </p>
          );

        default:
          return null;
      }
    }
  };

  const onMonthChange = ({ action, activeStartDate, value, view }) => {
    // if (view === "month") {
    //   let tempData = { ...apiData };
    //   tempData.month = activeStartDate.getMonth();
    //   setApiData(tempData);
    // }
  };

  const onDateChange = (date) => {
    let temp = { ...apiData };
    if (date.getMonth() === temp.month) {
      let ele = temp.days.find((ele) => ele.date.getDate() === date.getDate());
      if (ele !== undefined) {
        setShowDesc(
          `Status is ${ele.status} & description is ${ele.description}`
        );
      } else {
        setShowDesc("");
      }
      onChange(date);
    }
  };

  return (
    <>
      {apiData && (
        <>
          <Heading title={"Calendar"} />
          <section className="main_content">
            <div className="container-fluid">
              <div className="m-3">
                <Calendar
                  onChange={() => {}} //onDateChange
                  value={value}
                  tileContent={tileContent}
                  showNeighboringMonth={false}
                  onActiveStartDateChange={onMonthChange}
                  minDetail="century"
                  minDate={new Date(2020, 0, 1)}
                  maxDate={new Date(2030, 11, 31)}
                />
              </div>
            </div>
          </section>
        </>
      )}
      <h4 className="text-center mb-1">{value.toDateString()}</h4>
      {showDesc && <h4 className="text-center">{showDesc.toString()}</h4>}
    </>
  );
};

export default CalendarUI;

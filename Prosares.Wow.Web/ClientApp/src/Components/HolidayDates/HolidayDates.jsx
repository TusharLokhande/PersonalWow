import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./HolidayDates.css";
import Chip from "@mui/material/Chip";
import moment from "moment";

const DisplayDiv = ({ index, onDelete, date }) => {
  return (
    <div
      style={{
        margin: "10px",
      }}
    >
      <Chip
        label={date}
        onDelete={() => {
          onDelete(index);
        }}
        variant="outlined"
      />
    </div>
  );
};

function HolidayDates(props) {
  const [date, setDate] = useState(null);
  const [btn, setBtn] = useState(false);

  // useEffect(() => {
  //   console.log("Dates Array", props.Dates);
  // }, [props.Dates]);

  //checking for the duplicate holidays

  function deleteDate(id) {
    props.setHolidayDates((prev) => {
      return prev.filter((date, index) => {
        return index !== id;
      });
    });
  }

  function addDate(date) {
    if (props.Dates.length < 11) {
      let newDate = moment(date).format(moment.HTML5_FMT.DATE);
      props.setHolidayDates((prev) => {
        return [...prev, newDate];
      });
    }
  }

  function submitdate() {
    if (date === null) {
      return;
    }

    addDate(date);
    setDate(null);
  }

  const onChangeDatesHandler = (e) => {
    setDate(e);
    if (e) {
      props.setFormErrors((preState) => ({
        ...preState,
        ["LeastHolidays"]: undefined,
      }));
    } else {
      props.setFormErrors((preState) => ({
        ...preState,
        ["LeastHolidays"]: "Holiday  date can not be empty",
      }));
    }

    //duplicate date handler
    let d = moment(e).format(moment.HTML5_FMT.DATE);
    const check = props.Dates.includes(d);
    if (check) {
      props.setFormErrors((preState) => ({
        ...preState,
        ["DuplicateDates"]: "Duplicate dates not allowed!",
      }));
      setBtn(true);
    } else {
      props.setFormErrors((preState) => ({
        ...preState,
        ["DuplicateDates"]: undefined,
      }));
      setBtn(false);
    }
  };

  return (
    <div style={{ marginLeft: "30px" }}>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Holidays"
            value={date}
            // onChange={(newValue) => {
            //   setTest(newValue);
            // }}
            onChange={(e) => onChangeDatesHandler(e)}
            inputFormat="dd-MM-yyyy"
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
        <p style={{ color: "red" }}>
          {props.formErrors["LeastHolidays"]}
          {props.formErrors["DuplicateDates"]}
        </p>

        <p style={{ color: "red" }}></p>
      </div>

      <button
        style={{ background: "#96c61c", marginLeft: "30px" }}
        className="btn btn-save ml-1"
        onClick={submitdate}
        disabled={btn}
      >
        Add
      </button>

      <div
        className="DisplayDates"
        style={
          props.Dates.length > 0 ? { display: "block" } : { display: "none" }
        }
      >
        {props.Dates.map(
          (i, j) =>
            j < 11 && (
              <DisplayDiv index={j} key={j} date={i} onDelete={deleteDate} />
            )
        )}
      </div>
    </div>
  );
}

export default HolidayDates;

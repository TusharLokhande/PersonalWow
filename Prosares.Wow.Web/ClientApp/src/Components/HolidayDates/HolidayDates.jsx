import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const DisplayDiv = ({ id, onDelete, date }) => {
  return (
    <div>
      <div>
        {date}
        <span
          style={{ marginLeft: "5px", cursor: "pointer" }}
          onClick={() => {
            onDelete(id);
          }}
        >
          &#215;
        </span>
      </div>
    </div>
  );
};

function HolidayDates(props) {
  const [test, setTest] = useState(null);
  const [checkDuplicate, setCheckDuplicate] = useState(false);

  useEffect(() => {
    console.log("Dates Array", props.Dates);
  }, [props.Dates]);

  //checking for the duplicate holidays
  const checkDuplicateDates = (date) => {
    console.log(props.Dates.includes(date));
    console.log(typeof props.Dates[0]);
  };
  console.log(props.Dates);

  function deleteDate(id) {
    props.setHolidayDates((prev) => {
      return prev.filter((date, index) => {
        return index !== id;
      });
    });
  }

  let arr = [];
  function addTest(test) {
    if (props.Dates.length < 11) {
      let date = moment(test).format(moment.HTML5_FMT.DATE);
      checkDuplicateDates(test.toString());
      arr.push(test);
      console.log(`Date: ${date}, ${test}, ${typeof test}, Arr: ${arr}`);
      props.setHolidayDates((prev) => {
        return [...prev, date];
      });
    }
  }

  function submitdate(event) {
    if (test === null) {
      return;
    }

    addTest(test);
    setTest(null);
  }

  return (
    <div style={{ marginLeft: "30px" }}>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Holidays"
            value={test}
            onChange={(newValue) => {
              setTest(newValue);
            }}
            inputFormat="dd-MM-yyyy"
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
        <p style={{ color: "red" }}>
          {props.formErrors["holidayDates_isEmpty"]}
        </p>
      </div>

      <button
        style={{ background: "#96c61c", marginLeft: "30px" }}
        className="btn btn-save ml-1"
        onClick={submitdate}
        disabled={checkDuplicate}
      >
        Add
      </button>

      {checkDuplicate === true && (
        <p style={{ color: "red" }}>Holidays must not duplicate!</p>
      )}

      <div>
        {props.Dates.map(
          (i, j) =>
            j < 11 && (
              <DisplayDiv id={j} key={j} date={i} onDelete={deleteDate} />
            )
        )}
      </div>
    </div>
  );
}

export default HolidayDates;

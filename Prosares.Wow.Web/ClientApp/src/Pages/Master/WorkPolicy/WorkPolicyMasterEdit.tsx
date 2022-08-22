import React, { useEffect, useState } from "react";
import "./WorkPolicyMaster.css";
import { useLocation, useNavigate } from "react-router-dom";
import { APICall } from "../../../Helpers/API/APICalls";
import {
  getWorkPolicyByIdUrl,
  InsertUpdateWorkPolicyData,
  CheckIfWorkPolicyExists,
} from "../../../Helpers/API/APIEndPoints";
import InputForm from "../../../Components/InputForm/InputForm";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { OnChangeValue } from "react-select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Heading from "../../../Components/Heading/Heading";
import HolidayDates from "../../../Components/HolidayDates/HolidayDates";
import SelectForm from "../../../Components/SelectForm/SelectForm";
import moment from "moment";
import id from "date-fns/esm/locale/id/index.js";

const WorkPolicyMasterEdit = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [workPolicyId, setWorkPolicyId] = useState();
  const [workPolicyName, setWorkPolicyName] = useState("");
  const [validFrom, setValidFrom] = React.useState<Date | null>(null);
  const [validTill, setValidTill] = React.useState<Date | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [holidayDates, setHolidayDates] = useState([]);
  const [workingDaysList, setWorkingDaysList] = useState([]);
  const [validation, setValidation] = useState({ input: null });

  let formErrorObj = {};

  //get the data from the selected workpolicy by Id
  const getWorkpolicyById = async () => {
    if (state !== null) {
      let post = {
        id: state,
      };

      const { data } = await APICall(getWorkPolicyByIdUrl, "POST", post);

      if (data !== null || typeof data !== "string") {
        setWorkPolicyId(data.id);
        setWorkPolicyName(data.policyName);
        setIsActive(data.isActive);
        setValidFrom(data.validFrom);
        setValidTill(data.validTill);
        let arr = [];

        if (data.holiday1 !== null) {
          arr.push(moment(data.holiday1).format(moment.HTML5_FMT.DATE));
        }

        if (data.holiday2 !== null) {
          arr.push(moment(data.holiday2).format(moment.HTML5_FMT.DATE));
        }

        if (data.holiday3 !== null) {
          arr.push(moment(data.holiday3).format(moment.HTML5_FMT.DATE));
        }

        if (data.holiday4 !== null) {
          arr.push(moment(data.holiday4).format(moment.HTML5_FMT.DATE));
        }

        if (data.holiday5 !== null) {
          arr.push(moment(data.holiday5).format(moment.HTML5_FMT.DATE));
        }

        if (data.holiday6 !== null) {
          arr.push(moment(data.holiday6).format(moment.HTML5_FMT.DATE));
        }

        if (data.holiday7 !== null) {
          arr.push(moment(data.holiday7).format(moment.HTML5_FMT.DATE));
        }

        if (data.holiday8 !== null) {
          arr.push(moment(data.holiday8).format(moment.HTML5_FMT.DATE));
        }

        if (data.holiday9 !== null) {
          arr.push(moment(data.holiday9).format(moment.HTML5_FMT.DATE));
        }

        if (data.holiday10 !== null) {
          arr.push(moment(data.holiday10).format(moment.HTML5_FMT.DATE));
        }

        let arr2 = [
          data.workingDay1,
          data.workingDay2,
          data.workingDay3,
          data.workingDay4,
          data.workingDay5,
          data.workingDay6,
        ];

        setHolidayDates(arr);
        setWorkingDaysList(arr2);
        console.log(data);
      }
    }
  };

  const options = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const values = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
  ];

  const reactSelectStyles = {
    width: "200px",
  };

  useEffect(() => {
    getWorkpolicyById();
  }, []);

  const getDataOnSubmit = async (requestObject: any) => {
    if (requestObject !== null) {
      const { data } = await APICall(
        InsertUpdateWorkPolicyData,
        "POST",
        requestObject
      );
    }
  };

  const onClickFunction = async (action) => {
    if (action === "submit") {
      let requestObject = {
        id: workPolicyId,
        policyName: workPolicyName,
        validFrom: validFrom,
        validTill: validTill,
        HolidayDates: holidayDates,
        WorkingDates: workingDaysList,
        isActive: isActive,
      };

      //submitApiCall
      if (workPolicyId !== 0) {
        requestObject.id = workPolicyId;
      }

      let ero = await submitValidation();
      const isEmpty = await Object.values(formErrorObj).every(
        (x) => x === null || x === "" || x == undefined
      );

      if (isEmpty === true) {
        await getDataOnSubmit(requestObject);
      }
    }

    if (action === "reset") {
      setWorkPolicyName("");
      setValidFrom(null);
      setValidTill(null);
      setHolidayDates([]);
      setWorkingDaysList([]);
    }
  };

  //on Change Validation
  const selectOnChange = async (event: any, apiFieldName: any) => {
    if (apiFieldName === "validFrom") {
      setValidFrom(event);
      console.log(event);
      if (event) {
        setFormErrors((preState) => ({
          ...preState,
          ["validFrom_isEmpty"]: undefined,
        }));
      } else {
        setFormErrors((preState) => ({
          ...preState,
          ["validFrom_isEmpty"]: "Valid From date can not be empty",
        }));
      }
    }
    if (apiFieldName === "validTill") {
      setValidTill(event);
      if (event) {
        setFormErrors((preState) => ({
          ...preState,
          ["validTill_isEmpty"]: undefined,
          ["Invalid Date"]: undefined,
        }));
      } else {
        setFormErrors((preState) => ({
          ...preState,
          ["validTill_isEmpty"]: "Valid From date can not be empty",
        }));
      }
    }

    if (apiFieldName === "workPolicyName") {
      setWorkPolicyName(event.target.value);
      if (
        event.target.value &&
        event.target.value !== "" &&
        event.target.value.toString().trim() !== ""
      ) {
        setFormErrors((preState) => ({
          ...preState,
          ["workPolicyName_isEmpty"]: undefined,
        }));
      } else if (
        !event.target.value ||
        event.target.value === "" ||
        event.target.value.toString().trim() === ""
      ) {
        setFormErrors((preState) => ({
          ...preState,
          ["workPolicyName_isEmpty"]: "Valid From date can not be empty",
        }));
      }
    }

    if (apiFieldName === "workingDaylist") {
      setWorkingDaysList(event);
      if (event) {
        setFormErrors((preState) => ({
          ...preState,
          ["workingDaysList_isEmpty"]: undefined,
        }));
      } else {
        setFormErrors((preState) => ({
          ...preState,
          ["workingDaysList_isEmpty"]: "Working Day list cannot be empty",
        }));
      }
    }
  };

  const submitValidation = async () => {
    var objError = {};

    await setFormErrors({});

    if (!workPolicyName) {
      setFormErrors((preState) => ({
        ...preState,
        ["workPolicyName_isEmpty"]: "Work Policy Name can not be empty",
      }));
    }

    const data = await APICall(CheckIfWorkPolicyExists, "POST", {
      policyName: workPolicyName,
    });

    if (data.data != undefined || data.data != null) {
      if (data.data === true && state == null) {
        objError["WorkPolicy_exists"] = "WorkPolicy already exists";
      }
    }
    if (
      workPolicyName == undefined ||
      workPolicyName == null ||
      workPolicyName == ""
    ) {
      objError["workPolicyName_isEmpty"] = "Work Policy Name can not be empty";
    }

    if (validFrom == undefined || validFrom == null) {
      objError["validFrom_isEmpty"] = "Valid From date can not be empty";
    }

    if (validTill == undefined || validTill == null) {
      objError["validTill_isEmpty"] = "Valid Till date can not be empty";
    }

    let check = checkDate();
    if (check) {
      objError["Invalid Date"] =
        "valid till date must be smaller than valid from date";
    }

    if (workingDaysList.length <= 0) {
      objError["workingDaysList_isEmpty"] = "Working cannot be empty!";
    }

    if (holidayDates.length < 10) {
      objError["LeastHolidays"] = "10 Holidays are mandatory!";
    }

    formErrorObj = objError;
    await setFormErrors(objError);
  };

  const checkDate = () => {
    const d1 = moment(validFrom).format(moment.HTML5_FMT.DATE);
    const d2 = moment(validTill).format(moment.HTML5_FMT.DATE);
    console.log("Date ", d1, d2);
    if (d1 > d2) {
      console.log("greater");
      return true;
    }
    return false;
  };

  let hasDuplicates = () => {
    let op = new Set(holidayDates);
    if (holidayDates.length !== op.size) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Heading title={"Work Policy Master"} />
      <section className="main_content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="form-group">
                <label>
                  Work Policy Name<sup style={{ color: "red" }}>*</sup>
                </label>
                <InputForm
                  placeholder={""}
                  isDisabled={false}
                  textArea={false}
                  value={workPolicyName}
                  onChange={(e) => selectOnChange(e, "workPolicyName")}
                  //onChange={InputValidation}
                />
                <p style={{ color: "red" }}>
                  {formErrors["WorkPolicy_exists"]}
                  {formErrors["workPolicyName_isEmpty"]}
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 align-self-end">
              <div className="form-group">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="valid From"
                    value={validFrom}
                    onChange={(e) => selectOnChange(e, "validFrom")}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
                <p style={{ color: "red" }}>
                  {formErrors["validFrom_isEmpty"]}
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 align-self-end">
              <div className="form-group">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="valid Till"
                    value={validTill}
                    onChange={(e) => selectOnChange(e, "validTill")}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
                <p style={{ color: "red" }}>
                  {formErrors["validTill_isEmpty"]} {formErrors["Invalid Date"]}
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 align-self-end">
              <div className="form-group">
                <input
                  type="checkbox"
                  onChange={(e) => setIsActive(e.target.checked)}
                  name="isActive"
                  checked={isActive}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={reactSelectStyles}>
              <SelectForm
                value={workingDaysList}
                onChange={(e) => selectOnChange(e, "workingDaylist")}
                options={options}
                isMulti
                isSearchable={false}
                isClearable={true}
                closeMenuOnSelect={false}
                defaultValue={values}
                hideSelectedOptions={false}
                placeholder="Select Working Days"
              />
              <p style={{ color: "red" }}>
                {formErrors["workingDaysList_isEmpty"]}
              </p>
            </div>

            <HolidayDates
              setHolidayDates={setHolidayDates}
              Dates={holidayDates}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              onClick={() => onClickFunction("reset")}
              className="btn btn-reset ml-1"
            >
              Reset
            </button>
            <button
              style={{ background: "#96c61c" }}
              onClick={() => onClickFunction("submit")}
              className="btn btn-save ml-1"
            >
              Submit
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">
              Back
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkPolicyMasterEdit;

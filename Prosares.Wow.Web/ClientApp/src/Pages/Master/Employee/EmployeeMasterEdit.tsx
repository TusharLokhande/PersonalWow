import React, { useEffect, useRef, useState } from "react";
import "./EmployeeMaster.css";
import { useLocation, useNavigate } from "react-router-dom";
import { APICall } from "../../../Helpers/API/APICalls";
import {
  GetDropDownList,
  getEmployeeByIdUrl,
  InsertUpdateEmployeeMasterData,
} from "../../../Helpers/API/APIEndPoints";
import SelectForm from "../../../Components/SelectForm/SelectForm";
import InputForm from "../../../Components/InputForm/InputForm";
import { gd } from "date-fns/locale";
import notify from "../../../Helpers/ToastNotification";
import Heading from "../../../Components/Heading/Heading";
//import { Password } from "@mui/icons-material";

const EmployeeMasterEdit = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [employeeId, setEmployeeId] = useState();
  const [employeeEid, setEmployeeEid] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeShortName, setEmployeeShortName] = useState("");
  const [CostCenter, setCostCenter] = useState<any>({});
  const [WorkPolicy, setWorkPolicy] = useState<any>({});
  const [TimesheetPolicy, setTimesheetPolicy] = useState<any>({});
  const timesheetPolicyId = useRef<any>(0);
  const [Efficiency, setEfficiency] = useState<any>({});
  const EfficiencyId = useRef<any>(0);
  const [employeeCostCenterOption, setEmployeeCostcenterOption] = useState<any>(
    []
  );
  const [employeeWorkPolicyOption, setEmployeeWorkPolicyOption] = useState<any>(
    []
  );
  const [
    employeeTimesheetPolicyOption,
    setEmployeeTimesheetPolicyOption,
  ] = useState<any>([]);
  const [employeeEfficiencyOption, setEmployeeEfficiencyOPtion] = useState<any>(
    []
  );
  const [employeeLoginId, setEmployeeLoginId] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");

  //const [employeeEfficiency, setemployeeEfficiency] = useState("");

  const [isActive, setIsActive] = useState(true);

  const getEmpById = async () => {
    if (state !== null) {
      let post = {
        id: state,
      };

      const { data } = await APICall(getEmployeeByIdUrl, "POST", post);

      if (data !== null || typeof data !== "string") {
        setEmployeeId(data[0].id);
        setEmployeeEid(data[0].eid);
        setEmployeeName(data[0].name);
        setEmployeeShortName(data[0].shortName);
        setCostCenter({
          value: data[0].costCenterId,
          label: data[0].costCenter,
        });
        setWorkPolicy({
          value: data[0].workPolicyId,
          label: data[0].workPolicy,
        });
        timesheetPolicyId.current = data[0].timeSheetPolicy;
        EfficiencyId.current = data[0].efficiency;
        setIsActive(data[0].isActive);
        // setEmployeeLoginId(data[0].loginId); 
        // setEmployeePassword(data[0].password);
      }
    }
  };

  const onLoadApiCall = async () => {
    await getEmpById();
    await getCostCenterData();
    await getWorkPolicyData();
    await getTimeSheetData();
    await getEfficiencyData();
  };

  useEffect(() => {
    onLoadApiCall();
  }, []);

  const CommonDropdownFunction = async (searchFor, searchValue) => {
    let postObject = {
      searchFor: searchFor,
      searchValue: searchValue,
    };
    const { data } = await APICall(GetDropDownList, "POST", postObject);

    return data;
  };

  //CostCenter Dropdown from databse
  const getCostCenterData = async () => {
    let costcenterId = 1; //hardcoded
    var data = await CommonDropdownFunction("costcenter", costcenterId);

    if (data != undefined || data != null) {
      let costCenterArray = [];
      await data.map((costCenter) => {
        let tempObj = {
          value: costCenter.id,
          label: costCenter.costCenter1,
        };
        costCenterArray.push(tempObj);
      });

      setEmployeeCostcenterOption(costCenterArray);
    }
  };

  //workPolicy Dropdown
  const getWorkPolicyData = async () => {
    let workpolicyId = 1; //hardcoded

    //workPolicy Dropdown
    var data = await CommonDropdownFunction("policyname", workpolicyId);

    if (data != undefined || data != null) {
      let workPolicyArray = [];
      await data.map((workPolicy) => {
        let tempObj = {
          value: workPolicy.id,
          label: workPolicy.policyName,
        };
        workPolicyArray.push(tempObj);
      });

      setEmployeeWorkPolicyOption(workPolicyArray);
    }
  };

  //TimesheetPolicy Dropdown AND COMING FROM THE ENUMS
  const getTimeSheetData = async () => {
    let serchValueId = 1; //hardcoded
    var data = await CommonDropdownFunction("timesheet", serchValueId);

    if (data != undefined || data != null) {
      if (data.length > 0) {
        setEmployeeTimesheetPolicyOption(data);
        if (timesheetPolicyId.current !== 0) {
          let bindData = data.find(
            (ele) => ele.value === timesheetPolicyId.current
          );
          setTimesheetPolicy(bindData);
        }
      }
    }
  };

  //Efficency Dropdown
  const getEfficiencyData = async () => {
    let serachValueId = 1; //hardcoded
    var data = await CommonDropdownFunction("efficiency", serachValueId);

    if (data != undefined || data != null) {
      if (data.length > 0) {
        setEmployeeEfficiencyOPtion(data);
        if (EfficiencyId.current !== 0) {
          let bindData = data.find((ele) => ele.value === EfficiencyId.current);
          setEfficiency(bindData);
        }
      }
    }
  };

  const getDataOnSubmit = async (requestObject: any) => {
    if (requestObject !== null) {
      const res = await APICall(
        InsertUpdateEmployeeMasterData,
        "POST",
        requestObject
      );

      if (res.status === 1) {
        notify(res.status, res.message);
      } else {
        navigate(-1);
      }
    }
  };

  const checkValidation = (requestObject) => {
    const checkArr = [
      "eid",
      "name",
      "shortName",
      // "loginId",
      // "password",
      "costCenterId",
      "efficiency",
      "timeSheetPolicy",
      "workPolicyId",
    ];

    let validator = false;

    for (let i = 0; i < checkArr.length; i++) {
      if (
        requestObject[checkArr[i]] === "" ||
        requestObject[checkArr[i]] === undefined ||
        requestObject[checkArr[i]] === null
      ) {
        validator = true;
        break;
      }
    }

    return validator;
  };

  const onClickFunction = async (action) => {
    if (action === "submit") {
      let requestObject = {
        id: employeeId,
        eid: employeeEid,
        name: employeeName,
        shortName: employeeShortName,
        costCenterId: CostCenter ? CostCenter.value : null,
        workPolicyId: WorkPolicy ? WorkPolicy.value : null,
        timeSheetPolicy: TimesheetPolicy ? TimesheetPolicy.value : null,
        efficiency: Efficiency ? Efficiency.value : null,
        isActive: isActive,
        // loginId: employeeLoginId,
        // password: employeePassword,
      };
      //submitApiCall
      const validate = checkValidation(requestObject);
      if (validate) {
        notify(1, "Please fill required fields!");
      } else {
        await getDataOnSubmit(requestObject);
      }
    }
    if (action === "reset") {
      setEmployeeEid("");
      setEmployeeName("");
      setEmployeeShortName("");
      setCostCenter(null);
      setWorkPolicy(null);
      setTimesheetPolicy(null);
      setEfficiency(null);
      // setEmployeeLoginId("");
      // setEmployeePassword("");
    }
  };

  const selectOnChange = async (event: any, apiFieldName: any) => {
    if (apiFieldName === "CostCenter") {
      setCostCenter(event);
    }
    if (apiFieldName === "workPolicy") {
      setWorkPolicy(event);
    }
    if (apiFieldName === "TimesheetPolicy") {
      setTimesheetPolicy(event);
    }
    if (apiFieldName === "Efficiency") {
      setEfficiency(event);
    }
  };

  return (
    <div>
      <Heading title={"Employee Master"} />
      <section className="main_content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="form-group">
                <label>Employee Id</label>
                <InputForm
                  placeholder={""}
                  isDisabled={false}
                  textArea={false}
                  value={employeeEid}
                  onChange={(e) => setEmployeeEid(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="form-group">
                <label>Employee Name</label>
                <InputForm
                  placeholder={""}
                  isDisabled={false}
                  textArea={false}
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="form-group">
                <label>Employee Short Name</label>
                <InputForm
                  placeholder={""}
                  isDisabled={false}
                  textArea={false}
                  value={employeeShortName}
                  onChange={(e) => setEmployeeShortName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="form-group">
                <label>Cost Center</label>
                <SelectForm
                  options={employeeCostCenterOption}
                  placeholder="Select"
                  isDisabled={false}
                  value={CostCenter}
                  onChange={(event) => selectOnChange(event, "CostCenter")}
                  isMulti={false}
                  noIndicator={false}
                  noSeparator={false}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="form-group">
                <label>Work Policy</label>
                <SelectForm
                  options={employeeWorkPolicyOption}
                  placeholder="Select"
                  isDisabled={false}
                  value={WorkPolicy}
                  onChange={(event) => selectOnChange(event, "workPolicy")}
                  isMulti={false}
                  noIndicator={false}
                  noSeparator={false}
                />
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="form-group">
                <label>Timesheet Policy</label>
                <SelectForm
                  key={1}
                  options={employeeTimesheetPolicyOption}
                  placeholder="Select"
                  isDisabled={false}
                  value={TimesheetPolicy}
                  onChange={(event) => selectOnChange(event, "TimesheetPolicy")}
                  isMulti={false}
                  noIndicator={false}
                  noSeparator={false}
                />
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="form-group">
                <label>Efficiency</label>
                <SelectForm
                  key={1}
                  options={employeeEfficiencyOption}
                  placeholder="Select"
                  isDisabled={false}
                  value={Efficiency}
                  onChange={(event) => selectOnChange(event, "Efficiency")}
                  isMulti={false}
                  noIndicator={false}
                  noSeparator={false}
                />
              </div>
            </div>

            {/* <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="form-group">
                <label>Login Id</label>
                <InputForm
                  placeholder={""}
                  isDisabled={false}
                  textArea={false}
                  value={employeeLoginId}
                  onChange={(e) => setEmployeeLoginId(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="form-group">
                <label>Password</label>
                <InputForm
                  placeholder={""}
                  isDisabled={false}
                  textArea={false}
                  value={employeePassword}
                  onChange={(e) => setEmployeePassword(e.target.value)}
                />
              </div>
            </div> */}

            <div className="col-lg-4 col-md-4 col-sm-6">
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
          <div className="d-flex justify-content-end gap-2">
            <button
              onClick={() => onClickFunction("reset")}
              className="btn btn-reset ml-1">
              Reset
            </button>
            <button
              style={{ background: "#96c61c" }}
              onClick={() => onClickFunction("submit")}
              className="btn btn-save ml-1">
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

export default EmployeeMasterEdit;

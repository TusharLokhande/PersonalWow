const prod = {
  url: process.env.REACT_APP_PUBLISH_PATH,
};
const dev = {
  url: "",
};

export const { url } = process.env.NODE_ENV === "development" ? dev : prod;

export const getAPI = url + "get api";

//customer
export const getCustomerDataByIdUrl =
  url + "/api/customers/getCustomerDataById";
export const getCustomerDataUrl = url + "/api/customers/getCustomerData";
export const insertUpdateCustomerDataUrl =
  url + "/api/customers/insertUpdateCustomerData";

export const GetDropDownList = url + "/api/CommonDropdown";

export const InsertUpdateTask = url + "/api/Task/InsertAndUpdateTask";
export const InsertUpdateTicketData =
  url + "/api/Ticket/InsertUpdateTicketDetails";

//leave request
export const getLeaveRequestMasterGridData =
  url + "/api/LeaveRequest/GetLeaveReqMasterMasterGridData";
export const InsertUpdateLeaveRequestData =
  url + "/api/LeaveRequest/insertUpdateLeaveRequestMasterData";
export const getLeaveRequestDataById =
  url + "/api/LeaveRequest/GetLeaveRequestMasterById";
export const getEmployeeAvailableLeaveBalance =
  url + "/api/employeeMaster/GetEmployeeAvailableLeaveBalance";

//engagement
export const getEngagementMasterGridData =
  url + "/api/Engagement/GetEngagementMasterGridData";
export const InsertUpdateEngagementMasterData =
  url + "/api/Engagement/InsertUpdateEngagementMasterDetails";
export const getEngagementMasterDataById =
  url + "/api/Engagement/GetEngagementMasterById";

//capacity
export const getCapacityAllocationGridData =
  url + "/api/CapicityAllocation/GetCapacityAllocationGridData";
export const insertUpdateCapacityAllocation =
  url + "/api/CapicityAllocation/InsertUpdateCapacityAllocation";
export const getCapacityAllocationById =
  url + "/api/CapicityAllocation/GetCapacityAllocationById";
export const getCapacityAllocationDataByEngagement =
  url + "/api/CapicityAllocation/GetCapacityAllocationDataByEngagement";
export const getAllocatedResourcePerMonthApiCall =
  url + "/api/CapicityAllocation/GetAllocatedResourcePerMonth";
export const getAllocatedMandaysPerMonthApiCall =
  url + "/api/CapicityAllocation/GetAllocatedMandaysPerMonth";
export const getTotalAllocatedMandaysApiCall =
  url + "/api/CapicityAllocation/GetTotalAllocatedMandays";
export const getTotalResourceAllocationApiCall =
  url + "/api/CapicityAllocation/GetTotalResourceAllocation";



//dashboard
export const getDashboardData = url + "/api/dashboard/getDashboardData";
export const insertUpdateDashboardData =
  url + "/api/dashboard/insertUpdateDashboardData";

//Application Master

export const CheckIfApplicationExists =
  url + "/api/application/CheckIfApplicationExists";
export const InsertUpdateApplicationMasterData =
  url + "/api/application/insertUpdateApplicationMasterData";
export const getApplicationMasterGridData =
  url + "/api/application/getApplicationMasterGridData";
export const getApplicationByIdUrl =
  url + "/api/application/getApplicationById";

//cost Center
export const CheckIfCostCenterExists =
  url + "/api/costcenter/CheckIfCostCenterExists";
export const getCostCenterMasterGridData =
  url + "/api/costcenter/getCostCenterGridData";
export const getCostCenterByIdUrl = url + "/api/costcenter/getCostCenterById";
export const InsertUpdateCostCenterMasterData =
  url + "/api/costcenter/insertUpdatCostCenterData";

//phase Master
export const getPhaseDataUrl = url + "/api/phaseMaster/getPhaseMasterGridData";
export const InsertUpdatePhaseMasterData =
  url + "/api/phaseMaster/insertUpdatPhaseMasterData";
export const getPhaseByIdUrl = url + "/api/phaseMaster/getPhaseMasterById";

//Employee Master
export const getEmployeeMasterGridData =
  url + "/api/employeeMaster/getEmployeeMasterGridData";
export const InsertUpdateEmployeeMasterData =
  url + "/api/employeeMaster/insertUpdatEmployeeMasterData"; // added now
export const getEmployeeByIdUrl = url + "/api/employeeMaster/getEmployeeById";

//WorkPolicy Master

export const CheckIfWorkPolicyExists =
  url + "/api/WorkPolicies/CheckIfWorkPolicyExists";
export const getWorkPolicyDataUrl = url + "/api/WorkPolicies/getMasterGridData";
export const getWorkPolicyByIdUrl =
  url + "/api/WorkPolicies/getWorkPoliciesById";
export const InsertUpdateWorkPolicyData =
  url + "/api/WorkPolicies/insertUpdateWorkPoliciesMasterData";
export const getWorkPolicyHolidayList =
  url + "/api/workPolicies/getWorkPolicyHolidayList";
export const getWorkPolicyWorkdayList =
  url + "/api/workPolicies/getWorkPolicyWorkdayList";

//MileStone
export const getMilestoneDataByIdUrl =
  url + "/api/milestone/getMilestoneDataById";
export const getMilestoneDataUrl = url + "/api/milestone/getMilestoneData";
export const insertUpdateMilestoneDataUrl =
  url + "/api/milestone/insertUpdateMilestoneData";
export const CheckIfMilestoneExists =
  url + "/api/Milestone/CheckIfMilestoneExists";

export const getAutoPopulatedDataForTask =
  url + "/api/Task/AutoPopulateMandaysFields";

export const getAutoPopulatedDataForTicket =
  url + "/api/Ticket/AutoPopulateMandaysFields";

export const getAutoPopulatedAssignedHoursData =
  url + "/api/Task/AutoPopulateAssignedHoursFields";

//calendar

export const getCalendarData = url + "/api/calendar/getCalendarData";

export const insertUpdateCalendarData =
  url + "/api/calendar/insertUpdateCalendarData";

// manager dashboard

export const getManagerDashboardData =
  url + "/api/ManagerDashboard/GetManagerDashboardData";

  export const ExportToExcelApi =
  url + "/api/Common/ExportToExcel";


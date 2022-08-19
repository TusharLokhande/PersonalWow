using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Prosares.Wow.Data.Entities;
using Prosares.Wow.Data.Helpers;
using Prosares.Wow.Data.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Prosares.Wow.Data.Services.LeaveRequest
{
    public class LeaveRequestMasterService : ILeaveRequestMasterService
    {

        #region Prop
        private readonly IRepository<Entities.LeaveRequestsMaster> _leaveRequest;
        private readonly ILogger<LeaveRequestMasterService> _logger;
        private readonly IRepository<Entities.EmployeeMasterEntity> _employeeMaster;
        private readonly IRepository<Entities.EmployeeLeaveBalance> _employeeLeaveBalance;
        #endregion

        #region Constructor
        public LeaveRequestMasterService(IRepository<Entities.LeaveRequestsMaster> LeaveRequestMaster,
                        ILogger<LeaveRequestMasterService> logger, IRepository<Entities.EmployeeMasterEntity> employeeMaster, IRepository<EmployeeLeaveBalance> employeeLeaveBalance)
        {
            _leaveRequest = LeaveRequestMaster;
            _logger = logger;
            _employeeMaster = employeeMaster;
            _employeeLeaveBalance = employeeLeaveBalance;
        }
        #endregion

        #region Method
        public dynamic GetLeaveReqMasterMasterGridData()//LeaveRequestsMasterResponse //Entities.LeaveRequestsMaster value
        {
            try
            {
                SqlCommand command = new SqlCommand("stpGetAllLeaveRequests");
                command.CommandType = CommandType.StoredProcedure;
                var leaveRequestMasterData = _leaveRequest.GetRecords(command);
                return leaveRequestMasterData;
            }
            catch (Exception ex)
            {
                throw;
            }
            //var data = new LeaveRequestsMasterResponse();

            //Expression<Func<Entities.LeaveRequestsMaster, bool>> InitialCondition;
            //Expression<Func<Entities.LeaveRequestsMaster, bool>> SearchText;

            //InitialCondition = k => k.Id != 0;

            //if (value.searchText != null)
            //{
            //    SearchText = k => k.Remark.Contains(value.searchText);
            //}
            //else
            //{
            //    SearchText = k => k.Remark != "";
            //}

            //if (value.sortColumn == "" || value.sortDirection == "")
            //{
            //    data.count = _leaveRequest.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
            //    data.leaveRequestsMasterData = _leaveRequest.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByPropertyDescending("createdDate")).Skip(value.start).Take(value.pageSize).ToList();
            //}
            //else if (value.sortDirection == "desc")
            //{
            //    data.count = _leaveRequest.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
            //    data.leaveRequestsMasterData = _leaveRequest.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByPropertyDescending(value.sortColumn)).Skip(value.start).Take(value.pageSize).ToList();
            //}
            //else if (value.sortDirection == "asc")
            //{
            //    data.count = _leaveRequest.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
            //    data.leaveRequestsMasterData = _leaveRequest.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByProperty(value.sortColumn)).Skip(value.start).Take(value.pageSize).ToList();
            //}
            //return data;
        }
        public dynamic GetLeaveRequestMasterById(Entities.LeaveRequestsMaster value)
        {
            var response = (from lr in _leaveRequest.Table
                            join em in _employeeMaster.Table on lr.ApproverId equals em.Id
                            join emp in _employeeMaster.Table on lr.RequestorId equals emp.Id
                            select new
                            {
                                RequestorId = lr.RequestorId,
                                ApproverId = lr.ApproverId,
                                FromDate = lr.FromDate,
                                FromDateLeaveType = lr.FromDateLeaveType,
                                ToDate = lr.ToDate,
                                ToDateLeaveType = lr.ToDateLeaveType,
                                LeaveDays = lr.LeaveDays,
                                ResonId = lr.ResonId,
                                Remark = lr.Remark,
                                RequestStatus = lr.RequestStatus,
                                SortColumn = "",
                                SortDirection = "",
                                PageSize = 0,
                                Start = 0,
                                SearchText = "",
                                Approver = em.Name,
                                Requestor = emp.Name,
                                Reson = lr.Reson.LeavesReson,
                                Id = lr.Id,
                                IsActive = lr.IsActive,
                                CreatedDate = lr.CreatedDate,
                                CreatedBy = lr.CreatedBy,
                                ModifiedDate = lr.ModifiedDate,
                                ModifiedBy = lr.ModifiedBy
                            }).Where(k => k.Id == value.Id);
            //var leaveRequest = _leaveRequest.GetById(value.Id);
            //data = response;
            return response;
        }
        public bool LeaveRequestMasterExists(long id)
        {
            return _leaveRequest.IsExist(id);
        }
        public dynamic InsertUpdateLeaveRequestMasterData(Entities.LeaveRequestsMaster value)
        {
            Entities.LeaveRequestsMaster data = new Entities.LeaveRequestsMaster();

            data.Id = value.Id;

            if (value.Id == 0 && value.Remark != null && value.Remark != "") // Insert in DB
            {
                Entities.LeaveRequestsMaster response = _leaveRequest.InsertAndGet(value);
                if(response.Id != 0)
                {
                    // substract leave days from balance 
                    EmployeeLeaveBalance employeeLeaveBalance = _employeeLeaveBalance.GetAll(b => b.Where(k => k.IsActive == true && k.EmployeeId == value.RequestorId)).SingleOrDefault();
                    employeeLeaveBalance.LeaveBalance = employeeLeaveBalance.LeaveBalance - value.LeaveDays;
                    _employeeLeaveBalance.UpdateAsNoTracking(employeeLeaveBalance);
                }
                return response.Id;
            }
            else if (value.Id != 0 && value.Remark != null && value.Remark != "")
            {
                Entities.LeaveRequestsMaster leaveReqGetById = _leaveRequest.GetById(value.Id);
                DateTime abx = leaveReqGetById.CreatedDate;
                leaveReqGetById = value;
                leaveReqGetById.CreatedDate = abx;
                leaveReqGetById.ModifiedDate = DateTime.UtcNow;
                _leaveRequest.UpdateAsNoTracking(leaveReqGetById);
                return value.Id;
            }
            return 0;
        }
        #endregion
        public class LeaveRequestsMasterResponse
        {
            public int count { get; set; }
            public List<Entities.LeaveRequestsMaster> leaveRequestsMasterData { get; set; }
        }
    }
}

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Prosares.Wow.Data.DBContext;
using Prosares.Wow.Data.Entities;
using Prosares.Wow.Data.Helpers;
using Prosares.Wow.Data.Models;
using Prosares.Wow.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Prosares.Wow.Data.Services.Employee
{
    public class EmployeeService : IEmployeeService
    {
        #region Prop
        private readonly IRepository<EmployeeMasterEntity> _employeeMaster;
        private readonly IRepository<EmployeeLeaveBalance> _employeeLeaveBalance;


        private readonly IRepository<CostCenter> _costCentre;
        private readonly IRepository<WorkPoliciesMaster> _workPolicyMaster;

        private readonly ILogger<EmployeeService> _logger;
        private readonly SqlDbContext _context;
        private readonly IRepository<RolePermission> _rolePermission;
        private readonly IRepository<Permission> _permission;
        private readonly IRepository<EmployeeRoleMapping> _employeeRoleMapping;
        #endregion

        #region Constructor
        public EmployeeService(IRepository<EmployeeMasterEntity> employeeMaster, ILogger<EmployeeService> logger,
        IRepository<CostCenter> costCentre, IRepository<WorkPoliciesMaster> workPolicyMaster, SqlDbContext context,
        IRepository<RolePermission> rolePermission, IRepository<Permission> permission,
        IRepository<EmployeeRoleMapping> employeeRoleMapping, IRepository<EmployeeLeaveBalance> employeeLeaveBalance)
        {
            _costCentre = costCentre;
            _workPolicyMaster = workPolicyMaster;
            _employeeMaster = employeeMaster;

            _logger = logger;

            _context = context;
            _rolePermission = rolePermission;
            _permission = permission;
            _employeeRoleMapping = employeeRoleMapping;
            _employeeLeaveBalance = employeeLeaveBalance;
        }
        #endregion


        #region Methods
        public EmployeeMasterEntity GetEmployeeByLoginId(string LoginId)
        {
            EmployeeMasterEntity employeeData = new EmployeeMasterEntity();
            try
            {


                employeeData = _employeeMaster.Get(k => k.Where(employee => employee.LoginId == LoginId && employee.IsActive == true)).FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw;
            }
            return employeeData;
        }

        public dynamic GetEmployeeRoleAndPermissions(long LoginId)
        {
            //string sqlQuery;

            //List<SqlParameter> sqlParameters = new List<SqlParameter>
            //    {
            //         new SqlParameter("@LoginId", LoginId)
            //    };


            //sqlQuery = "spGetEmployeeRoleAndPermissions @LoginId";

            //var Data = _context.RolesAndPermissionsSet.FromSqlRaw(sqlQuery, sqlParameters.ToArray()).ToList();

            var query = (from rp in _rolePermission.Table
                         join p in _permission.Table on rp.PermissionId equals p.Id
                         select new
                         {
                             RoleId = rp.RoleId,
                             PermissionName = p.Name,
                         }).Distinct().ToList();

            var result = (from q in query
                          join erm in _employeeRoleMapping.Table on q.RoleId equals erm.RoleId
                          select new
                          {
                              Id = erm.Id,
                              PermissionsName = q.PermissionName,
                              RoleId = q.RoleId,
                              EmployeeId = erm.EmployeeId
                          }).Where(k => k.EmployeeId == LoginId).Select(
                                s => new RolesAndPermissions
                                {
                                    Id = s.Id,
                                    PermissionsName = s.PermissionsName,
                                    RoleId = s.RoleId,
                                }).Distinct().ToList();


            return result;

        }


        public EmployeeMasterResponse GetEmployeeMasterGridData(EmployeeMasterEntity value)
        {
            var data = new EmployeeMasterResponse();

            Expression<Func<Entities.EmployeeMasterEntity, bool>> InitialCondition;
            Expression<Func<Entities.EmployeeMasterEntity, bool>> SearchText;

            InitialCondition = k => k.Id != 0;

            if (value.searchText != null)
            {

                SearchText = k => k.Name.Contains(value.searchText) || k.ShortName.Contains(value.searchText);

            }
            else
            {
                SearchText = k => k.Name != "";
            }

            if (value.sortColumn == "" || value.sortDirection == "")
            {

                data.count = _employeeMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
                data.employeeData = _employeeMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByPropertyDescending("createdDate")).Skip(value.start).Take(value.pageSize).ToList();
            }
            else if (value.sortDirection == "desc")
            {
                data.count = _employeeMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
                data.employeeData = _employeeMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByPropertyDescending(value.sortColumn)).Skip(value.start).Take(value.pageSize).ToList();
            }
            else if (value.sortDirection == "asc")
            {
                data.count = _employeeMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
                data.employeeData = _employeeMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByProperty(value.sortColumn)).Skip(value.start).Take(value.pageSize).ToList();
            }

            return data;
        }

        public dynamic InsertUpdateEmployeeMasterData(Entities.EmployeeMasterEntity value)
        {
            EmployeeMasterEntity data = new EmployeeMasterEntity();

            data.Id = value.Id;

            if (data.Id == 0) // Insert in DB
            {

                bool checkDuplicate = _employeeMaster.Table.Any(k => (k.Name == value.Name || k.ShortName == value.ShortName));

                if (checkDuplicate)
                {
                    return false;
                }
                data.Eid = value.Eid;
                data.Name = value.Name;
                data.ShortName = value.ShortName;
                data.CostCenterId = value.CostCenterId;
                data.WorkPolicyId = value.WorkPolicyId;
                data.TimeSheetPolicy = value.TimeSheetPolicy;
                data.Efficiency = value.Efficiency;
                data.IsActive = value.IsActive;
                // data.CreatedDate = DateTime.UtcNow;
                data.LoginId = value.LoginId;
                data.Password = value.Password;
                _employeeMaster.Insert(data);
                return true;
            }
            else
            {
                bool checkDuplicate = _employeeMaster.Table.Any(k => k.Id != value.Id && (k.Name == value.Name || k.ShortName == value.ShortName));

                // check duplicate for Eid ? ask
                if (checkDuplicate)
                {
                    return false;
                }
                // Update in DB
                var employeeData = _employeeMaster.GetById(value.Id);
                employeeData.Eid = value.Eid;
                employeeData.Name = value.Name;
                employeeData.ShortName = value.ShortName;
                employeeData.WorkPolicyId = value.WorkPolicyId;
                employeeData.TimeSheetPolicy = value.TimeSheetPolicy;
                employeeData.Efficiency = value.Efficiency;
                employeeData.IsActive = value.IsActive;
                employeeData.ModifiedDate = DateTime.UtcNow;
                employeeData.LoginId = value.LoginId;
                employeeData.Password = value.Password;
                _employeeMaster.Update(employeeData);
                return true;

            }
        }

        public dynamic GeEmployeeMasterById(EmployeeMasterEntity value)//EmployeeMasterEntity
        {
            var employeeMaster = _employeeMaster.GetById(value.Id);

            var response = (from em in _employeeMaster.Table
                            join cc in _costCentre.Table on em.CostCenterId equals cc.Id
                            join wc in _workPolicyMaster.Table on em.WorkPolicyId equals wc.Id
                            select new
                            {
                                Eid = em.Eid,
                                Name = em.Name,
                                ShortName = em.ShortName,
                                CostCenterId = em.CostCenterId,
                                CostCenter = cc.CostCenter1,
                                WorkPolicyId = em.WorkPolicyId,
                                WorkPolicy = wc.PolicyName,
                                TimeSheetPolicy = em.TimeSheetPolicy,
                                Efficiency = em.Efficiency,
                                Id = em.Id,
                                LoginId = em.LoginId,
                                Password = em.Password,
                                isActive = em.IsActive


                            }).Where(k => k.Id == value.Id);
            return response;
            // return employeeMaster;
        }

        public double GetEmployeeAvailableLeaveBalance(EmployeeLeaveRequest value)
        {

            EmployeeLeaveBalance data = _employeeLeaveBalance.GetAll(k => k.Where(employee => employee.EmployeeId == value.EmployeeId && employee.IsActive == true && employee.Year == (long)DateTime.Now.Year)).FirstOrDefault();

            return data.LeaveBalance;
        }
        #endregion

        #region Models

        public class EmployeeMasterResponse
        {
            public int count { get; set; }
            public List<Entities.EmployeeMasterEntity> employeeData { get; set; }
        }

        public class EmployeeLeaveRequest
        {
            public long EmployeeId { get; set; }
        }
        #endregion
    }
}

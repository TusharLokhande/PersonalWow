using Prosares.Wow.Data.Entities;
using Prosares.Wow.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prosares.Wow.Data.Services.Calendar
{
    public class CalendarService : ICalendarService
    {

        #region Fields

        private readonly IRepository<EmployeeMasterEntity> _employeeMaster;
        private readonly IRepository<EmployeeCalendar> _employeeCalendar;
        private readonly IRepository<WorkPoliciesMaster> _workPolicyMaster;


        #endregion

        #region Constructor

        public CalendarService(IRepository<EmployeeMasterEntity> employeeMaster,
            IRepository<EmployeeCalendar> employeeCalendar,
            IRepository<WorkPoliciesMaster> workPolicyMaster)
        {
            _employeeCalendar = employeeCalendar;
            _employeeMaster = employeeMaster;
            _workPolicyMaster = workPolicyMaster;
        }

        #endregion

        #region Methods
        public dynamic getCalendarData(calendarRequestMode value)
        {
            dynamic data;
            string currentDateMonthString = value.Date.ToString("MMM");

            //List<string> DateMonthStringArr = _employeeCalendar.GetAll(b => b.Where(k => k.IsActive == true && k.Date.ToString("MMM") == currentDateMonthString)).Select(s => s.Date.ToString("MMM")).AsQueryable().ToList();

            data = (from ec in _employeeCalendar.Table
                    join em in _employeeMaster.Table on ec.EmployeeId equals em.Id
                    select new
                    {
                        Date = ec.Date,
                        // DateMonthString = ec.Date.ToString("MMM"),
                        Status = (ec.TotalHoursSpent >= 8.5M ? "full" : (ec.TotalHoursSpent == 0 ? "notfilled" : (ec.TotalHoursSpent < 8.5M ? "half" : ""))),
                        EmployeeId = em.Id,
                    }
                    ).Where(k => k.EmployeeId == value.EmployeeId).ToList();

            return data;
        }

        public dynamic insertUpdateCalendarData(dynamic value)
        {
            throw new NotImplementedException();
        }

        #endregion

        public class calendarRequestMode
        {
            public int EmployeeId { get; set; }
            public DateTime Date { get; set; }
        }
    }
}

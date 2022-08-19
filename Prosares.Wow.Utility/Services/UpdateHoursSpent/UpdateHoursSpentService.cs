using Microsoft.Extensions.Logging;
using Prosares.Wow.Utility.Entities;
using Prosares.Wow.Utility.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prosares.Wow.Utility.Services.UpdateHoursSpent
{
    public class UpdateHoursSpentService:IUpdateHoursSpentService
    {
        private IRepository<TasksTimeSheet> _tasksTimeSheet;

        private readonly ILogger<UpdateHoursSpentService> _logger;
        public UpdateHoursSpentService(IRepository<TasksTimeSheet> tasksTimeSheet, ILogger<UpdateHoursSpentService> logger)
        {
            _tasksTimeSheet = tasksTimeSheet;

            _logger= logger;
        }

        public void Process()
        {
            try
            {
                //Task and Ticket
                _logger.LogInformation("Starting Hours Spent Updation ", "Started", DateTime.UtcNow);
                SqlCommand command = new SqlCommand("stpUpdateHoursSpentOnTaskAndTicket");
                command.CommandType = CommandType.StoredProcedure;

                var tasks = _tasksTimeSheet.ExecuteProcedure(command);

                _logger.LogInformation("Ending Hours Spent Updation ", "Started", DateTime.UtcNow);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Exception", DateTime.UtcNow);
                throw;
            }
           
        }
    }
}

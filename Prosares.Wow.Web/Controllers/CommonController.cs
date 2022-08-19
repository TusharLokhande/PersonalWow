using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Prosares.Wow.Data.Models;
using Prosares.Wow.Data.Services.ManagerDashboard;
using System;
using System.Drawing;
using System.IO;

namespace Prosares.Wow.Web.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly IManagerDashboardService _managerDashboardService;
        public CommonController(IManagerDashboardService managerDashboardService)
        {
            _managerDashboardService = managerDashboardService;
        }
        [HttpPost]



        public ActionResult ExportToExcel([FromBody] ManagerDashboardModel value)
        {
            try
            {
                if (value != null)
                {

                    ManagerDashboardModelResponse lst = _managerDashboardService.GetManagerDashboardData(value);
                    byte[] bytes;

                    using (var stream = new MemoryStream())
                    {
                        if (value.Type == "task")
                        {
                            ExportToExcelForTaskAndTicket(stream, lst.TaskData, "task");
                            bytes = stream.ToArray();
                        }
                        else
                        {
                            ExportToExcelForTaskAndTicket(stream, lst.TicketData, "ticket");
                            bytes = stream.ToArray();
                        }

                    }
                    return File(bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8", "TaskGrid_" + DateTime.Now.ToString() + ".xlsx");

                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [NonAction]
        public virtual void ExportToExcelForTaskAndTicket(Stream stream, dynamic lstentity, string type)
        {
            if (stream == null)
                throw new ArgumentNullException("stream");

            //run the real code of the sample now
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (var xlPackage = new ExcelPackage(stream))
            {
                // get handle to the existing worksheet
                dynamic worksheet="";
                if (type == "task")
                {
                     worksheet = xlPackage.Workbook.Worksheets.Add("Tasks");
                }
                else
                {
                     worksheet = xlPackage.Workbook.Worksheets.Add("Tickets");

                }
                //Create Headers and format them+
                var properties = Array.Empty<object>();
                if (type == "task")
                {
                    properties = new[]
                    {
                        "Task Id",
                        "Customer",
                        "Engagement",
                        "Engagement Type",  
                        "Phase Name",
                        "Task Title",
                        "Task Description",
                        "Assigned To",
                        "Hours Assigned",
                        "Hours Spent",
                        "Is Chargeable",
                        "Not Chargeable Reason",
                        "Planned Start Date",
                        "Planned End Date",
                        "Remarks",
                        "Created By",
                        "Created Date"
                        
                     };
                }
                else
                {
                    properties = new[]
                    {
                        
                        "TicketId",
                        "Customer",
                        "Engagement",
                        "Engagement Type",
                        "Application Name",
                        "TicketTitle",
                        "TicketDescription",
                        "Assigned To",
                        "Hours Assigned",
                        "HoursSpent",
                        "Priority",
                        "Is Chargeable",
                        "Not Chargeable Reason",
                        "Incident Date",
                        "Report Date",
                        "Start Date",
                        "Resolve Date",
                        "Remarks",
                        "Created By",
                        "Created Date"

                     };
                }

                for (int i = 0; i < properties.Length; i++)
                {
                    worksheet.Cells[1, i + 1].Value = properties[i];

                    //Bold Text
                    worksheet.Cells[1, i + 1].Style.Font.Bold = true;

                    //Border
                    worksheet.Cells[1, i + 1].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[1, i + 1].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[1, i + 1].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[1, i + 1].Style.Border.Right.Style = ExcelBorderStyle.Thin;

                    //Border Color
                    worksheet.Cells[1, i + 1].Style.Border.Top.Color.SetColor(Color.Black);
                    worksheet.Cells[1, i + 1].Style.Border.Bottom.Color.SetColor(Color.Black);
                    worksheet.Cells[1, i + 1].Style.Border.Right.Color.SetColor(Color.Black);
                    worksheet.Cells[1, i + 1].Style.Border.Left.Color.SetColor(Color.Black);

                    //center alignment of text
                    worksheet.Cells[1, i + 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    worksheet.Cells[1, i + 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                    //Set Font Size
                    worksheet.Cells[1, i + 1].Style.Font.Size = 12;
                }

                int row = 2;

                foreach (var item in lstentity)
                {
                    int col = 1;

                    worksheet.Cells[row, col].Value = item.Id;
                    col++;

                    worksheet.Cells[row, col].Value = item.Customer;
                    col++;

                    worksheet.Cells[row, col].Value = item.EngagementString;
                    col++;

                    worksheet.Cells[row, col].Value = item.EngagementTypeString;
                    col++;

                    if (type == "task")
                    {
                        //worksheet.Cells[row, col].Value = item.Id;
                        //col++;

                        worksheet.Cells[row, col].Value = item.PhaseString;
                        col++;

                     


                        worksheet.Cells[row, col].Value = item.TaskTitle;
                        col++;

                        worksheet.Cells[row, col].Value = item.TaskDescription;
                        col++;
                    }
                    else
                    {
                        //worksheet.Cells[row, col].Value = item.Id;
                        //col++;


                        worksheet.Cells[row, col].Value = item.ApplicationString;
                        col++;

                        worksheet.Cells[row, col].Value = item.TicketTitle;
                        col++;

                        worksheet.Cells[row, col].Value = item.TicketDescription;
                        col++;


                    }
                    worksheet.Cells[row, col].Value = item.AssignedToString;
                    col++;

        

                    worksheet.Cells[row, col].Value = item.HoursAssigned;
                    col++;

                    worksheet.Cells[row, col].Value = item.HoursSpent;
                    col++;

                    if (type != "task")
                    {
                        worksheet.Cells[row, col].Value = item.PriorityString;
                        col++;
                    }
                    worksheet.Cells[row, col].Value = item.IsChargeable;
                    col++;

                    worksheet.Cells[row, col].Value = item.NoChargesReason;
                    col++;

                    if (type == "task")
                    {
                        worksheet.Cells[row, col].Value = (Convert.ToDateTime(item.PlannedStartDate)).ToString("dd/MMM/yyyy");
                        col++;

                        worksheet.Cells[row, col].Value = (Convert.ToDateTime(item.PlannedEndDate)).ToString("dd/MMM/yyyy");
                        col++;
                    }
                    else
                    {
                        worksheet.Cells[row, col].Value = (Convert.ToDateTime(item.IncidentDate)).ToString("dd/MMM/yyyy"); 
                        col++;

                        worksheet.Cells[row, col].Value = (Convert.ToDateTime(item.ReportDate)).ToString("dd/MMM/yyyy"); 
                        col++; 
                        
                        worksheet.Cells[row, col].Value = (Convert.ToDateTime(item.StartDate)).ToString("dd/MMM/yyyy"); 
                        col++;

                        worksheet.Cells[row, col].Value = (Convert.ToDateTime(item.ResolveDate)).ToString("dd/MMM/yyyy"); 
                        col++;
                    }

                    worksheet.Cells[row, col].Value = item.Remarks;
                    col++;


                    worksheet.Cells[row, col].Value = item.CreatedByString;
                    col++;

                    worksheet.Cells[row, col].Value = (Convert.ToDateTime(item.CreatedDate)).ToString("dd/MMM/yyyy");
                    col++;



                   
                    

                    row++;
                }

                worksheet.Cells.AutoFitColumns();

                xlPackage.Save();
            }

        }
    }
}

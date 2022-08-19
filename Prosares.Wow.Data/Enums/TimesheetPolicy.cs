using System.ComponentModel.DataAnnotations;

namespace Prosares.Wow.Data.Enums
{
public enum TimesheetPolicy{
        [Display(Name = "Timesheet Policy 1")]
        one = 1,
        [Display(Name =  "Timesheet Policy 2")]
        two = 2,
        [Display(Name = "Timesheet Policy 3")]
        three = 3,
        [Display(Name = "Timesheet Policy 4")]
        four = 4,
}
}
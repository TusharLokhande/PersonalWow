using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Prosares.Wow.Data.Entities
{

    public class ResponseM : BaseEntity { 
        public string label { get; set; }
        public string value { get; set; }
    }


    [Table("WorkPoliciesMaster")]
    public partial class WorkPoliciesMaster : BaseEntity
    {
        public WorkPoliciesMaster()
        {
            EmployeeMasters = new HashSet<EmployeeMasterEntity>();
            PolicyWiseHolidays = new HashSet<PolicyWiseHoliday>();
            PolicyWiseWorkingDays = new HashSet<PolicyWiseWorkingDay>();
            HolidayDates = new List<string>();
            WorkingDates = new List<ResponseM>();
        }

        //[Key]
        //[Column("ID")]
        //public long Id { get; set; }
        //[Required]
        [StringLength(500)]
        public string PolicyName { get; set; }
        [Column(TypeName = "date")]
        public DateTime ValidFrom { get; set; }
        [Column(TypeName = "date")]
        public DateTime ValidTill { get; set; }

        public string sortColumn { get; set; }
        public string sortDirection { get; set; }
        public int pageSize { get; set; }
        public int start { get; set; }
        public string searchText { get; set; }

        public string WorkingDay1 { get; set; }
        public string WorkingDay2 { get; set; }
        public string WorkingDay3 { get; set; }
        public string WorkingDay4 { get; set; }
        public string WorkingDay5 { get; set; }
        public string WorkingDay6 { get; set; }


        [DataType(DataType.Date)]
        public DateTime? Holiday1 { get; set; }

     
        public DateTime? Holiday2 { get; set; }

  
        public DateTime? Holiday3 { get; set; }

      
        public DateTime? Holiday4 { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Holiday5 { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Holiday6 { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Holiday7 { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Holiday8 { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Holiday9 { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Holiday10 { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Holiday11 { get; set; }

        public List<string> HolidayDates { get; set; }
        public List<ResponseM> WorkingDates { get; set; }

        [InverseProperty(nameof(EmployeeMasterEntity.WorkPolicy))]
        public virtual ICollection<EmployeeMasterEntity> EmployeeMasters { get; set; }
        [InverseProperty(nameof(PolicyWiseHoliday.Policy))]
        public virtual ICollection<PolicyWiseHoliday> PolicyWiseHolidays { get; set; }
        [InverseProperty(nameof(PolicyWiseWorkingDay.Policy))]
        public virtual ICollection<PolicyWiseWorkingDay> PolicyWiseWorkingDays { get; set; }
    }
}

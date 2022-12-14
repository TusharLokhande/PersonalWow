using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Prosares.Wow.Data.Entities
{
    [Table("ApplicationsMaster")]
    public partial class ApplicationsMaster : BaseEntity
    {
        public ApplicationsMaster()
        {
            TaskMasters = new HashSet<TaskMaster>();
            TicketsMasters = new HashSet<TicketsMaster>();
        }

        //[Key]
        //[Column("ID")]
        //public long Id { get; set; }
        //[Required]
        [StringLength(1000)]
        public string Application { get; set; }
        [Column("EngagementID")]
        public long EngagementId { get; set; }

        public string sortColumn { get; set; }
        public string sortDirection { get; set; }
        public int pageSize { get; set; }
        public int start { get; set; }
        public string searchText { get; set; }

        [ForeignKey(nameof(EngagementId))]
        [InverseProperty(nameof(EngagementMaster.ApplicationsMasters))]
        public virtual EngagementMaster Engagement { get; set; }
        [InverseProperty(nameof(TaskMaster.Application))]
        public virtual ICollection<TaskMaster> TaskMasters { get; set; }
        [InverseProperty(nameof(TicketsMaster.Application))]
        public virtual ICollection<TicketsMaster> TicketsMasters { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Prosares.Wow.Data.Entities
{
    [Table("LeaveRequestsMaster")]
    public partial class LeaveRequestsMaster : BaseEntity
    {
        //[Key]
        //[Column("ID")]
        //public long Id { get; set; }
        public long RequestorId { get; set; }
        public long? ApproverId { get; set; }
        [Column(TypeName = "date")]
        public DateTime FromDate { get; set; }
        public int FromDateLeaveType { get; set; }
        [Column(TypeName = "date")]
        public DateTime ToDate { get; set; }
        public int ToDateLeaveType { get; set; }
        public double LeaveDays { get; set; }
        public long ResonId { get; set; }
        //[Required]
        public string Remark { get; set; }
        public string? ApproverName { get; set; }
        public string? RequesterName { get; set; }
        public string? LeavesReson { get; set; }
        public int RequestStatus { get; set; }
        public long LeaveType { get; set; }
        public string sortColumn { get; set; }
        public string sortDirection { get; set; }
        public int pageSize { get; set; }
        public int start { get; set; }
        public string searchText { get; set; }

        [ForeignKey(nameof(ApproverId))]
        [InverseProperty(nameof(EmployeeMasterEntity.LeaveRequestsMasterApprovers))]
        public virtual EmployeeMasterEntity Approver { get; set; }
        [ForeignKey(nameof(RequestorId))]
        [InverseProperty(nameof(EmployeeMasterEntity.LeaveRequestsMasterRequestors))]
        public virtual EmployeeMasterEntity Requestor { get; set; }
        [ForeignKey(nameof(ResonId))]
        [InverseProperty(nameof(LeavesResonMaster.LeaveRequestsMasters))]
        public virtual LeavesResonMaster Reson { get; set; }
    }
}

using Microsoft.Extensions.Logging;
using Prosares.Wow.Data.DBContext;
using Prosares.Wow.Data.Entities;
using Prosares.Wow.Data.Helpers;
using Prosares.Wow.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Prosares.Wow.Data.Services.Phase
{
    public class PhaseMasterService : IPhaseMasterService
    {
        #region Prop
        private readonly IRepository<PhaseMaster> _phaseMaster;
        private readonly IRepository<Entities.EngagementMaster> _engagementMaster;
        private readonly ILogger<PhaseMasterService> _logger;
        private readonly SqlDbContext _context;
        #endregion

        #region Constructor
        public PhaseMasterService(IRepository<PhaseMaster> phaseMaster,
                                  IRepository<Entities.EngagementMaster> engagementMaster,
                                  ILogger<PhaseMasterService> logger,
                                       SqlDbContext context)
        {
            _phaseMaster = phaseMaster;
            _engagementMaster = engagementMaster;

            _logger = logger;

            _context = context;
        }
        #endregion


        #region Methods


        public PhaseMasterResponse GetPhaseMasterGridData(PhaseMaster value)
        {
            var data = new PhaseMasterResponse();

            Expression<Func<Entities.PhaseMaster, bool>> InitialCondition;
            Expression<Func<Entities.PhaseMaster, bool>> SearchText;

            InitialCondition = k => k.Id != 0;

            if (value.searchText != null)
            {

                SearchText = k => k.Phase.Contains(value.searchText) || k.Description.Contains(value.searchText);

            }
            else
            {
                SearchText = k => k.Phase != "";
            }

            if (value.sortColumn == "" || value.sortDirection == "")
            {

                data.count = _phaseMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
                data.phaseMasterData = _phaseMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByPropertyDescending("createdDate")).Skip(value.start).Take(value.pageSize).ToList();
            }
            else if (value.sortDirection == "desc")
            {
                data.count = _phaseMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
                data.phaseMasterData = _phaseMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByPropertyDescending(value.sortColumn)).Skip(value.start).Take(value.pageSize).ToList();
            }
            else if (value.sortDirection == "asc")
            {
                data.count = _phaseMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
                data.phaseMasterData = _phaseMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByProperty(value.sortColumn)).Skip(value.start).Take(value.pageSize).ToList();
            }

            return data;
        }

        public dynamic InsertUpdatePhaseMasterData(PhaseMaster value)
        {
            PhaseMaster data = new PhaseMaster();

            data.Id = value.Id;

            if (data.Id == 0) // Insert in DB
            {
                bool checkDuplicate = _phaseMaster.Table.Any(k => (k.Phase == value.Phase));

                if (checkDuplicate)
                {
                    return false;
                }
                data.Phase = value.Phase;
                data.Description = value.Description;
                data.EngagementId = value.EngagementId;
                data.PlannedDate = value.PlannedDate;
                data.ActualDate = value.ActualDate;
                data.IsActive = value.IsActive;
                _phaseMaster.Insert(data);
                return true;
            }
            else
            {

                bool checkDuplicate = _phaseMaster.Table.Any(k => k.Id != value.Id && (k.Phase == value.Phase));

                if (checkDuplicate)
                {
                    return false;
                }
                // Update in DB
                var phaseMasterData = _phaseMaster.GetById(value.Id);
                phaseMasterData.Phase = value.Phase;
                phaseMasterData.Description = value.Description;
                phaseMasterData.EngagementId = value.EngagementId;
                phaseMasterData.PlannedDate = value.PlannedDate;
                phaseMasterData.ActualDate = value.ActualDate;
                phaseMasterData.IsActive = value.IsActive;
                phaseMasterData.ModifiedDate = DateTime.UtcNow;

                _phaseMaster.Update(phaseMasterData);
                return true;
            }
        }

        public dynamic GetPhaseMasterById(PhaseMaster value)
        {
            var phaseMaster = _phaseMaster.GetById(value.Id);

            var response = (from pm in _phaseMaster.Table
                            join eng in _engagementMaster.Table on pm.EngagementId equals eng.Id

                            select new
                            {
                                Phase = pm.Phase,
                                Description = pm.Description,
                                EngagementId = pm.EngagementId,
                                Engagement = eng.Engagement,
                                PlannedDate = pm.PlannedDate,
                                ActualDate = pm.ActualDate,
                                IsActive = pm.IsActive,
                                Id = pm.Id,

                            }).Where(k => k.Id == value.Id);
            return response;

        }
        #endregion

        #region Models

        public class PhaseMasterResponse
        {
            public int count { get; set; }
            public List<Entities.PhaseMaster> phaseMasterData { get; set; }
        }
        #endregion
    }
}

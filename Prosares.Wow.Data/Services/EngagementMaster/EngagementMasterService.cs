using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Prosares.Wow.Data.DBContext;
using Prosares.Wow.Data.Helpers;
using Prosares.Wow.Data.Models;
using Prosares.Wow.Data.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;


namespace Prosares.Wow.Data.Services.EngagementMaster
{
    public class EngagementMasterService : IEngagementMasterService
    {
        #region Prop
        private readonly IRepository<Entities.EngagementMaster> _engagementMaster;
        //private readonly IRepository<Entities.EngagementMaster> _engagementMasterRepository;
        private readonly ILogger<EngagementMasterService> _logger;
        private readonly SqlDbContext _context;
        #endregion

        #region Constructor
        public EngagementMasterService(IRepository<Entities.EngagementMaster> EngagementMaster,
                        //IRepository<Entities.EngagementMaster> engagementMasterRepository,
                        ILogger<EngagementMasterService> logger, SqlDbContext context)
        {

            //this._engagementMasterRepository = engagementMasterRepository;
            _context = context;
            _engagementMaster = EngagementMaster;
            _logger = logger;
        }
        #endregion

        #region Methods
        public dynamic GetEngagementMasterById(Entities.EngagementMaster value)
        {
            try
            {
                //Entities.EngagementMaster engagementMaster = new Entities.EngagementMaster();
                SqlCommand command = new SqlCommand("stpGetEngagementById");
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@EngagementId", SqlDbType.BigInt).Value = value.Id;
                var engagementMaster = _engagementMaster.GetRecord(command);
                return engagementMaster;
                //var engagementMaster = _engagementMaster.GetById(value.Id);
                //return engagementMaster;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public bool EngagementMasterExists(long id)
        {
            return _engagementMaster.IsExist(id);
        }
        public EngagementMasterResponse GetEngagementMasterGridData(Entities.EngagementMaster value)
        {
            var data = new EngagementMasterResponse();

            Expression<Func<Entities.EngagementMaster, bool>> InitialCondition;
            Expression<Func<Entities.EngagementMaster, bool>> SearchText;

            InitialCondition = k => k.Id != 0;

            if (value.searchText != null)
            {

                SearchText = k => k.Engagement.Contains(value.searchText);

            }
            else
            {
                SearchText = k => k.Engagement != "";
            }

            if (value.sortColumn == "" || value.sortDirection == "")
            {

                data.count = _engagementMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
                data.engagementMasterData = _engagementMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByPropertyDescending("createdDate")).Skip(value.start).Take(value.pageSize).ToList();
            }
            else if (value.sortDirection == "desc")
            {
                data.count = _engagementMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
                data.engagementMasterData = _engagementMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByPropertyDescending(value.sortColumn)).Skip(value.start).Take(value.pageSize).ToList();
            }
            else if (value.sortDirection == "asc")
            {
                data.count = _engagementMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText)).ToList().Count();
                data.engagementMasterData = _engagementMaster.GetAll(b => b.Where(InitialCondition).Where(SearchText).OrderByProperty(value.sortColumn)).Skip(value.start).Take(value.pageSize).ToList();
            }

            return data;
        }
        public long InsertUpdateEngagementMasterData(Entities.EngagementMaster value)
        {
            try
            {
                Entities.EngagementMaster data = new Entities.EngagementMaster();

                data.Id = value.Id;

                if (value.Id == 0) // Insert in DB
                {
                    value.CreatedDate = DateTime.UtcNow;
                    Entities.EngagementMaster response = _engagementMaster.InsertAndGet(value);
                    return response.Id;
                }
                else if (value.Id != 0)
                {
                    Entities.EngagementMaster engagementMasterGetById = _engagementMaster.GetById(value.Id);
                    DateTime abx = engagementMasterGetById.CreatedDate;
                    engagementMasterGetById = value;
                    engagementMasterGetById.CreatedDate = abx;
                    engagementMasterGetById.ModifiedDate = DateTime.UtcNow;
                    _engagementMaster.UpdateAsNoTracking(value);
                    return value.Id;
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        #endregion

        #region Models
        public class EngagementMasterResponse
        {
            public int count { get; set; }
            public List<Entities.EngagementMaster> engagementMasterData { get; set; }
        }
        #endregion
    }
}

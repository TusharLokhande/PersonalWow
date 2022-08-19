using Microsoft.AspNetCore.Mvc;
using Prosares.Wow.Data.Entities;
using Prosares.Wow.Data.Models;
using Prosares.Wow.Data.Services.Milestone;

namespace Prosares.Wow.Web.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class MilestoneController : ControllerBase
    {
        #region Fields

        private readonly IMilestoneService _milestoneService;
        #endregion

        #region Constructor
        public MilestoneController(IMilestoneService milestoneService)
        {
            _milestoneService = milestoneService;
        }

        #endregion

        #region Methods

        [HttpPost]
        public JsonResponseModel getMilestoneData([FromBody] MileStone value)
        {
            JsonResponseModel apiResponse = new JsonResponseModel();
            try
            {

                apiResponse.Status = ApiStatus.OK;
                apiResponse.Data = _milestoneService.GetMilestoneData(value);
                apiResponse.Message = "Ok";
            }
            catch (System.Exception ex)
            {
                apiResponse.Status = ApiStatus.Error;
                apiResponse.Data = null;
                apiResponse.Message = ex.Message;

            }

            return apiResponse;
        }

        [HttpPost]
        public JsonResponseModel CheckIfMilestoneExists([FromBody] MileStone value)
        {
            JsonResponseModel apiResponse = new JsonResponseModel();
            try
            {
                apiResponse.Status = ApiStatus.OK;
                apiResponse.Data = _milestoneService.CheckIfMilestoneExists(value.MileStones);
                apiResponse.Message = "Ok";
            }
            catch (System.Exception ex)
            {
                apiResponse.Status = ApiStatus.Error;
                apiResponse.Data = null;
                apiResponse.Message = ex.Message;

            }

            return apiResponse;
        }

        [HttpPost]
        public JsonResponseModel insertUpdateMilestoneData([FromBody] MileStone value)
        {
            JsonResponseModel apiResponse = new JsonResponseModel();
            try
            {

                apiResponse.Status = ApiStatus.OK;
                _milestoneService.InsertUpdateMilestoneData(value);
                apiResponse.Data = "Ok";               
                apiResponse.Message = "Ok";
            }
            catch (System.Exception ex)
            {
                apiResponse.Status = ApiStatus.Error;
                apiResponse.Data = null;
                apiResponse.Message = ex.Message;

            }

            return apiResponse;
        }

        [HttpPost]
        public JsonResponseModel getMilestoneDataById([FromBody] MileStone value)
        {
            JsonResponseModel apiResponse = new JsonResponseModel();
            try
            {

                apiResponse.Status = ApiStatus.OK;
                apiResponse.Data = _milestoneService.GetMilestoneById(value);
                apiResponse.Message = "Ok";
            }
            catch (System.Exception ex)
            {
                apiResponse.Status = ApiStatus.Error;
                apiResponse.Data = null;
                apiResponse.Message = ex.Message;

            }

            return apiResponse;
        }

        #endregion
    }
}

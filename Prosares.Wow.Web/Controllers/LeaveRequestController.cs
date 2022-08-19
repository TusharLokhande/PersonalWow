using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prosares.Wow.Data.Entities;
using Prosares.Wow.Data.Models;
using Prosares.Wow.Data.Services.LeaveRequest;

namespace Prosares.Wow.Web.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class LeaveRequestController : ControllerBase
    {
        #region Fields

        private readonly ILeaveRequestMasterService _leaveRequestMasterService;
        #endregion

        #region Constructor
        public LeaveRequestController(ILeaveRequestMasterService leaveRequestMasterService)
        {
            _leaveRequestMasterService = leaveRequestMasterService;
        }

        #endregion

        #region Method

        [HttpPost]
        public JsonResponseModel GetLeaveReqMasterMasterGridData([FromBody] LeaveRequestsMaster value)
        {
            JsonResponseModel apiResponse = new JsonResponseModel();
            try
            {
                apiResponse.Status = ApiStatus.OK;
                apiResponse.Data = _leaveRequestMasterService.GetLeaveReqMasterMasterGridData();//value
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
        public JsonResponseModel GetLeaveRequestMasterById([FromBody] LeaveRequestsMaster value)
        {
            JsonResponseModel apiResponse = new JsonResponseModel();
            try
            {
                apiResponse.Status = ApiStatus.OK;
                apiResponse.Data = _leaveRequestMasterService.GetLeaveRequestMasterById(value);
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
        public JsonResponseModel insertUpdateLeaveRequestMasterData([FromBody] LeaveRequestsMaster value)
        {
            JsonResponseModel apiResponse = new JsonResponseModel();
            try
            {

                apiResponse.Status = ApiStatus.OK;
                apiResponse.Data = _leaveRequestMasterService.InsertUpdateLeaveRequestMasterData(value);
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

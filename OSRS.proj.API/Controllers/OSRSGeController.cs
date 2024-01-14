using Microsoft.AspNetCore.Mvc;
using OSRS.proj.API.Business.Interfaces;
using OSRS.proj.API.Models.DataModel;
using OSRS.proj.API.Models.ViewModel;

namespace OSRS.proj.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OSRSGeController : ControllerBase
    {
        private readonly ILogger<OSRSGeController> _logger;
        private readonly IOSRSGeService _service;

        public OSRSGeController(IOSRSGeService service, ILogger<OSRSGeController> logger)
        {
            _logger = logger;
            _service = service;
        }

        [HttpPost("GetCategoryInfo")]
        [ProducesResponseType(typeof(CategoryResponse), 200)]
        public async Task<CategoryResponse> GetCategoryInfo(CategoryRequest request)
        {
            var response = await _service.GetCategoryInfo(request);
            return response;
        }
        [HttpPost("GetItems")]
        [ProducesResponseType(typeof(ItemsResponse), 200)]
        public async Task<List<ItemsResponse>> GetItems(ItemsRequest request)
        {
            var response = await _service.GetItems(request);
            return response;
        }
        [HttpPost("GetItemDetails")]
        [ProducesResponseType(typeof(ItemDetailsResponse), 200)]
        public async Task<ItemDetailsResponse> GetItemDetails(ItemDetailsRequest request)
        {
            var response = await _service.GetItemDetails(request);
            return response;
        }
    }
}

using OSRS.proj.API.Models.DataModel;
using OSRS.proj.API.Models.ViewModel;
using OSRS.proj.API.Data.Interface;
using OSRS.proj.API.Business.Interfaces;

namespace OSRS.proj.API.Business.Logic
{
    public class OSRSGeService : IOSRSGeService
    {
        private readonly IOSRSGeRepository _repository;
        public OSRSGeService(IOSRSGeRepository repository) 
        {
            _repository = repository;
        }
        public async Task <CategoryResponse> GetCategoryInfo(CategoryRequest request)
        {
            var response = await _repository.GetCategoryInfo(request);
            return response;
        }
        public async Task<List<ItemsResponse>> GetItems(ItemsRequest request)
        {
            var response = await _repository.GetItems(request); return response;
        }
        public async Task<ItemDetailsResponse> GetItemDetails(ItemDetailsRequest request)
        {
            var response = await _repository.GetItemDetails(request); return response;
        }
    }
}

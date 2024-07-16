using OSRS.proj.API.Models.DataModel;
using OSRS.proj.API.Models.ViewModel;
using OSRS.proj.API.Data.Interface;

namespace OSRS.proj.API.Business.Interfaces
{
    public interface IOSRSGeService
    {
        Task<CategoryResponse> GetCategoryInfo(CategoryRequest request);
        Task<List<ItemsResponse>> GetItems(ItemsRequest request);
        Task<ItemDetailsResponse> GetItemDetails(ItemDetailsRequest request);
    }
}

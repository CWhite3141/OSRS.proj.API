using OSRS.proj.API.Models.DataModel;
using OSRS.proj.API.Models.ViewModel;

namespace OSRS.proj.API.Data.Interface
{
    public interface IOSRSGeRepository
    {
        Task<CategoryResponse> GetCategoryInfo(CategoryRequest request);
        Task<List<ItemsResponse>> GetItems(ItemsRequest request);
        Task<ItemDetailsResponse> GetItemDetails(ItemDetailsRequest request);
    }
}

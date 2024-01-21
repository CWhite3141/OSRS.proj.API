﻿using Microsoft.Extensions.Configuration;
using OSRS.proj.API.Business.Logic;
using Newtonsoft.Json;
using OSRS.proj.API.Models.DataModel;
using OSRS.proj.API.Models.ViewModel;
using System.Security.Cryptography.X509Certificates;
using OSRS.proj.API.Data.Interface;
using System.Web;
using Microsoft.Extensions.Caching.Memory;

namespace OSRS.proj.API.Data.Logic
{
    public class OSRSGeRepository : IOSRSGeRepository
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _memoryCache;
        public OSRSGeRepository(IHttpClientFactory httpClientFactory, IConfiguration configuration, IMemoryCache memorycache)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
            _memoryCache = memorycache;
        }
        public async Task<CategoryResponse> GetCategoryInfo(CategoryRequest request)
        {
            HttpClient client = _httpClientFactory.CreateClient("OSRS_GE");
            string baseUrl = _configuration["OSRS_GE:AppSettings:BaseUrl"];
            string endpoint = _configuration["OSRS_GE:OSRS_Endpoints:Categories"];
            string url = $"{baseUrl}{endpoint}?category={request.Category}";
            var response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<CategoryResponse>();
        }
        public async Task<List<ItemsResponse>> GetItems(ItemsRequest request)
        {

            HttpClient client = _httpClientFactory.CreateClient("OSRS_GE");
            string baseUrl = _configuration["OSRS_GE:AppSettings:BaseUrl"];
            string endpoint = _configuration["OSRS_GE:OSRS_Endpoints:Items"];
            List<ItemsResponse> allItems = new List<ItemsResponse>();
            
            string cacheKey = $"Items_{request.Category}_{request.Alpha}_{request.Page}";
            if (_memoryCache.TryGetValue(cacheKey, out List<ItemsResponse> cachedItems))
            {
                return cachedItems;
            }

            int currentPage;
            if (request.Page == null)
            {
                currentPage = 1;
                while (true)
                {
                    string url = $"{baseUrl}{endpoint}?category={request.Category}&alpha={request.Alpha}&page={currentPage}";
                    var response = await client.GetAsync(url);

                    if (response.IsSuccessStatusCode)
                    {
                        ItemsResponse itemResponse = await response.Content.ReadFromJsonAsync<ItemsResponse>();

                        if (itemResponse.Items.Count > 0)
                        {
                            allItems.Add(itemResponse);
                            currentPage++;
                        }
                        else
                        {
                            break;
                        }
                    }
                    else
                    {
                        Console.WriteLine($"Error: {response.StatusCode}");
                        response.EnsureSuccessStatusCode();
                        break;
                    }
                    var cacheEntryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
                    };
                    _memoryCache.Set(cacheKey, allItems, cacheEntryOptions);
                }
            }
            else
            {
                currentPage = request.Page.Value;
                string url = $"{baseUrl}{endpoint}?category={request.Category}&alpha={request.Alpha}&page={currentPage}";
                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    ItemsResponse itemResponse = await response.Content.ReadFromJsonAsync<ItemsResponse>();
                    allItems.Add(itemResponse);
                }
                else
                {
                    Console.WriteLine($"Error: {response.StatusCode}");
                    response.EnsureSuccessStatusCode();
                }
            }
            return allItems;
        }
        public async Task<ItemDetailsResponse> GetItemDetails(ItemDetailsRequest request)
        {
            HttpClient client = _httpClientFactory.CreateClient("OSRS_GE");
            string baseUrl = _configuration["OSRS_GE:AppSettings:BaseUrl"];
            string endpoint = _configuration["OSRS_GE:OSRS_Endpoints:ItemDetails"];
            string url = $"{baseUrl}{endpoint}?item={request.Item}";
            var response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<ItemDetailsResponse>();
        }
    }
}
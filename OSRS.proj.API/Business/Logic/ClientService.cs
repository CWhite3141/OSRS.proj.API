using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace OSRS.proj.API.Business.Logic
{
    public class ClientService
    {
        public static T? Deserialize<T>(HttpResponseMessage? response)
        {
            return response is null ? throw new Exception("Invalid Response") : JsonConvert.DeserializeObject<T>(response.Content.ReadAsStringAsync().Result,
            new JsonSerializerSettings { TypeNameHandling = TypeNameHandling.None });
        }
        public static StringContent GetContent(string jsonrequest)
        {
            return new StringContent(jsonrequest, Encoding.UTF8, "application/json");
        }
    }
}

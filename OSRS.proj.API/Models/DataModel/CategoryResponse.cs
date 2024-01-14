namespace OSRS.proj.API.Models.DataModel
{
    public class CategoryResponse
    {
        public class AlphaItem
        {
            public string Letter { get; set; }
            public int Items { get; set; }
        }

        public List<AlphaItem> Alpha { get; set; }
        public List<object> Types { get; set; }
    }
}

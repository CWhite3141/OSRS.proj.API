namespace OSRS.proj.API.Models.DataModel
{
    public class ItemsResponse
    {
        public class Item
        {
            public string? Icon { get; set; }
            public string? IconLarge { get; set; }
            public int? Id { get; set; }
            public string? Type { get; set; }
            public string? TypeIcon { get; set; }
            public string? Name { get; set; }
            public string? Description { get; set; }
            public TrendInfo Day30 { get; set; }
            public TrendInfo Day90 { get; set; }
            public TrendInfo Day180 { get; set; }

            public class PriceInfo
            {
                public string? Trend { get; set; }
                public object Price { get; set; }
            }

            public PriceInfo Current { get; set; }
            public PriceInfo Today { get; set; }
            public object Members { get; set; }
        }
        public class TrendInfo
        {
            public string Trend { get; set; }
            public string Change { get; set; }
        }

        public int? Total { get; set; }
        public List<Item> Items { get; set; }
    }
}

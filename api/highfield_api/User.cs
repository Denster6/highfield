namespace highfield_api
{
    public class User
    {
        public string id { get; init; } = "";
        public string firstName { get; init; } = "";
        public string lastName { get; init; } = "";
        public string email { get; init; } = "";
        public DateTime dob { get; init; } 
        public string? favouriteColour { get; set; }
    }
}

namespace highfield_api
{
    using Microsoft.EntityFrameworkCore;

    public class HighfieldDb : DbContext
    {
        public HighfieldDb(DbContextOptions<HighfieldDb> options)
            : base(options) { }

        public DbSet<User> Users => Set<User>();
    }
}

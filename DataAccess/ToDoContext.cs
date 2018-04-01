namespace DataAccess
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using DataAccess.Entities;

    public partial class ToDoContext : DbContext
    {
        public ToDoContext()
            : base("name=ToDoContext")
        {
        }

        public virtual DbSet<Todo> ToDoTasks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}

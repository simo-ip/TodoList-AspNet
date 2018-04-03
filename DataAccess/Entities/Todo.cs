namespace DataAccess.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Todo
    {
        public int TodoId { get; set; }

        [Required]
        public string Description { get; set; }

        [Display(Name ="Done")]
        public bool IsDone { get; set; }
    }
}

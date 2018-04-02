using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.dto
{
    public interface ITodoListDto
    {
        int CurrentPage { get; set; }
        int Pages { get; set; }
        IEnumerable<Todo> TodoList { get; set; }
    }
}

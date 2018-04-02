using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Entities;

namespace Services.dto
{
    public class TodoListDto : ITodoListDto
    {
        public int CurrentPage { get; set; }
        public int Pages { get; set; }
        public IEnumerable<Todo> TodoList { get; set; }

        public TodoListDto() { }
    }
}

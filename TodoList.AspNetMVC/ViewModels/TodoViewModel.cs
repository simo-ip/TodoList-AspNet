using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataAccess.Entities;

namespace ToDoApp.ViewModels
{
    public class TodoViewModel : ITodoViewModel
    {
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
        public Todo Entity { get; set; }
        public IEnumerable<Todo> List { get; set; }
    }
}
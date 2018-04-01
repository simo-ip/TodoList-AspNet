using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.ViewModels
{
    public interface ITodoViewModel
    {
        int Pages { get; set; }
        int CurrentPage { get; set; }
        Todo Entity { get; set; }
        IEnumerable<Todo> List { get; set; }
    }
}

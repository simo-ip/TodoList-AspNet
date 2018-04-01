using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Models
{
    public interface IToDoTaskModel
    {
        IEnumerable<Todo> GetAll();
        Todo GetById(int id);
        void Add(Todo model);
        void Update(Todo model);
        void Delete(int id);
    }
}

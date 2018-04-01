using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataAccess.Entities;
using DataAccess;
using DataAccess.Repositories;

namespace ToDoApp.Models
{
    public class ToDoTaskModel : IToDoTaskModel
    {
        ITodoRepository toDoTaskRepository;

        public ToDoTaskModel(ITodoRepository toDoTaskRepository)
        {
            this.toDoTaskRepository = toDoTaskRepository;
        }

        public IEnumerable<Todo> GetAll()
        {
            var model = toDoTaskRepository.GetAll().ToList();
            return model;
        }

        public Todo GetById(int id)
        {
            return toDoTaskRepository.GetById(id);
        }

        public void Add(Todo model)
        {
            toDoTaskRepository.Create(model);
        }

        public void Update(Todo model)
        {
            toDoTaskRepository.Update(model);
        }

        public void Delete(int id)
        {
            toDoTaskRepository.Delete(id);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Entities;
using DataAccess.Repositories;
using Services.dto;

namespace Services
{
    public class TodoService : ITodoService
    {
        const double PAGE_SIZE = 5;
        private readonly ITodoRepository _repository;
        private readonly ITodoListDto _todoList;

        public TodoService()
        {
            _repository = new TodoRepository();
            _todoList = new TodoListDto();
        }

        public TodoService(ITodoRepository repository, ITodoListDto todoList)
        {
            _repository = repository;
            _todoList = todoList;
        }

        public int GetPageNumber()
        {
            double rowCount =  _repository.GetAll().Count();
            int pageNumber = (int)Math.Ceiling(rowCount / PAGE_SIZE);
            return pageNumber;
        }

        public ITodoListDto GetData(int page)
        {
            double rowCount = _repository.GetAll().Count();
            int pageCount = (int)Math.Ceiling(rowCount / PAGE_SIZE);
            _todoList.CurrentPage = page;
            _todoList.Pages = pageCount;
            _todoList.TodoList = _repository.GetAll()
                .OrderByDescending(c => c.TodoId).Skip((int)((page - 1)*PAGE_SIZE)).Take((int)PAGE_SIZE).ToList();
            return _todoList;
        }

        public Todo GetById(int id)
        {
            return  _repository.GetById(id);
        }

        public void Create(Todo entity)
        {
            _repository.Create(entity);
        }

        public void Delete(int id)
        {
             _repository.Delete(id);
        }

        public void Update(Todo entity)
        {
             _repository.Update(entity);
        }
    }
}

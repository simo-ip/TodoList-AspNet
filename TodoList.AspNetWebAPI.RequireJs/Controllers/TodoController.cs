using System.Data.Entity.Infrastructure;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using DataAccess.Entities;
using Services;
using Services.dto;

namespace TodoApp.AspNetWebAPI.Controllers
{
    public class TodoController : ApiController
    {
        private readonly ITodoService _service;

        public TodoController(ITodoService service)
        {
            _service = service;
        }

        // GET: api/Todo/1
        [ResponseType(typeof(TodoListDto))]
        public ITodoListDto GetTodoes(int id = 1)
        {
            return _service.GetData(id);
        }

        // PUT: api/Todo/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTodo(int id, Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != todo.TodoId)
            {
                return BadRequest();
            }

            try
            {
                _service.Update(todo);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Todo
        [ResponseType(typeof(Todo))]
        public IHttpActionResult PostTodo(Todo todo)
        {
            if ((todo == null) || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _service.Create(todo);

            return CreatedAtRoute("DefaultApi", new { id = todo.TodoId }, todo);
        }

        // DELETE: api/Todo/5
        [ResponseType(typeof(Todo))]
        public IHttpActionResult DeleteTodo(int id)
        {
            Todo todo = _service.GetById(id);
            if (todo == null)
            {
                return NotFound();
            }

            _service.Delete(id);

            return Ok(todo);
        }

        private bool TodoExists(int id)
        {
            return _service.GetById(id) != null;
        }
    }
}